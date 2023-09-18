import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "../Pages.css";
import axiosInstance from "../../../interceptors/axios";
import Notification from "../../Notification/Notification";
import Popup from "../../popup/Popup";
import CortButton from "./CortButton";
import EmailSender from "../TestProductsendmail";
import KnYCompTableDownload from "./knowYoucomplinceTableDownload/knYComTableDownload";

const Secondpage = () => {
  const navigate = useNavigate();
  const [complianceData, setComplianceData] = useState([]);
  const [notifiButton, setNotifiButton] = useState(false);
  const [cotpopupbutton, setCotpopupbutton] = useState(false);

  // Calls APIs HERE ---------------------------------------------------------
  useEffect(() => {
    axiosInstance
      .get(
        `/compliance/?category=${localStorage.getItem(
          "category"
        )}&product=${localStorage.getItem(
          "product"
        )}&countries=${localStorage.getItem("region")}`
      )
      .then((res) => {
        const uniqueComplianceData = [];
        res?.data?.data.forEach((compliance) => {
          // check if the compliance id already exists in the array
          if (!uniqueComplianceData.some((item) => item.compliance.id === compliance.compliance.id)) {
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


  // navigate to compliance page based on compliance name
  const handleClick = (complianceName, complianceId) => {
    localStorage.setItem("compliance_id", complianceId);

    if (complianceName === "TEC") {
      navigate(`/navbar/TECcompliance`);
    } else if (complianceName === "WPC") {
      navigate(`/navbar/WPCcompliance`);
    } else if (complianceName === "BIS") {
      navigate(`/navbar/BIScompliance`);
    } else if (complianceName === "EPR") {
      navigate(`/navbar/EPRcompliance`);
    } else if (complianceName === "BIS - ISI") {
      navigate(`/navbar/BIS-ISIcompliance`);
    } else if (complianceName === "BEE") {
      navigate(`/navbar/BEEcompliance`);
    }  else  {
      // handle other compliance names
    }
  };

  const handleNotificationClick = (notification) => {
    // Implement the desired behavior when the notification is clicked
    setNotifiButton(true);
  };

  // After click submit button popup is disabled 
  const handlePopupClose = () => { 
    setCotpopupbutton(false);
  }

  // const handleTestingMail = () => { 
  //   sendMail(); // Call the sendMail function
  // }

  const dataArray = [];
  console.log(dataArray);
  // Make sure to use map on complianceData, and check if complianceData exists before accessing it
  complianceData.map((compliance) => {
    dataArray.push({
      ProductNameStore: compliance.product?.name,
      complianceNameStore: compliance.compliance?.product_name,
      ApplicationEndDate: compliance.compliance?.tentative_time,
      StoreDetails: compliance.compliance?.details,
    });
    return null; // React expects a return value for map, but we don't need it here
  });
  localStorage.setItem('TableData', JSON.stringify(dataArray));


  return (
    <div className="table-bgsconpage">
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        marginRight: "15rem",
        marginTop: "1rem",
        gap: "3rem",
      }}>
      <EmailSender />
      <KnYCompTableDownload />
      </div>

      <div className="table">
        <h1 style={{ fontWeight: "100", padding: "0px 50px", fontSize: "26px" }}>List of Compliance</h1>
        <div className="table-wrapper">
          <table className="Review">
            <thead>
              <tr>
                <th style={{ cursor: "default" }}>Compliance Name</th>
                <th style={{ cursor: "default" }}>Description</th>
                <th style={{ cursor: "default" }}>Notification</th>
              </tr>
            </thead>
            <tbody>
              {complianceData.map((compliance, index) => (
                <tr key={index}>
                  <td
                    className="clickable"
                    onClick={() =>
                      handleClick(compliance.compliance.product_name, compliance.compliance.id)
                    }
                  >
                    {compliance.compliance.product_name}

                    {/* this localStorage is store and use for knYComTableDownload Page  */}
                  
   
                  </td>
                  <td style={{ cursor: "default" }}>{compliance.compliance.details}</td>
                  <td>
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

      {/* <button className="revbtn1" onClick={handleTestingMail}>
        Request simple testing
      </button> */}

      <button className="revbtn1" onClick={() => setCotpopupbutton(true)}>
        Request Quote
      </button>

      <Popup trigger={cotpopupbutton} setTrigger={setCotpopupbutton}>
        <CortButton onClose={handlePopupClose} />
      </Popup>
    </div>
  );
};

export default Secondpage;
