package com.fitness.tracker.controller;

import com.fitness.tracker.dto.GoalRequest;
import com.fitness.tracker.entity.Goal;
import com.fitness.tracker.service.GoalService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:3000")
public class GoalController {
    
    @Autowired
    private GoalService goalService;
    
    @GetMapping
    public ResponseEntity<List<Goal>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Goal>> getActiveGoals() {
        return ResponseEntity.ok(goalService.getActiveGoals());
    }
    
    @PostMapping
    public ResponseEntity<Goal> createGoal(@Valid @RequestBody GoalRequest request) {
        return ResponseEntity.ok(goalService.createGoal(request));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Goal> updateGoal(@PathVariable Long id, 
                                           @Valid @RequestBody GoalRequest request) {
        return ResponseEntity.ok(goalService.updateGoal(id, request));
    }
    
    @PatchMapping("/{id}/progress")
    public ResponseEntity<Goal> updateGoalProgress(@PathVariable Long id, 
                                                    @RequestBody Map<String, Integer> body) {
        Integer progress = body.get("progress");
        return ResponseEntity.ok(goalService.updateGoalProgress(id, progress));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return ResponseEntity.noContent().build();
    }
}
