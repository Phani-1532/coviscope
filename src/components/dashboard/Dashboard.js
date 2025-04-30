import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { useTable, useFilters } from 'react-table'; // Import for table and filters
import './Dashboard.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  // Dummy data for charts and table
  const caseDistribution = useMemo(() => ({
    labels: ['Active', 'Recovered', 'Deceased'],
    datasets: [
      {
        data: [300, 800, 100],
        backgroundColor: ['#ff7043', '#66bb6a', '#9e9e9e'],
        borderColor: ['#ff7043', '#66bb6a', '#9e9e9e'],
        borderWidth: 1,
      },
    ],
  }), []);

  const casesOverTime = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Cases Over Time',
        data: [50, 150, 200, 300, 450],
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1,
      },
    ],
  }), []);

  const dailyNewCases = useMemo(() => ({
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Daily New Cases',
        data: [10, 30, 45, 60, 70],
        backgroundColor: '#ff7043',
        borderColor: '#ff7043',
        borderWidth: 1,
      },
    ],
  }), []);

  // Dummy data for patient list
  const patients = useMemo(() => [
    { name: 'John Doe', age: 45, status: 'Active', disease: 'COVID-19', dateAdded: '2022-04-15' },
    { name: 'Jane Smith', age: 60, status: 'Recovered', disease: 'Flu', dateAdded: '2023-03-10' },
    { name: 'Mark Johnson', age: 30, status: 'Deceased', disease: 'Cancer', dateAdded: '2021-12-22' },
    { name: 'Sarah Lee', age: 25, status: 'Active', disease: 'COVID-19', dateAdded: '2024-01-17' },
    // Add more patient records as needed
  ], []);

  // Table columns
  const columns = useMemo(() => [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Age', accessor: 'age' },
    { Header: 'Status', accessor: 'status' },
    { Header: 'Disease', accessor: 'disease' },
    { Header: 'Date Added', accessor: 'dateAdded' },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter, // Hook to set the filters
  } = useTable(
    {
      columns,
      data: patients,
    },
    useFilters // Enable filtering
  );

  // Controlled filter state
  const [nameFilter, setNameFilter] = useState('');

  return (
    <div className="dashboard-container">
      <div className="topbar">
        <div className="topbar-left">
          <h2>MedTrack</h2>
          <ul className="topbar-menu">
            <li>Dashboard</li>
            <li>Reports</li>
            <li>Analytics</li>
          </ul>
        </div>

        <div className="topbar-right" onClick={handleLogout} title="Logout">
          <FaSignOutAlt size={20} style={{ marginRight: '5px' }} />
          Logout
        </div>
      </div>

      <div className="main-content">
        <h2>Welcome, {user?.email || 'Phani Doctor!'}</h2>
        <p>This dashboard shows disease and patient data in real-time.</p>

        {/* Widgets Section */}
        <div className="widgets-container">
          <div className="widget-card">
            <h3>Total Patients</h3>
            <p>1200</p>
          </div>
          <div className="widget-card active-cases">
            <h3>Active Cases</h3>
            <p>300</p>
          </div>
          <div className="widget-card recovered">
            <h3>Recovered</h3>
            <p>800</p>
          </div>
          <div className="widget-card deceased">
            <h3>Deceased</h3>
            <p>100</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="charts-container">
          <div className="chart-card">
            <h3>Case Distribution (Pie)</h3>
            <Pie data={caseDistribution} />
          </div>

          <div className="chart-card">
            <h3>Cases Over Time (Line)</h3>
            <Line data={casesOverTime} />
          </div>

          <div className="chart-card">
            <h3>Daily New Cases (Bar)</h3>
            <Bar data={dailyNewCases} />
          </div>
        </div>

        {/* Patient List Table */}
        <div className="table-container">
          <h3>Patient List</h3>

          {/* Filters for Patient Table */}
          <div className="filters">
            <label htmlFor="nameFilter">Filter by Name:</label>
            <input
              id="nameFilter"
              type="text"
              onChange={(e) => {
                setNameFilter(e.target.value);
                setFilter('name', e.target.value); // Update filter when name changes
              }}
              value={nameFilter}
              placeholder="Search by Name"
            />
          </div>

          <table {...getTableProps()} className="patient-table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
