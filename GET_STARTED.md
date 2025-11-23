# 🚀 Get Started in 5 Minutes

## What You Have

A **complete, production-ready** Fitness Tracker application with:
- ✅ Spring Boot REST API backend
- ✅ React frontend with modern UI
- ✅ MySQL database integration
- ✅ JWT authentication
- ✅ Full CRUD operations
- ✅ Charts and analytics
- ✅ Responsive design

## Prerequisites (Install These First)

1. **Java 17+** - [Download](https://www.oracle.com/java/technologies/downloads/)
2. **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
3. **Node.js 16+** - [Download](https://nodejs.org/)
4. **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)

## Quick Setup (3 Steps)

### Step 1: Setup Database (1 minute)
```sql
-- Open MySQL command line or workbench
CREATE DATABASE fitness_tracker;
```

### Step 2: Start Backend (1 minute)
```bash
cd fitness-backend
mvn spring-boot:run
```
Wait for: `Started FitnessTrackerApplication`

### Step 3: Start Frontend (1 minute)
```bash
# Open NEW terminal
cd fitness-frontend
npm install
npm start
```
Browser opens automatically at http://localhost:3000

## First Use

1. **Register** a new account
   - Click "Register here"
   - Fill in your details
   - Click "Register"

2. **Explore Dashboard**
   - View your fitness overview
   - See charts and statistics

3. **Add Your First Workout**
   - Go to "Workouts"
   - Click "+ Add Workout"
   - Enter details and save

4. **Log Today's Activity**
   - Go to "Activities"
   - Click "+ Log Activity"
   - Enter steps (auto-calculates distance/calories)

5. **Create a Goal**
   - Go to "Goals"
   - Click "+ Create Goal"
   - Set your target and track progress

## Using Windows Scripts

### First Time Setup:
```bash
setup-windows.bat
```

### Start Application:
```bash
start-all.bat
```

This opens two windows:
- Backend (Spring Boot)
- Frontend (React)

## Project Structure

```
fitness-tracker/
├── fitness-backend/     → Spring Boot API (Port 8080)
├── fitness-frontend/    → React UI (Port 3000)
├── README.md           → Full documentation
├── QUICK_START.md      → Detailed setup guide
└── API_DOCUMENTATION.md → API reference
```

## Key URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8080/api
- **Database:** localhost:3306/fitness_tracker

## Features Overview

### 🔐 Authentication
- Secure registration and login
- JWT token-based auth
- Password hashing with BCrypt

### 🏋️ Workout Tracking
- Add workouts with type, duration, calories
- Edit and delete workouts
- View workout history
- Filter by date

### 📊 Activity Tracking
- Log daily steps, distance, calories
- Auto-calculation from steps
- Weekly/monthly summaries
- Activity history

### 🎯 Goals System
- Create daily/weekly goals
- Track progress with visual bars
- Multiple categories (steps, distance, calories, workout time)
- Goal completion tracking

### 📈 Dashboard
- Overview statistics
- Interactive charts (Chart.js)
- Recent workouts
- Active goals progress

### 👤 Profile
- View account information
- See total statistics
- Member since date

## API Endpoints

**Authentication:**
- POST `/api/auth/register` - Register
- POST `/api/auth/login` - Login
- GET `/api/auth/profile` - Get profile

**Workouts:**
- GET/POST/PUT/DELETE `/api/workouts`

**Activities:**
- GET/POST `/api/activities`
- GET `/api/activities/summary`

**Goals:**
- GET/POST/PUT/DELETE `/api/goals`
- PATCH `/api/goals/{id}/progress`

See `API_DOCUMENTATION.md` for complete details.

## Configuration

### Backend (application.properties)
```properties
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/fitness_tracker
spring.datasource.username=root
spring.datasource.password=root
```

### Frontend (src/services/api.js)
```javascript
const API_URL = 'http://localhost:8080/api';
```

## Common Commands

### Backend
```bash
cd fitness-backend
mvn clean install          # Build
mvn spring-boot:run        # Run
mvn clean                  # Clean build files
```

### Frontend
```bash
cd fitness-frontend
npm install                # Install dependencies
npm start                  # Development server
npm run build              # Production build
```

### Database
```sql
USE fitness_tracker;
SHOW TABLES;              # View tables
SELECT * FROM users;      # View users
```

## Testing the Application

1. **Register a user:**
   - Name: Test User
   - Email: test@example.com
   - Password: password123

2. **Add a workout:**
   - Type: Running
   - Duration: 30 minutes
   - Calories: 300

3. **Log activity:**
   - Steps: 10000
   - Distance: 8 km (auto-calculated)
   - Calories: 400 (auto-calculated)

4. **Create a goal:**
   - Type: Daily
   - Category: Steps
   - Target: 10000

5. **Check dashboard:**
   - View statistics
   - See charts
   - Track progress

## Troubleshooting

**Backend won't start?**
- Check MySQL is running
- Verify database exists
- Check port 8080 is free

**Frontend won't start?**
- Run `npm install` first
- Check port 3000 is free
- Clear npm cache: `npm cache clean --force`

**Can't login?**
- Ensure backend is running
- Check browser console for errors
- Try registering a new account

See `TROUBLESHOOTING.md` for detailed solutions.

## Next Steps

1. ✅ **Customize** - Modify colors, add features
2. ✅ **Deploy** - Host on cloud (AWS, Heroku, etc.)
3. ✅ **Extend** - Add nutrition tracking, social features
4. ✅ **Mobile** - Create React Native app

## Documentation Files

- `README.md` - Main documentation
- `QUICK_START.md` - Detailed setup guide
- `API_DOCUMENTATION.md` - Complete API reference
- `PROJECT_SUMMARY.md` - Project overview
- `TROUBLESHOOTING.md` - Common issues and fixes
- `FILE_STRUCTURE.txt` - Complete file listing
- `GET_STARTED.md` - This file

## Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- MySQL
- Maven

**Frontend:**
- React 18
- React Router DOM
- Axios
- Chart.js
- CSS3

## Support

If you need help:
1. Check documentation files
2. Review error messages in console
3. Check `TROUBLESHOOTING.md`
4. Verify all prerequisites are installed

## Success Checklist

- [ ] MySQL running and database created
- [ ] Backend started successfully (port 8080)
- [ ] Frontend started successfully (port 3000)
- [ ] Can access http://localhost:3000
- [ ] Can register a new user
- [ ] Can login successfully
- [ ] Can add a workout
- [ ] Can log an activity
- [ ] Can create a goal
- [ ] Dashboard shows data

## You're Ready! 🎉

Your complete fitness tracker is ready to use. Start tracking your fitness journey today!

**Happy Coding! 💪**
