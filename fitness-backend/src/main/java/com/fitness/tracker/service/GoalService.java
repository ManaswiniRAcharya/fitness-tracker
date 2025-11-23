package com.fitness.tracker.service;

import com.fitness.tracker.dto.GoalRequest;
import com.fitness.tracker.entity.Goal;
import com.fitness.tracker.entity.User;
import com.fitness.tracker.exception.ResourceNotFoundException;
import com.fitness.tracker.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GoalService {
    
    @Autowired
    private GoalRepository goalRepository;
    
    @Autowired
    private AuthService authService;
    
    public List<Goal> getAllGoals() {
        User user = authService.getCurrentUser();
        return goalRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }
    
    public List<Goal> getActiveGoals() {
        User user = authService.getCurrentUser();
        return goalRepository.findByUserIdAndCompletedFalseAndEndDateGreaterThanEqual(
                user.getId(), LocalDate.now());
    }
    
    public Goal createGoal(GoalRequest request) {
        User user = authService.getCurrentUser();
        
        Goal goal = new Goal();
        goal.setType(request.getType());
        goal.setCategory(request.getCategory());
        goal.setTargetValue(request.getTargetValue());
        goal.setCurrentValue(0);
        goal.setStartDate(request.getStartDate());
        goal.setEndDate(request.getEndDate());
        goal.setCompleted(false);
        goal.setUser(user);
        
        return goalRepository.save(goal);
    }
    
    public Goal updateGoal(Long id, GoalRequest request) {
        User user = authService.getCurrentUser();
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));
        
        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        goal.setType(request.getType());
        goal.setCategory(request.getCategory());
        goal.setTargetValue(request.getTargetValue());
        goal.setStartDate(request.getStartDate());
        goal.setEndDate(request.getEndDate());
        
        return goalRepository.save(goal);
    }
    
    public Goal updateGoalProgress(Long id, Integer progress) {
        User user = authService.getCurrentUser();
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));
        
        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        goal.setCurrentValue(progress);
        if (progress >= goal.getTargetValue()) {
            goal.setCompleted(true);
        }
        
        return goalRepository.save(goal);
    }
    
    public void deleteGoal(Long id) {
        User user = authService.getCurrentUser();
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal not found"));
        
        if (!goal.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        goalRepository.delete(goal);
    }
}
