import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../interceptors/axios";

function TECPerviousData({ onClose }) {
  const applicationId = localStorage.getItem("applicationId");
  const autofillTecData = localStorage.getItem("tecdata");
  const history = useHistory();

  const [tecformData, setTecformData] = useState({
    Applicant_company_CIN: "",
    Applicant_company_address: "",
    Applicant_company_name: "",
    Applicant_contact_number: "",
    Applicant_director_designation: "",
    Applicant_director_name: "",
    Applicant_emailid: "",
    Authorised_signatory_designation: "",
    Authorised_signatory_emailid: "",
    Authorised_signatory_name: "",
    Authorised_signatory_number: "",
    Foreign_manufacturer_authorised_signatory_designation: "",
    Foreign_manufacturer_authorised_signatory_name: "",
    Foreign_manufacturer_company_address: "",
    Foreign_manufacturer_company_name: "",
    Foreign_manufacturer_contact_number: "",
    Foreign_manufacturer_emailid: "",
    Types_of_company: "",
    application: "",
    compliance: "compliance_id",
    request_for: "certification",
  });

  useEffect(() => {
    if (autofillTecData) {
      const parsedData = JSON.parse(autofillTecData);
      setTecformData(parsedData);
    }
  }, [autofillTecData]);

  console.log(tecformData); //TecForm Data consolelog here and checkout

  const handleSubmittecauto = (event) => {
    event.preventDefault();

    const updatedTecformData = {
      Applicant_company_CIN: tecformData.Applicant_company_CIN,
      Applicant_company_address: tecformData.Applicant_company_address,
      Applicant_company_name: tecformData.Applicant_company_name,
      Applicant_contact_number: tecformData.Applicant_contact_number,
      Applicant_director_designation:
        tecformData.Applicant_director_designation,
      Applicant_director_name: tecformData.Applicant_director_name,
      Applicant_emailid: tecformData.Applicant_emailid,
      Authorised_signatory_designation:
        tecformData.Authorised_signatory_designation,
      Authorised_signatory_emailid: tecformData.Authorised_signatory_emailid,
      Authorised_signatory_name: tecformData.Authorised_signatory_name,
      Authorised_signatory_number: tecformData.Authorised_signatory_number,
      Foreign_manufacturer_authorised_signatory_designation:
        tecformData.Foreign_manufacturer_authorised_signatory_designation,
      Foreign_manufacturer_authorised_signatory_name:
        tecformData.Foreign_manufacturer_authorised_signatory_name,
      Foreign_manufacturer_company_address:
        tecformData.Foreign_manufacturer_company_address,
      Foreign_manufacturer_company_name:
        tecformData.Foreign_manufacturer_company_name,
      Foreign_manufacturer_contact_number:
        tecformData.Foreign_manufacturer_contact_number,
      Foreign_manufacturer_emailid: tecformData.Foreign_manufacturer_emailid,
      Types_of_company: tecformData.Types_of_company,
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

        for (const [formName, formData] of Object.entries(data.data.forms)) {
          const file = new Blob([formData], { type: "text/plain" });
          const fileUrl = URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = `${formName}.txt`;
          link.click();
          URL.revokeObjectURL(fileUrl);
        }
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

  const handleChange = (e) => {
    setTecformData({ ...tecformData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <form onSubmit={handleSubmittecauto}>
        <h1 className="h802">Applicant</h1>
        <label className="st8012">
          Applicant company CIN
          <input
            className="st805"
            type="text"
            name="Applicant_company_CIN"
            value={tecformData.Applicant_company_CIN}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Applicant company address
          <input
            className="st805"
            type="text"
            name="Applicant_company_address"
            value={tecformData.Applicant_company_address}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Applicant company name
          <input
            className="st805"
            type="text"
            name="Applicant_company_name"
            value={tecformData.Applicant_company_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Applicant contact number
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
          Applicant director designation
          <input
            className="st805"
            type="text"
            name="Applicant_director_designation"
            value={tecformData.Applicant_director_designation}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Applicant director name
          <input
            className="st805"
            type="text"
            name="Applicant_director_name"
            value={tecformData.Applicant_director_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Applicant emailid:
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

        <label className="st8012">
          Authorised signatory designation
          <input
            className="st805"
            type="text"
            name="Authorised_signatory_designation"
            value={tecformData.Authorised_signatory_designation}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Authorised signatory emailid
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

        <label className="st8012">
          Authorised signatory name
          <input
            className="st805"
            type="text"
            name="Authorised_signatory_name"
            value={tecformData.Authorised_signatory_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Authorised signatory number
          <input
            className="st805"
            type="text"
            name="Authorised_signatory_number"
            value={tecformData.Authorised_signatory_number}
            onChange={handleChange}
          />
        </label>

        <h1 className="h802">Foreign Manufacturer</h1>
        <label className="st8012">
          Authorised signatory designation
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
          Authorised signatory name
          <input
            className="st805"
            type="text"
            name="Foreign_manufacturer_authorised_signatory_name"
            value={tecformData.Foreign_manufacturer_authorised_signatory_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Company address
          <input
            className="st805"
            type="text"
            name="Foreign_manufacturer_company_address"
            value={tecformData.Foreign_manufacturer_company_address}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Company name
          <input
            className="st805"
            type="text"
            name="Foreign_manufacturer_company_name"
            value={tecformData.Foreign_manufacturer_company_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Contact_number
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
          Email ID
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

        <label className="st8012">
          Types of company
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

        <button className="btn808" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TECPerviousData;
