import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import BISfreshForm from "./BISfreashform";

function BisRNumberPopup({onClose}) {
  const [hasRNumber, setHasRNumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBISfreshForm, setShowBISfreshForm] = useState(false);

  const applicationId = localStorage.getItem("applicationId");

  const handleDropdownChange = (event) => {
    const { value } = event.target;
    setHasRNumber(value === "yes");
  };

  const [rnumberformData, setRnumberformData] = useState({
    Username_BISPortal: "",
    Password_BISPortal: "",
    Rnumber: "",
    application: applicationId,
    compliance: localStorage.getItem("compliance_id"),
    request_for: "certification",
  });

  const handleRnumberRegisterSubmit = (event) => {
    event.preventDefault();

    axiosInstance
      .post("application/compliance/", rnumberformData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        Swal.fire({
          title: "Success",
          text:
            "Form submitted successfully. Please head over to the 'Track Application' Page to upload documents and review progress",
          icon: "success",
        });
        onClose(); //Close POPUP AFTER SUMBIT
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to submit form",
          icon: "error",
        });
      });
  };

  const handleRNumbersubmit = (event) => {
    event.preventDefault();

    if (hasRNumber) {
      handleRnumberRegisterSubmit(event);
      console.log("R Number:");
    } else {
      setShowBISfreshForm(true);
      console.log("R Number not selected");
    }
  };

  return (
    <>
      {!showBISfreshForm ? (
        <form onSubmit={handleRNumbersubmit}>
          <div className="bis-userid">
            <label htmlFor="has-r-number">Do you have an R number?</label>
            <select
              id="has-r-number"
              value={hasRNumber ? "yes" : "no"}
              onChange={handleDropdownChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {hasRNumber && (
            <div className="bis-userid">
              <label htmlFor="user-id">User ID:</label>
              <input
                type="text"
                id="user-id"
                name="Username_BISPortal"
                value={rnumberformData.Username_BISPortal}
                onChange={(event) =>
                  setRnumberformData({
                    ...rnumberformData,
                    Username_BISPortal: event.target.value,
                  })
                }
              />
            </div>
          )}

          {hasRNumber && (
            <div className="bis-userid">
              <label htmlFor="password">Password:</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="Password_BISPortal"
                  value={rnumberformData.Password_BISPortal}
                  onChange={(event) =>
                    setRnumberformData({
                      ...rnumberformData,
                      Password_BISPortal: event.target.value,
                    })
                  }
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
          )}

          {hasRNumber && (
            <div className="bis-userid">
              <label htmlFor="r-number">R Number:</label>
              <input
                type="text"
                id="r-number"
                name="Rnumber"
                value={rnumberformData.Rnumber}
                onChange={(event) =>
                  setRnumberformData({
                    ...rnumberformData,
                    Rnumber: event.target.value,
                  })
                }
              />
            </div>
          )}

          <button className="bis-register" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <BISfreshForm />
      )}
    </>
  );
}

export default BisRNumberPopup;