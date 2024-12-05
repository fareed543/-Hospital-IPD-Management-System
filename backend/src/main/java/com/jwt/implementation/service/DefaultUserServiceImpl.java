package com.jwt.implementation.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jwt.implementation.model.Role;
import com.jwt.implementation.model.User;
import com.jwt.implementation.model.UserDTO;
import com.jwt.implementation.repository.RoleRepository;
import com.jwt.implementation.repository.UserRepository;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.Collection;

@Service
public class DefaultUserServiceImpl implements DefaultUserService {

	@Autowired
	UserRepository userRepo;

	@Autowired
	RoleRepository roleRepo;

	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public User save(UserDTO userRegisteredDTO) {
		Role role = new Role();
		if (userRegisteredDTO.getRole().equals("USER"))
			role = roleRepo.findByRole("ROLE_USER");
		else if (userRegisteredDTO.getRole().equals("ADMIN"))
			role = roleRepo.findByRole("ROLE_ADMIN");

		User user = new User();
		user.setEmail(userRegisteredDTO.getEmail());
		user.setUserName(userRegisteredDTO.getUserName());
		user.setMobile(userRegisteredDTO.getMobile());
		user.setPassword(passwordEncoder.encode(userRegisteredDTO.getPassword()));
		user.setRole(role);

		return userRepo.save(user);
	}

	@Override
	public User update(int userId, UserDTO userDTO) {
		// Fetch the existing user by ID
		User existingUser = userRepo.findById(userId).orElse(null);
		if (existingUser == null) {
			return null; // User not found
		}

		// Update the fields of the user
		if (userDTO.getUserName() != null) existingUser.setUserName(userDTO.getUserName());
		if (userDTO.getEmail() != null) existingUser.setEmail(userDTO.getEmail());
		if (userDTO.getMobile() != null) existingUser.setMobile(userDTO.getMobile());
		if (userDTO.getPassword() != null) existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		if (userDTO.getRole() != null) {
			Role role = userDTO.getRole().equals("USER") ? roleRepo.findByRole("ROLE_USER") : roleRepo.findByRole("ROLE_ADMIN");
			existingUser.setRole(role);
		}

		// Save the updated user
		return userRepo.save(existingUser);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUserName(username);
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), mapRolesToAuthorities(user.getRole()));
	}

	public Collection<? extends GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
		return roles.stream().map(role -> new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList());
	}
}
