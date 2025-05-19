package org.ly.movie.service;

import org.ly.movie.model.Seat;
import org.ly.movie.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    // 获取场次座位信息
    public List<Seat> getSeatsByShowtimeId(Long showtimeId) {
        return seatRepository.findByScheduleId(showtimeId);
    }

    // 锁定座位
    @Transactional
    public void lockSeats(Long showtimeId, List<Long> seatIds) {
        List<Seat> seats = seatRepository.findAllById(seatIds);
        
        // 检查座位是否属于该场次
        for (Seat seat : seats) {
            if (!seat.getSchedule().getId().equals(showtimeId)) {
                throw new RuntimeException("座位不属于该场次");
            }
            if (!"AVAILABLE".equals(seat.getStatus())) {
                throw new RuntimeException("座位已被占用");
            }
        }

        // 更新座位状态
        for (Seat seat : seats) {
            seat.setStatus("OCCUPIED");
            seatRepository.save(seat);
        }
    }

    // 释放座位
    @Transactional
    public void releaseSeats(Long showtimeId, List<Long> seatIds) {
        List<Seat> seats = seatRepository.findAllById(seatIds);
        
        // 检查座位是否属于该场次
        for (Seat seat : seats) {
            if (!seat.getSchedule().getId().equals(showtimeId)) {
                throw new RuntimeException("座位不属于该场次");
            }
            if (!"OCCUPIED".equals(seat.getStatus())) {
                throw new RuntimeException("座位状态不正确");
            }
        }

        // 更新座位状态
        for (Seat seat : seats) {
            seat.setStatus("AVAILABLE");
            seatRepository.save(seat);
        }
    }
} 