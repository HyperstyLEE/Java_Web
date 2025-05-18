package org.ly.movie.dto;

import lombok.Data;

@Data
public class OrderListDTO {
    private Long orderId;
    private String orderNo;
    private String movieName;
    private String showTime;
    private String buyTime;
    private Integer ticketCount;
    private Double totalAmount;
} 