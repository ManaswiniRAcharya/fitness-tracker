package com.fitness.tracker.controller;

import com.fitness.tracker.dto.WorkoutRequest;
import com.fitness.tracker.entity.Workout;
import com.fitness.tracker.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {
    
    @Autowired
    private WorkoutService workoutService;
    
    @GetMapping
    public ResponseEntity<List<Workout>> getAllWorkouts() {
        return ResponseEntity.ok(workoutService.getAllWorkouts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Workout> getWorkoutById(@PathVariable Long id) {
        return ResponseEntity.ok(workoutService.getWorkoutById(id));
    }
    
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Workout>> getWorkoutsByDate(@PathVariable String date) {
        LocalDate localDate = LocalDate.parse(date);
        return ResponseEntity.ok(workoutService.getWorkoutsByDate(localDate));
    }
    
    @PostMapping
    public ResponseEntity<Workout> createWorkout(@Valid @RequestBody WorkoutRequest request) {
        return ResponseEntity.ok(workoutService.createWorkout(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Workout> updateWorkout(@PathVariable Long id, 
                                                  @Valid @RequestBody WorkoutRequest request) {
        return ResponseEntity.ok(workoutService.updateWorkout(id, request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.noContent().build();
    }
}
