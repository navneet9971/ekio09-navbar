import React, { useState, useEffect } from 'react';
import "../Pages.css";
import bgimage from "../../assets/pages-bgimages/background.svg";
import axiosInstance from '../../../interceptors/axios';



function BIScompliance() {
    // State variable
    const [middleData, setMiddleData] = useState("");
    // const [applicationId, setNewApplicationId] = useState();
  
    useEffect(() => {
      axiosInstance
        .get(`compliance/${localStorage.getItem("compliance_id")}`)
        .then((response) => {
          setMiddleData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
  
  
    //   axiosInstance
    //     .post(`application/form/`, {
    //       category: localStorage.getItem("category"),
    //       product: localStorage.getItem("product"),
    //     })
    //     .then((response) => {
    //       const id = response.data.data['id'];
    //       setNewApplicationId(id);
    //       localStorage.setItem("newApplicationId", id); // store id in localStorage
    //       console.log(id)
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    }, []);
  
  
  
  
  
  
    // Rendered components
    return (
      <div style={{ backgroundImage: `url(${bgimage})`, backgroundRepeat: 'no-repeat' }}>
      <div className="ftch data">
        {/* Middle section component */}
        {middleData && (
          <>
          
            {/* <h1 style={{ display: 'none' }}>Application Number: {applicationId}</h1> */}
            <h3 className="conte">{middleData.product_name} - Introduction</h3>
              <h2 className="content">{middleData.content}</h2>
          
  
            <h3 className="regpro">{middleData.product_name} - Registration Process</h3>
            <img className="imgback" alt="flowchart" src={middleData.flowchart} />
  
  
          </>
        )}
      </div>
      </div>
    )
  };

  export default BIScompliance;