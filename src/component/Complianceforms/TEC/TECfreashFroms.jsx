import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal from sweetalert2 library
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";


const TECFormComponent = ({ onClose }) => {

  const [isLoading, setIsLoading] = useState(false);    
  const history = useHistory();

  const [tecformData, setTecformData] = useState({
    Types_of_company: "",
    Applicant_company_name: "",
    Applicant_company_address: "",
    Applicant_director_name: "",
    Applicant_director_designation: "",
    Applicant_contact_number: "",
    Applicant_emailid: "",
    Applicant_company_CIN: "",
    Authorised_signatory_name: "",
    Authorised_signatory_designation: "",
    Authorised_signatory_number: "",
    Authorised_signatory_emailid: "",
    Foreign_manufacturer_company_name: "",
    Foreign_manufacturer_company_address: "",
    Foreign_manufacturer_authorised_signatory_name: "",
    Foreign_manufacturer_authorised_signatory_designation: "",
    Foreign_manufacturer_contact_number: "",
    Foreign_manufacturer_emailid: "",
    request_for: "certification",
    application: localStorage.getItem("newApplicationId"),
    compliance: localStorage.getItem("compliance_id"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTecformData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation
    // Handle form submission here

    // Make the API POST request with the formData
    axiosInstance
      .post("/application/compliance/", tecformData, {
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

        // Loop through each form in the "forms" field
        for (const [formName, formData] of Object.entries(data.data.forms)) {
          // Create a new Blob object with the formData
          const file = new Blob([formData], { type: "text/plain" });

          // Create a URL for the file
          const fileUrl = URL.createObjectURL(file);

          // Create a temporary anchor tag to trigger the download
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = `${formName}.txt`;
          link.click();

          // Clean up the URL object
          URL.revokeObjectURL(fileUrl);
        }
        setIsLoading(false); // Stop loading animation
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
        setIsLoading(false); // Stop loading animation
      });
  };

  return (
    <form onSubmit={handleSubmit}>
       {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
      <label className="st8012">
        Indian OEM/Foreign Manufacture:
        <select
          className="st804"
          name="Types_of_company"
          value={tecformData.Types_of_company}
          onChange={handleChange}
        >
          <option value="">Select Your Company</option>
          <option value="Foreign">Foreign</option>
          <option value="Indian">Indian</option>
        </select>
      </label>

      <h1 className="h802">Applicant Company:</h1>

      <label className="st8012">
        Company Name:
        <input
          className="st805"
          type="text"
          name="Applicant_company_name"
          value={tecformData.Applicant_company_name}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Company Address:
        <input
          className="st805"
          type="text"
          name="Applicant_company_address"
          value={tecformData.Applicant_company_address}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Director Name/(Any other higher Authority)
        <input
          className="st805"
          type="text"
          name="Applicant_director_name"
          value={tecformData.Applicant_director_name}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Designation:
        <input
          className="st805"
          type="text"
          name="Applicant_director_designation"
          value={tecformData.Applicant_director_designation}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Contact Number:
        <input
          className="st805"
          name="Applicant_contact_number"
          value={tecformData.Applicant_contact_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <label className="st8012">
        Email ID:
        <input
          className="st805"
          type="text"
          name="Applicant_emailid"
          value={tecformData.Applicant_emailid}
          onChange={(event) => {
            const inputValue = event.target.value;
            const isValidEmail =
              inputValue.includes("@") && inputValue.includes(".");
            handleChange(event); // Call the original handleChange function if needed
            const errorElement = document.getElementById(
              "applicant-email-error1"
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
      <span className ="email-warning" id="applicant-email-error1" style={{ color: "red" }}></span>

      <label className="st8012">
        Company CIN:
        <input
          className="st805"
          type="text"
          name="Applicant_company_CIN"
          value={tecformData.Applicant_company_CIN}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Authorised Signatory Name:
        <input
          className="st805"
          type="text"
          name="Authorised_signatory_name"
          value={tecformData.Authorised_signatory_name}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Authorised Signatory Designation:
        <input
          className="st805"
          type="text"
          name="Authorised_signatory_designation"
          value={tecformData.Authorised_signatory_designation}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Contact Number:
        <input
          className="st805"
          name="Authorised_signatory_number"
          value={tecformData.Authorised_signatory_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <label className="st8012">
        Email ID:
        <input
          className="st805"
          type="text"
          name="Authorised_signatory_emailid"
          value={tecformData.Authorised_signatory_emailid}
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

      <h1 className="h802">Foreign Manufacture:</h1>
      <label className="st8012">
        Company Name:
        <input
          className="st805"
          type="text"
          name="Foreign_manufacturer_company_name"
          value={tecformData.Foreign_manufacturer_company_name}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Company Address:
        <input
          className="st805"
          type="text"
          name="Foreign_manufacturer_company_address"
          value={tecformData.Foreign_manufacturer_company_address}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Authorized Signatory Name:
        <input
          className="st805"
          type="text"
          name="Foreign_manufacturer_authorised_signatory_name"
          value={tecformData.Foreign_manufacturer_authorised_signatory_name}
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Authorized Signatory Designation:
        <input
          className="st805"
          type="text"
          name="Foreign_manufacturer_authorised_signatory_designation"
          value={
            tecformData.Foreign_manufacturer_authorised_signatory_designation
          }
          onChange={handleChange}
        />
      </label>
      <label className="st8012">
        Contact Number:
        <input
          className="st805"
          name="Foreign_manufacturer_contact_number"
          value={tecformData.Foreign_manufacturer_contact_number}
          onChange={handleChange}
          type="tel"
          pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
          title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
          required // Make the field required to ensure a value is entered
        />
      </label>

      <label className="st8012">
        Email ID:
        <input
          className="st805"
          type="text"
          name="Foreign_manufacturer_emailid"
          value={tecformData.Foreign_manufacturer_emailid}
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

      <button className="btn808" type="submit">
        Submit
      </button>
    </form>
  );
};

export default TECFormComponent;
