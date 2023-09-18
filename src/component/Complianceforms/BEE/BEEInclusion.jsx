import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BeeInclusionForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const applicationId = localStorage.getItem("applicationId");
  const complianceId = localStorage.getItem("compliance_id");

  const [Username_BEEPortal, setUsername_BEEPortal] = useState("");
  const [Password_BEEPortal, setPassword_BEEPortal] = useState("");
  const [document, setDocument] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append("Username_BISPortal", Username_BEEPortal);
    formdata.append("Password_BISPortal", Password_BEEPortal);
    formdata.append("request_for", "certification");
    formdata.append("status", "Inclusion");
    formdata.append("application", applicationId);
    formdata.append("compliance", complianceId);

    if (document.length > 0) {
      for (let i = 0; i < document.length; i++) {
        formdata.append(`documents_${i}`, document[i]);
      }
    }

    try {
      const response = await axiosInstance.post(
        "application/compliance/",
        formdata
      );
      const data = response.data;
      console.log(data);
      Swal.fire({
        title: "Success",
        text:
          "Form submitted successfully. Please head over to the 'Track Application' Page to review progress",
        icon: "success",
      }).then(() => {
        navigate('/navbar/review');
      })
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
    const filesArray = Array.from(event.target.files);
    setDocument(filesArray);
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
            value={Username_BEEPortal}
            onChange={(e) => setUsername_BEEPortal(e.target.value)}
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
              value={Password_BEEPortal}
              onChange={(e) => setPassword_BEEPortal(e.target.value)}
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
