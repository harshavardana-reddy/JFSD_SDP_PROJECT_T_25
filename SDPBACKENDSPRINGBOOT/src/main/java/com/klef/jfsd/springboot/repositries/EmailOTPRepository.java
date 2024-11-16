package com.klef.jfsd.springboot.repositries;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.klef.jfsd.springboot.models.EmailOTP;


@Repository
public interface EmailOTPRepository extends JpaRepository<EmailOTP, Integer> {
	
	EmailOTP findByEmail(String email);

}
