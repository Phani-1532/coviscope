import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaHeartbeat, FaVirus, FaSmile, FaSkull, FaPlusCircle, FaVial } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);

  const handleLogout = () => logout();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://disease.sh/v3/covid-19/all');
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('API fetch failed:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="topbar">
        <div className="topbar-left">
          <h2>🩺 MedTrack</h2>
          <ul className="topbar-menu">
            <Link to='/dashboard'><li>Dashboard</li></Link>
            <Link to='/reports'><li>Global data</li></Link>
            <Link to='/analytics'><li>Analytics</li></Link>
          </ul>
        </div>
        <div className="topbar-right" onClick={handleLogout} title="Logout">
          <FaSignOutAlt size={20} style={{ marginRight: '5px' }} />
          Logout
        </div>
      </div>

      <div className="main-content">
        <div className="welcome-message">
        <h2>Welcome, {user?.email || 'Phani Doctor!'}</h2>
        <p>This dashboard shows disease and patient data in real-time.</p>
        </div>

        <div className="widgets-container">
          <div className="widget-card">
            <div className="widget-icon"><FaHeartbeat /></div>
            <h3>Total Cases</h3>
            <p>{data?.cases?.toLocaleString() || 'Loading...'}</p>
          </div>
          <div className="widget-card active">
            <div className="widget-icon"><FaVirus /></div>
            <h3>Active</h3>
            <p>{data?.active?.toLocaleString() || 'Loading...'}</p>
          </div>
          <div className="widget-card recovered">
            <div className="widget-icon"><FaSmile /></div>
            <h3>Recovered</h3>
            <p>{data?.recovered?.toLocaleString() || 'Loading...'}</p>
          </div>
          <div className="widget-card deceased">
            <div className="widget-icon"><FaSkull /></div>
            <h3>Deaths</h3>
            <p>{data?.deaths?.toLocaleString() || 'Loading...'}</p>
          </div>
          <div className="widget-card icu">
            <div className="widget-icon"><FaPlusCircle /></div>
            <h3>Today's Cases</h3>
            <p>{data?.todayCases?.toLocaleString() || 'Loading...'}</p>
          </div>
          <div className="widget-card vaccinated">
            <div className="widget-icon"><FaVial /></div>
            <h3>Total Tests</h3>
            <p>{data?.tests?.toLocaleString() || 'Loading...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
