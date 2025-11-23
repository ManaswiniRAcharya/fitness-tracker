# Quick Start Guide - Fitness Tracker

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17 or higher (`java -version`)
- ✅ Maven 3.6+ (`mvn -version`)
- ✅ Node.js 16+ and npm (`node -version` && `npm -version`)
- ✅ MySQL 8.0+ (running on port 3306)

## Step 1: Database Setup (5 minutes)

1. Start MySQL server
2. Open MySQL command line or workbench
3. Create the database:
```sql
CREATE DATABASE fitness_tracker;
```

4. (Optional) Update database credentials in `fitness-backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=root
```

## Step 2: Start Backend (2 minutes)

Open a terminal and run:

```bash
cd fitness-backend
mvn clean install
mvn spring-boot:run
```

Wait for the message: `Started FitnessTrackerApplication`

Backend is now running on: **http://localhost:8080**

## Step 3: Start Frontend (2 minutes)

Open a NEW terminal and run:

```bash
cd fitness-frontend
npm install
npm start
```

Frontend will automatically open in your browser at: **http://localhost:3000**

## Step 4: Use the Application

### First Time Setup:
1. Click "Register here" on the login page
2. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (minimum 6 characters)
   - Age: (optional)
   - Gender: (optional)
3. Click "Register"

You'll be automatically logged in and redirected to the Dashboard!

### Explore Features:

**Dashboard** - View your fitness overview with charts and statistics

**Workouts** - Track your exercises:
- Click "+ Add Workout"
- Enter workout type (Running, Gym, Cycling, etc.)
- Set duration and calories
- Add optional notes
- View, edit, or delete workouts

**Activities** - Log daily activities:
- Click "+ Log Activity"
- Enter steps (auto-calculates distance and calories)
- View weekly summary
- Track your progress over time

**Goals** - Set and track fitness goals:
- Click "+ Create Goal"
- Choose type (Daily/Weekly)
- Select category (Steps, Distance, Calories, Workout Time)
- Set target value
- Update progress as you achieve milestones

**Profile** - View your account information and statistics

## Troubleshooting

### Backend won't start:
- Check if MySQL is running
- Verify database `fitness_tracker` exists
- Check port 8080 is not in use

### Frontend won't start:
- Delete `node_modules` folder and run `npm install` again
- Check port 3000 is not in use
- Clear browser cache

### Can't login:
- Ensure backend is running (check http://localhost:8080)
- Check browser console for errors
- Try registering a new account

### Database connection error:
- Verify MySQL credentials in `application.properties`
- Ensure MySQL service is running
- Check firewall settings

## Default Configuration

**Backend:**
- Port: 8080
- Database: fitness_tracker
- JWT Expiration: 24 hours

**Frontend:**
- Port: 3000
- API URL: http://localhost:8080/api

## Next Steps

1. ✅ Add your first workout
2. ✅ Log today's activity
3. ✅ Create a fitness goal
4. ✅ Check your dashboard for insights

## Need Help?

- Check `API_DOCUMENTATION.md` for API details
- Review `README.md` for full documentation
- Check browser console for frontend errors
- Check terminal logs for backend errors

Enjoy tracking your fitness journey! 💪
