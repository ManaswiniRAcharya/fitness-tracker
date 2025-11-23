import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { workoutService, activityService, goalService } from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    totalSteps: 0,
    activeGoals: 0,
  });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [activitySummary, setActivitySummary] = useState(null);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [workoutsRes, activityRes, goalsRes] = await Promise.all([
        workoutService.getAll(),
        activityService.getSummary('weekly'),
        goalService.getActive(),
      ]);

      setRecentWorkouts(workoutsRes.data.slice(0, 5));
      setActivitySummary(activityRes.data);
      setGoals(goalsRes.data);

      setStats({
        totalWorkouts: workoutsRes.data.length,
        totalCalories: workoutsRes.data.reduce((sum, w) => sum + w.calories, 0),
        totalSteps: activityRes.data.totalSteps,
        activeGoals: goalsRes.data.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const workoutChartData = {
    labels: recentWorkouts.map(w => w.workoutDate).reverse(),
    datasets: [{
      label: 'Calories Burned',
      data: recentWorkouts.map(w => w.calories).reverse(),
      backgroundColor: 'rgba(102, 126, 234, 0.6)',
      borderColor: 'rgba(102, 126, 234, 1)',
      borderWidth: 2,
    }],
  };

  const activityChartData = activitySummary ? {
    labels: activitySummary.activities.map(a => a.activityDate),
    datasets: [{
      label: 'Steps',
      data: activitySummary.activities.map(a => a.steps),
      borderColor: 'rgb(118, 75, 162)',
      backgroundColor: 'rgba(118, 75, 162, 0.2)',
      tension: 0.4,
    }],
  } : null;

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🏋️</div>
            <div className="stat-info">
              <h3>{stats.totalWorkouts}</h3>
              <p>Total Workouts</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <h3>{stats.totalCalories}</h3>
              <p>Calories Burned</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">👟</div>
            <div className="stat-info">
              <h3>{stats.totalSteps.toLocaleString()}</h3>
              <p>Total Steps</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <h3>{stats.activeGoals}</h3>
              <p>Active Goals</p>
            </div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h2>Recent Workout Calories</h2>
            {recentWorkouts.length > 0 ? (
              <Bar data={workoutChartData} options={{ responsive: true, maintainAspectRatio: true }} />
            ) : (
              <p className="no-data">No workout data available</p>
            )}
          </div>
          
          <div className="chart-card">
            <h2>Weekly Steps Activity</h2>
            {activityChartData ? (
              <Line data={activityChartData} options={{ responsive: true, maintainAspectRatio: true }} />
            ) : (
              <p className="no-data">No activity data available</p>
            )}
          </div>
        </div>

        <div className="goals-section">
          <h2>Active Goals</h2>
          {goals.length > 0 ? (
            <div className="goals-list">
              {goals.map(goal => (
                <div key={goal.id} className="goal-item">
                  <div className="goal-header">
                    <h3>{goal.category} - {goal.type}</h3>
                    <span className={goal.completed ? 'completed' : 'active'}>
                      {goal.completed ? '✓ Completed' : 'In Progress'}
                    </span>
                  </div>
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span>{goal.currentValue} / {goal.targetValue}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No active goals. Create one to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
