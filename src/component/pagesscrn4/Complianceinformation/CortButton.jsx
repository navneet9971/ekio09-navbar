import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function CortButton({ onClose }) {
  const [complianceData, setComplianceData] = useState([]);
  const [selectedCompliance, setSelectedCompliance] = useState([]);
//   const user_id = localStorage.getItem("user_id");
   const userEmail = localStorage.getItem("cortEmail")

   console.log(userEmail);
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
            console.log(res.data)
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
    // Simulating success or failure
    const isSuccess = true; // Change this based on your logic
  
    if (isSuccess) {
      // Send email using emailjs
      const templateParams = {
        // to_email: ["EikompRequestQuote@gmail.com"], // Update with the email addresses
        subject: "Selected Products",
        to_name: `${userEmail}`,
        message: `Compliance Names: ${selectedCompliance.join(", ")}.`,
      };
  
      emailjs.init("zJR8dp8Ouz9a-jdDu"); // Replace "YOUR_PUBLIC_KEY" with your actual Public Key
  
      try {
        const response = await emailjs.send(
          "service_xk0xuzm",
          "template_n73azeg",
          templateParams
        );
        console.log("Email sent successfully!", response);
        Swal.fire("Success!", "Submission was successful.", "success");
      } catch (error) {
        console.error("Error sending email:", error);
        Swal.fire("Error!", "Submission failed.", "error");
      }
    } else {
      Swal.fire("Error!", "Submission failed.", "error");
    }

    onClose();
    // Perform any other action with the data
  };
  

  return (
    <>
     <h3>Choose which compliances do you want to know the rates for:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {complianceData.map((compliance, index) => (
          <div key={index} style={{ width: "35%" }}>
            <label style={{display: "flex", gap:"10px"}}>
              <input
                type="checkbox"
                value={compliance.id}
                checked={selectedCompliance.includes(compliance.compliance.product_name)}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  setSelectedCompliance((prevSelected) => {
                    if (isChecked) {
                      return [...prevSelected, compliance.compliance.product_name];
                    } else {
                      return prevSelected.filter(
                        (product_name) => product_name !== compliance.compliance.product_name
                      );
                    }
                  });
                }}
              />
              {compliance.compliance.product_name}
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
