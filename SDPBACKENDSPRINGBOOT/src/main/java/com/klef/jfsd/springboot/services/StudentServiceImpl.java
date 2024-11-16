package com.klef.jfsd.springboot.services;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.hibernate.service.spi.Stoppable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.Student;
import com.klef.jfsd.springboot.models.StudentCourseMap;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;
import com.klef.jfsd.springboot.models.SubmissionDTO;
import com.klef.jfsd.springboot.repositries.AssignmentRepository;
import com.klef.jfsd.springboot.repositries.CourseRepository;
import com.klef.jfsd.springboot.repositries.StudentCourseMappingRepository;
import com.klef.jfsd.springboot.repositries.StudentRepository;
import com.klef.jfsd.springboot.repositries.SubmissionRepository;

@Service
public class StudentServiceImpl implements StudentService{
	
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private SubmissionRepository submissionRepository;
	@Autowired
	private AssignmentRepository assignmentRepository;
	@Autowired
	private StudentCourseMappingRepository studentCourseMappingRepository;

	@Override
	public StudentDTO checkStudentLogin(String username, String password) {
		Student student =studentRepository.checkStudentLogin(username, password);
		if(student==null) {
			return null;
		}
		
		StudentDTO dto = new StudentDTO();
		dto.setAge(student.getAge());
		dto.setDob(student.getDob());
		dto.setScontact(student.getScontact());
		dto.setSdepartment(student.getSdepartment());
		dto.setSemail(student.getSemail());
		dto.setSid(student.getSid());
		dto.setSname(student.getSname());
		dto.setSstatus(student.getSstatus());
		try {
            Blob profileBlob = student.getSprofile();
            if (profileBlob != null) {
                int blobLength = (int) profileBlob.length();
                byte[] profileBytes = profileBlob.getBytes(1, blobLength);
                dto.setSprofile(profileBytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
            dto.setSprofile(null);
        }
		return dto;
	}

	@Override
	public String submitAssignment(Submission submission) {
		int id = 1000000 + new Random().nextInt(9000000);
		String subid = Integer.toString(id);
		
		Assignment assignment = assignmentRepository.findById(submission.getAssignmentId()).get();
		Student student = studentRepository.findById(submission.getStudentId()).get();
		Course course = courseRepository.findById(submission.getCourseId()).get();
		
		submission.setAssignmentName(assignment.getAssignmentName());
		submission.setCourseCode(course.getCourseCode());
		submission.setCourseName(course.getCourseName());
		submission.setReviewStatus("NOT GRADED");
		submission.setStudentName(student.getSname());
		submission.setSubmissionId(subid);
		submission.setMarks(0.0);
//		System.out.println(submission);
		submissionRepository.save(submission);
		return "Assignment Submitted with ID = "+subid;
	}

	
	@Override
	public List<Course> viewMyCourses(String sid) {
		List<StudentCourseMap> studentCourseMaps = studentCourseMappingRepository.findBySid(sid);
	    List<Course> courses = new ArrayList<>();
	    for (StudentCourseMap map : studentCourseMaps) {
	        courses.add(courseRepository.findById(map.getCid()).orElse(null));
	    }
	    return courses;
	}

	@Override
	public List<AssignmentDTO> viewMyAssignments(String cid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAssignmentSubmitted(String aid,String sid) {
		Submission submission = submissionRepository.findByAssignmentIdAndStudentId(aid, sid);
		if(submission!=null) {
			return true;
		}
		return false;
	}

	@Override
	public List<AssignmentDTO> getPendingAssignments(String cid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<SubmissionDTO> mySubmissions(String sid) {
		List<Submission> submissions = submissionRepository.findByStudentId(sid);
		List<SubmissionDTO> dtos = new ArrayList<SubmissionDTO>();
		for(Submission submission:submissions) {
			SubmissionDTO dto = new SubmissionDTO();
            dto.setSubmissionId(submission.getSubmissionId());
            dto.setAssignmentId(submission.getAssignmentId());
            dto.setAssignmentName(submission.getAssignmentName());
            dto.setStudentId(submission.getStudentId());
            dto.setStudentName(submission.getStudentName());
            dto.setCourseId(submission.getCourseId());
            dto.setCourseCode(submission.getCourseCode());
            dto.setCourseName(submission.getCourseName());
            dto.setReviewStatus(submission.getReviewStatus());
            dto.setSubmissionFeedback(submission.getSubmissionFeedback());
            dto.setMarks(submission.getMarks());
            dto.setSubmissionDate(submission.getSubmissionDate());
            dto.setReviewedFacultyId(submission.getReviewedFacultyId());
            dto.setReviewedFacultyName(submission.getReviewedFacultyName());

            try {
            Blob blob = submission.getSubmittedData();
	            if (blob != null) {
	                int blobLength = (int) blob.length();
	                byte[] bytes = blob.getBytes(1, blobLength);
	                dto.setSubmittedData(bytes);
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            dto.setSubmittedData(null);
	        }
            dtos.add(dto);
		}
		System.out.println(dtos.size());
		return dtos;
	}

	@Override
	public List<AssignmentDTO> myPendingAssignments(String sid) {
		List<StudentCourseMap> studentCourseMaps = studentCourseMappingRepository.findBySid(sid);
	    List<AssignmentDTO> pendingAssignments = new ArrayList<>();

	    for (StudentCourseMap map : studentCourseMaps) {
	        String courseId = map.getCid();
	        
	        List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);
	        
	        for (Assignment assignment : assignments) {
	            boolean isSubmitted = isAssignmentSubmitted(assignment.getAssignmentId(), sid);
	            
	            if (!isSubmitted) {
	                // Convert Assignment to AssignmentDTO
	                AssignmentDTO assignmentDTO = new AssignmentDTO();
	                assignmentDTO.setAssignmentId(assignment.getAssignmentId());
	                assignmentDTO.setAssignmentName(assignment.getAssignmentName());
	                assignmentDTO.setCourseId(courseId);
	                assignmentDTO.setDeadlinedate(assignment.getDeadlinedate());
	                assignmentDTO.setAccept_submission(assignment.getAccept_submission());
	                assignmentDTO.setAssignmentQuestion(assignment.getAssignmentQuestion());
	                assignmentDTO.setCourseCode(assignment.getCourseCode());
	                assignmentDTO.setCourseId(assignment.getCourseId());
	                assignmentDTO.setCourseName(assignment.getCourseName());
	                assignmentDTO.setMarks(assignment.getMarks());
	                assignmentDTO.setStartdate(assignment.getStartdate());
	                try {
	    	            Blob blob = assignment.getAssignmentQuestionPDF();
	    	            if (blob != null) {
	    	                int blobLength = (int) blob.length();
	    	                byte[] bytes = blob.getBytes(1, blobLength);
	    	                assignmentDTO.setAssignmentQuestionPDF(bytes);
	    	            }
	    	        } catch (Exception e) {
	    	            e.printStackTrace();
	    	           assignmentDTO.setAssignmentQuestionPDF(null);  // or handle as needed
	    	        }
//	                System.out.println(assignment.toString());
	                pendingAssignments.add(assignmentDTO);
	            }
	        }
	    }
	    return pendingAssignments;
	}

	@Override
	public AssignmentDTO viewAssignmentByID(String aid) {
		Assignment assignment = assignmentRepository.findById(aid).get();
		AssignmentDTO dto = new AssignmentDTO();
		dto.setAssignmentId(assignment.getAssignmentId());
        dto.setAssignmentName(assignment.getAssignmentName());
        dto.setAssignmentQuestion(assignment.getAssignmentQuestion());
        dto.setCourseId(assignment.getCourseId());
        dto.setMarks(assignment.getMarks());
        dto.setCourseName(assignment.getCourseName());
        dto.setCourseCode(assignment.getCourseCode());
        dto.setStartdate(assignment.getStartdate());
        dto.setDeadlinedate(assignment.getDeadlinedate());
        dto.setAccept_submission(assignment.getAccept_submission());
        
        // Handling the Blob for PDF
        try {
            Blob blob = assignment.getAssignmentQuestionPDF();
            if (blob != null) {
                int blobLength = (int) blob.length();
                byte[] bytes = blob.getBytes(1, blobLength);
                dto.setAssignmentQuestionPDF(bytes);
            }
        } catch (Exception e) {
            e.printStackTrace();
            dto.setAssignmentQuestionPDF(null); 
        }
        
		
		return dto;
	}

	@Override
	public String updateProfilePicture(String sid, Blob profileData) {
		Student student = studentRepository.findById(sid).get();
		if(student!=null) {
			student.setSprofile(profileData);
			studentRepository.save(student);
			return "Student Profile Update Success!";
		}
		else {
			return "Student NOT FOUND!";
		}
	}

	@Override
	public StudentDTO viewStudentByID(String sid) {
		Student student = studentRepository.findById(sid).get();
		StudentDTO dto = new StudentDTO();
		dto.setAge(student.getAge());
		dto.setDob(student.getDob());
		dto.setScontact(student.getScontact());
		dto.setSdepartment(student.getSdepartment());
		dto.setSemail(student.getSemail());
		dto.setSid(student.getSid());
		dto.setSname(student.getSname());
		dto.setSstatus(student.getSstatus());
		
		try {
			Blob blob = student.getSprofile();
			if(blob!=null) {
				int blobLength = (int) blob.length();
                byte[] bytes = blob.getBytes(1, blobLength);
                dto.setSprofile(bytes);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.setSprofile(null);
		}
		
		return dto;
	}

}
