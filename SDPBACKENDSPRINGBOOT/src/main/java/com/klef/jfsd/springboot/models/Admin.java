package com.klef.jfsd.springboot.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "admin_table")
@Data
public class Admin {
	@Id
	@Column(name = "admin_username", length = 50)
	private String username;
	@Column(name = "admin_password", length = 50, nullable = false)
	private String password;

}