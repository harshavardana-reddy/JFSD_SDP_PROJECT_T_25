package com.klef.jfsd.springboot.models;

import java.sql.Blob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "submission_table")
@Data
public class Submission {
	
	@Id
	@Column(name = "submisson_id")
	private String submissionId;
	@Column(name = "assignment_id",nullable = false)
	private String assignmentId;
	@Column(name = "assignment_name",nullable = false)
	private String assignmentName;
	@Column(name = "student_id",nullable = false)
	private String studentId;
	@Column(name = "student_name",nullable = false)
	private String studentName;
	@Column(name = "course_id",nullable = false)
	private String courseId;
	@Column(name = "course_code",nullable = false)
	private String courseCode;
	@Column(name = "course_name",nullable = false)
	private String courseName;
	@Column(name = "review_status",nullable = false)
	private String reviewStatus;
	@Column(name = "submission_feedback")
	private String submissionFeedback;
	@Column(name = "submission_marks",nullable = false)
	private double marks;
	@Column(name = "submission_date",nullable = false)
	private String submissionDate;
	@Column(name = "submitted_data",nullable = false)
	private Blob submittedData;
	@Column(name = "submission_reviewed_faculty_id")
	private String reviewedFacultyId;
	@Column(name = "submission_reviewed_faculty_name")
	private String reviewedFacultyName;
}
