package com.klef.jfsd.springboot.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
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

import com.klef.jfsd.springboot.models.Admin;
import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.Faculty;
import com.klef.jfsd.springboot.models.Student;
import com.klef.jfsd.springboot.repositries.CourseRepository;
import com.klef.jfsd.springboot.services.AdminService;

@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "*")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@PostMapping("checkadminlogin")
	public ResponseEntity<?> checkAdminLogin(@RequestBody Admin admin) {
		try {
			// System.out.println(admin);
			Admin response = adminService.checkAdminLogin(admin);
			if (response == null) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Admin User is Found");
			}
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in Login: " + e.getMessage());
		}
	}

	@PostMapping("/addstudent")
	public ResponseEntity<String> addStudent(@RequestBody Student student) {
		try {
			String response = adminService.AddStudent(student);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding student: " + e.getMessage());
		}
	}

	@GetMapping("/viewstudents")
	public ResponseEntity<?> viewAllStudent() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(adminService.viewStudents());
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error Fetching Students : " + e.getMessage());
		}
	}

	@GetMapping("/viewfaculties")
	public ResponseEntity<?> viewFaculties() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(adminService.viewFaculty());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error Fetching faculty : " + e.getMessage());
		}
	}

	@PostMapping("/addfaculty")
	public ResponseEntity<String> addFaculty(@RequestBody Faculty faculty) {
		try {
			String response = adminService.AddFaculty(faculty);
			return ResponseEntity.status(HttpStatus.OK).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding Faculty: " + e.getMessage());
		}
	}

	@PutMapping("/updatestudent")
	public ResponseEntity<?> updateStudent(Student student) {
		try {
			return ResponseEntity.status(200).body(adminService.updateStudent(student));
		} catch (Exception e) {
			return ResponseEntity.status(400).body("Error updating student" + e.getMessage());
		}
	}

	@PostMapping("/addcourse")
	public ResponseEntity<?> addCourse(@RequestBody Course course) {
//		System.out.println(course);
		try {

			String response = adminService.AddCourse(course);
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}
	}

	@GetMapping("/viewcourses")
	public ResponseEntity<?> viewCourses() {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(adminService.viewCourses());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error Fetching Courses : " + e.getMessage());
		}
	}

	@GetMapping("/registerdcount")
	public Long courseRegisteredCount(@RequestParam("id") String cid) {
		return adminService.courseRegisteredStudentsCount(cid);
	}

	@PostMapping("/mapcoursetostudent")
	public ResponseEntity<?> mapCourseStudent(@RequestBody Map<String, String> payload) {
		try {
			String sid = payload.get("sid");
			String cid = payload.get("cid");
			if(!adminService.isStudentMapped(sid, cid)) {
				return ResponseEntity.status(200).body(adminService.mapCourseToStudent(cid, sid));
			}
			return ResponseEntity.status(400).body("Student Already Mapped to the Course");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in Mapping : " + e.getMessage());
		}
	}
	
	@PostMapping("/mapcoursetofaculty")
	public ResponseEntity<?> mapCourseFaculty(@RequestBody Map<String, String> payload) {
		try {
			String fid = payload.get("fid");
			String cid = payload.get("cid");
			
//			if(adminService.isInstrctorToCourse(cid, fid)) {
//				return ResponseEntity.status(400).body("The faculty member cannot be mapped to the selected course because they are already an instructor for that course.");
//			}
			
			
			if(!adminService.isFacultyMapped(fid, cid)) {
				
				return ResponseEntity.status(200).body(adminService.mapCourseToFaculty(cid, fid));
			}
			
			return ResponseEntity.status(400).body("Faculty Already Mapped to the Course");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in Mapping : " + e.getMessage());
		}
	}
	
	@GetMapping("/viewstudentcourses")
	public List<Course> viewStudentRegisteredCourses(@RequestParam("id") String sid){
		return adminService.viewStudentCourses(sid);
	}
	
	@GetMapping("/viewfacultycourses")
	public List<Course> viewFacultyRegisteredCourses(@RequestParam("id") String fid){
		return adminService.viewFacultyCourses(fid);
	}
	
	@PostMapping("/uploadassignment")
	public ResponseEntity<?> uploadAssignment( @RequestParam("assignmentName") String assignmentName,
            @RequestParam("assignmentQuestion") String assignmentQuestion,
            @RequestParam("assignmentQuestionPDF") MultipartFile assignmentQuestionPDF,
            @RequestParam("courseId") String courseId,
            @RequestParam("marks") double marks,
            @RequestParam("startdate") String startdate,
            @RequestParam("deadlinedate") String deadlinedate) {
        
        try {
            Assignment assignment = new Assignment();
            assignment.setAssignmentName(assignmentName);
            assignment.setAssignmentQuestion(assignmentQuestion);
            assignment.setAssignmentQuestionPDF(new javax.sql.rowset.serial.SerialBlob(assignmentQuestionPDF.getBytes())); // convert MultipartFile to Blob
            assignment.setCourseId(courseId);
            assignment.setMarks(marks);
            assignment.setStartdate(startdate);
            assignment.setDeadlinedate(deadlinedate);

            String result = adminService.addAssignmentToCourse(assignment);
            System.out.println(assignment);
            //String result = "Success";
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading assignment: " + e.getMessage());
        }
    }
	
	@GetMapping("viewallassignments")
	public List<AssignmentDTO> viewAllAssignments(){
		return adminService.viewAssignments();
	}
	
	@GetMapping("fetchassignment")
	public AssignmentDTO fetchAssignmentByID(@RequestParam String id) {
		return adminService.viewAssignmentByID(id);
	}
	
	@PutMapping("changeassignmentstatus")
	public ResponseEntity<?> changeAssignmentStatus(@RequestParam("id") String aid){
		try {
			return ResponseEntity.status(200).body(adminService.changeAssignmentStatus(aid));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error : " + e.getMessage());
		}
	}
	
	@GetMapping("/getcounts")
	public List<Long> getCounts() {
		return adminService.getCounts();
	}
	
}
