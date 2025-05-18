package org.ly.movie.service;

import org.ly.movie.dto.BuyTicketDTO;
import org.ly.movie.dto.OrderListDTO;
import org.ly.movie.model.Order;
import org.ly.movie.model.OrderItem;
import org.ly.movie.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

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

    // 查询当前用户订单列表
    public List<OrderListDTO> listOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        List<OrderListDTO> result = new ArrayList<>();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        for (Order order : orders) {
            OrderListDTO dto = new OrderListDTO();
            dto.setOrderId(order.getId());
            dto.setOrderNo(String.valueOf(order.getId())); // 可用id或自定义订单号
            dto.setBuyTime(order.getCreatedAt().format(dtf));
            dto.setTotalAmount(order.getTotalAmount().doubleValue());
            int ticketCount = order.getItems() != null ? order.getItems().size() : 0;
            dto.setTicketCount(ticketCount);
            // 这里只取第一个明细的场次，实际可遍历所有明细
            if (order.getItems() != null && !order.getItems().isEmpty()) {
                // TODO: 通过scheduleId查Schedule和Movie，获取movieName和showTime
                dto.setMovieName("测试电影"); // 占位
                dto.setShowTime("2022-11-12 13:13:13"); // 占位
            }
            result.add(dto);
        }
        return result;
    }
} 