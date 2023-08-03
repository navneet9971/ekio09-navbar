import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BisInclusionForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const applicationId = localStorage.getItem("applicationId");
  const complianceId = localStorage.getItem("compliance_id");

  const [rnumberformData, setRnumberformData] = useState({
    Username_BISPortal: "",
    Password_BISPortal: "",
    Rnumber_BISPortal: "",
    application: applicationId,
    compliance: complianceId,
    request_for: "certification",
    status: "Inclusion",
  });

  const handleRnumberRegisterSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

    try {
      const response = await axiosInstance.post(
        "application/compliance/",
        rnumberformData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      console.log(data);
      Swal.fire({
        title: "Success",
        text:
          "Form submitted successfully. Please head over to the 'Track Application' Page to upload documents and review progress",
        icon: "success",
      });
      setIsLoading(false); // Stop loading animation
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit form",
        icon: "error",
      });
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRnumberformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="bisreg" onSubmit={handleRnumberRegisterSubmit}>
        <div className="bis-userid">
          <label style={{fontWeight: "100"}}>User ID:</label>
          <input
            type="text"
            id="user-id"
            name="Username_BISPortal"
            value={rnumberformData.Username_BISPortal}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="bis-userid">
          <label style={{fontWeight: "100"}}>Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="Password_BISPortal"
              value={rnumberformData.Password_BISPortal}
              onChange={handleInputChange}
              required
            />
            <span
              className="eye-icon-fun"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <div className="bis-userid">
          <label style={{fontWeight: "100"}}>RNumber:</label>
          <input 
            type="text"
            id= "rnumber"
            name="Rnumber_BISPortal"
            value={rnumberformData.Rnumber_BISPortal}
            onChange={handleInputChange}
            required
          />
        </div>

        <button className="bis-register" type="submit">
          Submit
        </button>
      </form>

      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </>
  );
}

export default BisInclusionForm;
