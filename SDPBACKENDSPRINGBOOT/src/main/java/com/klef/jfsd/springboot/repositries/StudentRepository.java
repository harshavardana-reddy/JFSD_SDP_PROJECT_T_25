package com.klef.jfsd.springboot.repositries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.klef.jfsd.springboot.models.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
	
	@Query("select s from Student s where s.sid=?1 and s.password=?2")
	Student checkStudentLogin(String sid,String password);
	
	@Query("update Student s set s.sstatus=?2where s.sid=?1")
	@Modifying
	@Transactional
	int changeStatus(String sid,String status);
	
	

}
