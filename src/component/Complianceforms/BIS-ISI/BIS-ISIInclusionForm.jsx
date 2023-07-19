import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";

function BisIsiInclusion() {
  const [showPassword, setShowPassword] = useState(false);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const applicationId = localStorage.getItem("applicationId");
  const complianceId = localStorage.getItem("compliance_id");

  const [cmlnumberformData, setCmlnumberformData] = useState({
    Username_BISPortal: "",
    Password_BISPortal: "",
    Cmlnumber_BISPortal: "",
    Is_number_BISPortal: "",
    Scope_as_per_is: "",
    Scope_requested_by_client: "",
    application: applicationId,
    compliance: complianceId,
    request_for: "certification",
    status: "Inclusion",
  });

  const handleRnumberRegisterSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        "application/compliance/",
        cmlnumberformData,
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
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit form",
        icon: "error",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCmlnumberformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setShowAdditionalFields(value === "Yes");
    setCmlnumberformData((prevFormData) => ({
      ...prevFormData,
      Is_number_BISPortal: value,
    }));
  };

  const handleTextAreaInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <form className="bisreg" onSubmit={handleRnumberRegisterSubmit}>
        <div className="bis-userid">
          <label style={{ fontWeight: "100" }}>User ID:</label>
          <input
            type="text"
            id="user-id"
            name="Username_BISPortal"
            value={cmlnumberformData.Username_BISPortal}
            onChange={handleInputChange}
          />
        </div>

        <div className="bis-userid">
          <label style={{ fontWeight: "100" }}>Password:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="Password_BISPortal"
              value={cmlnumberformData.Password_BISPortal}
              onChange={handleInputChange}
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
          <label style={{ fontWeight: "100" }}>CM/L Number:</label>
          <input
            type="text"
            id="rnumber"
            name="Cmlnumber_BISPortal"
            value={cmlnumberformData.Cmlnumber_BISPortal}
            onChange={handleInputChange}
          />
        </div>

        <div className="bis-userid">
          <label style={{ fontWeight: "100" }}>Scope required:</label>
          <select
            id="show-additional-fields"
            name="Is_number_BISPortal"
            value={cmlnumberformData.Is_number_BISPortal}
            onChange={handleDropdownChange}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {showAdditionalFields && (
          <>
            <div className="bis-userid">
              <label style={{ fontWeight: "100" }}>Scope as per is (Grade/Type/Class)</label>
              <textarea
                id="rnumber"
                name="Scope_as_per_is"
                value={cmlnumberformData.Scope_as_per_is}
                onChange={handleInputChange}
                onInput={handleTextAreaInput}
              />
            </div>

            <div className="bis-userid">
              <label style={{ fontWeight: "100" }}>Scope requested by client:</label>
              <textarea
                id="rnumber"
                name="Scope_requested_by_client"
                value={cmlnumberformData.Scope_requested_by_client}
                onChange={handleInputChange}
                onInput={handleTextAreaInput}
              />
            </div>
          </>
        )}

        <button className="bis-register" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default BisIsiInclusion;
