import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

const BEEFreashForm  = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [hasBEEReg, setHasBEEReg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);   
  const storedApplicationId = localStorage.getItem("applicationId");
  const history = useHistory();

  const [beeFormData, setBeeFormData] = useState({
    Company_name: "",
    Company_category: "",
    Company_address: "",
    Company_city: "",
    Company_country: "",
    Company_state: "",
    Company_district: "",
    Company_pincode: "",
    Company_phonenumber: "",
    Company_mobilenumber: "",
    Company_website: "",
    Company_email: "",
    Manufacturing_company_name: "",
    Manufacturing_company_address: "",
    Manufacturing_company_city: "",
    Manufacturing_company_country: "",
    Manufacturing_company_state: "",
    Manufacturing_company_district: "",
    Manufacturing_company_pincode: "",
    Manufacturing_company_phonenumber: "",
    Manufacturing_company_mobilenumber: "",
    Manufacturing_company_email: "",
    Manufacturing_company_website: "",
    Manufacturing_company_iso_valid_date: "",
    Choose_one: "",
    Contact_person_name: "",
    Contact_person_designation: "",
    Contact_person_email: "",
    Contact_person_phonenumber: "",
    Contact_person_mobilenumber: "",
    Company_registration_number: "",
    Company_registration_date: "",
    Company_pan_number: "",
    Company_annual_turnover: "",
    Equipments_product_name: "",
    Brand_registered: "",
    request_for: "certification",
    application: storedApplicationId,
    compliance: localStorage.getItem("compliance_id"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBeeFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //Handle BIS from Data here-----------------------------------------------------------------------
  const handleBEESubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

    // function to handle form submission
    axiosInstance
      .post("/application/compliance/", beeFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data; // your JSON data here

        // form submission successful

        console.log(data);
        // loop through each form in the "forms" field
        // for (const [formName, formData] of Object.entries(data.data.forms)) {
        //   // create a new Blob object with the formData
        //   const file = new Blob([formData], { type: "text/plain" });

        //   // create a URL for the file
        //   const fileUrl = URL.createObjectURL(file);

        //   // create a temporary anchor tag to trigger the download
        //   const link = document.createElement("a");
        //   link.href = fileUrl;
        //   link.download = `${formName}.txt`;
        //   link.click();

        //   // clean up the URL object
        //   URL.revokeObjectURL(fileUrl);
        // }
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
          setIsLoading(false); // Stop loading animation
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
        setIsLoading(false); // Stop loading animation
      });
  };

  const handleBISprotelChange = (event) => {
    const value = event.target.value === "yes";
    setHasBEEReg(value);
    setBeeFormData((prevState) => ({
      ...prevState,
      Factory_signing_person: event.target.value,
    }));
  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
        {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
      <form onSubmit={handleBEESubmit}>
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
          Do you have BEE portal credentials?
          <select
            className="st804"
            value={hasBEEReg ? "yes" : "no"}
            onChange={handleBISprotelChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>

        {hasBEEReg && (
          <div>
            <label className="st8012">
              Username:
              <input
                className="st805"
                type="text"
                name="Username_BISPortal"
                value={beeFormData.Username_BISPortal}
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
                value={beeFormData.Password_BISPortal}
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
        Name of the Firm:
          <input
            className="st805"
            type="text"
            name="Company_name"
            value={beeFormData.Company_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Category:
          <select
            className="st804"
            name="Company_category"
            value={beeFormData.Company_category}
            onChange={handleChange}
          >
            <option value="">Select your Company</option>
            <option value="Manufactur">Manufactur</option>
            <option value="Importer">Importer</option>
            <option value="Trader">Trader</option>
          </select>
        </label>

        <label className="st8012">
          Address Line 1:
          <input
            className="st805"
            type="text"
            name="Company_address"
            value={beeFormData.Company_address}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          City/Town:
          <input
            className="st805"
            type="text"
            name="Company_city"
            value={beeFormData.Company_city}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Country:
          <input
            className="st805"
            name="Company_country"
            value={beeFormData.Company_country}
            onChange={handleChange}
            type="text"
          />
        </label>

        <label className="st8012">
          State:
          <input
            className="st805"
            type="text"
            name="Company_state"
            value={beeFormData.Company_state}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
         District:
          <input
            className="st805"
            type="text"
            name="Company_district"
            value={beeFormData.Company_district}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
         Pincode:
          <input
            className="st805"
            type="text"
            name="Company_pincode"
            value={beeFormData.Company_pincode}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
         State Code-Phone No:
          <input
            className="st805"
            name="Company_phonenumber"
            value={beeFormData.Company_phonenumber}
           onChange={handleChange}
           type="tel"
           pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
           title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
           required // Make the field required to ensure a value is entered
          />
        </label>

        <label className="st8012">
         Mobile Number:
          <input
            className="st805"
            name="Company_mobilenumber"
            value={beeFormData.Company_mobilenumber}
           onChange={handleChange}
           type="tel"
           pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
           title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
           required // Make the field required to ensure a value is entered
          />
        </label>

        <label className="st8012">
         Website:
          <input
            className="st805"
            type="text"
            name="Company_website"
            value={beeFormData.Company_website}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
            Email
                <input
                  className="st805"
                  type="text"
                  name="Company_email"
                  value={
                    beeFormData.Company_email
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
              <span className ="email-warning" id="applicant-email-error2" style={{ color: "red" }}></span>

      
              <label className="st8012">
         Name of the Company:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_name"
            value={beeFormData.Manufacturing_company_name}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Address Line 1:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_address"
            value={beeFormData.Manufacturing_company_address}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          City/Town:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_city"
            value={beeFormData.Manufacturing_company_city}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Country:
          <input
            className="st805"
            name="Manufacturing_company_country"
            value={beeFormData.Manufacturing_company_country}
            onChange={handleChange}
            type="text"
          />
        </label>

        <label className="st8012">
          State:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_state"
            value={beeFormData.Manufacturing_company_state}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
         District:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_district"
            value={beeFormData.Manufacturing_company_district}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
         Pincode:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_pincode"
            value={beeFormData.Manufacturing_company_pincode}
           onChange={handleChange}
          />
        </label>

        <label className="st8012">
         State Code-Phone No:
          <input
            className="st805"
            name="Manufacturing_company_phonenumber"
            value={beeFormData.Manufacturing_company_phonenumber}
           onChange={handleChange}
           type="tel"
           pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
           title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
           required // Make the field required to ensure a value is entered
          />
        </label>

        <label className="st8012">
         Mobile Number:
          <input
            className="st805"
            name="Manufacturing_company_mobilenumber"
            value={beeFormData.Manufacturing_company_mobilenumber}
           onChange={handleChange}
           type="tel"
           pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
           title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
           required // Make the field required to ensure a value is entered
          />
        </label>

        <label className="st8012">
            Email
                <input
                  className="st805"
                  type="text"
                  name="Manufacturing_company_email"
                  value={
                    beeFormData.Manufacturing_company_email
                  }
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
         Website:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_website"
            value={beeFormData.Manufacturing_company_website}
           onChange={handleChange}
          />
        </label>

        
        <label className="st8012">
        Valid Till Date (ISO 9001):
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_iso_valid_date"
            value={beeFormData.Manufacturing_company_iso_valid_date}
           onChange={handleChange}
          />
        </label>


        {/* ----------------Top Management code Here---------------------- */}

        <label className="st8012">
  Select Contact Person or Top Management
  <select
    className="st804"
    name="Company_category"
    // value={beeFormData.Choose_one}
    onChange={handleChange}
  >
    <option value="">Select Your Signing Person</option>
    <option value="contactperson">Authorized Person Detail</option>
    <option value="Topmanagement">Top Management Person</option>
  </select>
</label>

        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Name"
                  name="Contact_person_name"
                  value={
                    beeFormData.Contact_person_name
                  }
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Designation"
                  name="Contact_person_designation"
                  value={
                    beeFormData.Contact_person_designation
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Mobie Number"
                  name="Contact_person_mobilenumber"
                  value={
                    beeFormData.Contact_person_mobilenumber
                  }
                  onChange={handleChange}
                  type="tel"
                  pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                  title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                  required // Make the field required to ensure a value is entered
                />
              </label>
            </div>

            <div className="designations">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Email"
                  name="Contact_person_email"
                  value={
                    beeFormData.Contact_person_email
                  }
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Phone Number"
                  name="Contact_person_phonenumber"
                  value={
                    beeFormData.Contact_person_phonenumber
                  }
                  onChange={handleChange}
                  type="tel"
                  pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                  title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                  required // Make the field required to ensure a value is entered
                />
              </label>
             
            </div>
          </div>
        </div>


        <label className="st8012">
        Company Registration Number:
          <input
            className="st805"
            type="text"
            name="Company_registration_number"
            value={beeFormData.Company_registration_number}
            onChange={handleChange}
          />
        </label>


        <label className="st8012">
        Company Registration Date:
          <input
            className="st805"
            type="text"
            name="Company_registration_date"
            value={beeFormData.Company_registration_date}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Company pan Number:
          <input
            className="st805"
            type="text"
            name="Company_pan_number"
            value={beeFormData.Company_pan_number}
            onChange={handleChange}
          />
        </label>


        <label className="st8012">
          Annual Turnover(in Lacs):
          <input
            className="st805"
            type="text"
            name="Company_annual_turnover"
            value={beeFormData.Company_annual_turnover}
            onChange={handleChange}
          />
        </label>


        <label className="st8012">
         Equipment Details:
          <input
            className="st805"
            type="text"
            placeholder= "Product Name"
            name="Equipments_product_name"
            value={beeFormData.Equipments_product_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
         Brand Name(Trademark):
          <input
            className="st805"
            type="text"
            name="Brand_registered"
            value={beeFormData.Brand_registered}
            onChange={handleChange}
            required
          />
        </label>

        <button className="btn808" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BEEFreashForm ;
