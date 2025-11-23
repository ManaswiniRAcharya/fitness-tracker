# Fitness Tracker Web Application

A complete full-stack fitness tracking application with user authentication, workout tracking, activity monitoring, and goal management.

## Tech Stack

**Backend:**
- Java Spring Boot 3.2.0
- Spring Security + JWT Authentication
- Spring Data JPA + Hibernate
- MySQL Database
- Maven

**Frontend:**
- React.js 18
- Axios for API calls
- Chart.js for data visualization
- React Router for navigation
- JWT token management

## Features

✅ User Authentication (Register/Login with JWT)
✅ Workout Tracking (CRUD operations)
✅ Activity Tracking (Steps, Distance, Calories)
✅ Goals System (Daily/Weekly targets)
✅ Dashboard with Charts & Statistics
✅ Responsive Modern UI

## Prerequisites

- Java 17 or higher
- Node.js 16+ and npm
- MySQL 8.0+
- Maven 3.6+

## Database Setup

1. Install MySQL and start the service
2. Create database:
```sql
CREATE DATABASE fitness_tracker;
```

3. Update credentials in `fitness-backend/src/main/resources/application.properties` if needed

## Backend Setup

1. Navigate to backend folder:
```bash
cd fitness-backend
```

2. Install dependencies and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

## Frontend Setup

1. Navigate to frontend folder:
```bash
cd fitness-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will start on: `http://localhost:3000`

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires JWT)

### Workout Endpoints

- `GET /api/workouts` - Get all workouts for logged-in user
- `GET /api/workouts/{id}` - Get workout by ID
- `POST /api/workouts` - Create new workout
- `PUT /api/workouts/{id}` - Update workout
- `DELETE /api/workouts/{id}` - Delete workout
- `GET /api/workouts/date/{date}` - Get workouts by date

### Activity Endpoints

- `GET /api/activities` - Get all activities
- `GET /api/activities/today` - Get today's activity
- `POST /api/activities` - Log new activity
- `GET /api/activities/summary` - Get weekly/monthly summary

### Goals Endpoints

- `GET /api/goals` - Get all goals
- `GET /api/goals/active` - Get active goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals/{id}` - Update goal
- `DELETE /api/goals/{id}` - Delete goal

## Default Test User

After starting the application, you can register a new user or use these test credentials if seeded:

- Email: test@example.com
- Password: password123

## Project Structure

### Backend Structure
```
fitness-backend/
├── src/main/java/com/fitness/tracker/
│   ├── config/          # Security & JWT configuration
│   ├── controller/      # REST Controllers
│   ├── dto/            # Data Transfer Objects
│   ├── entity/         # JPA Entities
│   ├── repository/     # JPA Repositories
│   ├── service/        # Business Logic
│   ├── security/       # JWT utilities
│   └── exception/      # Global Exception Handler
```

### Frontend Structure
```
fitness-frontend/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── utils/         # Helper functions
│   └── App.js         # Main app component
```

## License

MIT License
"# fitness-tracker" 
"# fitness_tracker_project" 
