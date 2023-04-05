import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Pages.css";

const Secondpage = () => {
  const history = useHistory();
  const [complianceData, setComplianceData] = useState([
    {
      id: 1,
      sno: 1,
      name: "Compliance 1",
      status: "Status 1",
      description: "Description 1",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 2,
      sno: 2,
      name: "Compliance 2",
      status: "Status 2",
      description: "Description 2",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: 3,
      sno: 3,
      name: "Compliance 3",
      status: "Status 3",
      description: "Description 3",
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

  const handleVideoClick = (e, videoUrl) => {
    e.preventDefault();
    window.open(videoUrl, "Compliance Video", "width=800,height=600");
  };

  const handleClick = (id) => {
    history.push(`/navbar/compliance/${id}`);
  };

  return (
    <div className="table">
      <h1>List of Compliance</h1>
      <div className="table-wrapper">
      <table className="Review">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Compliance Name</th>
            <th>Status</th>
            <th>Description</th>
            <th>Video</th>
          </tr>
        </thead>
        <tbody>
          {complianceData.map((compliance) => (
            <tr key={compliance.id}>
              <td>{compliance.sno}</td>
              <td
                className="clickable"
                onClick={() => handleClick(compliance.id)}
              >
                {compliance.name}
              </td>
              <td>{compliance.status}</td>
              <td>{compliance.description}</td>
              <td>
                <a
                  href={compliance.video}
                  onClick={(e) => handleVideoClick(e, compliance.video)}
                >
                  <div className="video-banner">
                    <div className="play-button">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
    </div>
  );
};

export default Secondpage;
