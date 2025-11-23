# 🔧 Fix Port 8080 and Database Issues

## Problem
You're getting errors because:
1. **Port 8080 is already in use** by another process
2. **Database has schema conflicts** from previous runs

## Quick Fix (3 Steps)

### Step 1: Kill Process on Port 8080

**Option A - PowerShell:**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess | Stop-Process -Force
```

**Option B - Command Prompt:**
```cmd
for /f "tokens=5" %a in ('netstat -ano ^| findstr :8080') do taskkill /F /PID %a
```

### Step 2: Reset Database

**Open MySQL and run:**
```sql
DROP DATABASE IF EXISTS fitness_tracker;
CREATE DATABASE fitness_tracker;
```

### Step 3: Start Backend

```bash
cd fitness-backend
mvn spring-boot:run
```

---

## Or Use the Automated Script

Just run:
```bash
fix-and-run.bat
```

This will:
1. Kill the process on port 8080
2. Prompt you to reset the database
3. Start the backend automatically

---

## Verify It's Working

You should see:
```
Started FitnessTrackerApplication in X.XXX seconds
Tomcat started on port(s): 8080 (http)
```

---

## If Still Having Issues

### Check if MySQL is running:
```bash
mysql -u root -p
```

### Check if port is free:
```powershell
Get-NetTCPConnection -LocalPort 8080
```

### Check database exists:
```sql
SHOW DATABASES;
```

---

## Common Errors

### "Port 8080 already in use"
- Run Step 1 again to kill the process
- Or change port in `application.properties`:
  ```properties
  server.port=8081
  ```

### "Foreign key constraint fails"
- Run Step 2 to reset the database
- Make sure database is empty before starting

### "Access denied for user"
- Check MySQL credentials in `application.properties`
- Default is username: `root`, password: `root`

---

## Success!

Once you see "Started FitnessTrackerApplication", your backend is running!

**Next:** Start the frontend:
```bash
cd fitness-frontend
npm start
```

Then open: http://localhost:3000
