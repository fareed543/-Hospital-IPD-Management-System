package com.jwt.implementation.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name= "User")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String userName;
	private String password;
	private String email;
	private String mobile;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "users_role",
			joinColumns = @JoinColumn(name = "cust_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
	Set<Role> roles = new HashSet<Role>();

	// Getters and Setters
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() { // Getter for mobile
		return mobile;
	}
	public void setMobile(String mobile) { // Setter for mobile
		this.mobile = mobile;
	}
	public Set<Role> getRole() {
		return roles;
	}
	public void setRole(Role role) {
		this.roles.add(role);
	}
}
