package org.ly.movie.controller;

import org.ly.movie.model.Seat;
import org.ly.movie.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seat")
public class SeatController {
    @Autowired
    private SeatService seatService;

    // 获取场次座位信息
    @GetMapping("/{showtimeId}")
    public List<Seat> getSeats(@PathVariable Long showtimeId) {
        return seatService.getSeatsByShowtimeId(showtimeId);
    }

    // 锁定座位
    @PostMapping("/lock")
    public String lockSeats(@RequestBody Map<String, Object> request) {
        Long showtimeId = Long.valueOf(request.get("showtimeId").toString());
        List<Long> seatIds = (List<Long>) request.get("seatIds");
        seatService.lockSeats(showtimeId, seatIds);
        return "座位锁定成功";
    }

    // 释放座位
    @PostMapping("/release")
    public String releaseSeats(@RequestBody Map<String, Object> request) {
        Long showtimeId = Long.valueOf(request.get("showtimeId").toString());
        List<Long> seatIds = (List<Long>) request.get("seatIds");
        seatService.releaseSeats(showtimeId, seatIds);
        return "座位释放成功";
    }
} 