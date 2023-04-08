import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Pages.css";

const Secondpage = () => {
  const history = useHistory();
  const [complianceData, setComplianceData] = useState([
    {
      id: "TEC",
      sno: 1,
      name: "TEC",
      status: "Status 1",
      description: "Description 1",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "WPS",
      sno: 2,
      name: "WPS",
      status: "Status 2",
      description: "Description 2",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      id: "BIS",
      sno: 3,
      name: "BIS",
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
 

  const handleClick = (complianceName) => {
    if (complianceName === "TEC") {
      history.push(`/navbar/compliance/TEC`);
    } else if (complianceName === "WPS") {
      history.push(`/navbar/compliance/WPS`);
    } else if (complianceName === "BIS") {
      history.push(`/navbar/compliance/BIS`);
    } else {
      // handle other compliance names
    }
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
  onClick={() => handleClick(compliance.name)}
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