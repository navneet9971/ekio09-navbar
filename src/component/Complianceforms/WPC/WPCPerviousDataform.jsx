import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function WPCPerviousData({ onClose }) {
  const applicationId = localStorage.getItem("applicationId");
  const autofillWpcData = localStorage.getItem("wpcdata"); // this setItem show on Secondpage.jsx
  const [isLoading, setIsLoading] = useState(false);  
  const history = useHistory();

  const [wpcformData, setWpcformData] = useState({
    Registration_type: "",
    CIN_number: "",
    Company_name: "",
    Incorporation: "",
    PAN_number: "",
    Complete_address: "",
    Complete_pincode: "",
    Complete_district: "",
    Complete_state: "",
    Complete_landline_number: "",
    Complete_fax_number: "",
    Complete_emailid: "",
    Registered_address: "",
    Registered_pincode: "",
    Registered_district: "",
    Registered_state: "",
    Registered_landline_number: "",
    Registered_fax_number: "",
    Registered_emailid: "",
    Correspondance_address: "",
    Correspondance_pincode: "",
    Correspondance_district: "",
    Correspondance_state: "",
    Correspondance_landline_number: "",
    Correspondance_fax_number: "",
    Correspondance_emailid: "",
    Authorised_name: "",
    Authorised_designation: "",
    Authorised_address: "",
    Authorised_pincode: "",
    Authorised_district: "",
    Authorised_state: "",
    Authorised_landline_number: "",
    Authorised_fax_number: "",
    Authorised_emailid: "",
    Authorised_mobile_number: "",
    application: "",
    compliance: "compliance_id",
    request_for: "certification",
  });

  console.log(wpcformData)

  useEffect(() => {
    if (autofillWpcData) {
      const parsedData = JSON.parse(autofillWpcData);
      setWpcformData(parsedData);
    }
  }, [autofillWpcData]);

  console.log(wpcformData); //TecForm Data consolelog here and checkout

  const handleSubmitwpcauto = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation


    const updatedTecformData = {
      Registration_type: wpcformData.Registration_type,
      CIN_number: wpcformData.CIN_number,
      Company_name: wpcformData.Company_name,
      Incorporation: wpcformData.Incorporation,
      PAN_number:wpcformData.PAN_number,
      Complete_address: wpcformData.Complete_address,
      Complete_pincode: wpcformData.Complete_pincode,
      Complete_district:
        wpcformData.Complete_district,
      Complete_state: wpcformData.Complete_state,
      Complete_landline_number: wpcformData.Complete_landline_number,
      Complete_fax_number: wpcformData.Complete_fax_number,
      Complete_emailid:
        wpcformData.Complete_emailid,
      Registered_address:
        wpcformData.Registered_address,
      Registered_pincode:
        wpcformData.Registered_pincode,
      Registered_district:
        wpcformData.Registered_district,
      Registered_state:
        wpcformData.Registered_state,
      Registered_landline_number: wpcformData.Registered_landline_number,
      Registered_fax_number: wpcformData.Registered_fax_number,
      Registered_emailid: wpcformData.Registered_emailid,
      Correspondance_address: wpcformData.Correspondance_address,
      Correspondance_pincode: wpcformData.Correspondance_pincode,
      Correspondance_district: wpcformData.Correspondance_district,
      Correspondance_state: wpcformData.Correspondance_state,
      Correspondance_landline_number: wpcformData.Correspondance_landline_number,
      Correspondance_fax_number: wpcformData.Correspondance_fax_number,
      Correspondance_emailid: wpcformData.Correspondance_emailid,
      Authorised_name: wpcformData.Authorised_name,
      Authorised_designation: wpcformData.Authorised_designation,
      Authorised_address: wpcformData.Authorised_address,
      Authorised_pincode: wpcformData.Authorised_pincode,
      Authorised_district: wpcformData.Authorised_district,
      Authorised_state: wpcformData.Authorised_state,
      Authorised_landline_number: wpcformData.Authorised_landline_number,
      Authorised_fax_number: wpcformData.Authorised_fax_number,
      Authorised_emailid: wpcformData.Authorised_emailid,
      Authorised_mobile_number: wpcformData.Authorised_mobile_number,
      compliance: localStorage.getItem("compliance_id"),
      request_for: "certification",
      application: applicationId,
    };
    console.log(updatedTecformData);
    axiosInstance
      .post("/application/compliance/", updatedTecformData, {
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
            'Form submitted successfully. Please head over to the "Track Application" Page to upload documents and review progress ',
          icon: "success",
        }).then(() => {
          history.push('/navbar/review');
        })
        onClose(); // Close the popup after download is complete
        setIsLoading(false); // Stop loading animation
        // if you are any auto download form then use this code and  un comment down load codes

        // for (const [formName, formData] of Object.entries(data.data.forms)) {
        //   const file = new Blob([formData], { type: "text/plain" });
        //   const fileUrl = URL.createObjectURL(file);
        //   const link = document.createElement("a");
        //   link.href = fileUrl;
        //   link.download = `${formName}.txt`;
        //   link.click();
        //   URL.revokeObjectURL(fileUrl);
        // }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to submit form",
          icon: "error",
        });
        setIsLoading(false); // Stop loading animation
      });
  };


  const handleChange = (e) => {
    setWpcformData({ ...wpcformData, [e.target.name]: e.target.value });
  };

  return (
    <>

    <div style={{ height: "500px", overflow: "scroll" }}>
      <form onSubmit={handleSubmitwpcauto}>
         <h1 className="h802">WPC Portal regsitration</h1>
      <label className="st8012">
      Registration Type:
      <input
          className="st805"
          type="text"
          name="Registration_type"
          value={wpcformData.Registration_type}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
      CIN Number:
        <input
          className="st805"
          type="text"
          name="CIN_number"
          value={wpcformData.CIN_number}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
      Company Name:
        <input
          className="st805"
          type="text"
          name="Company_name"
          value={wpcformData.Company_name}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
      Date of Incorporation:
        <input
          className="st805"
          type="text"
          name="Incorporation"
          value={wpcformData.Incorporation}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
      PAN Number:
        <input
          className="st805"
          type="text"
          name="PAN_number"
          value={wpcformData.PAN_number}
          onChange={handleChange}
        />
      </label>

      <h1 className="h802">Complete Postal Address</h1>

      <label className="st8012">
        Address:
        <input
          className="st805"
          name="Complete_address"
          value={wpcformData.Complete_address}
          onChange={handleChange}
          type="text"
        />
      </label>

      <label className="st8012">
        Pincode: 
        <input
          className="st805"
          type="text"
          name="Complete_pincode"
          value={wpcformData.Complete_pincode}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
      District:
        <input
          className="st805"
          type="text"
          name="Complete_district"
          value={wpcformData.Complete_district}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
      State:
        <input
          className="st805"
          type="text"
          name="Complete_state"
          value={wpcformData.Complete_state}
          onChange={handleChange}
        />
      </label>

         <label className="st8012">
        Landline Number:
        <input
          className="st805"
          name="Complete_landline_number"
          value={wpcformData.Complete_landline_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <label className="st8012">
        Fax Number:
        <input
          className="st805"
          name="Complete_fax_number"
          value={wpcformData.Complete_fax_number}
          onChange={handleChange}
          type="text"
        />
      </label>

      <label className="st8012">
        Email ID:
        <input
          className="st805"
          type="text"
          name="Complete_emailid"
          value={wpcformData.Complete_emailid}
          onChange={(event) => {
            const inputValue = event.target.value;
            const isValidEmail =
              inputValue.includes("@") && inputValue.includes(".");
            handleChange(event); // Call the original handleChange function if needed
            const errorElement = document.getElementById(
              "applicant-email-error"
            );

            if (isValidEmail) {
              errorElement.textContent = "";
            } else {
              errorElement.textContent =
                "Please enter a valid email address. Use @ and .xyz";
            }
          }}
        />
      </label>
      <span className ="email-warning" id="applicant-email-error" style={{ color: "red" }}></span>

      <h1 className="h802">Registered Office Address:</h1>

      <label className="st8012">
        Address:
        <input
          className="st805"
          type="text"
          name="Registered_address"
          value={wpcformData.Registered_address}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Pincode:
        <input
          className="st805"
          type="text"
          name="Registered_pincode"
          value={wpcformData.Registered_pincode}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        District:
        <input
          className="st805"
          type="text"
          name="Registered_district"
          value={wpcformData.Registered_district}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        State:
        <input
          className="st805"
          type="text"
          name="Registered_state"
          value={
            wpcformData.Registered_state
          }
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Landline Number:
        <input
          className="st805"
          name="Registered_landline_number"
          value={wpcformData.Registered_landline_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <label className="st8012">
        Fax Number:
        <input
          className="st805"
          type="text"
          name="Registered_fax_number"
          value={
            wpcformData.Registered_fax_number
          }
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Email ID:
        <input
          className="st805"
          type="text"
          name="Registered_emailid"
          value={wpcformData.Registered_emailid}
          onChange={(event) => {
            const inputValue = event.target.value;
            const isValidEmail =
              inputValue.includes("@") && inputValue.includes(".");
            handleChange(event); // Call the original handleChange function if needed
            const errorElement = document.getElementById(
              "applicant-email-error2"
            );

            if (isValidEmail) {
              errorElement.textContent = "";
            } else {
              errorElement.textContent =
                "Please enter a valid email address. Use @ and .xyz";
            }
          }}
        />
      </label>
      <span className ="email-warning" id="applicant-email-error2" style={{ color: "red" }}></span>

      <h1 className="h802">Correspondance Address:</h1>

      <label className="st8012">
        Address:
        <input
          className="st805"
          type="text"
          name="Correspondance_address"
          value={wpcformData.Correspondance_address}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Pincode:
        <input
          className="st805"
          type="text"
          name="Correspondance_pincode"
          value={wpcformData.Correspondance_pincode}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        District:
        <input
          className="st805"
          type="text"
          name="Correspondance_district"
          value={wpcformData.Correspondance_district}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        State:
        <input
          className="st805"
          type="text"
          name="Correspondance_state"
          value={wpcformData.Correspondance_state}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Landline Number:
        <input
          className="st805"
          name="Correspondance_landline_number"
          value={wpcformData.Correspondance_landline_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <label className="st8012">
        Fax Number:
        <input
          className="st805"
          type="text"
          name="Correspondance_fax_number"
          value={wpcformData.Correspondance_fax_number}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Email ID:
        <input
          className="st805"
          type="text"
          name="Correspondance_emailid"
          value={wpcformData.Correspondance_emailid}
          onChange={(event) => {
            const inputValue = event.target.value;
            const isValidEmail =
              inputValue.includes("@") && inputValue.includes(".");
            handleChange(event); // Call the original handleChange function if needed
            const errorElement = document.getElementById(
              "applicant-email-error3"
            );

            if (isValidEmail) {
              errorElement.textContent = "";
            } else {
              errorElement.textContent =
                "Please enter a valid email address. Use @ and .xyz";
            }
          }}
        />
      </label>
      <span className ="email-warning" id="applicant-email-error3" style={{ color: "red" }}></span>

      <h1 className="h802">Authorised Contact Person/Signatory Details</h1>

      <label className="st8012">
        Name:
        <input
          className="st805"
          type="text"
          name="Authorised_name"
          value={wpcformData.Authorised_name}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Designation:
        <input
          className="st805"
          type="text"
          name="Authorised_designation"
          value={wpcformData.Authorised_designation}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Address:
        <input
          className="st805"
          type="text"
          name="Authorised_address"
          value={wpcformData.Authorised_address}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Pincode:
        <input
          className="st805"
          type="text"
          name="Authorised_pincode"
          value={wpcformData.Authorised_pincode}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
         District:
        <input
          className="st805"
          type="text"
          name="Authorised_district"
          value={wpcformData.Authorised_district}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        State:
        <input
          className="st805"
          type="text"
          name="Authorised_state"
          value={wpcformData.Authorised_state}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Landline Number:
        <input
          className="st805"
          name="Authorised_landline_number"
          value={wpcformData.Authorised_landline_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <label className="st8012">
        Fax Number:
        <input
          className="st805"
          type="text"
          name="Authorised_fax_number"
          value={wpcformData.Authorised_fax_number}
          onChange={handleChange}
        />
      </label>

      <label className="st8012">
        Email ID:
        <input
          className="st805"
          type="text"
          name="Authorised_emailid"
          value={wpcformData.Authorised_emailid}
          onChange={(event) => {
            const inputValue = event.target.value;
            const isValidEmail =
              inputValue.includes("@") && inputValue.includes(".");
            handleChange(event); // Call the original handleChange function if needed
            const errorElement = document.getElementById(
              "applicant-email-error4"
            );

            if (isValidEmail) {
              errorElement.textContent = "";
            } else {
              errorElement.textContent =
                "Please enter a valid email address. Use @ and .xyz";
            }
          }}
        />
      </label>
      <span className ="email-warning" id="applicant-email-error4" style={{ color: "red" }}></span>

      <label className="st8012">
        Mobile Number:
        <input
          className="st805"
          name="Authorised_mobile_number"
          value={wpcformData.Authorised_mobile_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <button className="btn808" type="submit">
        Submit
      </button>
    </form>
    </div>

    {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </>
  );
}

export default WPCPerviousData;
