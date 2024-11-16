package com.klef.jfsd.springboot.services;

import java.util.List;

import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.FacultyDTO;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;

public interface FacultyService {
	
	public FacultyDTO checkFacultyLogin(String uname,String password);
	public List<Course> myCourses(String fid);
	public List<Course> myInstructorCourses(String fid);
	
	public List<StudentDTO> viewStudentByID(String sid);
	
	public String evaluateSubmission(Submission submission);
	
	
	public String viewfacultybyID(String fid);
	
	public String uploadAssignments(Assignment assignment);
	
	public String viewUploadedAssignments(String courseId);
	
	
	

}
