package com.klef.jfsd.springboot.services;

import java.sql.Blob;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.klef.jfsd.springboot.models.SubmissionDTO;
import com.klef.jfsd.springboot.repositries.AssignmentRepository;
import com.klef.jfsd.springboot.repositries.CourseRepository;
import com.klef.jfsd.springboot.repositries.FacultyCourseMappingRepository;
import com.klef.jfsd.springboot.repositries.FacultyRepository;
import com.klef.jfsd.springboot.repositries.StudentCourseMappingRepository;
import com.klef.jfsd.springboot.repositries.StudentRepository;
import com.klef.jfsd.springboot.repositries.SubmissionRepository;
import com.klef.jfsd.springboot.utils.MailUtil;

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
	@Autowired
	private MailUtil mailUtil;

	@Override
	public FacultyDTO checkFacultyLogin(String uname, String password) {
		FacultyDTO dto = new FacultyDTO();
		Faculty faculty = facultyRepository.checkFacultyLogin(uname, password);
		if(faculty == null) {
			return null;
		}
		dto.setAge(faculty.getAge());
		dto.setDob(faculty.getDob());
		dto.setFcontact(faculty.getFcontact());
		dto.setFdepartment(faculty.getFdepartment());
		dto.setFemail(faculty.getFemail());
		dto.setFid(faculty.getFid());
		dto.setFname(faculty.getFname());
		dto.setFstatus(faculty.getFstatus());
		dto.setGender(faculty.getGender());	
		try {
			Blob blob = faculty.getFprofile();
			if (blob != null) {
				int bloblength = (int) blob.length();
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
		System.out.println(courses.getFirst());
		return courses;
	}

	@Override
	public List<Course> myInstructorCourses(String fid) {
		return courseRepository.findByCourseInstructorID(fid);
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
		dto.setGender(student.getGender());
		try {
			Blob blob = student.getSprofile();
			if (blob != null) {
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

	@Override
	public FacultyDTO viewfacultybyID(String fid) {
		Faculty faculty = facultyRepository.findById(fid).get();
		FacultyDTO dto = new FacultyDTO();
		dto.setAge(faculty.getAge());
		dto.setDob(faculty.getDob());
		dto.setFcontact(faculty.getFcontact());
		dto.setFdepartment(faculty.getFdepartment());
		dto.setFemail(faculty.getFemail());
		dto.setFid(faculty.getFid());
		dto.setFname(faculty.getFname());
		dto.setFstatus(faculty.getFstatus());
		dto.setGender(faculty.getGender());	
		try {
			Blob blob = faculty.getFprofile();
			if (blob != null) {
				int blobLength = (int) blob.length();
				byte[] bytes = blob.getBytes(1, blobLength);
				dto.setFprofile(bytes);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.setFprofile(null);
		}
		return dto;
	}

	@Override
	public String uploadAssignments(Assignment assignment) {
		int id = 100000 + new Random().nextInt(900000);
		Course course = courseRepository.findById(assignment.getCourseId()).get();
		assignment.setAssignmentId(Integer.toString(id));
		assignment.setCourseName(course.getCourseName());
		assignment.setCourseCode(course.getCourseCode());
		assignment.setAccept_submission("YES");
		assignment.setEditStatus("YES");

//		System.out.println(assignment);

		assignmentRepository.save(assignment);
		return "Assignment Added To the Course ID " + assignment.getCourseId();
	}

	@Override
	public List<AssignmentDTO> viewUploadedAssignments(String courseId) {
		List<Assignment> assignments = assignmentRepository.findByCourseId(courseId);
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
			dto.setEditStatus(assignment.getEditStatus());

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
	public String evaluateSubmission(String subId, String feedback, String marks,String fid) {
		
		Submission submission = submissionRepository.findById(subId).get();
		Course course = courseRepository.findByCidAndCourseInstructorID(submission.getCourseId(), fid);
		if(course!=null||submission.getReviewedFacultyId().equals(fid)){
			submission.setMarks(Double.parseDouble(marks));
			submission.setSubmissionFeedback(feedback);
			submission.setReviewStatus("GRADED");
			submissionRepository.save(submission);
			Student student = studentRepository.findById(submission.getStudentId()).get();
			mailUtil.sendSubmissionEvaluatedMail(student.getSemail(), student.getSname(), submission.getAssignmentName(), submission.getReviewStatus());
			return "Submission Evaluated Successfully";
		}else {
			return "You are not Allowed to grade the submission"; 
		}
		
		
	}

	@Override
	public List<Course> studentCourses(String sid) {
		List<StudentCourseMap> studentCourseMaps = studentCourseMappingRepository.findBySid(sid);
		List<Course> courses = new ArrayList<>();
		for (StudentCourseMap map : studentCourseMaps) {
			courses.add(courseRepository.findById(map.getCid()).orElse(null));
		}
		return courses;
	}

	@Override
	public Course getCourse(String cid) {
		return courseRepository.findById(cid).get();
	}

	@Override
	public List<SubmissionDTO> getSubmissions(String aid) {
		List<Submission> submissions = submissionRepository.findByAssignmentId(aid);
		List<SubmissionDTO> dtos = new ArrayList<SubmissionDTO>();
		for (Submission submission : submissions) {
			SubmissionDTO dto = new SubmissionDTO();
			dto.setAssignmentId(submission.getAssignmentId());
			dto.setAssignmentName(submission.getAssignmentName());
			dto.setCourseCode(submission.getCourseCode());
			dto.setCourseId(submission.getCourseId());
			dto.setCourseName(submission.getCourseName());
			dto.setMarks(submission.getMarks());
			dto.setReviewedFacultyId(submission.getReviewedFacultyId());
			dto.setReviewedFacultyName(submission.getReviewedFacultyName());
			dto.setReviewStatus(submission.getReviewStatus());
			dto.setStudentId(submission.getStudentId());
			dto.setStudentName(submission.getStudentName());
			dto.setSubmissionDate(submission.getSubmissionDate());
			dto.setSubmissionFeedback(submission.getSubmissionFeedback());
			dto.setSubmissionId(submission.getSubmissionId());
			try {
				Blob blob = submission.getSubmittedData();
				if (blob != null) {
					int blobLength = (int) blob.length();
					byte[] bytes = blob.getBytes(1, blobLength);
					dto.setSubmittedData(bytes);
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
				dto.setSubmittedData(null);
			}
			dtos.add(dto);
		}
		return dtos;
	}

	@Override
	public SubmissionDTO getSubmission(String subid) {
		System.out.println(subid);
		SubmissionDTO dto = new SubmissionDTO();
		Submission submission = submissionRepository.findById(subid).get();
		dto.setAssignmentId(submission.getAssignmentId());
		dto.setAssignmentName(submission.getAssignmentName());
		dto.setCourseCode(submission.getCourseCode());
		dto.setCourseId(submission.getCourseId());
		dto.setCourseName(submission.getCourseName());
		dto.setMarks(submission.getMarks());
		dto.setReviewedFacultyId(submission.getReviewedFacultyId());
		dto.setReviewedFacultyName(submission.getReviewedFacultyName());
		dto.setReviewStatus(submission.getReviewStatus());
		dto.setStudentId(submission.getStudentId());
		dto.setStudentName(submission.getStudentName());
		dto.setSubmissionDate(submission.getSubmissionDate());
		dto.setSubmissionFeedback(submission.getSubmissionFeedback());
		dto.setSubmissionId(submission.getSubmissionId());
		try {
			Blob blob = submission.getSubmittedData();
			if (blob != null) {
				int blobLength = (int) blob.length();
				byte[] bytes = blob.getBytes(1, blobLength);
				dto.setSubmittedData(bytes);
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			dto.setSubmittedData(null);
		}
		return dto;
	}

	@Override
	public AssignmentDTO getAssignment(String aid) {
		System.out.println(aid);
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
		dto.setEditStatus(assignment.getEditStatus());

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
					dto.setSprofile(null); // or handle as needed
				}

				studentDTOs.add(dto);
			}
		}
		return (long) studentDTOs.size();
	}

	@Override
	public List<Long> getCounts(String fid) {
		List<Long> counts = new ArrayList<Long>();
		List<FacultyCourseMap> facultyCourseMaps = facultyCourseMappingRepository.findByFid(fid);
		List<Course> courses = new ArrayList<>();
		for (FacultyCourseMap map : facultyCourseMaps) {
			courses.add(courseRepository.findById(map.getCid()).orElse(null));
		}
		System.out.println(courses.getFirst());
		List<Course> instructorCourses = courseRepository.findByCourseInstructorID(fid);
		
		counts.add((long)facultyCourseMaps.size());
//		System.out.println(courses.getFirst());
//		System.out.println((long)courses.size());
		counts.add((long)instructorCourses.size());
		long pending = submissionRepository.countByReviewedFacultyIdAndReviewStatus(fid, "NOT GRADED");
		long completed = submissionRepository.countByReviewedFacultyIdAndReviewStatus(fid, "GRADED");
		counts.add(pending);
		counts.add(completed);
		System.out.println(pending+","+completed);
		System.out.println(facultyCourseMaps.getFirst());
		return counts;
	}

	@Override
	public String changePassword(String fid, String oldpassword,String newpassword,String time,String ip) {
		Faculty faculty = facultyRepository.findById(fid).get();
		String msg = "";
		if(faculty.getPassword().equals(oldpassword)) {
			faculty.setPassword(newpassword);
			facultyRepository.save(faculty);
			
			msg = "Password Updated Succesfully";
			mailUtil.sendPasswordChangeMail(faculty.getFemail(),faculty.getFname(), time,ip);
		}
		else {
			msg = "Given old Password is Wrong!";
		}
		return msg;
	}

	@Override
	public List<SubmissionDTO> getSubmissionsToBeEvaluated(String aid,String fid) {
		List<Submission> submissions = submissionRepository.findByAssignmentIdAndReviewedFacultyId(aid,fid);
		List<SubmissionDTO> dtos = new ArrayList<SubmissionDTO>();
		for (Submission submission : submissions) {
			SubmissionDTO dto = new SubmissionDTO();
			dto.setAssignmentId(submission.getAssignmentId());
			dto.setAssignmentName(submission.getAssignmentName());
			dto.setCourseCode(submission.getCourseCode());
			dto.setCourseId(submission.getCourseId());
			dto.setCourseName(submission.getCourseName());
			dto.setMarks(submission.getMarks());
			dto.setReviewedFacultyId(submission.getReviewedFacultyId());
			dto.setReviewedFacultyName(submission.getReviewedFacultyName());
			dto.setReviewStatus(submission.getReviewStatus());
			dto.setStudentId(submission.getStudentId());
			dto.setStudentName(submission.getStudentName());
			dto.setSubmissionDate(submission.getSubmissionDate());
			dto.setSubmissionFeedback(submission.getSubmissionFeedback());
			dto.setSubmissionId(submission.getSubmissionId());
			try {
				Blob blob = submission.getSubmittedData();
				if (blob != null) {
					int blobLength = (int) blob.length();
					byte[] bytes = blob.getBytes(1, blobLength);
					dto.setSubmittedData(bytes);
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
				dto.setSubmittedData(null);
			}
			dtos.add(dto);
		}
		return dtos;
	}
	
	@Override
	public String updateProfilePicture(String sid, Blob profileData) {
		Faculty faculty = facultyRepository.findById(sid).get();
		if (faculty != null) {
			faculty.setFprofile(profileData);
			facultyRepository.save(faculty);
			return "Faculty Profile Update Success!";
		} else {
			return "Faculty NOT FOUND!";
		}
	}

	@Override
	public String deleteAssignment(String fid, String aid) {
		Assignment assignment = assignmentRepository.findById(aid).get();
		Course course = courseRepository.findByCidAndCourseInstructorID(assignment.getCourseId(), fid);
		if(course != null) {
			assignmentRepository.delete(assignment);
			return "ASSIGNMENT DELETED SUCCESFULLY";
		}
		return "YOUR NOT ALLOWED TO DELETE ASSIGNMENT";
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
				dto.setGender(student.getGender());
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
					dto.setSprofile(null); // or handle as needed
				}

				studentDTOs.add(dto);
			}
		}
		return studentDTOs;
	}

	@Override
	public List<SubmissionDTO> getAllStudentSubmissions(String aid) {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	
	
	

}
