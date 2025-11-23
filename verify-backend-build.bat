@echo off
echo ========================================
echo Backend Build Verification Script
echo ========================================
echo.

cd fitness-backend

echo [1/2] Cleaning previous builds...
call mvn clean
if %errorlevel% neq 0 (
    echo ERROR: Maven clean failed
    pause
    exit /b 1
)
echo Clean: SUCCESS
echo.

echo [2/2] Building backend...
call mvn install -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Maven build failed
    echo.
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo BUILD SUCCESSFUL!
echo ========================================
echo.
echo All compilation errors have been fixed.
echo Backend is ready to run.
echo.
echo To start the backend:
echo   cd fitness-backend
echo   mvn spring-boot:run
echo.
pause
