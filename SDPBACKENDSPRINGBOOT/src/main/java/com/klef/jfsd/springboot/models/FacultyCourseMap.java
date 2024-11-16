package com.klef.jfsd.springboot.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "facultymappedcourses_table")
@Data
public class FacultyCourseMap {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "refid")
	private int refid;
	@Column(name = "course_id",nullable = false)
	private String cid;
	@Column(name = "course_code",nullable = false)
	private String coursecode;
	@Column(name = "course_name",nullable = false)
	private String coursename;
	@Column(name = "course_semester",nullable = false)
	private String coursesemester;
	@Column(name = "faculty_id",nullable = false)
	private String fid;
	@Column(name = "faculty_name",nullable = false)
	private String fname;

}
