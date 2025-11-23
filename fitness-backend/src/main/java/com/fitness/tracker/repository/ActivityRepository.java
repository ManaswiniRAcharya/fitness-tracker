package com.fitness.tracker.repository;

import com.fitness.tracker.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUserIdOrderByActivityDateDesc(Long userId);
    Optional<Activity> findByUserIdAndActivityDate(Long userId, LocalDate activityDate);
    List<Activity> findByUserIdAndActivityDateBetween(Long userId, LocalDate startDate, LocalDate endDate);
}
