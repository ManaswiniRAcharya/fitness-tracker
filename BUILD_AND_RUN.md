# 🚀 Build and Run Instructions - Fitness Tracker

## ✅ Backend is Now Fixed - Zero Compilation Errors

---

## Quick Start (3 Commands)

### 1. Create Database
```sql
CREATE DATABASE fitness_tracker;
```

### 2. Build & Start Backend
```bash
cd fitness-backend
mvn clean install
mvn spring-boot:run
```

### 3. Start Frontend (New Terminal)
```bash
cd fitness-frontend
npm install
npm start
```

---

## Detailed Instructions

### Step 1: Database Setup

**Start MySQL** and run:
```sql
CREATE DATABASE fitness_tracker;
```

**Verify:**
```sql
SHOW DATABASES;
-- Should show fitness_tracker
```

**Update credentials** (if needed):
Edit `fitness-backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

---

### Step 2: Build Backend

```bash
cd fitness-backend
mvn clean install
```

**Expected Output:**
```
[INFO] Scanning for projects...
[INFO] Building Fitness Tracker 1.0.0
[INFO] Compiling 30 source files to target/classes
[INFO] BUILD SUCCESS
[INFO] Total time: 15-30 seconds
```

**If you see BUILD SUCCESS:** ✅ Backend compiled successfully!

---

### Step 3: Run Backend

```bash
mvn spring-boot:run
```

**Expected Output:**
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

Started FitnessTrackerApplication in 5.234 seconds
Tomcat started on port(s): 8080 (http)
```

**If you see "Started FitnessTrackerApplication":** ✅ Backend is running!

**Backend URL:** http://localhost:8080
**API Base:** http://localhost:8080/api

---

### Step 4: Verify Backend

**Test the API:**
```bash
curl http://localhost:8080/api/auth/login
```

**Expected:** Should return 400 or 401 (endpoint is working, just needs credentials)

**Check Database Tables:**
```sql
USE fitness_tracker;
SHOW TABLES;
```

**Expected Tables:**
- users
- workouts
- activities
- goals

---

### Step 5: Start Frontend

**Open a NEW terminal:**
```bash
cd fitness-frontend
npm install
```

**Wait for installation to complete, then:**
```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view fitness-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

**Browser should automatically open:** http://localhost:3000

---

### Step 6: Test the Application

1. **Register a new user:**
   - Click "Register here"
   - Fill in: Name, Email, Password
   - Click "Register"

2. **You should be redirected to Dashboard** ✅

3. **Add a workout:**
   - Go to "Workouts"
   - Click "+ Add Workout"
   - Fill in details
   - Click "Add Workout"

4. **Log an activity:**
   - Go to "Activities"
   - Click "+ Log Activity"
   - Enter steps (distance/calories auto-calculate)
   - Click "Log Activity"

5. **Create a goal:**
   - Go to "Goals"
   - Click "+ Create Goal"
   - Set target
   - Click "Create Goal"

6. **View Dashboard:**
   - Go to "Dashboard"
   - See your stats and charts

---

## Using Windows Scripts

### First Time Setup:
```bash
setup-windows.bat
```

### Start Everything:
```bash
start-all.bat
```

This will:
1. Start backend in one window
2. Start frontend in another window
3. Open browser automatically

---

## Verification Checklist

### Backend Verification:
- [ ] MySQL is running
- [ ] Database `fitness_tracker` exists
- [ ] `mvn clean install` shows BUILD SUCCESS
- [ ] `mvn spring-boot:run` starts without errors
- [ ] Console shows "Started FitnessTrackerApplication"
- [ ] Port 8080 is accessible
- [ ] Database tables are created

### Frontend Verification:
- [ ] `npm install` completes successfully
- [ ] `npm start` compiles without errors
- [ ] Browser opens at http://localhost:3000
- [ ] Login page displays
- [ ] No console errors in browser (F12)

### Integration Verification:
- [ ] Can register a new user
- [ ] Can login with credentials
- [ ] Redirected to dashboard after login
- [ ] Can add workouts
- [ ] Can log activities
- [ ] Can create goals
- [ ] Dashboard shows data
- [ ] Charts display correctly

---

## Troubleshooting

### Backend won't build:
```bash
# Clean everything
cd fitness-backend
mvn clean

# Rebuild
mvn clean install -U

# If still fails, check:
java -version  # Should be 17+
mvn -version   # Should be 3.6+
```

### Backend won't start:
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080

# Check MySQL is running
# Check database exists
mysql -u root -p
SHOW DATABASES;
```

### Frontend won't start:
```bash
# Clear cache
cd fitness-frontend
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install
npm start
```

### Can't connect to backend:
1. Verify backend is running (check console)
2. Check http://localhost:8080 in browser
3. Check CORS settings in SecurityConfig.java
4. Clear browser cache

---

## Expected Behavior

### After Registration:
✅ User created in database
✅ JWT token generated
✅ Token stored in localStorage
✅ Redirected to dashboard
✅ Navbar shows "Hello, [Your Name]"

### After Adding Workout:
✅ Workout saved in database
✅ Appears in workouts list
✅ Dashboard updates with new data
✅ Charts reflect new workout

### After Logging Activity:
✅ Activity saved in database
✅ Appears in activity history
✅ Weekly summary updates
✅ Dashboard shows new stats

### After Creating Goal:
✅ Goal saved in database
✅ Appears in goals list
✅ Progress bar shows 0%
✅ Dashboard shows active goal

---

## URLs Reference

**Backend:**
- Server: http://localhost:8080
- API Base: http://localhost:8080/api
- Health: http://localhost:8080/actuator/health (if enabled)

**Frontend:**
- App: http://localhost:3000
- Login: http://localhost:3000/login
- Register: http://localhost:3000/register
- Dashboard: http://localhost:3000/dashboard

**Database:**
- Host: localhost
- Port: 3306
- Database: fitness_tracker

---

## Success Indicators

### Backend Running Successfully:
```
✅ Console shows: "Started FitnessTrackerApplication"
✅ No exceptions in console
✅ Port 8080 is listening
✅ Database tables created
```

### Frontend Running Successfully:
```
✅ Browser opens automatically
✅ Login page displays
✅ No errors in browser console
✅ Can navigate between pages
```

### Full Integration Working:
```
✅ Can register and login
✅ Can add workouts/activities/goals
✅ Data persists in database
✅ Dashboard shows real data
✅ Charts display correctly
```

---

## You're Ready! 🎉

Your Fitness Tracker is now:
- ✅ Fully compiled
- ✅ Zero errors
- ✅ Ready to run
- ✅ Production ready

**Start tracking your fitness journey!** 💪

---

For more help, see:
- `FINAL_BACKEND_STATUS.md` - Complete verification report
- `TROUBLESHOOTING.md` - Detailed troubleshooting
- `API_DOCUMENTATION.md` - API reference
- `QUICK_START.md` - Quick setup guide
