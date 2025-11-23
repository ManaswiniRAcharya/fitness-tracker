-- Reset Database Script
DROP DATABASE IF EXISTS fitness_tracker;
CREATE DATABASE fitness_tracker;
USE fitness_tracker;

-- Database is now clean and ready for Spring Boot to create tables
SELECT 'Database reset successfully!' AS Status;
