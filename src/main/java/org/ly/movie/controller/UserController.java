package org.ly.movie.controller;

import org.ly.movie.dto.UserRegisterDTO;
import org.ly.movie.dto.UserLoginDTO;
import org.ly.movie.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody UserRegisterDTO dto) {
        Map<String, Object> result = new HashMap<>();
        try {
            userService.register(dto);
            result.put("msg", "注册成功");
            result.put("code", 200);
        } catch (Exception e) {
            result.put("msg", "注册失败：" + e.getMessage());
            result.put("code", 500);
        }
        return result;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserLoginDTO dto) {
        String token = userService.login(dto);
        Map<String, String> result = new HashMap<>();
        result.put("token", token);
        return result;
    }
} 