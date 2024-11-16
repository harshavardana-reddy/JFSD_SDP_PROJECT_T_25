package com.klef.jfsd.springboot.models;

import java.sql.Blob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "faculty_table")
@Data
public class Faculty {
	
	@Id
	@Column(name = "faculty_id")
	private String fid;
	@Column(name = "faculty_name",nullable = false)
	private String fname;
	@Column(name = "faculty_email",unique = true,nullable = false)
	private String femail;
	@Column(name = "faculty_department",nullable = false)
	private String fdepartment;
	@Column(name = "faculty_password",nullable = false)
	private String password;
	@Column(name = "faculty_contact",unique = true,nullable = false)
	private String fcontact;
	@Column(name = "faculty_dob",nullable = false)
	private String dob;
	@Column(name = "faculty_age",nullable = false)
	private double age;
	@Column(name = "faculty_profile")
	private Blob fprofile;
	@Column(name = "faculty_status",nullable = false)
	private String fstatus;

}
