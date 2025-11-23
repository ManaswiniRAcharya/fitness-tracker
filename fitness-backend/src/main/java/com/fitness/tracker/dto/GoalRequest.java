package com.fitness.tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public class GoalRequest {
    
    @NotBlank(message = "Goal type is required")
    private String type; // DAILY or WEEKLY
    
    @NotBlank(message = "Category is required")
    private String category; // STEPS, DISTANCE, CALORIES, WORKOUT_TIME
    
    @NotNull(message = "Target value is required")
    @Positive(message = "Target value must be positive")
    private Integer targetValue;
    
    @NotNull(message = "Start date is required")
    private LocalDate startDate;
    
    @NotNull(message = "End date is required")
    private LocalDate endDate;
    
    // Constructors
    public GoalRequest() {}
    
    public GoalRequest(String type, String category, Integer targetValue, LocalDate startDate, LocalDate endDate) {
        this.type = type;
        this.category = category;
        this.targetValue = targetValue;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    // Getters and Setters
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public Integer getTargetValue() {
        return targetValue;
    }
    
    public void setTargetValue(Integer targetValue) {
        this.targetValue = targetValue;
    }
    
    public LocalDate getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    
    public LocalDate getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
