package com.fitness.tracker.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class Activity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Integer steps;
    
    @Column(nullable = false)
    private Double distance; // in kilometers
    
    @Column(nullable = false)
    private Integer caloriesBurned;
    
    @Column(nullable = false)
    private LocalDate activityDate;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
    
    // Constructors
    public Activity() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Integer getSteps() {
        return steps;
    }
    
    public void setSteps(Integer steps) {
        this.steps = steps;
    }
    
    public Double getDistance() {
        return distance;
    }
    
    public void setDistance(Double distance) {
        this.distance = distance;
    }
    
    public Integer getCaloriesBurned() {
        return caloriesBurned;
    }
    
    public void setCaloriesBurned(Integer caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }
    
    public LocalDate getActivityDate() {
        return activityDate;
    }
    
    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
}
