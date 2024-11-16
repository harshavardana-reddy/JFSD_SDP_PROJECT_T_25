package com.klef.jfsd.springboot.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class MailUtil {
	
	@Value("spring.mail.username")
	private String senderMail;
	
	@Autowired
	private JavaMailSender mailSender;
	
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

}
