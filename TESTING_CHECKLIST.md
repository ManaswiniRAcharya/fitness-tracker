# ✅ Testing Checklist - Fitness Tracker

## Quick Test Guide

Use this checklist to manually test the application after setup.

---

## Prerequisites ✅

- [ ] MySQL installed and running
- [ ] Database `fitness_tracker` created
- [ ] Java 17+ installed
- [ ] Maven 3.6+ installed
- [ ] Node.js 16+ installed
- [ ] npm installed

---

## Backend Tests

### 1. Backend Startup Test
```bash
cd fitness-backend
mvn spring-boot:run
```

**Expected Results:**
- [ ] No compilation errors
- [ ] Server starts on port 8080
- [ ] Message: "Started FitnessTrackerApplication"
- [ ] No exceptions in console
- [ ] Database tables auto-created

**Check Database:**
```sql
USE fitness_tracker;
SHOW TABLES;
-- Should show: users, workouts, activities, goals
```

---

## Frontend Tests

### 2. Frontend Startup Test
```bash
cd fitness-frontend
npm install
npm start
```

**Expected Results:**
- [ ] No npm errors
- [ ] Browser opens at http://localhost:3000
- [ ] Login page displays
- [ ] No console errors in browser (F12)

---

## Authentication Tests

### 3. User Registration Test
**Steps:**
1. Click "Register here"
2. Fill form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Age: 25
   - Gender: Male
3. Click "Register"

**Expected Results:**
- [ ] No validation errors
- [ ] Success message or redirect
- [ ] Redirected to dashboard
- [ ] User logged in automatically
- [ ] Navbar shows "Hello, Test User"

**Verify in Database:**
```sql
SELECT * FROM users WHERE email = 'test@example.com';
-- Should show 1 user with hashed password
```

### 4. User Login Test
**Steps:**
1. Logout (click Logout button)
2. Enter credentials:
   - Email: test@example.com
   - Password: password123
3. Click "Login"

**Expected Results:**
- [ ] No errors
- [ ] Redirected to dashboard
- [ ] Token stored in localStorage
- [ ] User data stored in localStorage

**Check Browser Storage:**
- Open DevTools (F12) → Application → Local Storage
- [ ] `token` key exists with JWT value
- [ ] `user` key exists with user data

---

## Workout Tests

### 5. Add Workout Test
**Steps:**
1. Go to "Workouts" page
2. Click "+ Add Workout"
3. Fill form:
   - Type: Running
   - Duration: 30
   - Calories: 300
   - Date: Today's date
   - Notes: Morning run
4. Click "Add Workout"

**Expected Results:**
- [ ] Success message appears
- [ ] Form closes
- [ ] New workout appears in list
- [ ] Workout card shows all details

**Verify in Database:**
```sql
SELECT * FROM workouts WHERE user_id = 1;
-- Should show 1 workout
```

### 6. Edit Workout Test
**Steps:**
1. Click "Edit" on a workout
2. Change duration to 45
3. Click "Update Workout"

**Expected Results:**
- [ ] Success message
- [ ] Workout updated in list
- [ ] New duration displayed

### 7. Delete Workout Test
**Steps:**
1. Click "Delete" on a workout
2. Confirm deletion

**Expected Results:**
- [ ] Confirmation dialog appears
- [ ] Workout removed from list
- [ ] Success message

---

## Activity Tests

### 8. Log Activity Test
**Steps:**
1. Go to "Activities" page
2. Click "+ Log Activity"
3. Enter steps: 10000
4. Observe auto-calculated values
5. Click "Log Activity"

**Expected Results:**
- [ ] Distance auto-calculated (~8 km)
- [ ] Calories auto-calculated (~400)
- [ ] Success message
- [ ] Activity appears in history
- [ ] Weekly summary updates

**Verify in Database:**
```sql
SELECT * FROM activities WHERE user_id = 1;
-- Should show 1 activity
```

### 9. Activity Summary Test
**Steps:**
1. View weekly summary section

**Expected Results:**
- [ ] Total steps displayed
- [ ] Total distance displayed
- [ ] Total calories displayed
- [ ] Statistics cards visible

---

## Goal Tests

### 10. Create Goal Test
**Steps:**
1. Go to "Goals" page
2. Click "+ Create Goal"
3. Fill form:
   - Type: Daily
   - Category: Steps
   - Target: 10000
   - Start Date: Today
   - End Date: Today
4. Click "Create Goal"

**Expected Results:**
- [ ] Success message
- [ ] Goal appears in list
- [ ] Progress bar at 0%
- [ ] Status: "In Progress"

**Verify in Database:**
```sql
SELECT * FROM goals WHERE user_id = 1;
-- Should show 1 goal
```

### 11. Update Goal Progress Test
**Steps:**
1. Click "Update Progress" on a goal
2. Enter progress: 5000
3. Confirm

**Expected Results:**
- [ ] Progress bar updates to 50%
- [ ] Current value shows 5000
- [ ] Still "In Progress"

### 12. Complete Goal Test
**Steps:**
1. Update progress to 10000 or more

**Expected Results:**
- [ ] Progress bar at 100%
- [ ] Status changes to "Completed"
- [ ] Green badge displayed

---

## Dashboard Tests

### 13. Dashboard Display Test
**Steps:**
1. Go to "Dashboard" page
2. Observe all sections

**Expected Results:**
- [ ] Statistics cards show correct numbers
- [ ] Workout calories chart displays
- [ ] Weekly steps chart displays
- [ ] Active goals section shows goals
- [ ] Progress bars visible
- [ ] No console errors

### 14. Dashboard Data Test
**Steps:**
1. Add more workouts and activities
2. Return to dashboard

**Expected Results:**
- [ ] Statistics update automatically
- [ ] Charts reflect new data
- [ ] Recent workouts list updates

---

## Profile Tests

### 15. Profile Display Test
**Steps:**
1. Go to "Profile" page

**Expected Results:**
- [ ] User name displayed
- [ ] Email displayed
- [ ] Age displayed (if provided)
- [ ] Gender displayed (if provided)
- [ ] Member since date shown
- [ ] Avatar with initial
- [ ] Account statistics visible

---

## Navigation Tests

### 16. Navigation Test
**Steps:**
1. Click each menu item
2. Verify page loads

**Expected Results:**
- [ ] Dashboard link works
- [ ] Workouts link works
- [ ] Activities link works
- [ ] Goals link works
- [ ] Profile link works
- [ ] No broken links

### 17. Protected Route Test
**Steps:**
1. Logout
2. Try to access http://localhost:3000/dashboard directly

**Expected Results:**
- [ ] Redirected to login page
- [ ] Cannot access without authentication

---

## Error Handling Tests

### 18. Invalid Login Test
**Steps:**
1. Try to login with wrong password

**Expected Results:**
- [ ] Error message displayed
- [ ] Not logged in
- [ ] Stays on login page

### 19. Validation Test
**Steps:**
1. Try to submit empty forms

**Expected Results:**
- [ ] Validation errors shown
- [ ] Form not submitted
- [ ] Required field messages

### 20. Network Error Test
**Steps:**
1. Stop backend server
2. Try to add a workout

**Expected Results:**
- [ ] Error message displayed
- [ ] User notified of connection issue

---

## API Tests (Optional - Using Browser DevTools)

### 21. API Call Verification
**Steps:**
1. Open DevTools (F12) → Network tab
2. Perform any action (add workout)
3. Observe network requests

**Expected Results:**
- [ ] Request to http://localhost:8080/api/...
- [ ] Authorization header with Bearer token
- [ ] Status 200 or 201 for success
- [ ] JSON response received

---

## Responsive Design Tests

### 22. Mobile View Test
**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select mobile device (iPhone, Android)
4. Navigate through pages

**Expected Results:**
- [ ] Layout adapts to mobile
- [ ] Navigation collapses
- [ ] Forms stack vertically
- [ ] Buttons are touch-friendly
- [ ] No horizontal scroll

---

## Final Verification

### 23. Complete Flow Test
**Steps:**
1. Register new user
2. Add 3 workouts
3. Log 2 activities
4. Create 2 goals
5. Update goal progress
6. View dashboard
7. Check profile
8. Logout
9. Login again

**Expected Results:**
- [ ] All data persists
- [ ] Dashboard shows correct stats
- [ ] Charts display data
- [ ] Profile shows correct info
- [ ] Can logout and login
- [ ] All features work end-to-end

---

## Test Results Summary

**Date Tested:** _______________
**Tested By:** _______________

**Total Tests:** 23
**Passed:** _____ / 23
**Failed:** _____ / 23

**Overall Status:** ⬜ PASS  ⬜ FAIL

**Notes:**
_________________________________
_________________________________
_________________________________

---

## If Tests Fail

1. Check `TROUBLESHOOTING.md`
2. Verify MySQL is running
3. Check backend console for errors
4. Check browser console for errors
5. Verify all prerequisites installed
6. Review `QA_TEST_REPORT.md`

---

**All tests should PASS if setup is correct! ✅**
