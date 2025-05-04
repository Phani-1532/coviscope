import React, { useEffect, useState, useMemo } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale,
  BarElement, PointElement, LineElement
} from 'chart.js';
import './Analytics.css';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Analytics = () => {
  const [globalData, setGlobalData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://disease.sh/v3/covid-19/all').then(res => res.json()),
      fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=${days}`).then(res => res.json()),
      fetch('https://disease.sh/v3/covid-19/countries?sort=cases').then(res => res.json())
    ]).then(([global, historical, countries]) => {
      setGlobalData(global);
      setHistoricalData(historical);
      setCountryData(countries.slice(0, 5));
      setLoading(false);
    });
  }, [days]);

  const pieChart = useMemo(() => globalData && ({
    labels: ['Active', 'Recovered', 'Deceased'],
    datasets: [{
      data: [globalData.active, globalData.recovered, globalData.deaths],
      backgroundColor: ['#ff7043', '#66bb6a', '#9e9e9e'],
    }],
  }), [globalData]);

  const lineChart = useMemo(() => historicalData && ({
    labels: Object.keys(historicalData.cases),
    datasets: [{
      label: `Total Cases (Last ${days} Days)` ,
      data: Object.values(historicalData.cases),
      borderColor: '#4caf50',
      tension: 0.3,
      fill: true,
    }],
  }), [historicalData, days]);

  const barChart = useMemo(() => historicalData && (() => {
    const labels = Object.keys(historicalData.cases);
    const values = Object.values(historicalData.cases);
    const daily = values.map((val, i) => i === 0 ? 0 : val - values[i - 1]);
    return {
      labels,
      datasets: [{
        label: 'New Cases Daily',
        data: daily,
        backgroundColor: '#42a5f5',
      }],
    };
  })(), [historicalData]);

  const topCountriesChart = useMemo(() => ({
    labels: countryData.map(c => c.country),
    datasets: [{
      label: 'Total Cases',
      data: countryData.map(c => c.cases),
      backgroundColor: ['#ef5350', '#ab47bc', '#42a5f5', '#66bb6a', '#ffa726'],
    }],
  }), [countryData]);

  return (
    <div className="analytics-wrapper">
      <h2>🌍 Global COVID-19 Analytics Dashboard</h2>

      <div className="range-selector">
        <label>Select Time Range: </label>
        <select value={days} onChange={e => setDays(Number(e.target.value))}>
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
          <option value={90}>Last 90 Days</option>
        </select>
      </div>

      {loading ? <div className="loader">⏳ Loading charts...</div> : (
        <>
          {globalData && (
            <div className="stats-cards">
              <div className="card animate">🌡️ Active: <span>{globalData.active.toLocaleString()}</span></div>
              <div className="card animate">💚 Recovered: <span>{globalData.recovered.toLocaleString()}</span></div>
              <div className="card animate">💀 Deaths: <span>{globalData.deaths.toLocaleString()}</span></div>
              <div className="card animate">📊 Total Cases: <span>{globalData.cases.toLocaleString()}</span></div>
            </div>
          )}

          <div className="charts-container">
            {pieChart && (
              <div className="chart-card animate">
                <h3>Case Distribution (Pie)</h3>
                <Pie data={pieChart} options={{ plugins: { tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed.toLocaleString()}` }}} }} />
              </div>
            )}

            {lineChart && (
              <div className="chart-card animate">
                <h3>Cases Over Time (Line)</h3>
                <Line data={lineChart} />
              </div>
            )}

            {barChart && (
              <div className="chart-card animate">
                <h3>New Cases Per Day (Bar)</h3>
                <Bar data={barChart} />
              </div>
            )}

            {topCountriesChart && (
              <div className="chart-card animate">
                <h3>Top 5 Countries by Total Cases</h3>
                <Bar data={topCountriesChart} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
