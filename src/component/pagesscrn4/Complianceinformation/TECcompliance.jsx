import React, { useState, useEffect } from "react";
import "../Pages.css";
// import bgimage from "../../assets/pages-bgimages/background.svg";
import axiosInstance from '../../../interceptors/axios';



function MiddleSection() {
  const [middleData, setMiddleData] = useState("");

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
          <h3 style={{ fontSize: "15px", textAlign: "center",     transform: "translate(-35px, 149px)" }}>{middleData.product_name} - Introduction</h3>
          <h2 style={{ fontSize: "15px", textAlign: "center", padding: "26px 72px", transform: "translate(-45px, 139px)" }}>{middleData.details}</h2>
        </>
      )}
    </div>
    <div>
    <h3 style={{ fontSize: "15px", textAlign: "center", transform: "translate(-101px, 2px)" }}>{middleData.product_name} - Registration Process</h3>
      <img className="imgback" alt="flowchart" src={middleData.flowchart} />
    </div>
  </div>
  
    )
  };

  export default MiddleSection;