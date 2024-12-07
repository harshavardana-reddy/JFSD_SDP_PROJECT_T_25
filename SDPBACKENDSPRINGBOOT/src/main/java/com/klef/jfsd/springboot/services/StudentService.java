package com.klef.jfsd.springboot.services;

import java.sql.Blob;
import java.util.List;
import java.util.Map;

import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;
import com.klef.jfsd.springboot.models.SubmissionDTO;

public interface StudentService {

	public StudentDTO checkStudentLogin(String username, String password);

	public String submitAssignment(Submission submission);

	public List<Course> viewMyCourses(String sid);

	public List<AssignmentDTO> viewMyAssignments(String cid);

	public boolean isAssignmentSubmitted(String aid, String sid);

	public List<SubmissionDTO> mySubmissions(String sid);

	public List<AssignmentDTO> myPendingAssignments(String sid);

	public AssignmentDTO viewAssignmentByID(String aid);

	public String updateProfilePicture(String sid, Blob profileData);

	public StudentDTO viewStudentByID(String sid);

	public SubmissionDTO mySubmission(String aid, String sid);

	public List<SubmissionDTO> myAssignmentSubmissions(String sid);

	public String editSubmission(Submission submission);
	
	public boolean isAssignmentAcceptingSubmissions(String aid);
	
	public List<Long> getCounts(String sid);
	
	public Map<String, Long> getDailySubmissions(String sid); 
	
	public String changePassword(String sid,String oldpassword,String newpassword,String time,String ip);

	AssignmentDTO getAssignment(String aid);

	SubmissionDTO getSubmission(String subid);
	 
}
