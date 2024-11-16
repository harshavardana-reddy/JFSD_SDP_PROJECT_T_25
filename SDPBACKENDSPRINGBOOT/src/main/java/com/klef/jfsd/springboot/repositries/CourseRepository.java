package com.klef.jfsd.springboot.repositries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.springboot.models.Course;
import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<Course, String>{
	
	Course findByCidAndCourseInstructorID(String cid, String courseInstructorID);
	
	List<Course> findByCourseInstructorID(String courseInstructorID);

}
