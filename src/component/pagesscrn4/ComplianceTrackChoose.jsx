import React from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import "./Pages.css";

function ComplianceTrackChoose() {
  const history = useHistory();

  const handleComplianceTrackClick = (complianceTrack) => {
    const callAPI = () => {
      // Implement API call logic based on the compliance track
      switch (complianceTrack) {
        case "TEC":
          callTECAPI();
          break;
        case "WPC":
          callWPCAPI();
          break;
        case "BIS":
          callBISAPI();
          break;
        default:
          break;
      }
    };

    callAPI();
    axiosInstance
      .get("application/compliance/", {
        params: {
          compliance: complianceTrack,
        },
      })
      .then((response) => {
        const tableData = response.data.data;
        localStorage.setItem(`${complianceTrack}tableData`, JSON.stringify(tableData));
        history.push(`/navbar/${complianceTrack}Table`);
        console.log(tableData);
      })
      .catch((error) => {
        console.log(error);
        // Implement error handling logic here
      });
  };

  const callTECAPI = () => {
    // Implement API call logic for TEC
  };

  const callWPCAPI = () => {
    // Implement API call logic for WPC
  };

  const callBISAPI = () => {
    // Implement API call logic for BIS
  };

  return (
    <>
    <div className="container-compliance">
      <div className="box blue" onClick={() => handleComplianceTrackClick("TEC")}>
        TEC
      </div>
      <div className="box red" onClick={() => handleComplianceTrackClick("WPC")}>
        WPC
      </div>
      <div className="box green" onClick={() => handleComplianceTrackClick("BIS")}>
        BIS
      </div>
    </div>
  </>
  
  
  );
}

export default ComplianceTrackChoose;
