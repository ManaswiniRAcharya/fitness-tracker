package com.fitness.tracker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDate;

public class WorkoutRequest {
    
    @NotBlank(message = "Workout type is required")
    private String type;
    
    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    private Integer duration;
    
    @NotNull(message = "Calories is required")
    @Positive(message = "Calories must be positive")
    private Integer calories;
    
    @NotNull(message = "Workout date is required")
    private LocalDate workoutDate;
    
    private String notes;
    
    // Constructors
    public WorkoutRequest() {}
    
    public WorkoutRequest(String type, Integer duration, Integer calories, LocalDate workoutDate, String notes) {
        this.type = type;
        this.duration = duration;
        this.calories = calories;
        this.workoutDate = workoutDate;
        this.notes = notes;
    }
    
    // Getters and Setters
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Integer getDuration() {
        return duration;
    }
    
    public void setDuration(Integer duration) {
        this.duration = duration;
    }
    
    public Integer getCalories() {
        return calories;
    }
    
    public void setCalories(Integer calories) {
        this.calories = calories;
    }
    
    public LocalDate getWorkoutDate() {
        return workoutDate;
    }
    
    public void setWorkoutDate(LocalDate workoutDate) {
        this.workoutDate = workoutDate;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
