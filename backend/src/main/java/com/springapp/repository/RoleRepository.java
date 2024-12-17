package com.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springapp.model.Role;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Role findByRole(String role);

}
