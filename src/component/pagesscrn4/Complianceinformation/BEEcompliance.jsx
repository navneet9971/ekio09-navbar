import React, { useState, useEffect } from "react";
import "../Pages.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import bgimage from "../../assets/pages-bgimages/background.svg";
import axiosInstance from "../../../interceptors/axios";

function BEEcompliance() {
  const [middleData, setMiddleData] = useState("");
  const history = useHistory();

  useEffect(() => {
    axiosInstance
      .get(`compliance/${localStorage.getItem("compliance_id")}`)
      .then((response) => {
        setMiddleData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleButtonClick = () => {
    history.push("/navbar/secondpage"); // Replace '/new-application' with your desired URL
  };

  return (
    // <div
    //   style={{
    //     backgroundImage: `url(${bgimage})`,
    //     backgroundRepeat: "no-repeat",
    //   }}
    // >
    <div style={{ display: "flex" }}>
      <div className="ftch-data" style={{ flex: "1", textAlign: "left" }}>
        {middleData && (
          <>
            <h3
              style={{
                fontSize: "15px",
                textAlign: "center",
                transform: "translate(-35px, 149px)",
              }}
            >
              {middleData.product_name} - Introduction
            </h3>
            <h2
              style={{
                fontSize: "15px",
                textAlign: "center",
                padding: "26px 72px",
                transform: "translate(-45px, 139px)",
              }}
            >
              {middleData.details}
            </h2>
          </>
        )}

        <div
          className="compliance-redir"
          style={{ transform: "translate(120px, 200px)" }}
        >
          <h1
            style={{ fontSize: "14px", transform: "translate(-75px, -63px)" }}
          >
            If you want to start your application process, please click on the
            button below
          </h1>
          <button className="wpc-btn" onClick={handleButtonClick}>
            {" "}
            Start Project
          </button>
        </div>
      </div>

      <div>
        <h3
          style={{
            fontSize: "15px",
            textAlign: "center",
            transform: "translate(-101px, 2px)",
          }}
        >
          {middleData.product_name} - Registration Process
        </h3>
        <img className="wpcimg" alt="flowchart" src={middleData.flowchart} />
      </div>
    </div>
  );
}

export default BEEcompliance;
