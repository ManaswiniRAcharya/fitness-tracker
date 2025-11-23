package com.fitness.tracker.repository;

import com.fitness.tracker.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GoalRepository extends JpaRepository<Goal, Long> {
    List<Goal> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Goal> findByUserIdAndCompletedFalseAndEndDateGreaterThanEqual(Long userId, LocalDate currentDate);
}
