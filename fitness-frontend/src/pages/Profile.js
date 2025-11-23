import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { authService } from '../services/api';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authService.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="page-container">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <h1>My Profile</h1>
        
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <div className="profile-info">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            {user?.age && (
              <div className="info-row">
                <span className="info-label">Age:</span>
                <span className="info-value">{user.age} years</span>
              </div>
            )}
            {user?.gender && (
              <div className="info-row">
                <span className="info-label">Gender:</span>
                <span className="info-value">{user.gender}</span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="profile-stats">
            <h3>Account Statistics</h3>
            <div className="stats-row">
              <div className="stat-box">
                <span className="stat-icon">🏋️</span>
                <span className="stat-label">Total Workouts</span>
                <span className="stat-number">{user?.workouts?.length || 0}</span>
              </div>
              <div className="stat-box">
                <span className="stat-icon">📊</span>
                <span className="stat-label">Activities Logged</span>
                <span className="stat-number">{user?.activities?.length || 0}</span>
              </div>
              <div className="stat-box">
                <span className="stat-icon">🎯</span>
                <span className="stat-label">Goals Created</span>
                <span className="stat-number">{user?.goals?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
