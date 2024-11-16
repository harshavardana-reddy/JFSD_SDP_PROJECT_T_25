package com.klef.jfsd.springboot.repositries;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.jfsd.springboot.models.Student;
import com.klef.jfsd.springboot.models.StudentCourseMap;
import java.util.List;


public interface StudentCourseMappingRepository extends JpaRepository<StudentCourseMap, Integer> {
	List<StudentCourseMap> findBySid(String sid);
	List<StudentCourseMap> findBySidAndCoursecode(String sid, String coursecode);
	List<StudentCourseMap> findByCid(String cid);
	StudentCourseMap findByCidAndSid(String cid, String sid);
}
