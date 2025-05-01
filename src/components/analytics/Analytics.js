import React from 'react'
import { useMemo } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';

import './Analytics.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);


const Analytics = () => {
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
  return (
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
  )
}

export default Analytics