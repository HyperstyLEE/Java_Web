package org.ly.movie.controller;

import org.ly.movie.dto.BuyTicketDTO;
import org.ly.movie.model.Order;
import org.ly.movie.service.OrderService;
import org.ly.movie.util.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.ly.movie.dto.OrderListDTO;
import java.util.List;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/buy")
    public Order buyTicket(@RequestBody BuyTicketDTO dto, HttpServletRequest request) {
        // 从请求头获取JWT并解析用户ID
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("未登录");
        }
        String token = authHeader.substring(7);
        Claims claims = JwtUtil.parseToken(token);
        String username = claims.getSubject();
        // 实际项目建议用userId，这里用username演示
        // TODO: 可根据username查userId
        Long userId = 1L; // 这里应根据username查数据库获得userId
        return orderService.buyTicket(userId, dto);
    }

    @GetMapping("/list")
    public List<OrderListDTO> listOrders(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("未登录");
        }
        String token = authHeader.substring(7);
        Claims claims = JwtUtil.parseToken(token);
        String username = claims.getSubject();
        // TODO: 根据username查userId
        Long userId = 1L; // 这里应根据username查数据库获得userId
        return orderService.listOrders(userId);
    }
} 