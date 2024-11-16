package com.klef.jfsd.springboot.services;

import java.sql.Blob;
import java.util.List;

import org.springframework.stereotype.Service;

import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.Student;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;
import com.klef.jfsd.springboot.models.SubmissionDTO;


public interface StudentService {
	
	public StudentDTO checkStudentLogin(String username,String password);
	public String submitAssignment(Submission submission);
	public List<Course> viewMyCourses(String sid);
	public List<AssignmentDTO> viewMyAssignments(String cid);
	
	public boolean isAssignmentSubmitted(String aid,String sid);
	
	public List<AssignmentDTO> getPendingAssignments(String cid);
	
	public List<SubmissionDTO> mySubmissions(String sid);
	
	public List<AssignmentDTO> myPendingAssignments(String sid);
	
	public AssignmentDTO viewAssignmentByID(String aid);
	
	public String updateProfilePicture(String sid,Blob profileData);
	
	public StudentDTO viewStudentByID(String sid);
	
}
