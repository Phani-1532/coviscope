import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './Report.css';

const Report = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(res => res.json())
      .then(data => {
        const formattedData = [
          {
            name: 'Global Data',
            age: 'N/A',
            status: `Cases: ${data.cases}`,
            disease: 'COVID-19',
            dateAdded: new Date().toISOString().split('T')[0],
          },
        ];
        setPatients(formattedData);
      })
      .catch(err => console.error('API Error:', err));
  }, []);

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
  } = useTable({ columns, data: patients });

  return (
    <div className="table-container">
      <h3>Patient (Global COVID Stats) Report</h3>
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
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
