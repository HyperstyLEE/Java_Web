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
import org.ly.movie.model.User;
import org.ly.movie.repository.UserRepository;
import org.ly.movie.repository.OrderRepository;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

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
        // 从数据库中查询用户ID
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("用户不存在"));
        Long userId = user.getId();
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
        // 用用户名查 userId
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("用户不存在"));
        Long userId = user.getId();
        return orderService.listOrders(userId);
    }

    // 订单详情接口
    @GetMapping("/detail/{orderId}")
    public Order getOrderDetail(@PathVariable Long orderId, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("未登录");
        }
        String token = authHeader.substring(7);
        Claims claims = JwtUtil.parseToken(token);
        String username = claims.getSubject();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("用户不存在"));
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("订单不存在"));
        if (!order.getUserId().equals(user.getId())) {
            throw new RuntimeException("无权查看该订单");
        }
        return order;
    }

    // 取消订单接口
    @PostMapping("/{orderId}/cancel")
    public String cancelOrder(@PathVariable Long orderId, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("未登录");
        }
        String token = authHeader.substring(7);
        Claims claims = JwtUtil.parseToken(token);
        String username = claims.getSubject();
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("用户不存在"));
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new RuntimeException("订单不存在"));
        if (!order.getUserId().equals(user.getId())) {
            throw new RuntimeException("无权操作该订单");
        }
        if ("CANCELLED".equals(order.getStatus())) {
            throw new RuntimeException("订单已取消");
        }
        order.setStatus("CANCELLED");
        orderRepository.save(order);
        return "订单已取消";
    }
} 