package com.jwt.implementation.model;

import java.util.List;

public class LoginResponseDTO {
    private String token;
    private String username;
    private List<String> roles;  // You can add more user details as needed

    // Constructor, getters, and setters
    public LoginResponseDTO(String token, String username, List<String> roles) {
        this.token = token;
        this.username = username;
        this.roles = roles;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
