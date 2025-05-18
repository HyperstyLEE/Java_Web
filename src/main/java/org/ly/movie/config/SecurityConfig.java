package org.ly.movie.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/user/register", "/api/user/login").permitAll() // 注册和登录接口放行
                .anyRequest().permitAll() // 其他接口也放行（开发阶段）
            )
            .formLogin(form -> form.disable()); // 关闭默认登录页
        return http.build();
    }
}
