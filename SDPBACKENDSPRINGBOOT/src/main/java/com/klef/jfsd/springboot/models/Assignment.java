package com.klef.jfsd.springboot.models;

import java.sql.Blob;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "assignment_table")
@Data
public class Assignment {
	
	@Id
	@Column(name = "assignment_id")
	private String assignmentId;
	@Column(name = "assignment_name",nullable = false)
	private String assignmentName;
	@Column(name = "assignment_question",nullable = false)
	private String assignmentQuestion;
	@Column(name = "assignment_question_pdf")
	private Blob assignmentQuestionPDF;
	@Column(name = "assignment_course_id",nullable = false)
	private String courseId;
	@Column(name = "assignment_marks",nullable = false)
	private double marks;
	@Column(name = "assignment_course_name",nullable = false)
	private String courseName;
	@Column(name = "assignment_course_code",nullable = false)
	private String courseCode;
	@Column(name = "assignment_startdate",nullable = false)
	private String startdate;
	@Column(name = "assignment_deadline",nullable = false)
	private String deadlinedate;
	@Column(name="accept_submissions",nullable = false)
	private String accept_submission;
	@Column(name="edit_status",nullable = false)
	private String editStatus;
	

}
