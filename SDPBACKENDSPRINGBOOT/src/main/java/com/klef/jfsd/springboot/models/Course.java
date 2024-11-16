package com.klef.jfsd.springboot.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "course_table")
@Data
public class Course {
	
	@Id
	@Column(name = "course_id")
	private String cid;
	@Column(name = "course_code",nullable = false,unique = true)
	private String courseCode;
	@Column(name = "course_name",nullable = false)
	private String courseName;
	@Column(name = "course_department",nullable = false)
	private String courseDepartment;
	@Column(name = "course_semester",nullable = false)
	private String courseSemester;
	@Column(name = "course_academicyear",nullable = false)
	private String academicyear;
	@Column(name = "course_instrctor_id",nullable = false)
	private String courseInstructorID;
	@Column(name = "course_instractor_name",nullable = false)
	private String courseInstructorName;
	

}
