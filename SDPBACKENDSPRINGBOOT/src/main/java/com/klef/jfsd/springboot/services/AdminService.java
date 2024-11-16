package com.klef.jfsd.springboot.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.klef.jfsd.springboot.models.Admin;
import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.Faculty;
import com.klef.jfsd.springboot.models.FacultyDTO;
import com.klef.jfsd.springboot.models.Student;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;

public interface AdminService {
	
	public Admin checkAdminLogin(Admin admin);
	
	public String AddStudent(Student student);
	public String AddFaculty(Faculty faculty);
	public String AddCourse(Course course);
	
	public Student viewStudentByID(String sid);
	public Faculty viewFacultyByID(String fid);
	public Course viewCourseByID(String cid);
	
	public List<StudentDTO> viewStudents();
	public List<FacultyDTO> viewFaculty();
	public List<Course> viewCourses();
	
	public List<Submission> viewSubmissions();
	public List<AssignmentDTO> viewAssignments();
	
	public String mapCourseToStudent(String cid,String sid);
	public String mapCourseToFaculty(String cid,String fid);
	
	public String updateStudent(Student student);
	public String updateCourse(Course Course);
	
	public List<Submission> viewCourseSubmissions(String cid);
	public List<Assignment> viewCourseAssignments(String cid);
	
	
	public List<Course> viewStudentCourses(String sid);
	public List<Course> viewFacultyCourses(String fid);
	
	
	public String changeStudentStatus(String sid);
	public String changeFacultyStatus(String fid);
	
	
	public List<StudentDTO> viewCourseRegistedStudents(String cid);
	
	public Long courseRegisteredStudentsCount(String cid);
	
	public boolean isStudentMapped(String sid,String cid);
	public boolean isFacultyMapped(String fid,String cid);
	
	public boolean isInstrctorToCourse(String cid,String fid);
	
	
	public String addAssignmentToCourse(Assignment assignment);
	
	public AssignmentDTO viewAssignmentByID(String id);
	
	
	public String changeAssignmentStatus(String aid);
	
	public List<Long> getCounts();
	

}
