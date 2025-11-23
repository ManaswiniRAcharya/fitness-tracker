@echo off
echo ========================================
echo Fitness Tracker - Windows Setup Script
echo ========================================
echo.

echo Checking prerequisites...
echo.

echo [1/4] Checking Java...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)
echo Java: OK

echo [2/4] Checking Maven...
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Maven is not installed or not in PATH
    echo Please install Maven 3.6 or higher
    pause
    exit /b 1
)
echo Maven: OK

echo [3/4] Checking Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 16 or higher
    pause
    exit /b 1
)
echo Node.js: OK

echo [4/4] Checking npm...
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)
echo npm: OK

echo.
echo All prerequisites are installed!
echo.
echo ========================================
echo Setting up Backend...
echo ========================================
cd fitness-backend
echo Installing backend dependencies...
call mvn clean install -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Backend setup failed
    cd ..
    pause
    exit /b 1
)
cd ..
echo Backend setup complete!

echo.
echo ========================================
echo Setting up Frontend...
echo ========================================
cd fitness-frontend
echo Installing frontend dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend setup failed
    cd ..
    pause
    exit /b 1
)
cd ..
echo Frontend setup complete!

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo IMPORTANT: Before running the application:
echo 1. Make sure MySQL is running
echo 2. Create database: CREATE DATABASE fitness_tracker;
echo 3. Update credentials in fitness-backend/src/main/resources/application.properties if needed
echo.
echo To start the application:
echo 1. Run: start-backend.bat (in one terminal)
echo 2. Run: start-frontend.bat (in another terminal)
echo.
echo Or use: start-all.bat (to start both)
echo.
pause
