import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Secondpage.css";

const Secondpage = () => {
  const history = useHistory();
  const [complianceData, setComplianceData] = useState([
    {
      id: 1,
      sno: 1,
      name: "Compliance 1",
      station: "Station 1",
      docType: "Document Type 1",
      destation: "Destination 1",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 2,
      sno: 2,
      name: "Compliance 2",
      station: "Station 2",
      docType: "Document Type 2",
      destation: "Destination 2",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 3,
      sno: 3,
      name: "Compliance 3",
      station: "Station 3",
      docType: "Document Type 3",
      destation: "Destination 3",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ]);

  useEffect(() => {
    fetchComplianceData();
  }, []);

  const fetchComplianceData = async () => {
    const response = await fetch("https://example.com/compliance");
    const data = await response.json();
    setComplianceData(data);
  };

  const handleClick = (id) => {
    history.push(`/navbar/compliance/${id}`);
  };

  return (
    <div className="table-container">
      <h1>List of Compliance</h1>
      <table>
        <thead>
          <tr>
            <th>S.no</th>
            <th>Compliance Name</th>
            <th>Station</th>
            <th>Doc Type</th>
            <th>Destation</th>
            <th>Video</th>
          </tr>
        </thead>
        <tbody>
          {complianceData.map((compliance) => (
            <tr key={compliance.id}>
              <td>{compliance.sno}</td>
              <td className="clickable" onClick={() => handleClick(compliance.id)}>{compliance.name}</td>
              <td>{compliance.station}</td>
              <td>{compliance.docType}</td>
              <td>{compliance.destation}</td>
              
              <td>
                <a href={compliance.video}>
                  <div className="video-banner">
                    
                    <div className="play-button">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Secondpage;
