import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "../Pages.css";
import axiosInstance from "../../../interceptors/axios";
import Notification from "../../Notification/Notification";
import Popup from "../../popup/Popup";
import CortButton from "./CortButton";

const Secondpage = () => {
  const history = useHistory();
  const [complianceData, setComplianceData] = useState([]);
  const [notifiButton, setNotifiButton] = useState("");
  const [cotpopupbutton, setCotpopupbutton] = useState(false);

  // Calls APIs HERE ---------------------------------------------------------

  useEffect(() => {
    axiosInstance
      .get(
        `/compliance/?category=${localStorage.getItem(
          "category"
        )}&product=${localStorage.getItem(
          "product"
        )}&region=${localStorage.getItem("region")}`
      )
      .then((res) => {
        const uniqueComplianceData = [];
        res?.data?.data.forEach((compliance) => {
          // check if the compliance id already exists in the array
          if (!uniqueComplianceData.some((item) => item.id === compliance.id)) {
            uniqueComplianceData.push(compliance);
          }
        });
        setComplianceData(uniqueComplianceData);
        console.log(uniqueComplianceData);
      })
      .catch((err) => {
        alert("Something went wrong.");
      });
  }, []);

  // open compliance video in new window
  const handleVideoClick = (e, videoUrl) => {
    e.preventDefault();
    window.open(videoUrl, "Compliance Video", "width=800,height=600");
  };

  // navigate to compliance page based on compliance name
  const handleClick = (complianceName, complianceId) => {
    localStorage.setItem("compliance_id", complianceId);
    if (complianceName === "TEC") {
      history.push(`/navbar/TECcompliance`);
    } else if (complianceName === "WPC") {
      history.push(`/navbar/WPCcompliance`);
    } else if (complianceName === "BIS") {
      history.push(`/navbar/BIScompliance`);
    } else if (complianceName === "EPR") {
      history.push(`/navbar/EPRcompliance`);
    } else if (complianceName === "BIS - ISI") {
      history.push(`/navbar/BIS-ISIcompliance`);
    } else if (complianceName === "BEE") {
      history.push(`/navbar/BEEcompliance`);
    }  else  {
      // handle other compliance names
    }
  };

  const handleNotificationClick = (notification) => {
    // Implement the desired behavior when the notification is clicked
    setNotifiButton(true);
  };

  //After click sumbit button popup is disable 
  const handlePopupClose = () => { 
    // setButtonPopup(false);
    setCotpopupbutton(false);
    // setButtonPopup1(false);
   }

  return (
    <div className="table-bgsconpage">
      <div className="table">
        <h1 style={{fontWeight: "100", padding: "0px 50px", fontSize: "26px"}}>List of Compliance</h1>
        <div className="table-wrapper">
          <table className="Review">
            <thead>
              <tr>
                <th style={{ cursor: "default" }}>Compliance Name</th>
                <th style={{ cursor: "default" }}>Description</th>
                <th style={{ cursor: "default" }}>Video</th>
                <th style={{ cursor: "default" }}>Notification</th>
                {/* Added notification column */}
              </tr>
            </thead>
            <tbody>
              {complianceData.map((compliance, index) => (
                <tr key={index}>
                  <td
                    className="clickable"
                    onClick={() =>
                      handleClick(compliance.product_name, compliance.id)
                    }
                  >
                    {compliance.product_name}
                  </td>
                  <td style={{ cursor: "default" }}>{compliance.details}</td>
                  <td>
                    {/* display compliance video */}
                    <a
                      href={compliance.video}
                      onClick={(e) => handleVideoClick(e, compliance.video)}
                    >
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
                  <td>
                    {/* display animated bell icon */}
                    <span
                      className="clickable animated-bell"
                      onClick={(e) => handleNotificationClick(notifiButton)}
                    >
                      <FontAwesomeIcon
                        icon={faBell}
                        size="2x"
                        style={{ color: "green" }}
                        className="animated-bell shake"
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Popup trigger={notifiButton} setTrigger={setNotifiButton}>
        <Notification />
      </Popup>


      <button className="revbtn1" onClick={() => setCotpopupbutton(true)}>
      Request Quote
        </button>

  <Popup trigger={cotpopupbutton} setTrigger={setCotpopupbutton}>
  <CortButton  onClose={handlePopupClose}/>
  </Popup>

    </div>
  );
};

export default Secondpage;
