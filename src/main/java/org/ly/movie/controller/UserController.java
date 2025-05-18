package org.ly.movie.controller;

import org.ly.movie.dto.UserRegisterDTO;
import org.ly.movie.dto.UserLoginDTO;
import org.ly.movie.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserRegisterDTO dto) {
        userService.register(dto);
        return "注册成功";
    }

    @PostMapping("/login")
    public String login(@RequestBody UserLoginDTO dto) {
        String token = userService.login(dto);
        return token;
    }
} 