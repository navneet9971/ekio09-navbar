import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BeeInclusionForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const applicationId = localStorage.getItem("applicationId");
  const complianceId = localStorage.getItem("compliance_id");

  const [formData, setFormData] = useState({
    Username_BISPortal: "",
    Password_BISPortal: "",
    application: applicationId,
    compliance: complianceId,
    request_for: "certification",
    status: "Inclusion",
    file: null, // Initialize with null
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }

      const response = await axiosInstance.post(
        "application/compliance/",
        formPayload
      );
      const data = response.data;
      console.log(data);
      Swal.fire({
        title: "Success",
        text:
          "Form submitted successfully. Please head over to the 'Track Application' Page to review progress",
        icon: "success",
      });
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit form",
        icon: "error",
      });
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <form className="bisreg" onSubmit={handleFormSubmit}>
        <div className="bis-userid">
          <label style={{ fontWeight: "100" }}>User ID:</label>
          <input
            type="text"
            id="user-id"
            name="Username_BISPortal"
            value={formData.Username_BISPortal}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="bis-userid">
          <label style={{ fontWeight: "100" }}>Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="Password_BISPortal"
              value={formData.Password_BISPortal}
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

        {/* File Upload Input */}
        <div className="bis-userid">
          <label style={{ fontWeight: "100" }}>Upload Document:</label>
          <input
            type="file"
            id="file-upload"
            name="file"
            // accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
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

export default BeeInclusionForm;
