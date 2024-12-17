package com.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.springapp.model.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.springapp.config.JwtGeneratorValidator;
import com.springapp.model.User;
import com.springapp.model.UserDTO;
import com.springapp.repository.UserRepository;
import com.springapp.service.DefaultUserService;
import java.util.Optional;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepo;

	@Autowired
	AuthenticationManager authManager;

	@Autowired
	JwtGeneratorValidator jwtGenVal;
	
	@Autowired
	BCryptPasswordEncoder bcCryptPasswordEncoder;
	
	@Autowired
	DefaultUserService userService;

	@PostMapping("/registration")
	public ResponseEntity<Object> registerUser(@RequestBody UserDTO userDto) {
		User users =  userService.save(userDto);
		if (users.equals(null))
			return generateRespose("Not able to save user ", HttpStatus.BAD_REQUEST, userDto);
		else
			return generateRespose("User saved successfully : " + users.getId(), HttpStatus.OK, users);
	}

	@PostMapping("/api/users")
	public ResponseEntity<Object> createUser(@RequestBody UserDTO userDto) {
		User savedUser = userService.save(userDto);

		if (savedUser == null) {
			return generateRespose("User could not be saved", HttpStatus.BAD_REQUEST, null);
		} else {
			return generateRespose("User saved successfully: " + savedUser.getId(), HttpStatus.CREATED, savedUser);
		}
	}



	@PutMapping("/api/users/{id}")
	public ResponseEntity<Object> updateUser(@PathVariable("id") int userId, @RequestBody UserDTO userDto) {

		if (userDto == null || userDto.getUserName() == null || userDto.getEmail() == null) {
			return generateRespose("Invalid user data", HttpStatus.BAD_REQUEST, null);
		}

		User updatedUser = userService.update(userId, userDto);
		if (updatedUser == null) {
			return generateRespose("User not found", HttpStatus.NOT_FOUND, null);
		} else {
			return generateRespose("User updated successfully", HttpStatus.OK, updatedUser);
		}
	}


	@GetMapping("/api/users/{id}")
	public ResponseEntity<Object> getUserById(@PathVariable int id) {
		Optional<User> userOptional = userRepo.findById(id); // Use repository to find the user by ID

		if (userOptional.isPresent()) {
			return generateRespose("User retrieved successfully", HttpStatus.OK, userOptional.get());
		} else {
			return generateRespose("User not found", HttpStatus.NOT_FOUND, null);
		}
	}




	@GetMapping("/api/users")
	public ResponseEntity<Object> getAllUsers(
			@RequestParam(required = false) String userName,
			@RequestParam(required = false) String mobile) {

		List<User> users;

		if (userName != null && mobile != null) {
			users = userRepo.findByUserNameStartingWithAndMobileStartingWith(userName, mobile);
		} else if (userName != null) {
			users = userRepo.findByUserNameStartingWith(userName);
		} else if (mobile != null) {
			users = userRepo.findByMobileStartingWith(mobile);
		} else {
			users = userRepo.findAll();
		}

		return generateRespose("Users retrieved successfully", HttpStatus.OK, users);
	}




	@PostMapping("/login")
	public ResponseEntity<LoginResponseDTO> generateJwtToken(@RequestBody UserDTO userDto) throws Exception {
		Authentication authentication = authManager.authenticate(
				new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtGenVal.generateToken(authentication);

		String username = userDto.getUserName();
		List<String> roles = authentication.getAuthorities().stream()
				.map(authority -> authority.getAuthority())
				.collect(Collectors.toList());

		LoginResponseDTO response = new LoginResponseDTO(token, username, roles);
		return ResponseEntity.ok(response);
	}



	@GetMapping("/welcomeAdmin")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String welcome() {
		return "WelcomeAdmin";
	}

	@GetMapping("/welcomeUser")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public String welcomeUser() {
		return "WelcomeUSER";
	}


	@DeleteMapping("/api/users/{id}")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<Object> deleteUser(@PathVariable int id) {
		User user = userRepo.findById(id).orElse(null);

		if (user == null) {
			return generateRespose("User not found", HttpStatus.NOT_FOUND, null);
		}

		userRepo.delete(user);
		return generateRespose("User deleted successfully", HttpStatus.OK, null);
	}



	public ResponseEntity<Object> generateRespose(String message, HttpStatus st, Object responseobj) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("meaasge", message);
		map.put("Status", st.value());
		map.put("data", responseobj);

		return new ResponseEntity<Object>(map, st);
	}

}
