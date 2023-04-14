import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import "./Pages.css";

const Secondpage = () => {
  const history = useHistory();
  const [complianceData, setComplianceData] = useState([]);


  useEffect(() => {
    axiosInstance.get(`/compliance/?cateogry=${localStorage.getItem("category")}&product=${localStorage.getItem("product")}&region=${localStorage.getItem("region")}`)
    .then(res => {
      setComplianceData(res?.data?.data)
    })
    .catch(err => {
      alert('Something went wrong.')
    })
  }, []);
  
  

  // open compliance video in new window
  const handleVideoClick = (e, videoUrl) => {
    e.preventDefault();
    window.open(videoUrl, "Compliance Video", "width=800,height=600");
  };

  // navigate to compliance page based on compliance name
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
         {/*     <th>S.no</th> */}
              <th>Compliance Name</th>
              <th>Description</th>
              <th>Video</th>
            </tr>
          </thead>
          <tbody>
  {complianceData.map((compliance, index) => (
    <tr key={index}>
      {/* <td>{compliance.id}</td> */}
      <td
        className="clickable"
        onClick={() => handleClick(compliance.product_name)}
      >
        {compliance.product_name}
      </td>
                <td>{compliance.details}</td>
                <td>
                  {/* display compliance video */}
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
