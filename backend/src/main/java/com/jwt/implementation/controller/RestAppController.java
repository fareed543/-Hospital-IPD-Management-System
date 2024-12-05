package com.jwt.implementation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;

import com.jwt.implementation.model.LoginResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jwt.implementation.config.JwtGeneratorValidator;
import com.jwt.implementation.model.User;
import com.jwt.implementation.model.UserDTO;
import com.jwt.implementation.repository.UserRepository;
import com.jwt.implementation.service.DefaultUserService;

@RestController
public class RestAppController {

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

	// New API to fetch list of all users
	@GetMapping("/api/users")
	public ResponseEntity<Object> getAllUsers() {
		List<User> users = userRepo.findAll(); // Fetch all users from the repository
		if (users.isEmpty()) {
			return generateRespose("No users found", HttpStatus.NOT_FOUND, null);
		}
		return generateRespose("Users retrieved successfully", HttpStatus.OK, users);
	}

//	@GetMapping("/genToken")
//	public String generateJwtToken(@RequestBody UserDTO userDto) throws Exception {
//
//			Authentication authentication = authManager.authenticate(
//					new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));
//			SecurityContextHolder.getContext().setAuthentication(authentication);
//
//		return jwtGenVal.generateToken(authentication);
//	}

	@PostMapping("/genToken")
	public ResponseEntity<LoginResponseDTO> generateJwtToken(@RequestBody UserDTO userDto) throws Exception {
		// Authenticate the user
		Authentication authentication = authManager.authenticate(
				new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);

		// Generate JWT token
		String token = jwtGenVal.generateToken(authentication);

		// Extract username and roles from authentication
		String username = userDto.getUserName();
		List<String> roles = authentication.getAuthorities().stream()
				.map(authority -> authority.getAuthority())
				.collect(Collectors.toList());

		// Create the response object
		LoginResponseDTO response = new LoginResponseDTO(token, username, roles);

		// Return the response with the generated token and user details
		return ResponseEntity.ok(response);
	}



	@GetMapping("/welcomeAdmin")
//	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public String welcome() {
		return "WelcomeAdmin";
	}

	@GetMapping("/welcomeUser")
	@PreAuthorize("hasAuthority('ROLE_USER')")
	public String welcomeUser() {
		return "WelcomeUSER";
	}

	
	
	public ResponseEntity<Object> generateRespose(String message, HttpStatus st, Object responseobj) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("meaasge", message);
		map.put("Status", st.value());
		map.put("data", responseobj);

		return new ResponseEntity<Object>(map, st);
	}

}
