package org.ly.movie.dto;

import lombok.Data;

@Data
public class UserRegisterDTO {
    private String username;
    private String email;
    private String password;
    private String phone;
} 