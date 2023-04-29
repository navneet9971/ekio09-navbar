import React, { useState, useEffect } from 'react';
import axiosInstance from './interceptors/axios';

function MyTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.get(`application/compliance/`)
      .then(response => {
        setData(response.data.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Application</th>
          <th>Compliance</th>
          <th>Start Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.application_name}</td>
            <td>{item.compliance_name}</td>
            <td>{item.startdate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MyTable;
