import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { goalService } from '../services/api';
import './Goals.css';

function Goals() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'DAILY',
    category: 'STEPS',
    targetValue: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await goalService.getAll();
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    // Auto-adjust end date based on type
    if (name === 'type') {
      const startDate = new Date(formData.startDate);
      if (value === 'DAILY') {
        updatedData.endDate = formData.startDate;
      } else if (value === 'WEEKLY') {
        const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        updatedData.endDate = endDate.toISOString().split('T')[0];
      }
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await goalService.update(editingId, formData);
        setMessage('Goal updated successfully!');
      } else {
        await goalService.create(formData);
        setMessage('Goal created successfully!');
      }
      resetForm();
      fetchGoals();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving goal');
    }
  };

  const handleEdit = (goal) => {
    setFormData({
      type: goal.type,
      category: goal.category,
      targetValue: goal.targetValue,
      startDate: goal.startDate,
      endDate: goal.endDate,
    });
    setEditingId(goal.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await goalService.delete(id);
        setMessage('Goal deleted successfully!');
        fetchGoals();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting goal');
      }
    }
  };

  const handleUpdateProgress = async (id, currentValue, targetValue) => {
    const progress = prompt(`Update progress (current: ${currentValue}, target: ${targetValue}):`);
    if (progress !== null) {
      try {
        await goalService.updateProgress(id, parseInt(progress));
        setMessage('Progress updated!');
        fetchGoals();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error updating progress');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'DAILY',
      category: 'STEPS',
      targetValue: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>My Goals</h1>
          <button className="btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Create Goal'}
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}

        {showForm && (
          <div className="form-card">
            <h2>{editingId ? 'Edit Goal' : 'Create New Goal'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Goal Type</label>
                  <select name="type" value={formData.type} onChange={handleChange} required>
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="STEPS">Steps</option>
                    <option value="DISTANCE">Distance (km)</option>
                    <option value="CALORIES">Calories</option>
                    <option value="WORKOUT_TIME">Workout Time (min)</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Target Value</label>
                  <input
                    type="number"
                    name="targetValue"
                    value={formData.targetValue}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn">
                  {editingId ? 'Update Goal' : 'Create Goal'}
                </button>
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="goals-container">
          {goals.length > 0 ? (
            goals.map(goal => (
              <div key={goal.id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
                <div className="goal-header">
                  <div>
                    <h3>{goal.category.replace('_', ' ')}</h3>
                    <span className="goal-type">{goal.type}</span>
                  </div>
                  <span className={`goal-status ${goal.completed ? 'completed' : 'active'}`}>
                    {goal.completed ? '✓ Completed' : 'In Progress'}
                  </span>
                </div>
                
                <div className="goal-progress-section">
                  <div className="progress-info">
                    <span className="progress-text">
                      {goal.currentValue} / {goal.targetValue}
                    </span>
                    <span className="progress-percentage">
                      {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${Math.min((goal.currentValue / goal.targetValue) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="goal-dates">
                  <span>📅 {goal.startDate} to {goal.endDate}</span>
                </div>

                <div className="goal-actions">
                  <button 
                    className="btn-progress" 
                    onClick={() => handleUpdateProgress(goal.id, goal.currentValue, goal.targetValue)}
                  >
                    Update Progress
                  </button>
                  <button className="btn-edit" onClick={() => handleEdit(goal)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(goal.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No goals yet. Create your first goal to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Goals;
