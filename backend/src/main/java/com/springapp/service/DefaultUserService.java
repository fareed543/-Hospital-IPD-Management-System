package com.springapp.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.springapp.model.User;
import com.springapp.model.UserDTO;

public interface DefaultUserService extends UserDetailsService{
	User save(UserDTO userRegisteredDTO);
	User update(int userId, UserDTO userDTO);

}
