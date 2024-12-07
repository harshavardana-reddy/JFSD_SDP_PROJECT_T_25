package com.klef.jfsd.springboot.repositries;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.klef.jfsd.springboot.models.Assignment;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, String> {
	
	List<Assignment> findByCourseId(String courseId);
	
	@Query("update Assignment a set a.accept_submission = ?2 where a.assignmentId = ?1")
	@Modifying
	@Transactional
	int changeAssignmentStatus(String aid,String status);
	
	

}
