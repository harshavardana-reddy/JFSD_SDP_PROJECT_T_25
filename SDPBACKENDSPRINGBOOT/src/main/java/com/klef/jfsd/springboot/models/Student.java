package com.klef.jfsd.springboot.models;

import java.sql.Blob;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "student_table")
@Data
public class Student {
	
	@Id
	@Column(name = "student_id")
	private String sid;
	@Column(name = "student_name",nullable = false)
	private String sname;
	@Column(name = "student_email",unique = true,nullable = false)
	private String semail;
	@Column(name = "student_department",nullable = false)
	private String sdepartment;
	@Column(name = "student_password",nullable = false)
	private String password;
	@Column(name = "student_contact",unique = true,nullable = false)
	private String scontact;
	@Column(name = "student_dob",nullable = false)
	private String dob;
	@Column(name = "student_age",nullable = false)
	private double age;
	@JsonIgnore
	@Column(name = "student_profile")
	private Blob sprofile;
	@Column(name = "student_status",nullable = false)
	private String sstatus;
	@Column(name = "student_gender",nullable = false)
	private String gender;

}
