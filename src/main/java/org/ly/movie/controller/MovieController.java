package org.ly.movie.controller;

import org.ly.movie.model.Movie;
import org.ly.movie.repository.MovieRepository;
import org.ly.movie.model.Schedule;
import org.ly.movie.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    // 获取所有电影列表
    @GetMapping("/list")
    public List<Movie> listMovies() {
        return movieRepository.findAll();
    }

    // 获取电影详情
    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Long id) {
        return movieRepository.findById(id).orElseThrow(() -> new RuntimeException("电影不存在"));
    }

    // 获取电影场次
    @GetMapping("/{id}/showtimes")
    public List<Schedule> getShowtimes(@PathVariable Long id) {
        return scheduleRepository.findByMovieIdAndShowTimeAfterOrderByShowTimeAsc(id, LocalDateTime.now());
    }
} 