package org.ly.movie.service;

import org.ly.movie.dto.UserRegisterDTO;
import org.ly.movie.model.User;
import org.ly.movie.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void register(UserRegisterDTO dto) {
        // 用户名唯一性校验
        if (userRepository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("用户名已存在");
        }
        // 邮箱唯一性校验
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("邮箱已存在");
        }
        // 密码加密
        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(encodedPassword);
        user.setPhone(dto.getPhone());

        userRepository.save(user);
    }
} 