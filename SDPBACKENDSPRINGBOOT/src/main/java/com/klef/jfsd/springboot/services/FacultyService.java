package com.klef.jfsd.springboot.services;

import java.sql.Blob;
import java.util.List;

import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.FacultyDTO;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.SubmissionDTO;

public interface FacultyService {
	
	public FacultyDTO checkFacultyLogin(String uname,String password);
	public List<Course> myCourses(String fid);
	public Course getCourse(String cid);
	public List<Course> myInstructorCourses(String fid);
	public StudentDTO viewStudentByID(String sid);
	public String evaluateSubmission(String subId,String feedback,String marks,String fid);
	public FacultyDTO viewfacultybyID(String fid);
	public String uploadAssignments(Assignment assignment);
	public List<AssignmentDTO> viewUploadedAssignments(String courseId);
	public List<Course> studentCourses(String sid);
	public List<SubmissionDTO> getSubmissions(String aid);
	public SubmissionDTO getSubmission(String subid);
	public AssignmentDTO getAssignment(String aid);
	public Long courseRegisteredStudentsCount(String cid);
	public List<Long> getCounts(String fid);
	public String changePassword(String fid,String oldpassword,String newpassword,String ip,String time);
	public List<SubmissionDTO> getSubmissionsToBeEvaluated(String aid,String fid);
	public String updateProfilePicture(String fid, Blob profileData);
	public String deleteAssignment(String fid,String aid);
	public List<SubmissionDTO> getAllStudentSubmissions(String aid);
	List<StudentDTO> viewCourseRegistedStudents(String cid);
}
