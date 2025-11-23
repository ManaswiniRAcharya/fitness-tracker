import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          💪 Fitness Tracker
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/workouts">Workouts</Link></li>
          <li><Link to="/activities">Activities</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        <div className="navbar-user">
          <span>Hello, {user.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
