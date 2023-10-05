import React, { useState, useEffect } from "react";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function CortButton({ onClose }) {
  const [complianceData, setComplianceData] = useState([]);
  const [selectedCompliance, setSelectedCompliance] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const userEmail = localStorage.getItem("emailUse");

  useEffect(() => {
    axiosInstance
      .get(
        `/compliance/?category=${localStorage.getItem(
          "category"
        )}&product=${localStorage.getItem("product")}&countries=${localStorage.getItem("region")}`
      )
      .then((res) => {
        const uniqueComplianceData = res?.data?.data.reduce((acc, compliance) => {
          if (!acc.some((item) => item.id === compliance.id)) {
            acc.push(compliance);
            console.log(res.data);
            console.log(compliance.id);
          }
          return acc;
        }, []);
        setComplianceData(uniqueComplianceData);
        console.log(uniqueComplianceData);
      })
      .catch((err) => {
        console.error("Something went wrong.", err);
        // Handle error state or display error message
      });
  }, []);

  const handleSubmit = async () => {
    try {
      const requestData = {
        email: userEmail,
        comp: selectedCompliance,
        country: selectedCountries,
      };
  
      // Debugging console.log statements
      console.log("requestData:", requestData);
  
      const response = await axiosInstance.post("/compliance/request-quote", requestData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
  
      console.log(response);
  
      Swal.fire("Success!", "Submission was successful.", "success");
    } catch (error) {
      console.error("Error calling API:", error);
      Swal.fire("Error!", "Submission failed.", "error");
    }
  
    onClose();
  };
  
  
  
  

  return (
    <>
      <h3>Choose which compliances do you want to know the rates for:</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {complianceData.map((compliance, index) => (
          <div key={index} style={{ width: "35%" }}>
            <label
              style={{
                display: "flex",
                gap: ".5rem",
                marginTop: ".7rem",
                fontSize: "15px",
              }}
            >
              <input
                type="checkbox"
                value={compliance.id}
                checked={selectedCompliance.includes(
                  compliance.compliance.product_name
                )}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedCompliance((prevSelected) => {
                    if (isChecked) {
                      return [
                        ...prevSelected,
                        compliance.compliance.product_name,
                      ];
                    } else {
                      return prevSelected.filter(
                        (product_name) =>
                          product_name !== compliance.compliance.product_name
                      );
                    }
                  });

                  setSelectedCountries((prevSelectedCountries) => {
                    if (isChecked) {
                      return [
                        ...prevSelectedCountries,
                        compliance.compliance.countries,
                      ];
                    } else {
                      return prevSelectedCountries.filter(
                        (country) => country !== compliance.compliance.countries
                      );
                    }
                  });
                }}
              />

              {compliance.compliance.product_name} || (
              {compliance.compliance.countries})
            </label>
          </div>
        ))}
      </div>
      <button
        style={{
          backgroundColor: "#082a71",
          color: "#fff",
          border: "none",
          borderRadius: "34px",
          padding: "10px 20px",
          fontSize: "13px",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          marginTop: "20px",
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export default CortButton;
