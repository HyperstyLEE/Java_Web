package org.ly.movie.service;

import org.ly.movie.dto.BuyTicketDTO;
import org.ly.movie.dto.OrderListDTO;
import org.ly.movie.model.Order;
import org.ly.movie.model.OrderItem;
import org.ly.movie.model.Seat;
import org.ly.movie.model.Schedule;
import org.ly.movie.model.Movie;
import org.ly.movie.repository.OrderRepository;
import org.ly.movie.repository.SeatRepository;
import org.ly.movie.repository.ScheduleRepository;
import org.ly.movie.repository.MovieRepository;
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
    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private MovieRepository movieRepository;

    // 购票（下单）
    public Order buyTicket(Long userId, BuyTicketDTO dto) {
        BigDecimal price = new BigDecimal("50.00"); // 假设票价
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PAID"); // 直接设为已支付，模拟支付成功

        // 只生成一张票，不处理座位
        List<OrderItem> items = new ArrayList<>();
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setScheduleId(dto.getScheduleId());
        item.setSeatNumber("无座位");
        item.setPrice(price);
        items.add(item);

        order.setTotalAmount(price);
        order.setItems(items);
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
            dto.setOrderNo(String.valueOf(order.getId()));
            dto.setBuyTime(order.getCreatedAt().format(dtf));
            dto.setTotalAmount(order.getTotalAmount().doubleValue());
            int ticketCount = order.getItems() != null ? order.getItems().size() : 0;
            dto.setTicketCount(ticketCount);
            if (order.getItems() != null && !order.getItems().isEmpty()) {
                OrderItem item = order.getItems().get(0);
                if (item.getScheduleId() != null) {
                    Schedule schedule = scheduleRepository.findById(item.getScheduleId()).orElse(null);
                    if (schedule != null) {
                        dto.setShowTime(schedule.getShowTime().format(dtf));
                        Movie movie = schedule.getMovie();
                        if (movie != null) {
                            dto.setMovieName(movie.getTitle());
                        }
                    }
                }
            }
            result.add(dto);
        }
        return result;
    }
} 