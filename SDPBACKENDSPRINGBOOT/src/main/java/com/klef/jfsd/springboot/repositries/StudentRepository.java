package com.klef.jfsd.springboot.repositries;

import java.util.List;
import java.util.Map;

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
	
	@Query("update Student s set s.sstatus=?2 where s.sid=?1")
	@Modifying
	@Transactional
	int changeStatus(String sid,String status);
	
	@Query("SELECT s.sdepartment AS department, COUNT(s) AS count FROM Student s GROUP BY s.sdepartment")
    List<Map<String, Object>> countByDepartment();

    // Count students by gender
    @Query("SELECT s.gender AS gender, COUNT(s) AS count FROM Student s GROUP BY s.gender")
    List<Map<String, Object>> countByGender();
	
	

}
