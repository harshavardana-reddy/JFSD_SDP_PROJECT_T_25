package com.klef.jfsd.springboot.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.springboot.models.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, String> {
	List<Submission> findByCourseId(String courseId);
	
	Submission findByAssignmentIdAndStudentId(String assignmentId, String studentId);
	
	List<Submission> findByStudentId(String studentId);
}
