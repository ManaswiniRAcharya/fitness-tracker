package com.fitness.tracker.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.time.LocalDate;

public class ActivityRequest {
    
    @NotNull(message = "Steps is required")
    @PositiveOrZero(message = "Steps must be zero or positive")
    private Integer steps;
    
    @NotNull(message = "Distance is required")
    @PositiveOrZero(message = "Distance must be zero or positive")
    private Double distance;
    
    @NotNull(message = "Calories burned is required")
    @PositiveOrZero(message = "Calories must be zero or positive")
    private Integer caloriesBurned;
    
    @NotNull(message = "Activity date is required")
    private LocalDate activityDate;
    
    // Constructors
    public ActivityRequest() {}
    
    public ActivityRequest(Integer steps, Double distance, Integer caloriesBurned, LocalDate activityDate) {
        this.steps = steps;
        this.distance = distance;
        this.caloriesBurned = caloriesBurned;
        this.activityDate = activityDate;
    }
    
    // Getters and Setters
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
}
