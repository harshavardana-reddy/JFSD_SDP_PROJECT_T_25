package com.klef.jfsd.springboot.models;

import lombok.Data;

@Data
public class SubmissionDTO {
	

	private String submissionId;
	private String assignmentId;
	private String assignmentName;
	private String studentId;
	private String studentName;
	private String courseId;
	private String courseCode;
	private String courseName;
	private String reviewStatus;
	private String submissionFeedback;
	private double marks;
	private String submissionDate;
	private byte[] submittedData;
	private String reviewedFacultyId;
	private String reviewedFacultyName;

}
