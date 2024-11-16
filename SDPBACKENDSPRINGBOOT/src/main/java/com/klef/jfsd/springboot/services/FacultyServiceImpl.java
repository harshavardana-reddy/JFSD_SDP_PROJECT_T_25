package com.klef.jfsd.springboot.services;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.service.spi.Stoppable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.Faculty;
import com.klef.jfsd.springboot.models.FacultyCourseMap;
import com.klef.jfsd.springboot.models.FacultyDTO;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;
import com.klef.jfsd.springboot.repositries.AssignmentRepository;
import com.klef.jfsd.springboot.repositries.CourseRepository;
import com.klef.jfsd.springboot.repositries.FacultyCourseMappingRepository;
import com.klef.jfsd.springboot.repositries.FacultyRepository;
import com.klef.jfsd.springboot.repositries.StudentCourseMappingRepository;
import com.klef.jfsd.springboot.repositries.StudentRepository;
import com.klef.jfsd.springboot.repositries.SubmissionRepository;

@Service
public class FacultyServiceImpl implements FacultyService {
	
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private FacultyRepository facultyRepository;
	@Autowired
	private CourseRepository courseRepository;
	@Autowired
	private SubmissionRepository submissionRepository;
	@Autowired
	private AssignmentRepository assignmentRepository;
	@Autowired
	private StudentCourseMappingRepository studentCourseMappingRepository;
	@Autowired
	private FacultyCourseMappingRepository facultyCourseMappingRepository;

	@Override
	public FacultyDTO checkFacultyLogin(String uname, String password) {
		FacultyDTO dto = new FacultyDTO();
		Faculty faculty = facultyRepository.checkFacultyLogin(uname, password);
		dto.setAge(faculty.getAge());
		dto.setDob(faculty.getDob());
		dto.setFcontact(faculty.getFcontact());
		dto.setFdepartment(faculty.getFdepartment());
		dto.setFemail(faculty.getFemail());
		dto.setFid(faculty.getFid());
		dto.setFname(faculty.getFname());
		dto.setFstatus(faculty.getFstatus());
		try {
			Blob blob = faculty.getFprofile();
			if(blob!=null) {
				int bloblength = (int)blob.length();
				byte[] bytes = blob.getBytes(1, bloblength);
				dto.setFprofile(bytes);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.setFprofile(null);
		}
		return dto;
	}

	@Override
	public List<Course> myCourses(String fid) {
		List<FacultyCourseMap> facultyCourseMaps = facultyCourseMappingRepository.findByFid(fid);
	    List<Course> courses = new ArrayList<>();
	    for (FacultyCourseMap map : facultyCourseMaps) {
	        courses.add(courseRepository.findById(map.getCid()).orElse(null));
	    }
	    return courses;
	}

	@Override
	public List<Course> myInstructorCourses(String fid) {
		return courseRepository.findByCourseInstructorID(fid);
	}

	@Override
	public List<StudentDTO> viewStudentByID(String sid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String evaluateSubmission(Submission submission) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String viewfacultybyID(String fid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String uploadAssignments(Assignment assignment) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String viewUploadedAssignments(String courseId) {
		// TODO Auto-generated method stub
		return null;
	}

}
