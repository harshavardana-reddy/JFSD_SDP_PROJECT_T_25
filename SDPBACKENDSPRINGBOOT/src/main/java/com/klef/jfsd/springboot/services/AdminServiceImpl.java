package com.klef.jfsd.springboot.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.util.ArrayList;

import java.util.ArrayList;import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.sql.rowset.serial.SerialBlob;

import org.hibernate.service.spi.Stoppable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.jfsd.springboot.models.Admin;
import com.klef.jfsd.springboot.models.Assignment;
import com.klef.jfsd.springboot.models.AssignmentDTO;
import com.klef.jfsd.springboot.models.Course;
import com.klef.jfsd.springboot.models.Faculty;
import com.klef.jfsd.springboot.models.FacultyCourseMap;
import com.klef.jfsd.springboot.models.FacultyDTO;
import com.klef.jfsd.springboot.models.Student;
import com.klef.jfsd.springboot.models.StudentCourseMap;
import com.klef.jfsd.springboot.models.StudentDTO;
import com.klef.jfsd.springboot.models.Submission;
import com.klef.jfsd.springboot.repositries.AdminRepository;
import com.klef.jfsd.springboot.repositries.AssignmentRepository;
import com.klef.jfsd.springboot.repositries.CourseRepository;
import com.klef.jfsd.springboot.repositries.FacultyCourseMappingRepository;
import com.klef.jfsd.springboot.repositries.FacultyRepository;
import com.klef.jfsd.springboot.repositries.StudentCourseMappingRepository;
import com.klef.jfsd.springboot.repositries.StudentRepository;
import com.klef.jfsd.springboot.repositries.SubmissionRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository adminRepository;
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
	
	
	
	private byte[] readFileToByteArray(String filePath) throws IOException {
	    File file = new File(filePath);
	    byte[] bytesArray = new byte[(int) file.length()];
	    try (FileInputStream fis = new FileInputStream(file)) {
	        fis.read(bytesArray);
	    }
	    return bytesArray;
	}


	@Override
	public String AddStudent(Student student) {
	    int sid = 100000 + new Random().nextInt(900000);
	    String c_sid = Integer.toString(sid);
	    student.setSid(c_sid);
	    student.setSstatus("ACTIVE");
	    student.setPassword(student.getDob());
	    String filePath = "src/main/resources/noimage.jpg";
	    try {
	        byte[] fileBytes = readFileToByteArray(filePath);
	        Blob blob = new javax.sql.rowset.serial.SerialBlob(fileBytes);
	        student.setSprofile(blob);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "Error setting profile: " + e.getMessage();
	    }
		studentRepository.save(student);
		return "Student Added Succesfully with ID ="+c_sid;
	}

	@Override
	public String AddFaculty(Faculty faculty) {
		int fid = 1000 + new Random().nextInt(9000);
	    String s_fid = Integer.toString(fid);
	    faculty.setFid(s_fid);;
	    faculty.setFstatus("ACTIVE");
	    faculty.setPassword(faculty.getDob());
	    String filePath = "src/main/resources/noimage.jpg";
	    try {
	        byte[] fileBytes = readFileToByteArray(filePath);
	        Blob blob = new SerialBlob(fileBytes);
	        faculty.setFprofile(blob);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return "Error setting profile: " + e.getMessage();
	    }
		facultyRepository.save(faculty);
		return "Faculty Added Succesfully with ID ="+s_fid;
	}

	@Override
	public String AddCourse(Course course) {
		int cid = 100 + new Random().nextInt(900);
//		System.out.println(cid);
		String s_cid = Integer.toString(cid);
		Faculty faculty = facultyRepository.findById(course.getCourseInstructorID()).get();
		course.setCid(s_cid);
		course.setCourseInstructorName(faculty.getFname());
		courseRepository.save(course);
		return "Course Added Succesfully with ID = "+s_cid;
	}

	@Override
	public Student viewStudentByID(String sid) {
		return studentRepository.findById(sid).get();
	}

	@Override
	public Faculty viewFacultyByID(String fid) {
		return facultyRepository.findById(fid).get();
	}

	@Override
	public Course viewCourseByID(String cid) {
		return courseRepository.findById(cid).get();
	}

	@Override
	public List<StudentDTO> viewStudents() {
		List<Student> students = studentRepository.findAll();
	    List<StudentDTO> studentDTOs = new ArrayList<>();

	    for (Student student : students) {
	        StudentDTO dto = new StudentDTO();
	        dto.setSid(student.getSid());
	        dto.setSname(student.getSname());
	        dto.setSemail(student.getSemail());
	        dto.setSdepartment(student.getSdepartment());
	        dto.setScontact(student.getScontact());
	        dto.setDob(student.getDob());
	        dto.setAge(student.getAge());
	        dto.setSstatus(student.getSstatus());

	        // Convert Blob to byte[]
	        try {
	            Blob profileBlob = student.getSprofile();
	            if (profileBlob != null) {
	                int blobLength = (int) profileBlob.length();
	                byte[] profileBytes = profileBlob.getBytes(1, blobLength);
	                dto.setSprofile(profileBytes);
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            dto.setSprofile(null);  // or handle as needed
	        }

	        studentDTOs.add(dto);
	    }

	    return studentDTOs;
	}

	@Override
	public List<FacultyDTO> viewFaculty() {
		List<Faculty> faculties = facultyRepository.findAll();
	    List<FacultyDTO> facultyDTOs = new ArrayList<>();

	    for (Faculty faculty : faculties) {
	        FacultyDTO dto = new FacultyDTO();
	        dto.setFid(faculty.getFid());
	        dto.setFname(faculty.getFname());
	        dto.setFemail(faculty.getFemail());
	        dto.setFdepartment(faculty.getFdepartment());
	        dto.setFcontact(faculty.getFcontact());
	        dto.setDob(faculty.getDob());
	        dto.setAge(faculty.getAge());
	        dto.setFstatus(faculty.getFstatus());

	        // Convert Blob to byte[]
	        try {
	            Blob profileBlob = faculty.getFprofile();
	            if (profileBlob != null) {
	                int blobLength = (int) profileBlob.length();
	                byte[] profileBytes = profileBlob.getBytes(1, blobLength);
	                dto.setFprofile(profileBytes);
	            }
	        } catch (Exception e) {
	            e.printStackTrace();
	            dto.setFprofile(null);  // or handle as needed
	        }

	        facultyDTOs.add(dto);
	    }

	    return facultyDTOs;

	}

	@Override
	public List<Course> viewCourses() {
		return courseRepository.findAll();
	}

	
	@Override
	public String updateStudent(Student student) {
		// TODO Auto-generated method stub
		Student s = studentRepository.findById(student.getSid()).get();
		s.setSname(student.getSname());
		s.setAge(student.getAge());
		s.setDob(student.getDob());
		s.setScontact(student.getScontact());
		s.setSemail(student.getSemail());
		studentRepository.save(s);
		return "Student Updated Succesfully with ID = "+student.getSid();
	}

	@Override
	public String updateCourse(Course course) {
		Course c = courseRepository.findById(course.getCid()).get();
		Faculty faculty = facultyRepository.findById(course.getCourseInstructorID()).get();
		c.setCourseInstructorName(faculty.getFname());
		courseRepository.save(c);
		return "Course Updated Successfully with ID = "+course.getCid();
	}


	@Override
	public Admin checkAdminLogin(Admin admin) {
		Admin a = adminRepository.checkAdminLogin(admin.getUsername(), admin.getPassword());
		return a;
	}


	@Override
	public String mapCourseToStudent(String cid, String sid) {
		StudentCourseMap map = new StudentCourseMap();
		Course course = courseRepository.findById(cid).get();
		Student student = studentRepository.findById(sid).get();
		map.setCid(cid);
		map.setCoursecode(course.getCourseCode());
		map.setCoursesemester(course.getCourseSemester());
		map.setCoursename(course.getCourseName());
		map.setSid(sid);
		map.setSname(student.getSname());
		studentCourseMappingRepository.save(map);
		return "Student Mapping is Successfull with Student ID ="+sid+" and Course ID ="+cid;
	}


	@Override
	public String mapCourseToFaculty(String cid, String fid) {
		
		
		FacultyCourseMap map = new FacultyCourseMap();
		Course course = courseRepository.findById(cid).get();
		Faculty faculty = facultyRepository.findById(fid).get();
		map.setCid(cid);
		map.setCoursecode(course.getCourseCode());
		map.setCoursesemester(course.getCourseSemester());
		map.setCoursename(course.getCourseName());
		map.setFid(fid);
		map.setFname(faculty.getFname());
		facultyCourseMappingRepository.save(map);
		return "Faculty Mapping is Successfull with Faculty ID ="+fid+" and Course ID ="+cid;
	}


	@Override
	public List<Submission> viewCourseSubmissions(String cid) {
		return submissionRepository.findByCourseId(cid);
	}


	@Override
	public List<Assignment> viewCourseAssignments(String cid) {
		// TODO Auto-generated method stub
		return assignmentRepository.findByCourseId(cid);
	}


	@Override
	public List<Submission> viewSubmissions() {
		// TODO Auto-generated method stub
		return submissionRepository.findAll();
	}


	@Override
	public List<AssignmentDTO> viewAssignments() {
	    List<Assignment> assignments = assignmentRepository.findAll();
	    List<AssignmentDTO> assignmentDTOs = new ArrayList<>();
	    
	    for (Assignment assignment : assignments) {
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

	        assignmentDTOs.add(dto);
	    }

	    return assignmentDTOs; 
	}



	@Override
	public List<Course> viewStudentCourses(String sid) {
		List<StudentCourseMap> studentCourseMaps = studentCourseMappingRepository.findBySid(sid);
	    List<Course> courses = new ArrayList<>();
	    for (StudentCourseMap map : studentCourseMaps) {
	        courses.add(courseRepository.findById(map.getCid()).orElse(null));
	    }
	    return courses;
	}


	@Override
	public List<Course> viewFacultyCourses(String fid) {
	    List<FacultyCourseMap> facultyCourseMaps = facultyCourseMappingRepository.findByFid(fid);
	    List<Course> courses = new ArrayList<>();
	    for (FacultyCourseMap map : facultyCourseMaps) {
	        courses.add(courseRepository.findById(map.getCid()).orElse(null));
	    }
	    return courses;
	}


	@Override
	public String changeStudentStatus(String sid) {
		Student student = studentRepository.findById(sid).get();
		if(student.getSstatus().equals("ACTIVE")) {
			studentRepository.changeStatus(sid, "INACTIVE");
			return "Student Status Changed To INACTIVE";
		}
		else {
			studentRepository.changeStatus(sid, "ACTIVE");
			return "Student Status Changed To ACTIVE";
		}
	}


	@Override
	public String changeFacultyStatus(String fid) {
		Faculty faculty = facultyRepository.findById(fid).get();
		if(faculty.getFstatus().equals("ACTIVE")) {
			facultyRepository.changeStatus(fid, "INACTIVE");
			return "Faculty Status Changed To INACTIVE";
		}
		else {
			facultyRepository.changeStatus(fid, "ACTIVE");
			return "Faculty Status Changed To ACTIVE";
		}
	}


	@Override
	public List<StudentDTO> viewCourseRegistedStudents(String cid) {
		List<StudentCourseMap> studentCourseMaps = studentCourseMappingRepository.findByCid(cid);
	    List<StudentDTO> studentDTOs = new ArrayList<>();
	    
	    for (StudentCourseMap map : studentCourseMaps) {
	        Student student = studentRepository.findById(map.getSid()).orElse(null);
	        if (student != null) {
	            StudentDTO dto = new StudentDTO();
	            dto.setSid(student.getSid());
	            dto.setSname(student.getSname());
	            dto.setSemail(student.getSemail());
	            dto.setSdepartment(student.getSdepartment());
	            dto.setScontact(student.getScontact());
	            dto.setDob(student.getDob());
	            dto.setAge(student.getAge());
	            dto.setSstatus(student.getSstatus());

	            // Convert Blob to byte[]
	            try {
	                Blob profileBlob = student.getSprofile();
	                if (profileBlob != null) {
	                    int blobLength = (int) profileBlob.length();
	                    byte[] profileBytes = profileBlob.getBytes(1, blobLength);
	                    dto.setSprofile(profileBytes);
	                }
	            } catch (Exception e) {
	                e.printStackTrace();
	                dto.setSprofile(null);  // or handle as needed
	            }

	            studentDTOs.add(dto);
	        }
	    }
	    return studentDTOs;
	}


	@Override
	public Long courseRegisteredStudentsCount(String cid) {
		List<StudentCourseMap> studentCourseMaps = studentCourseMappingRepository.findByCid(cid);
	    List<StudentDTO> studentDTOs = new ArrayList<>();
	    
	    for (StudentCourseMap map : studentCourseMaps) {
	        Student student = studentRepository.findById(map.getSid()).orElse(null);
	        if (student != null) {
	            StudentDTO dto = new StudentDTO();
	            dto.setSid(student.getSid());
	            dto.setSname(student.getSname());
	            dto.setSemail(student.getSemail());
	            dto.setSdepartment(student.getSdepartment());
	            dto.setScontact(student.getScontact());
	            dto.setDob(student.getDob());
	            dto.setAge(student.getAge());
	            dto.setSstatus(student.getSstatus());

	            // Convert Blob to byte[]
	            try {
	                Blob profileBlob = student.getSprofile();
	                if (profileBlob != null) {
	                    int blobLength = (int) profileBlob.length();
	                    byte[] profileBytes = profileBlob.getBytes(1, blobLength);
	                    dto.setSprofile(profileBytes);
	                }
	            } catch (Exception e) {
	                e.printStackTrace();
	                dto.setSprofile(null);  // or handle as needed
	            }

	            studentDTOs.add(dto);
	        }
	    }
	    return (long)studentDTOs.size();
	}


	@Override
	public boolean isStudentMapped(String sid, String cid) {
		StudentCourseMap map = studentCourseMappingRepository.findByCidAndSid(cid, sid);
		if(map!=null) {
			return true;
		}
		return false;
	}


	@Override
	public boolean isFacultyMapped(String fid, String cid) {
		FacultyCourseMap map = facultyCourseMappingRepository.findByCidAndFid(cid, fid);
		if(map!=null) {
			return true;
		}
		return false;
	}


	@Override
	public boolean isInstrctorToCourse(String cid, String fid) {
		Course course = courseRepository.findByCidAndCourseInstructorID(cid, fid);
		if(course!=null) {
			return true;
		}
		return false;
	}


	@Override
	public String addAssignmentToCourse(Assignment assignment) {
		int id = 100000 + new Random().nextInt(900000);
		Course course = courseRepository.findById(assignment.getCourseId()).get();
		assignment.setAssignmentId(Integer.toString(id));
		assignment.setCourseName(course.getCourseName());
		assignment.setCourseCode(course.getCourseCode());
		assignment.setAccept_submission("YES");
		
		System.out.println(assignment);
		
		assignmentRepository.save(assignment);
		return "Assignment Added To the Course ID"+assignment.getCourseId();
	}


	@Override
	public AssignmentDTO viewAssignmentByID(String id) {
	    Optional<Assignment> assignmentOptional = assignmentRepository.findById(id);
	    
	    if (assignmentOptional.isPresent()) {
	        Assignment assignment = assignmentOptional.get();
	        AssignmentDTO dto = new AssignmentDTO();
	        
	        // Mapping Assignment fields to AssignmentDTO
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
	            dto.setAssignmentQuestionPDF(null);  // or handle as needed
	        }
	        
	        return dto;
	    } else {
	        // Handle the case when the assignment is not found, maybe return null or throw an exception
	        return null;  // You can also throw a custom exception like AssignmentNotFoundException if needed
	    }
	}


	@Override
	public String changeAssignmentStatus(String aid) {
		Assignment assignment = assignmentRepository.findById(aid).get();
		if(assignment.getAccept_submission().equals("YES")) {
			assignmentRepository.changeAssignmentStatus(aid, "NO");
			return "Assignment Doesnt Accept Submissons";
		}
		else {
			assignmentRepository.changeAssignmentStatus(aid, "YES");
			return "Assignment Can Accept Submissions";
		}
	}


	@Override
	public List<Long> getCounts() {
		List<Long> counts = new ArrayList<Long>();
		long studentCount = studentRepository.count();
		long facultyCount = facultyRepository.count();
		long courseCount = courseRepository.count();
		counts.add(studentCount);
		counts.add(facultyCount);
		counts.add(courseCount);
		return counts;
	}

}
