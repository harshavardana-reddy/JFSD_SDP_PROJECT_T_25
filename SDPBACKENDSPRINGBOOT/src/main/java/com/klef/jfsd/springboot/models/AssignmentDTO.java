package com.klef.jfsd.springboot.models;


import lombok.Data;

@Data
public class AssignmentDTO {
	
	private String assignmentId;
	private String assignmentName;
	private String assignmentQuestion;
	private byte[] assignmentQuestionPDF;
	private String courseId;
	private double marks;
	private String courseName;
	private String courseCode;
	private String startdate;
	private String deadlinedate;
	private String accept_submission;
	private String editStatus;
}
