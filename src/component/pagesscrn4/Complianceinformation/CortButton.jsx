import React, { useState, useEffect } from "react";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function CortButton({ onClose }) {
  const [complianceData, setComplianceData] = useState([]);
  const [selectedCompliance, setSelectedCompliance] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(
        `/compliance/?category=${localStorage.getItem(
          "category"
        )}&product=${localStorage.getItem("product")}&region=${localStorage.getItem("region")}`
      )
      .then((res) => {
        const uniqueComplianceData = res?.data?.data.reduce((acc, compliance) => {
          if (!acc.some((item) => item.id === compliance.id)) {
            acc.push(compliance);
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

  const handleSubmit = () => {
    // Send the selected compliance names to your desired endpoint
    console.log(selectedCompliance);

    // Simulating success or failure
    const isSuccess = true; // Change this based on your logic

    if (isSuccess) {
      Swal.fire("Success!", "Submission was successful.", "success");
    } else {
      Swal.fire("Error!", "Submission failed.", "error");
    }

    onClose();
    // Perform any other action with the data
  };

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {complianceData.map((compliance, index) => (
          <div key={index} style={{ width: "50%", padding: "3px" }}>
            <label>
              <input
                type="checkbox"
                value={compliance.id}
                checked={selectedCompliance.includes(compliance.product_name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedCompliance((prevSelected) => {
                    if (isChecked) {
                      return [...prevSelected, compliance.product_name];
                    } else {
                      return prevSelected.filter(
                        (product_name) => product_name !== compliance.product_name
                      );
                    }
                  });
                }}
              />
              {compliance.product_name}
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
          marginLeft: "51px",
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export default CortButton;
