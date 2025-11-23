import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { activityService } from '../services/api';
import './Activities.css';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [summary, setSummary] = useState(null);
  const [formData, setFormData] = useState({
    steps: '',
    distance: '',
    caloriesBurned: '',
    activityDate: new Date().toISOString().split('T')[0],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchActivities();
    fetchSummary();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await activityService.getAll();
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await activityService.getSummary('weekly');
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // Auto-calculate calories based on steps (rough estimate: 0.04 calories per step)
    if (name === 'steps') {
      updatedData.caloriesBurned = Math.round(value * 0.04);
    }

    // Auto-calculate distance based on steps (rough estimate: 0.0008 km per step)
    if (name === 'steps') {
      updatedData.distance = (value * 0.0008).toFixed(2);
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await activityService.create(formData);
      setMessage('Activity logged successfully!');
      resetForm();
      fetchActivities();
      fetchSummary();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging activity');
    }
  };

  const resetForm = () => {
    setFormData({
      steps: '',
      distance: '',
      caloriesBurned: '',
      activityDate: new Date().toISOString().split('T')[0],
    });
    setShowForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>Activity Tracking</h1>
          <button className="btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Log Activity'}
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}

        {summary && (
          <div className="summary-card">
            <h2>Weekly Summary</h2>
            <div className="summary-stats">
              <div className="summary-item">
                <div className="summary-icon">👟</div>
                <div className="summary-info">
                  <h3>{summary.totalSteps.toLocaleString()}</h3>
                  <p>Total Steps</p>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">📏</div>
                <div className="summary-info">
                  <h3>{summary.totalDistance.toFixed(2)} km</h3>
                  <p>Total Distance</p>
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-icon">🔥</div>
                <div className="summary-info">
                  <h3>{summary.totalCalories}</h3>
                  <p>Calories Burned</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="form-card">
            <h2>Log Daily Activity</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Steps</label>
                  <input
                    type="number"
                    name="steps"
                    value={formData.steps}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Distance (km)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Calories Burned</label>
                  <input
                    type="number"
                    name="caloriesBurned"
                    value={formData.caloriesBurned}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="activityDate"
                    value={formData.activityDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn">Log Activity</button>
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="activities-list">
          <h2>Activity History</h2>
          {activities.length > 0 ? (
            <div className="activity-grid">
              {activities.map(activity => (
                <div key={activity.id} className="activity-card">
                  <div className="activity-date">{activity.activityDate}</div>
                  <div className="activity-stats">
                    <div className="activity-stat">
                      <span className="stat-label">Steps</span>
                      <span className="stat-value">{activity.steps.toLocaleString()}</span>
                    </div>
                    <div className="activity-stat">
                      <span className="stat-label">Distance</span>
                      <span className="stat-value">{activity.distance} km</span>
                    </div>
                    <div className="activity-stat">
                      <span className="stat-label">Calories</span>
                      <span className="stat-value">{activity.caloriesBurned}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No activities logged yet. Start tracking today!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
