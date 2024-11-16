package com.klef.jfsd.springboot.repositries;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.jfsd.springboot.models.FacultyCourseMap;
import com.klef.jfsd.springboot.models.StudentCourseMap;

import java.util.List;


public interface FacultyCourseMappingRepository extends JpaRepository<FacultyCourseMap, Integer> {
	
	List<FacultyCourseMap> findByFid(String fid);
	List<FacultyCourseMap> findByFidAndCoursecode(String fid, String coursecode);
	FacultyCourseMap findByCidAndFid(String cid, String fid);

}
