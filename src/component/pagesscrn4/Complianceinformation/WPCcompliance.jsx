import React, { useState, useEffect } from "react";
import "../Pages.css";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../interceptors/axios";
import ReactImageMagnify from "react-image-magnify";

function MiddleSection() {
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
    <div style={{ display: "flex" }}>
      <div className= "img_section" style={{ position: "relative" }}>
        <h3
          style={{
            fontSize: "15px",
            textAlign: "center",
            transform: "translate(-22px, -57px)",
          }}
        >
          {middleData.product_name} - Registration Process
        </h3>
        <div id="imagback" style={{zIndex: 1, position: "absolute" }}>
          {middleData && (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "flowchart",
                  src: middleData.flowchart,
                  width: "100%",
                },
                largeImage: {
                  src: middleData.flowchart,
                  width: 550,
                  height: 940,
                },
              }}
            />
          )}
        </div>
      </div>

      <div
        className="ftch-data"
        style={{ flex: "1", textAlign: "left", marginLeft: "20px" }}
      >
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

<div className="compliance-redir" style={{ position: "absolute", transform: "translate(118px, 145px)" }}>
  <h1
    className="wpc"
    style={{
      fontSize: "15px",
      textAlign: "center",
      position: "relative",
    }}
  >
    If you want to start your application process, please click the button below
  </h1>
  <button className="compliance-redirct" onClick={handleButtonClick}>
    Start Project
  </button>
</div>


      </div>
    </div>
  );
}

export default MiddleSection;
