import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { workoutService } from '../services/api';
import './Workouts.css';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    calories: '',
    workoutDate: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await workoutService.getAll();
      setWorkouts(response.data);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await workoutService.update(editingId, formData);
        setMessage('Workout updated successfully!');
      } else {
        await workoutService.create(formData);
        setMessage('Workout added successfully!');
      }
      resetForm();
      fetchWorkouts();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving workout');
    }
  };

  const handleEdit = (workout) => {
    setFormData({
      type: workout.type,
      duration: workout.duration,
      calories: workout.calories,
      workoutDate: workout.workoutDate,
      notes: workout.notes || '',
    });
    setEditingId(workout.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await workoutService.delete(id);
        setMessage('Workout deleted successfully!');
        fetchWorkouts();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting workout');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      type: '',
      duration: '',
      calories: '',
      workoutDate: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="page-header">
          <h1>My Workouts</h1>
          <button className="btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : '+ Add Workout'}
          </button>
        </div>

        {message && <div className="success-message">{message}</div>}

        {showForm && (
          <div className="form-card">
            <h2>{editingId ? 'Edit Workout' : 'Add New Workout'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Workout Type</label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    placeholder="e.g., Running, Cycling, Gym"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
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
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="workoutDate"
                    value={formData.workoutDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes (optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Add any notes about your workout..."
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn">
                  {editingId ? 'Update Workout' : 'Add Workout'}
                </button>
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="workouts-list">
          {workouts.length > 0 ? (
            workouts.map(workout => (
              <div key={workout.id} className="workout-card">
                <div className="workout-header">
                  <h3>{workout.type}</h3>
                  <span className="workout-date">{workout.workoutDate}</span>
                </div>
                <div className="workout-details">
                  <div className="detail-item">
                    <span className="detail-label">Duration:</span>
                    <span className="detail-value">{workout.duration} min</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Calories:</span>
                    <span className="detail-value">{workout.calories} kcal</span>
                  </div>
                </div>
                {workout.notes && (
                  <p className="workout-notes">{workout.notes}</p>
                )}
                <div className="workout-actions">
                  <button className="btn-edit" onClick={() => handleEdit(workout)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(workout.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No workouts yet. Add your first workout!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
