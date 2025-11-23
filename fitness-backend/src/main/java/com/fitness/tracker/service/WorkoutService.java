package com.fitness.tracker.service;

import com.fitness.tracker.dto.WorkoutRequest;
import com.fitness.tracker.entity.User;
import com.fitness.tracker.entity.Workout;
import com.fitness.tracker.exception.ResourceNotFoundException;
import com.fitness.tracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WorkoutService {
    
    @Autowired
    private WorkoutRepository workoutRepository;
    
    @Autowired
    private AuthService authService;
    
    public List<Workout> getAllWorkouts() {
        User user = authService.getCurrentUser();
        return workoutRepository.findByUserIdOrderByWorkoutDateDesc(user.getId());
    }
    
    public Workout getWorkoutById(Long id) {
        User user = authService.getCurrentUser();
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Workout not found"));
        
        if (!workout.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access");
        }
        
        return workout;
    }
    
    public List<Workout> getWorkoutsByDate(LocalDate date) {
        User user = authService.getCurrentUser();
        return workoutRepository.findByUserIdAndWorkoutDate(user.getId(), date);
    }
    
    public Workout createWorkout(WorkoutRequest request) {
        User user = authService.getCurrentUser();
        
        Workout workout = new Workout();
        workout.setType(request.getType());
        workout.setDuration(request.getDuration());
        workout.setCalories(request.getCalories());
        workout.setWorkoutDate(request.getWorkoutDate());
        workout.setNotes(request.getNotes());
        workout.setUser(user);
        
        return workoutRepository.save(workout);
    }
    
    public Workout updateWorkout(Long id, WorkoutRequest request) {
        Workout workout = getWorkoutById(id);
        
        workout.setType(request.getType());
        workout.setDuration(request.getDuration());
        workout.setCalories(request.getCalories());
        workout.setWorkoutDate(request.getWorkoutDate());
        workout.setNotes(request.getNotes());
        
        return workoutRepository.save(workout);
    }
    
    public void deleteWorkout(Long id) {
        Workout workout = getWorkoutById(id);
        workoutRepository.delete(workout);
    }
}
