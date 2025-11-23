package com.fitness.tracker.controller;

import com.fitness.tracker.dto.ActivityRequest;
import com.fitness.tracker.entity.Activity;
import com.fitness.tracker.service.ActivityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityController {
    
    @Autowired
    private ActivityService activityService;
    
    @GetMapping
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(activityService.getAllActivities());
    }
    
    @GetMapping("/today")
    public ResponseEntity<Activity> getTodayActivity() {
        Activity activity = activityService.getTodayActivity();
        if (activity == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(activity);
    }
    
    @PostMapping
    public ResponseEntity<Activity> createActivity(@Valid @RequestBody ActivityRequest request) {
        return ResponseEntity.ok(activityService.createActivity(request));
    }
    
    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getSummary(@RequestParam(defaultValue = "weekly") String period) {
        return ResponseEntity.ok(activityService.getSummary(period));
    }
}
