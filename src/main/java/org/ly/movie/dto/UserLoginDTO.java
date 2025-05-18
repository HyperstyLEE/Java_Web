package org.ly.movie.dto;

import lombok.Data;

@Data
public class UserLoginDTO {
    private String usernameOrEmail;
    private String password;
} 