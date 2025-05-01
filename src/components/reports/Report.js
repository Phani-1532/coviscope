import React from 'react'
import { useMemo, useState } from 'react';
import { useTable, useFilters } from 'react-table';
import './Report.css'; // Import your CSS file for styling


const Report = () => {
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
  )
}

export default Report