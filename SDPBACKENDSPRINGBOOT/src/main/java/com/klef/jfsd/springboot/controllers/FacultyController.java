package com.klef.jfsd.springboot.controllers;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.FacultyDTO;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.SubmissionDTO;
import com.klef.jfsd.springboot.services.FacultyService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("faculty")
public class FacultyController {
	
	@Autowired
	private FacultyService service;
	
	@SuppressWarnings("unused")
	@PostMapping("/checkfacultylogin")
	public ResponseEntity<?> checkFacultyLogin(@RequestBody Map<String, String> payload){
		try {
			String uname = payload.get("username");
			String pwd = payload.get("password");
			FacultyDTO response = service.checkFacultyLogin(uname, pwd);
			
			if(response.getFstatus().equals("INACTIVE")) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Your Account is Inactive.For more information contact Administrator");
			}else if (response == null) {
				return ResponseEntity.status(404).body("No Account Found");
			}
			return ResponseEntity.status(200).body(response);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in Login: " + e.getMessage());
		}
	}
	
	@GetMapping("viewfaculty")
	public FacultyDTO getFaculty(@RequestParam("id") String fid) {
		return service.viewfacultybyID(fid);
	}
	
	@GetMapping("/getsubmissions")
	public List<SubmissionDTO> getAssignmentSubmissions(@RequestParam("id") String aid){
		return service.getSubmissions(aid);
	}
	
	@GetMapping("/getfacultysubmissions")
	public List<SubmissionDTO> getFacultyAssignmentSubmissions(@RequestParam("id")String aid,@RequestParam String fid){
		return service.getSubmissionsToBeEvaluated(aid, fid);	
	}
	
	@GetMapping("/myinstructorcourses")
	public List<Course> myInstructorCourses(@RequestParam("id") String fid){
		return service.myInstructorCourses(fid);
	}
	
	@GetMapping("/mycourses")
	public List<Course> myCourses(@RequestParam("id") String fid){
		return service.myCourses(fid);
	}
	
	@GetMapping("/courseassignments")
	public List<AssignmentDTO> courseAssignments(@RequestParam("id") String cid){
		return service.viewUploadedAssignments(cid);
	}
	
	@GetMapping("getcourse")
	public Course getCourse(@RequestParam("id") String cid) {
		return service.getCourse(cid);
	}
	
	@GetMapping("getsubmission")
	public SubmissionDTO getSubmission(@RequestParam("id") String subid) {
		return service.getSubmission(subid);
	}
	
	@GetMapping("getassignment")
	public AssignmentDTO getAssignment(@RequestParam("id") String aid) {
		return service.getAssignment(aid);
	}
	
	@PutMapping("evaluatesubmission")
	public ResponseEntity<?> evaluateSubmission(@RequestBody Map<String, String> payload) {
		System.out.println("Function Call");
		try {
			String fid = payload.get("fid");
			String subid = payload.get("subid");
			String marks = payload.get("marks");
			String feedback = payload.get("feedback");
			String response = service.evaluateSubmission(subid, feedback, marks, fid) ;
			if(response.equals("You are not Allowed to grade the submission")) {
				return ResponseEntity.status(403).body(response);
			}
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		
	}
	
	@GetMapping("/registerdcount")
	public Long courseRegisteredCount(@RequestParam("id") String cid) {
		return service.courseRegisteredStudentsCount(cid);
	}
	
	@GetMapping("getcounts")
	public List<Long> getCounts(@RequestParam("id") String fid) {
		return service.getCounts(fid);
	}
	
	@PutMapping("changepassword")
	public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload){
		try {
			String fid = payload.get("fid");
			String oldpwd = payload.get("oldpassword");
			String newpwd = payload.get("newpassword");
			String ip = payload.get("ip");
			LocalDateTime currentTime = LocalDateTime.now();
			String formattedTime = currentTime.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
			String response = service.changePassword(fid, oldpwd, newpwd,formattedTime,ip);
			if(response.equals("Password Updated Succesfully")) {
				return ResponseEntity.status(200).body(response);
			}
			else {
				return ResponseEntity.status(400).body(response);
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error " + e.getMessage());
		}
	}
	
	@PostMapping("/uploadassignment")
	public ResponseEntity<?> uploadAssignment( @RequestParam String assignmentName,
            @RequestParam String assignmentQuestion,
            @RequestParam MultipartFile assignmentQuestionPDF,
            @RequestParam String courseId,
            @RequestParam double marks,
            @RequestParam String startdate,
            @RequestParam String deadlinedate) {
        
        try {
            Assignment assignment = new Assignment();
            assignment.setAssignmentName(assignmentName);
            assignment.setAssignmentQuestion(assignmentQuestion);
            assignment.setAssignmentQuestionPDF(new javax.sql.rowset.serial.SerialBlob(assignmentQuestionPDF.getBytes())); // convert MultipartFile to Blob
            assignment.setCourseId(courseId);
            assignment.setMarks(marks);
            assignment.setStartdate(startdate);
            assignment.setDeadlinedate(deadlinedate);

            String result = service.uploadAssignments(assignment);
            System.out.println(assignment);
            //String result = "Success";
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading assignment: " + e.getMessage());
        }
    }
	
	
	@PutMapping("/updatefacultyprofile")
	public ResponseEntity<?> updateStudentProfile(@RequestParam("profileData") MultipartFile file,@RequestParam("id") String sid) {
		
		try {
			Blob blob = new javax.sql.rowset.serial.SerialBlob(file.getBytes());
			return ResponseEntity.status(200).body(service.updateProfilePicture(sid, blob));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
	
	@DeleteMapping("/deleteassignment")
	public ResponseEntity<?> deleteAssignment(@RequestParam String aid,@RequestParam String fid){
		try {
			String response = service.deleteAssignment(fid, aid);
			if(response.equals("YOUR NOT ALLOWED TO DELETE ASSIGNMENT")) {
				return ResponseEntity.status(403).body(response);
			}
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
	
	@GetMapping("courseregisteredstudents")
	public List<StudentDTO> getCourseStudents(@RequestParam("id") String cid) {
		return service.viewCourseRegistedStudents(cid);
	} 
	
	
	

}
