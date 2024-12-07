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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;
import com.klef.jfsd.springboot.models.SubmissionDTO;
import com.klef.jfsd.springboot.services.StudentService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("student")
public class StudentController {
	
	@Autowired
	private StudentService service;
	
	@PostMapping("/checkstudentlogin")
	public ResponseEntity<?> checkStudentLogin(@RequestBody Map<String, String> payload){
		try {
			String username = payload.get("username");
			String password = payload.get("password");
			
			StudentDTO student = service.checkStudentLogin(username, password);
			if(student==null) {
				return ResponseEntity.status(404).body("Invalid Credential:Student Not Found");
			}
			if(student.getSstatus().equals("INACTICE")){
				return ResponseEntity.status(404).body("InActive Account ,Please Contact administrator");
			}
			
			return ResponseEntity.status(200).body(student);
			
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error In Login "+e.getMessage());
		}
	}
	
	@PostMapping("submitassignment")
	public ResponseEntity<?> submitAssignment(@RequestParam("assignmentId")String aid,@RequestParam("studentId")String sid,@RequestParam("courseId")String cid,@RequestParam("submissionDate")String date  ,@RequestParam MultipartFile file){
		try {
			if(!service.isAssignmentAcceptingSubmissions(aid)) {
				return ResponseEntity.status(200).body("Assignment is Not Accepting Submissions contact Course Instructor.");
			}
			Blob submittedData = new javax.sql.rowset.serial.SerialBlob(file.getBytes());
			
			Submission submission = new Submission();
			submission.setAssignmentId(aid);
			submission.setCourseId(cid);
			submission.setStudentId(sid);
			submission.setSubmittedData(submittedData);
			submission.setSubmissionDate(date);
//			System.out.println(submission);
			return ResponseEntity.status(200).body(service.submitAssignment(submission));
			
			
		} catch (Exception e) { 
			return ResponseEntity.status(500).body("Error : "+e.getMessage());
		}
	}
	
	@GetMapping("/viewstudentcourses")
	public List<Course> viewStudentRegisteredCourses(@RequestParam("id") String sid){
		return service.viewMyCourses(sid);
	}
	
	@GetMapping("/mypendingassignments")
	public List<AssignmentDTO> mypendingAssignments(@RequestParam String id){
		return service.myPendingAssignments(id);
	}
	
	@GetMapping("viewassignment")
	public ResponseEntity<?> viewAssignment(@RequestParam("id") String aid) {
		try {
			return ResponseEntity.status(200).body(service.viewAssignmentByID(aid));
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error : "+e.getMessage());
		}
	}
	
	@GetMapping("/isassignmentsubmitted")
	public String isSubmitted(@RequestParam String sid,@RequestParam String aid) {
		if(service.isAssignmentSubmitted(aid, sid)) {
			return "SUBMITTED";
		}
		else {
			return "NOT SUBMITTED";
		}
	}
	
	@GetMapping("/mysubmissions")
	public List<SubmissionDTO> mysubmissions(@RequestParam("id") String sid){
		return service.mySubmissions(sid);
	}
	
	@GetMapping("/viewstudent")
	public StudentDTO viewStudent(@RequestParam("id") String sid) {
		return service.viewStudentByID(sid);
	}
	
	@PutMapping("/updatestudentprofile")
	public ResponseEntity<?> updateStudentProfile(@RequestParam("profileData") MultipartFile file,@RequestParam("id") String sid) {
		
		try {
			Blob blob = new javax.sql.rowset.serial.SerialBlob(file.getBytes());
			return ResponseEntity.status(200).body(service.updateProfilePicture(sid, blob));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
	
	@GetMapping("getcounts")
	public List<Long> getCounts(@RequestParam("id") String sid){
		return service.getCounts(sid);
	}
	
	@GetMapping("/getdailysubmission")
	public ResponseEntity<?> getSubmissionCounts(@RequestParam("id") String sid){
		try {
			return ResponseEntity.status(200).body(service.getDailySubmissions(sid));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(e.getMessage());
		}
	}
	
	@GetMapping("getsubmission")
	public SubmissionDTO getSubmission(@RequestParam("id") String subid) {
		return service.getSubmission(subid);
	}
	
	@GetMapping("getassignment")
	public AssignmentDTO getAssignment(@RequestParam("id") String aid) {
		return service.getAssignment(aid);
	}
	
	@PutMapping("changepassword")
	public ResponseEntity<?> changePassword(@RequestBody Map<String, String> payload ){
		try {
			String sid = payload.get("sid");
			String oldpwd = payload.get("oldpassword");
			String newpwd = payload.get("newpassword");
			String ip = payload.get("ip");
			LocalDateTime currentTime = LocalDateTime.now();
			String formattedTime = currentTime.format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"));
			String response = service.changePassword(sid, oldpwd, newpwd,formattedTime,ip);
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
}
