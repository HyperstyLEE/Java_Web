package org.ly.movie.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "halls")
public class Hall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;  // 影厅名称

    @Column(nullable = false)
    private Integer hallRows;  // 座位行数

    @Column(nullable = false)
    private Integer hallColumns;  // 座位列数

    @Column(length = 200)
    private String description;  // 影厅描述

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
} 