package com.klef.jfsd.springboot.models;

import lombok.Data;

@Data
public class FacultyDTO {
	
	private String fid;
	private String fname;
	private String femail;
	private String fdepartment;
	private String fcontact;
	private String dob;
	private double age;
	private byte[] fprofile;
	private String fstatus;


}
