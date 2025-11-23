package com.fitness.tracker.service;

import com.fitness.tracker.dto.ActivityRequest;
import com.fitness.tracker.entity.Activity;
import com.fitness.tracker.entity.User;
import com.fitness.tracker.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ActivityService {
    
    @Autowired
    private ActivityRepository activityRepository;
    
    @Autowired
    private AuthService authService;
    
    public List<Activity> getAllActivities() {
        User user = authService.getCurrentUser();
        return activityRepository.findByUserIdOrderByActivityDateDesc(user.getId());
    }
    
    public Activity getTodayActivity() {
        User user = authService.getCurrentUser();
        return activityRepository.findByUserIdAndActivityDate(user.getId(), LocalDate.now())
                .orElse(null);
    }
    
    public Activity createActivity(ActivityRequest request) {
        User user = authService.getCurrentUser();
        
        // Check if activity already exists for this date
        activityRepository.findByUserIdAndActivityDate(user.getId(), request.getActivityDate())
                .ifPresent(existing -> {
                    throw new RuntimeException("Activity already exists for this date");
                });
        
        Activity activity = new Activity();
        activity.setSteps(request.getSteps());
        activity.setDistance(request.getDistance());
        activity.setCaloriesBurned(request.getCaloriesBurned());
        activity.setActivityDate(request.getActivityDate());
        activity.setUser(user);
        
        return activityRepository.save(activity);
    }
    
    public Map<String, Object> getSummary(String period) {
        User user = authService.getCurrentUser();
        LocalDate endDate = LocalDate.now();
        LocalDate startDate;
        
        if ("weekly".equalsIgnoreCase(period)) {
            startDate = endDate.minusDays(7);
        } else {
            startDate = endDate.minusDays(30);
        }
        
        List<Activity> activities = activityRepository.findByUserIdAndActivityDateBetween(
                user.getId(), startDate, endDate);
        
        int totalSteps = activities.stream().mapToInt(Activity::getSteps).sum();
        double totalDistance = activities.stream().mapToDouble(Activity::getDistance).sum();
        int totalCalories = activities.stream().mapToInt(Activity::getCaloriesBurned).sum();
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("period", period);
        summary.put("totalSteps", totalSteps);
        summary.put("totalDistance", totalDistance);
        summary.put("totalCalories", totalCalories);
        summary.put("activities", activities);
        
        return summary;
    }
}
