@echo off
echo ========================================
echo Fixing and Starting Fitness Tracker
echo ========================================
echo.

echo [Step 1] Killing any process on port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
    taskkill /F /PID %%a 2>nul
)
echo Port 8080 cleared.
echo.

echo [Step 2] Please run this SQL command in MySQL:
echo.
echo DROP DATABASE IF EXISTS fitness_tracker;
echo CREATE DATABASE fitness_tracker;
echo.
echo Press any key after running the SQL command...
pause
echo.

echo [Step 3] Starting backend...
cd fitness-backend
start "Fitness Backend" cmd /k "mvn spring-boot:run"
echo.

echo Backend is starting in a new window.
echo Wait for "Started FitnessTrackerApplication" message.
echo.
echo Then you can start the frontend with:
echo   cd fitness-frontend
echo   npm start
echo.
pause
