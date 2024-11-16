package com.klef.jfsd.springboot.models;

import lombok.Data;

@Data
public class StudentDTO {
	private String sid;
    private String sname;
    private String semail;
    private String sdepartment;
    private String scontact;
    private String dob;
    private double age;
    private byte[] sprofile;
    private String sstatus;

}
