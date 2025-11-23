# Fitness Tracker API Documentation

Base URL: `http://localhost:8080/api`

## Authentication Endpoints

### Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 25,
  "gender": "Male"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Login User
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Get User Profile
```
GET /auth/profile
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "gender": "Male",
  "createdAt": "2024-01-01T10:00:00",
  "updatedAt": "2024-01-01T10:00:00"
}
```

## Workout Endpoints

### Get All Workouts
```
GET /workouts
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "type": "Running",
    "duration": 30,
    "calories": 300,
    "workoutDate": "2024-01-15",
    "notes": "Morning run",
    "createdAt": "2024-01-15T08:00:00"
  }
]
```

### Get Workout by ID
```
GET /workouts/{id}
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "type": "Running",
  "duration": 30,
  "calories": 300,
  "workoutDate": "2024-01-15",
  "notes": "Morning run",
  "createdAt": "2024-01-15T08:00:00"
}
```

### Get Workouts by Date
```
GET /workouts/date/{date}
Authorization: Bearer {token}
Example: GET /workouts/date/2024-01-15

Response: 200 OK
[...]
```

### Create Workout
```
POST /workouts
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "type": "Running",
  "duration": 30,
  "calories": 300,
  "workoutDate": "2024-01-15",
  "notes": "Morning run"
}

Response: 200 OK
{
  "id": 1,
  "type": "Running",
  "duration": 30,
  "calories": 300,
  "workoutDate": "2024-01-15",
  "notes": "Morning run",
  "createdAt": "2024-01-15T08:00:00"
}
```

### Update Workout
```
PUT /workouts/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "type": "Running",
  "duration": 45,
  "calories": 450,
  "workoutDate": "2024-01-15",
  "notes": "Extended morning run"
}

Response: 200 OK
{...}
```

### Delete Workout
```
DELETE /workouts/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

## Activity Endpoints

### Get All Activities
```
GET /activities
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "steps": 10000,
    "distance": 8.0,
    "caloriesBurned": 400,
    "activityDate": "2024-01-15",
    "createdAt": "2024-01-15T20:00:00"
  }
]
```

### Get Today's Activity
```
GET /activities/today
Authorization: Bearer {token}

Response: 200 OK
{
  "id": 1,
  "steps": 10000,
  "distance": 8.0,
  "caloriesBurned": 400,
  "activityDate": "2024-01-15",
  "createdAt": "2024-01-15T20:00:00"
}
```

### Create Activity
```
POST /activities
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "steps": 10000,
  "distance": 8.0,
  "caloriesBurned": 400,
  "activityDate": "2024-01-15"
}

Response: 200 OK
{...}
```

### Get Activity Summary
```
GET /activities/summary?period=weekly
Authorization: Bearer {token}
Query Parameters: period (weekly or monthly)

Response: 200 OK
{
  "period": "weekly",
  "totalSteps": 70000,
  "totalDistance": 56.0,
  "totalCalories": 2800,
  "activities": [...]
}
```

## Goal Endpoints

### Get All Goals
```
GET /goals
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": 1,
    "type": "DAILY",
    "category": "STEPS",
    "targetValue": 10000,
    "currentValue": 5000,
    "startDate": "2024-01-15",
    "endDate": "2024-01-15",
    "completed": false,
    "createdAt": "2024-01-15T00:00:00"
  }
]
```

### Get Active Goals
```
GET /goals/active
Authorization: Bearer {token}

Response: 200 OK
[...]
```

### Create Goal
```
POST /goals
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "type": "DAILY",
  "category": "STEPS",
  "targetValue": 10000,
  "startDate": "2024-01-15",
  "endDate": "2024-01-15"
}

Response: 200 OK
{
  "id": 1,
  "type": "DAILY",
  "category": "STEPS",
  "targetValue": 10000,
  "currentValue": 0,
  "startDate": "2024-01-15",
  "endDate": "2024-01-15",
  "completed": false,
  "createdAt": "2024-01-15T00:00:00"
}
```

### Update Goal
```
PUT /goals/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "type": "DAILY",
  "category": "STEPS",
  "targetValue": 12000,
  "startDate": "2024-01-15",
  "endDate": "2024-01-15"
}

Response: 200 OK
{...}
```

### Update Goal Progress
```
PATCH /goals/{id}/progress
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "progress": 7500
}

Response: 200 OK
{
  "id": 1,
  "currentValue": 7500,
  "completed": false,
  ...
}
```

### Delete Goal
```
DELETE /goals/{id}
Authorization: Bearer {token}

Response: 204 No Content
```

## Error Responses

### 400 Bad Request
```json
{
  "field": "error message"
}
```

### 401 Unauthorized
```json
{
  "status": 401,
  "message": "Invalid email or password",
  "timestamp": "2024-01-15T10:00:00"
}
```

### 404 Not Found
```json
{
  "status": 404,
  "message": "Resource not found",
  "timestamp": "2024-01-15T10:00:00"
}
```

### 500 Internal Server Error
```json
{
  "status": 500,
  "message": "Internal server error",
  "timestamp": "2024-01-15T10:00:00"
}
```

## Authentication

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.

Include the JWT token in the Authorization header:
```
Authorization: Bearer {your-jwt-token}
```

The token is returned upon successful registration or login and expires after 24 hours.
