import React, { useState, useEffect } from "react";
import "../Pages.css";
import bgimage from "../../assets/pages-bgimages/background.svg";
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
    <div
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="ftch data">
        {middleData && (
          <>
            <h3 className="conte">{middleData.product_name} - Introduction</h3>
            <h2 className="content">{middleData.content}</h2>

            <h3 className="regpro">
              {middleData.product_name} - Registration Process
            </h3>
            <img className="imgback" alt="flowchart" src={middleData.flowchart} />
          </>
        )}
      </div>
      </div>
    )
  };

  export default MiddleSection;