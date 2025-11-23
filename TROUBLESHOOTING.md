# Troubleshooting Guide - Fitness Tracker

## Common Issues and Solutions

### Backend Issues

#### 1. Backend won't start - Port 8080 already in use

**Error:**
```
Port 8080 is already in use
```

**Solution:**
- Find and kill the process using port 8080:
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or change port in application.properties
server.port=8081
```

#### 2. Database connection failed

**Error:**
```
Communications link failure
```

**Solutions:**
1. Verify MySQL is running:
   - Windows: Check Services for MySQL
   - Start MySQL service if stopped

2. Check database exists:
```sql
SHOW DATABASES;
CREATE DATABASE IF NOT EXISTS fitness_tracker;
```

3. Verify credentials in `application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

4. Check MySQL port (default 3306):
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/fitness_tracker
```

#### 3. Maven build fails

**Error:**
```
Failed to execute goal
```

**Solutions:**
1. Clean Maven cache:
```bash
mvn clean
mvn clean install -U
```

2. Delete `.m2` repository cache:
```bash
# Windows
rmdir /s /q %USERPROFILE%\.m2\repository
```

3. Check Java version:
```bash
java -version
# Should be 17 or higher
```

#### 4. Lombok not working

**Error:**
```
Cannot find symbol: method getName()
```

**Solution:**
1. Enable annotation processing in your IDE
2. Install Lombok plugin for your IDE
3. Rebuild project:
```bash
mvn clean install
```

#### 5. JWT Token errors

**Error:**
```
Invalid JWT signature
```

**Solutions:**
1. Clear browser localStorage
2. Login again to get new token
3. Check JWT secret in `application.properties`

### Frontend Issues

#### 1. Frontend won't start - Port 3000 in use

**Error:**
```
Port 3000 is already in use
```

**Solution:**
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
set PORT=3001 && npm start
```

#### 2. npm install fails

**Error:**
```
npm ERR! code ENOENT
```

**Solutions:**
1. Clear npm cache:
```bash
npm cache clean --force
```

2. Delete node_modules and reinstall:
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

3. Update npm:
```bash
npm install -g npm@latest
```

#### 3. API calls failing - CORS error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. Verify backend is running on port 8080
2. Check CORS configuration in `SecurityConfig.java`
3. Clear browser cache
4. Try in incognito mode

#### 4. Login not working - 401 Unauthorized

**Possible Causes:**
1. Backend not running
2. Wrong credentials
3. Database connection issue

**Solutions:**
1. Check backend console for errors
2. Verify user exists in database
3. Try registering new user
4. Check browser console for error details

#### 5. Charts not displaying

**Error:**
```
Chart.js error
```

**Solutions:**
1. Verify Chart.js is installed:
```bash
npm list chart.js react-chartjs-2
```

2. Reinstall if missing:
```bash
npm install chart.js react-chartjs-2
```

3. Check browser console for errors

#### 6. White screen / Blank page

**Solutions:**
1. Check browser console for errors
2. Verify all imports are correct
3. Clear browser cache
4. Rebuild:
```bash
npm run build
npm start
```

### Database Issues

#### 1. Tables not created automatically

**Solution:**
1. Check `application.properties`:
```properties
spring.jpa.hibernate.ddl-auto=update
```

2. Manually create tables (if needed):
```sql
USE fitness_tracker;
SHOW TABLES;
```

3. Check backend logs for Hibernate errors

#### 2. Data not persisting

**Solutions:**
1. Check transaction management
2. Verify database connection
3. Check for validation errors in backend logs

#### 3. Foreign key constraint fails

**Solution:**
1. Ensure parent entity exists before creating child
2. Check entity relationships in code
3. Verify cascade settings

### Authentication Issues

#### 1. Token expired

**Error:**
```
JWT token has expired
```

**Solution:**
- Login again to get new token
- Token expires after 24 hours (configurable in `application.properties`)

#### 2. Can't access protected routes

**Solutions:**
1. Verify token is stored in localStorage:
```javascript
console.log(localStorage.getItem('token'));
```

2. Check token format:
```javascript
// Should be: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Clear localStorage and login again:
```javascript
localStorage.clear();
```

### Build Issues

#### 1. Maven build takes too long

**Solution:**
```bash
# Skip tests during build
mvn clean install -DskipTests
```

#### 2. npm build fails

**Solutions:**
1. Increase Node memory:
```bash
set NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

2. Check for syntax errors in code

### Performance Issues

#### 1. Backend slow response

**Solutions:**
1. Check database indexes
2. Enable query logging:
```properties
spring.jpa.show-sql=true
```
3. Optimize queries in repositories

#### 2. Frontend slow loading

**Solutions:**
1. Check network tab in browser DevTools
2. Optimize API calls (reduce unnecessary requests)
3. Add loading states

## Debugging Tips

### Backend Debugging

1. **Enable debug logging:**
```properties
logging.level.com.fitness.tracker=DEBUG
```

2. **Check application logs:**
- Look for stack traces
- Check SQL queries
- Verify API endpoints being called

3. **Test API with Postman/curl:**
```bash
# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Frontend Debugging

1. **Browser DevTools:**
- Console: Check for JavaScript errors
- Network: Verify API calls
- Application: Check localStorage

2. **React DevTools:**
- Install React Developer Tools extension
- Inspect component state and props

3. **Add console logs:**
```javascript
console.log('API Response:', response.data);
console.log('Current State:', state);
```

## Getting Help

If you're still experiencing issues:

1. **Check the logs:**
   - Backend: Terminal where `mvn spring-boot:run` is running
   - Frontend: Browser console (F12)

2. **Verify prerequisites:**
   - Java 17+
   - Node.js 16+
   - MySQL 8.0+
   - Maven 3.6+

3. **Review documentation:**
   - README.md
   - API_DOCUMENTATION.md
   - QUICK_START.md

4. **Common fixes:**
   - Restart both backend and frontend
   - Clear browser cache and localStorage
   - Rebuild both projects
   - Check firewall settings

## Quick Reset

If everything is broken, try a complete reset:

```bash
# Backend
cd fitness-backend
mvn clean
mvn clean install
mvn spring-boot:run

# Frontend (in new terminal)
cd fitness-frontend
rmdir /s /q node_modules
del package-lock.json
npm install
npm start

# Database
mysql -u root -p
DROP DATABASE fitness_tracker;
CREATE DATABASE fitness_tracker;
```

## System Requirements Check

Run these commands to verify your setup:

```bash
# Java
java -version
# Should show: version "17" or higher

# Maven
mvn -version
# Should show: Apache Maven 3.6 or higher

# Node.js
node -v
# Should show: v16 or higher

# npm
npm -v
# Should show: 7 or higher

# MySQL
mysql --version
# Should show: mysql Ver 8.0 or higher
```

## Still Having Issues?

1. Check if all services are running:
   - MySQL: Port 3306
   - Backend: Port 8080
   - Frontend: Port 3000

2. Verify network connectivity:
   - Can you access http://localhost:8080?
   - Can you access http://localhost:3000?

3. Check system resources:
   - Sufficient RAM available
   - Disk space available
   - No antivirus blocking ports

4. Review error messages carefully:
   - Copy full error message
   - Search for specific error codes
   - Check stack trace for root cause
