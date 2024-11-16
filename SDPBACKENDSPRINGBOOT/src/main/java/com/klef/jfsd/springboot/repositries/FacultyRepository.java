package com.klef.jfsd.springboot.repositries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.klef.jfsd.springboot.models.Faculty;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, String> {
	
	@Query("select f from Faculty f where f.fid=?1 and f.password=?2")
	Faculty checkFacultyLogin(String fid,String password);
	
	@Query("update Faculty f set f.fstatus=?2where f.fid=?1")
	@Modifying
	@Transactional
	int changeStatus(String fid,String status);

}
