package org.ly.movie.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;  // 电影标题

    @Column(length = 500)
    private String description;  // 电影描述

    @Column(length = 200)
    private String poster;  // 海报URL

    @Column(length = 50)
    private String director;  // 导演

    @Column(length = 200)
    private String actors;  // 主演

    @Column(length = 50)
    private String duration;  // 时长

    @Column(length = 50)
    private String language;  // 语言

    @Column(length = 50)
    private String type;  // 类型

    private LocalDateTime releaseDate;  // 上映日期

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();
} 