package com.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springapp.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer>{
	User findByUserName(String username);
	List<User> findByUserNameStartingWith(String userName);  // Find users by userName starting with
	List<User> findByMobileStartingWith(String mobile);      // Find users by mobile starting with
	List<User> findByUserNameStartingWithAndMobileStartingWith(String userName, String mobile);  // Find users by both conditions
}
