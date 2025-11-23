@echo off
echo ========================================
echo Starting Fitness Tracker Application
echo ========================================
echo.
echo Starting Backend in new window...
start "Fitness Tracker Backend" cmd /k start-backend.bat

echo Waiting 10 seconds for backend to initialize...
timeout /t 10 /nobreak

echo Starting Frontend in new window...
start "Fitness Tracker Frontend" cmd /k start-frontend.bat

echo.
echo ========================================
echo Both services are starting!
echo ========================================
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Check the opened windows for logs
echo.
pause
