import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal from sweetalert2 library
import axiosInstance from "../../../interceptors/axios";

const WPCFormComponent = ({ onClose }) => {
      
  const history = useHistory();

  const [wpcformData, setWPCformData] = useState({
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
    request_for: "certification",
    application: localStorage.getItem("newApplicationId"),
    compliance: localStorage.getItem("compliance_id"),
  });

  console.log(wpcformData)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWPCformData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here

    // Make the API POST request with the formData
    axiosInstance
      .post("/application/compliance/", wpcformData, {
        // Changed 'formData' to 'tecformData'
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data; // your JSON data here
        // form submission successful
        console.log(data);
        Swal.fire({
          title: "Success",
          text:
            'Form submitted successfully. Please head over to the "Track Application" Page to upload documents and review progress ',
          icon: "success",
        }).then(() => {
          history.push('/navbar/review');
        });

        // // Loop through each form in the "forms" field
        // for (const [formName, formData] of Object.entries(data.data.forms)) {
        //   // Create a new Blob object with the formData
        //   const file = new Blob([formData], { type: "text/plain" });

        //   // Create a URL for the file
        //   const fileUrl = URL.createObjectURL(file);

        //   // Create a temporary anchor tag to trigger the download
        //   const link = document.createElement("a");
        //   link.href = fileUrl;
        //   link.download = `${formName}.txt`;
        //   link.click();

        //   // Clean up the URL object
        //   URL.revokeObjectURL(fileUrl);
        // }
        onClose(); // Close the popup after download is complete
      })
      .catch((error) => {
        // handle error
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to submit form",
          icon: "error",
        });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
  );
};

export default WPCFormComponent;
