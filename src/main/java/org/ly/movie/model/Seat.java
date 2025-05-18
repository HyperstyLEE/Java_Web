package org.ly.movie.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "seats")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "schedule_id", nullable = false)
    private Schedule schedule;

    @Column(nullable = false)
    private Integer seatRowNumber;  // 行号

    @Column(nullable = false)
    private Integer seatColumnNumber;  // 列号

    @Column(length = 20)
    private String status;  // 状态：AVAILABLE（可用）, OCCUPIED（已占）, SOLD（已售）

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
} 