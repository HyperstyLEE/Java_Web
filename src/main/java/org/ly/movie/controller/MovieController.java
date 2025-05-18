package org.ly.movie.controller;

import org.ly.movie.model.Movie;
import org.ly.movie.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movie")
public class MovieController {
    @Autowired
    private MovieRepository movieRepository;

    // 获取所有电影列表
    @GetMapping("/list")
    public List<Movie> listMovies() {
        return movieRepository.findAll();
    }
} 