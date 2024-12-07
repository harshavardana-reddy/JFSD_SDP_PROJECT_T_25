package com.klef.jfsd.springboot.utils;

import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;

@Component
public class MailUtil {
	
	@Value("spring.mail.username")
	private String senderMail;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private TemplateEngine templateEngine;
	
	public String SendOTPMail(String email,String otp) {
		try {
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom(senderMail);
			message.setTo(email);
			message.setSubject("OTP VERIFICATION");
			message.setText("Heres your OTP:"+otp+"\n which will be expired in 10 mins");
			mailSender.send(message);
			return "OTP MAIL SENT SUCCESSFULLY TO "+email;
		} 
		catch (Exception e) {
			return "Error in sending Email : "+e.getMessage();
		}
	}
	
	
	public String sendStudentMail(String email,String name,String sid) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			Context context = new Context();
			context.setVariable("name", name);
			context.setVariable("sid", sid);
			String process = templateEngine.process("NewStudent.html", context);
			MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
			helper.setFrom(senderMail);
			helper.setTo(email);
			helper.setSubject("WELCOME TO SHV INSTITUTIONS");
			helper.setText(process,true);
			mailSender.send(message);
			System.out.println("Success");
			return "MAIL SENT SUCCESFULLY";
		} catch (Exception e) {
			return "Error in sending Email : "+e.getMessage();
		}
	}
	
	public String sendFacultyMail(String email,String name,String fid) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			Context context = new Context();
			context.setVariable("name", name);
			context.setVariable("sid", fid);
			String process = templateEngine.process("NewFaculty.html", context);
			MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
			helper.setFrom(senderMail);
			helper.setTo(email);
			helper.setSubject("WELCOME TO SHV INSTITUTIONS");
			helper.setText(process,true);
			mailSender.send(message);
			System.out.println("Success");
			return "MAIL SENT SUCCESFULLY";
		} catch (Exception e) {
			System.out.println("Error in sending Email : "+e.getMessage());
			return "Error in sending Email : "+e.getMessage();
		}
	}
	
	public String sendSubmissionMail(String email,String name,String aname,String status) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			Context context = new Context();
			context.setVariable("name", name);
			context.setVariable("aname", aname);
			context.setVariable("status", status);
			String process = templateEngine.process("SubmittedSuccesfully.html", context);
			MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
			helper.setFrom(senderMail);
			helper.setTo(email);
			helper.setSubject("SUBMISSION CONFIRMATION");
			helper.setText(process,true);
			mailSender.send(message);
			System.out.println("Success");
			return "MAIL SENT SUCCESFULLY";
		} catch (Exception e) {
			System.out.println("Error in sending Email : "+e.getMessage());
			return "Error in sending Email : "+e.getMessage();
		}
	}
	
	public String sendSubmissionEvaluatedMail(String email,String name,String aname,String status) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			Context context = new Context();
			context.setVariable("name", name);
			context.setVariable("aname", aname);
			context.setVariable("status", status);
			String process = templateEngine.process("SubmissionEvaluated.html", context);
			MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
			helper.setFrom(senderMail);
			helper.setTo(email);
			helper.setSubject("SUBMISSION EVALUATED");
			helper.setText(process,true);
			mailSender.send(message);
			System.out.println("Success");
			return "MAIL SENT SUCCESFULLY";
		} catch (Exception e) {
			System.out.println("Error in sending Email : "+e.getMessage());
			return "Error in sending Email : "+e.getMessage();
		}
	}
	
	public String sendPendingMail(String email,String name) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			Context context = new Context();
			context.setVariable("name", name);
			
			String process = templateEngine.process("PendingSubmissions.html", context);
			MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
			helper.setFrom(senderMail);
			helper.setTo(email);
			helper.setSubject("SUBMISSION EVALUATED");
			helper.setText(process,true);
			mailSender.send(message);
			System.out.println("Success");
			return "MAIL SENT SUCCESFULLY";
		} catch (Exception e) {
			System.out.println("Error in sending Email : "+e.getMessage());
			return "Error in sending Email : "+e.getMessage();
		}
	}
	
	public String sendPasswordChangeMail(String email,String name,String time,String ip) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			Context context = new Context();
			context.setVariable("name", name);
			context.setVariable("time", time);
			context.setVariable("ip", ip);
			
			String process = templateEngine.process("PasswordChanged.html", context);
			MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
			helper.setFrom(senderMail);
			helper.setTo(email);
			helper.setSubject("ACCOUNT ACTIVITY");
			helper.setText(process,true);
			mailSender.send(message);
			System.out.println("Success");
			return "MAIL SENT SUCCESFULLY";
		} catch (Exception e) {
			System.out.println("Error in sending Email : "+e.getMessage());
			return "Error in sending Email : "+e.getMessage();
		}
	}
	
	public String sendCourseMappingMail(String email,String name,String cname,String sem,String academicyear,String code) {
		try {
			MimeMessage message = mailSender.createMimeMessage();
			Context context = new Context();
			context.setVariable("name", name);
			context.setVariable("cname", cname);
			context.setVariable("sem", sem);
			context.setVariable("academicyear", academicyear);
			context.setVariable("code", code);
			String process = templateEngine.process("CourseAdded.html", context);
			MimeMessageHelper helper = new MimeMessageHelper(message,MimeMessageHelper.MULTIPART_MODE_MIXED,StandardCharsets.UTF_8.name());
			helper.setFrom(senderMail);
			helper.setTo(email);
			helper.setSubject("NEW COURSE ADDED");
			helper.setText(process,true);
			mailSender.send(message);
			System.out.println("Success");
			return "MAIL SENT SUCCESFULLY";
		} catch (Exception e) {
			System.out.println("Error in sending Email : "+e.getMessage());
			return "Error in sending Email : "+e.getMessage();
		}
	}
	

}
