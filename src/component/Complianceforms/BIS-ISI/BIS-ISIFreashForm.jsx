import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";

const BISISIFreashForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasBISReg, setHasBISReg] = useState(false);
  const storedApplicationId = localStorage.getItem("applicationId");
  const history = useHistory();

  const [bisFormData, setBisFormData] = useState({
    Types_of_company: "",
    Factory_name: "",
    Factory_address: "",
    Factory_contact_number: "",
    Factory_emailid: "",
    Factory_signing_person: "",
    Top_management_of_the_manufacturing_unit_name_1: "",
    Top_management_of_the_manufacturing_unit_name_2: "",
    Top_management_of_the_manufacturing_unit_name_3: "",
    Top_management_of_the_manufacturing_unit_name_4: "",
    Top_management_of_the_manufacturing_unit_name_5: "",
    Top_management_of_the_manufacturing_unit_designation_1: "",
    Top_management_of_the_manufacturing_unit_designation_2: "",
    Top_management_of_the_manufacturing_unit_designation_3: "",
    Top_management_of_the_manufacturing_unit_designation_4: "",
    Top_management_of_the_manufacturing_unit_designation_5: "",
    Who_is_signing: "",
    Technical_management_of_the_manufacturing_unit_name_1: "",
    Technical_management_of_the_manufacturing_unit_name_2: "",
    Technical_management_of_the_manufacturing_unit_name_3: "",
    Technical_management_of_the_manufacturing_unit_designation_1: "",
    Technical_management_of_the_manufacturing_unit_designation_2: "",
    Technical_management_of_the_manufacturing_unit_designation_3: "",
    Contact_person_of_the_manufacturing_unit_name_: "",
    Contact_person_of_the_manufacturing_unit_designation: "",
    Contact_person_of_the_manufacturing_unit_contact_number: "",
    Contact_person_of_the_manufacturing_unit_emailid: "",
    Brand_trademark: "",
    Brand_owned_by: "",
    Brand_registered: "",
    Brand_owner_company_name: "",
    Brand_owner_company_address: "",
    Name_of_the_AIR_company: "",
    Address_of_the_AIR_company: "",
    Top_management_of_the_AIR_company_name: "",
    Top_management_of_the_AIR_company_designation: "",
    Top_management_of_the_AIR_company_contact_number: "",
    Top_management_of_the_AIR_company_emailid: "",
    Authorized_signatory_name: "",
    Authorized_signatory_designation: "",
    Authorized_signatory_contact_number: "",
    Authorized_signatory_emailid: "",
    AIR_company_aadhar_card: "",
    AIR_company_pan_card: "",
    AIR_signing_person: "",
    AIR_company_condition: "",
    Username_BISPortal: "",
    Password_BISPortal: "",
    request_for: "certification",
    application: storedApplicationId,
    compliance: localStorage.getItem("compliance_id"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBisFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //Handle BIS from Data here-----------------------------------------------------------------------
  const handleBISSubmit = (event) => {
    event.preventDefault();

    // function to handle form submission
    axiosInstance
      .post("/application/compliance/", bisFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data; // your JSON data here

        // form submission successful

        console.log(data);
        // loop through each form in the "forms" field
        for (const [formName, formData] of Object.entries(data.data.forms)) {
          // create a new Blob object with the formData
          const file = new Blob([formData], { type: "text/plain" });

          // create a URL for the file
          const fileUrl = URL.createObjectURL(file);

          // create a temporary anchor tag to trigger the download
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = `${formName}.txt`;
          link.click();

          // clean up the URL object
          URL.revokeObjectURL(fileUrl);
        }
        const formSubmitted = true; // Corrected the assignment statement

        if (formSubmitted) {
          // Assuming success status is available in uploadStatus
          Swal.fire({
            icon: "success",
            title: "Form Submitted",
            text:
              'Form submitted successfully. Please head over to the "Track Application" Page to upload documents and review progress ',
            confirmButtonText: "OK",
          }).then(() => {
            history.push('/navbar/review');
          })
          //    setButtonPopup6bis(false);
        } else {
          Swal.fire({
            icon: "error",
            title: "Form not submitted",
            text: "Form submission failed. Please try again.",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        // Handle error case here
        Swal.fire({
          icon: "error",
          title: "Form Submission Failed",
          text: "Sorry, there was an error Submission your form",
          confirmButtonText: "OK",
        });
      });
  };

  const handleBISprotelChange = (event) => {
    const value = event.target.value === "yes";
    setHasBISReg(value);
    setBisFormData((prevState) => ({
      ...prevState,
      Factory_signing_person: event.target.value,
    }));
  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <form onSubmit={handleBISSubmit}>
        <div className="compliance-container" style={{ display: "none" }}>
          <h2>Compliance Data</h2>
          <div>
            <p>
              Application ID:{" "}
              {localStorage.getItem("newApplicationId") ||
                "No application created yet"}
            </p>
            <p>
              Compliance ID:{" "}
              {localStorage.getItem("compliance_id") ||
                "No compliance selected yet"}
            </p>
            <p>Request For: certification</p>
          </div>
        </div>

        <label className="st8012">
          Do you have BIS portal credentials?
          <select
            className="st804"
            value={hasBISReg ? "yes" : "no"}
            onChange={handleBISprotelChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {hasBISReg && (
          <div>
            <label className="st8012">
              Username:
              <input
                className="st805"
                type="text"
                name="Username_BISPortal"
                value={bisFormData.Username_BISPortal}
                onChange={handleChange}
              />
              <div></div>
            </label>

            <label className="st8012">
              Password:
              <input
                className="st805"
                type={showPassword ? "text" : "password"}
                name="Password_BISPortal"
                value={bisFormData.Password_BISPortal}
                onChange={handleChange}
              />
              <div
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </div>
            </label>
          </div>
        )}

        <h1 className="h802"> Certification Process </h1>

        <label className="st8012">
          Manufacture:
          <select
            className="st804"
            name="Types_of_company"
            value={bisFormData.Types_of_company}
            onChange={handleChange}
          >
            <option value="">Select your Company</option>
            <option value="Foreign">Foreign</option>
            <option value="Indian">Indian</option>
          </select>
        </label>

        <label className="st8012">
          Factory Name:
          <input
            className="st805"
            type="text"
            name="Factory_name"
            value={bisFormData.Factory_name}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
          Factory Address (complete address):
          <input
            className="st805"
            type="text"
            name="Factory_address"
            value={bisFormData.Factory_address}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
          Contact Number:
          <input
            className="st805"
            name="Factory_contact_number"
            value={bisFormData.Factory_contact_number}
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
            name="Factory_emailid"
            value={bisFormData.Factory_emailid}
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

        <select
          className="bisdrop"
          name="Factory_signing_person"
          value={bisFormData.Factory_signing_person}
          onChange={handleChange}
        >
          <option value="">Choose Signing Person</option>
          <option value="Contact">SIGNING PERSON WILL BE CONTACT PERSON</option>
          <option value="Top">
            SIGNING PERSON WILL BE FROM TOP MANAGEMENT{" "}
          </option>
        </select>

        {/* ----------------Top Management code Here---------------------- */}

        <h3 className="topmang">Top Management (Fill atleast Two)</h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="1)Name"
                  name="Top_management_of_the_manufacturing_unit_name_1"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_name_1
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Name"
                  name="Top_management_of_the_manufacturing_unit_name_2"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_name_2
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="3)Name"
                  name="Top_management_of_the_manufacturing_unit_name_3"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_name_3
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="4)Name"
                  name="Top_management_of_the_manufacturing_unit_name_4"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_name_4
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="5)Name"
                  name="Top_management_of_the_manufacturing_unit_name_5"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_name_5
                  }
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="designations">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="1)Designation"
                  name="Top_management_of_the_manufacturing_unit_designation_1"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_designation_1
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Designation"
                  name="Top_management_of_the_manufacturing_unit_designation_2"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_designation_2
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="3)Designation"
                  name="Top_management_of_the_manufacturing_unit_designation_3"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_designation_3
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="4)Designation"
                  name="Top_management_of_the_manufacturing_unit_designation_4"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_designation_4
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="5)Designation"
                  name="Top_management_of_the_manufacturing_unit_designation_5"
                  value={
                    bisFormData.Top_management_of_the_manufacturing_unit_designation_5
                  }
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* DropDown of Which person is Signin  */}
        {bisFormData.Factory_signing_person === "Top" && (
          <div>
            {/* Render additional popup or options for signing person from top management */}
            <select
              className="bisdrop"
              name="Who_is_signing"
              value={bisFormData.Who_is_signing}
              onChange={handleChange}
              required
            >
              <option value="">
                Choose Signing Person from Top Management
              </option>
              <option value="1">Name 1</option>
              <option value="2">Name 2</option>
              <option value="3">Name 3</option>
              <option value="4">Name 4</option>
              <option value="5">Name 5</option>
            </select>
          </div>
        )}

        {/*---------- Technical Management Input code Here---------------- */}

        <h3 className="techni">Technical Management (Fill atleast Two)</h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="1)Name"
                  name="Technical_management_of_the_manufacturing_unit_name_1"
                  value={
                    bisFormData.Technical_management_of_the_manufacturing_unit_name_1
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Name"
                  name="Technical_management_of_the_manufacturing_unit_name_2"
                  value={
                    bisFormData.Technical_management_of_the_manufacturing_unit_name_2
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="3)Name"
                  name="Technical_management_of_the_manufacturing_unit_name_3"
                  value={
                    bisFormData.Technical_management_of_the_manufacturing_unit_name_3
                  }
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="designations">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="1)Designation"
                  name="Technical_management_of_the_manufacturing_unit_designation_1"
                  value={
                    bisFormData.Technical_management_of_the_manufacturing_unit_designation_1
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Designation"
                  name="Technical_management_of_the_manufacturing_unit_designation_2"
                  value={
                    bisFormData.Technical_management_of_the_manufacturing_unit_designation_2
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="3)Designation"
                  name="Technical_management_of_the_manufacturing_unit_designation_3"
                  value={
                    bisFormData.Technical_management_of_the_manufacturing_unit_designation_3
                  }
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        <h3 className="techni">Contact Person Details</h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Name"
                  name="Contact_person_of_the_manufacturing_unit_name_"
                  value={
                    bisFormData.Contact_person_of_the_manufacturing_unit_name_
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Designation"
                  name="Contact_person_of_the_manufacturing_unit_designation"
                  value={
                    bisFormData.Contact_person_of_the_manufacturing_unit_designation
                  }
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="designations">
              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Contact Number"
                  name="Contact_person_of_the_manufacturing_unit_contact_number"
                  value={
                    bisFormData.Contact_person_of_the_manufacturing_unit_contact_number
                  }
                  onChange={handleChange}
                  type="tel"
                  pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                  title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                  required // Make the field required to ensure a value is entered
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Email ID"
                  name="Contact_person_of_the_manufacturing_unit_emailid"
                  value={
                    bisFormData.Contact_person_of_the_manufacturing_unit_emailid
                  }
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
            </div>
          </div>
        </div>
        <span className ="email-warning" id="applicant-email-error2" style={{ color: "red" }}></span>

        <h1 className="h802">Brand</h1>

        <label className="st8012">
          Trademark:
          <input
            className="st805"
            type="tel"
            name="Brand_trademark"
            value={bisFormData.Brand_trademark}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Owned by self or others:
          <select
            className="st804"
            name="Brand_owned_by"
            value={bisFormData.Brand_owned_by}
            onChange={handleChange}
          >
            <option value="">Choose Brand Ownd By</option>
            <option value="self">Self</option>
            <option value="others">Others</option>
          </select>
        </label>

        <label className="st8012">
          Is the Brand Name/Trade Mark Registered?:
          <select
            className="st804"
            name="Brand_registered"
            value={bisFormData.Brand_registered}
            onChange={handleChange}
          >
            <option value="">Select Brand Registered</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <label className="st8012">
          Brand Owner Company Name:
          <input
            className="st805"
            type="text"
            name="Brand_owner_company_name"
            value={bisFormData.Brand_owner_company_name}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
          Brand Owner Company Address:
          <input
            className="st805"
            type="text"
            name="Brand_owner_company_address"
            value={bisFormData.Brand_owner_company_address}
            onChange={handleChange}
          />
        </label>

        <h1 className="h802">AIR </h1>
        <label className="st8012">
          AIR company Name:
          <input
            className="st805"
            type="text"
            name="Name_of_the_AIR_company"
            value={bisFormData.Name_of_the_AIR_company}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
          AIR company Address:
          <input
            className="st805"
            type="text"
            name="Address_of_the_AIR_company"
            value={bisFormData.Address_of_the_AIR_company}
            onChange={handleChange}
          />
        </label>

        {/*----------------- Top Mangement Box here ------------------------- */}
        <h3 className="techni">Top management AIR </h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Name"
                  name="Top_management_of_the_AIR_company_name"
                  value={bisFormData.Top_management_of_the_AIR_company_name}
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Designation"
                  name="Top_management_of_the_AIR_company_designation"
                  value={
                    bisFormData.Top_management_of_the_AIR_company_designation
                  }
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="designations">
              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Contact Number"
                  name="Top_management_of_the_AIR_company_contact_number"
                  value={
                    bisFormData.Top_management_of_the_AIR_company_contact_number
                  }
                  onChange={handleChange}
                  type="tel"
                  pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                  title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                  required // Make the field required to ensure a value is entered
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Email ID"
                  type="text"
                  name="Top_management_of_the_AIR_company_emailid"
                  value={bisFormData.Top_management_of_the_AIR_company_emailid}
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
            </div>
          </div>
        </div>
        <span className ="email-warning" id="applicant-email-error3" style={{ color: "red" }}></span>

        {/*---------------- Name of authorized Signatory -----------------------------*/}

        <h3 className="techni">Name of authorized Signatory</h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Name"
                  name="Authorized_signatory_name"
                  value={bisFormData.Authorized_signatory_name}
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Designation"
                  name="Authorized_signatory_designation"
                  value={bisFormData.Authorized_signatory_designation}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="designations">
              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Contact Number"
                  name="Authorized_signatory_contact_number"
                  value={bisFormData.Authorized_signatory_contact_number}
                  onChange={handleChange}
                  type="tel"
                  pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                  title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                  required // Make the field required to ensure a value is entered
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Email ID"
                  type="text"
                  name="Authorized_signatory_emailid"
                  value={bisFormData.Authorized_signatory_emailid}
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
            </div>
          </div>
        </div>
        <span className ="email-warning" id="applicant-email-error4" style={{ color: "red" }}></span>

        <label className="st8012">
          Aadhar Card:
          <input
            className="st805"
            type="text"
            name="AIR_company_aadhar_card"
            value={bisFormData.AIR_company_aadhar_card}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
          PAN Card:
          <input
            className="st805"
            type="text"
            name="AIR_company_pan_card"
            value={bisFormData.AIR_company_pan_card}
            onChange={handleChange}
          />
        </label>

        <select
          className="bisdrop"
          name="AIR_signing_person"
          value={bisFormData.AIR_signing_person}
          onChange={handleChange}
        >
          <option value="">Choose AIR Signing Person</option>
          <option value="Top">
            SIGNING PERSON WILL BE FROM TOP MANAGEMENT{" "}
          </option>
          <option value="contact">
            SIGNING PERSON WILL BE someone from the company{" "}
          </option>
        </select>

        <div>
          <select
            className="bisdrop"
            name="AIR_company_condition"
            value={bisFormData.AIR_company_condition}
            onChange={handleChange}
          >
            <option value="">Choose Condition for Nomination</option>
            <option value="1">
              If the AIR company is the sister company of the manufacturer and
              have office in India{" "}
            </option>
            <option value="2">
              If the AIR company is the Brandowner and have office in India{" "}
            </option>
            <option value="3">If the 3rd party will be the AIR </option>
          </select>
        </div>

        <button className="btn808" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BISISIFreashForm;
