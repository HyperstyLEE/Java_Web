package org.ly.movie.repository;

import org.ly.movie.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Long> {
    List<Movie> findByReleaseDateAfterOrderByReleaseDateDesc(java.time.LocalDateTime date);
} 