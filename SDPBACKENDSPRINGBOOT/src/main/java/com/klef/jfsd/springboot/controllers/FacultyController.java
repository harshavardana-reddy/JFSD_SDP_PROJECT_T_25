package com.klef.jfsd.springboot.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.jfsd.springboot.models.FacultyDTO;
import com.klef.jfsd.springboot.services.FacultyService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("faculty")
public class FacultyController {
	
	@Autowired
	private FacultyService service;
	
	@PostMapping("/checkfacultylogin")
	public ResponseEntity<?> checkFacultyLogin(@RequestBody Map<String, String> payload){
		try {
			String uname = payload.get("username");
			String pwd = payload.get("password");
			FacultyDTO response = service.checkFacultyLogin(uname, pwd);
			
			if(response.getFstatus().equals("INACTIVE")) {
				return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Your is Inactive.For more information contact Administrator");
			}
			return ResponseEntity.status(200).body(response);
			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error in Login: " + e.getMessage());
		}
	}

}
