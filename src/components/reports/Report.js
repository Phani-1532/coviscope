import React, { useEffect, useMemo, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import './Report.css';

const Report = () => {
  const [patients, setPatients] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/countries')
      .then((res) => res.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          country: item.country,
          continent: item.continent,
          population: item.population.toLocaleString(),
          totalCases: item.cases.toLocaleString(),
          totalDeaths: item.deaths.toLocaleString(),
          totalRecovered: item.recovered.toLocaleString(),
          todayCases: item.todayCases.toLocaleString(),
          todayDeaths: item.todayDeaths.toLocaleString(),
          todayRecovered: item.todayRecovered.toLocaleString(),
          critical: item.critical.toLocaleString(),
          status: item.cases > 1000000 ? 'Critical' : 'Stable',
          disease: item.disease,
          dateAdded: new Date(item.updated).toLocaleDateString(),
        }));
        setPatients(formattedData);
      })
      .catch((err) => console.error('API Error:', err));
  }, []);

  const columns = useMemo(() => [
    { Header: 'Country', accessor: 'country' },
    { Header: 'Continent', accessor: 'continent' },
    { Header: 'Population', accessor: 'population' },
    { Header: 'Total Cases', accessor: 'totalCases' },
    { Header: 'Total Deaths', accessor: 'totalDeaths' },
    { Header: 'Total Recovered', accessor: 'totalRecovered' },
    { Header: 'Today Cases', accessor: 'todayCases' },
    { Header: 'Today Deaths', accessor: 'todayDeaths' },
    { Header: 'Today Recovered', accessor: 'todayRecovered' },
    { Header: 'Critical', accessor: 'critical' },
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
    setFilter,
  } = useTable({ columns, data: patients }, useFilters);

  return (
    <div className="table-container">
      <h3>COVID-19 Global Data Overview</h3>
      <div className="filters">
        <label htmlFor="nameFilter">Filter by Country:</label>
        <input
          id="nameFilter"
          type="text"
          onChange={(e) => {
            setNameFilter(e.target.value);
            setFilter('country', e.target.value);
          }}
          value={nameFilter}
          placeholder="Search by Country"
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
          {rows.length === 0 ? (
            <tr><td colSpan="13">No data found</td></tr>
          ) : (
            rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
