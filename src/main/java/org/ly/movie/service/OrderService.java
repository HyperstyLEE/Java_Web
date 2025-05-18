package org.ly.movie.service;

import org.ly.movie.dto.BuyTicketDTO;
import org.ly.movie.model.Order;
import org.ly.movie.model.OrderItem;
import org.ly.movie.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.Collections;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    // 购票（下单）
    public Order buyTicket(Long userId, BuyTicketDTO dto) {
        // TODO: 校验场次、座位可用性、获取票价等（此处简化，实际应完善）
        BigDecimal price = new BigDecimal("50.00"); // 假设票价

        Order order = new Order();
        order.setUserId(userId);
        order.setTotalAmount(price);
        order.setStatus("PENDING");

        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setScheduleId(dto.getScheduleId());
        item.setSeatNumber(dto.getSeatNumber());
        item.setPrice(price);

        order.setItems(Collections.singletonList(item));
        return orderRepository.save(order);
    }
} 