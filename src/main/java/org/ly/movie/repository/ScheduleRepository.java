package org.ly.movie.repository;

import org.ly.movie.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByMovieIdAndShowTimeAfterOrderByShowTimeAsc(Long movieId, LocalDateTime date);
    List<Schedule> findByShowTimeBetweenOrderByShowTimeAsc(LocalDateTime start, LocalDateTime end);
} 