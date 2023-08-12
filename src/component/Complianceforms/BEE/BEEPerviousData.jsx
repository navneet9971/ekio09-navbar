import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BEEPerviousData ({ onClose }) {
 
  const [showPassword, setShowPassword] = useState(false);
  const [hasBEEReg, setHasBEEReg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const autofillBeeData = localStorage.getItem('beedata');
// console.log(localStorage.getItem('bisdata'))
    const history = useHistory();

    //BEE PERVIOUS DATA FETCH HERE ITS CODE ------------------------------------------
    const [beeformData, setBeeformData] = useState({
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
      });

  const applicationId = localStorage.getItem("applicationId");

  useEffect(() => {
    if (autofillBeeData) {
      const parsedData = JSON.parse(autofillBeeData);
      setBeeformData(parsedData);
    }
  }, [autofillBeeData]);
  
  
  const handleSubmitBEEauto = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

      const updatedBEEformData = {
        Company_name: beeformData.Company_name,
        Company_category: beeformData.Company_category,
        Company_address: beeformData.Company_address,
        Company_city: beeformData.Company_city,
        Company_country: beeformData.Company_country,
        Company_state: beeformData.Company_state,
        Company_district: beeformData.Company_district,
        Company_pincode: beeformData.Company_pincode,
        Company_phonenumber: beeformData.Company_phonenumber,
        Company_mobilenumber:
          beeformData.Company_mobilenumber,
        Company_website:
          beeformData.Company_website,
        Company_email:
          beeformData.Company_email,
        Manufacturing_company_name:
          beeformData.Manufacturing_company_name,
        Manufacturing_company_address:
          beeformData.Manufacturing_company_address,
        Manufacturing_company_city:
          beeformData.Manufacturing_company_city,
        Manufacturing_company_country:
          beeformData.Manufacturing_company_country,
        Manufacturing_company_state: beeformData.Manufacturing_company_state,
        Manufacturing_company_district:
          beeformData.Manufacturing_company_district,
        Manufacturing_company_pincode1:
          beeformData.Manufacturing_company_pincode1,
        Manufacturing_company_phonenumber:
          beeformData.Manufacturing_company_phonenumber,
        Manufacturing_company_mobilenumber:
          beeformData.Manufacturing_company_mobilenumber,
        Manufacturing_company_email:
          beeformData.Manufacturing_company_email,
        Manufacturing_company_website:
          beeformData.Manufacturing_company_website,
        Manufacturing_company_iso_valid_date:
          beeformData.Manufacturing_company_iso_valid_date,
          Choose_one:
          beeformData.Choose_one,
        Contact_person_name:
          beeformData.Contact_person_name,
        Contact_person_designation:
          beeformData.Contact_person_designation,
        Contact_person_email:
          beeformData.Contact_person_email,
        Contact_person_phonenumber: beeformData.Contact_person_phonenumber,
        Contact_person_mobilenumber: beeformData.Contact_person_mobilenumber,
        Company_registration_number: beeformData.Company_registration_number,
        Company_registration_date: beeformData.Company_registration_date,
        Company_pan_number: beeformData.Company_pan_number,
        Company_annual_turnover: beeformData.Company_annual_turnover,
        Equipments_product_name: beeformData.Equipments_product_name,
        Brand_registered:
          beeformData.Brand_registered,
        compliance: localStorage.getItem("compliance_id"),
        request_for: "certification",
        application: applicationId,
      };
    
      setBeeformData(updatedBEEformData);
    

    console.log(updatedBEEformData);
    axiosInstance
      .post("/application/compliance/", updatedBEEformData, {
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
        setIsLoading(false); // Stop loading animation
        onClose(); // Close the popup after download is complete

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

  const handleBISChange = (e) => {
    setBeeformData({ ...beeformData, [e.target.name]: e.target.value });
  };

  const handleBISprotelChange = (event) => {
    const value = event.target.value === "yes";
    setHasBEEReg(value);
    setBeeformData((prevState) => ({
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
      <form onSubmit={handleSubmitBEEauto}>
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
                value={beeformData.Username_BISPortal}
                onChange={handleBISChange}
              />
              <div></div>
            </label>

            <label className="st8012">
              Password:
              <input
                className="st805"
                type={showPassword ? "text" : "password"}
                name="Password_BISPortal"
                value={beeformData.Password_BISPortal}
                onChange={handleBISChange}
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
            value={beeformData.Company_name}
            onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
          Category:
          <select
            className="st804"
            name="Company_category"
            value={beeformData.Company_category}
            onChange={handleBISChange}
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
            value={beeformData.Company_address}
            onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
          City/Town:
          <input
            className="st805"
            type="text"
            name="Company_city"
            value={beeformData.Company_city}
            onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
          Country:
          <input
            className="st805"
            name="Company_country"
            value={beeformData.Company_country}
            onChange={handleBISChange}
            type="text"
          />
        </label>

        <label className="st8012">
          State:
          <input
            className="st805"
            type="text"
            name="Company_state"
            value={beeformData.Company_state}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
         District:
          <input
            className="st805"
            type="text"
            name="Company_district"
            value={beeformData.Company_district}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
         Pincode:
          <input
            className="st805"
            type="text"
            name="Company_pincode"
            value={beeformData.Company_pincode}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
         State Code-Phone No:
          <input
            className="st805"
            name="Company_phonenumber"
            value={beeformData.Company_phonenumber}
           onChange={handleBISChange}
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
            value={beeformData.Company_mobilenumber}
           onChange={handleBISChange}
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
            value={beeformData.Company_website}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
            Email
                <input
                  className="st805"
                  type="text"
                  name="Company_email"
                  value={
                    beeformData.Company_email
                  }
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const isValidEmail =
                      inputValue.includes("@") && inputValue.includes(".");
                    handleBISChange(event); // Call the original handleBISChange function if needed
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
            value={beeformData.Manufacturing_company_name}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
          Address Line 1:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_address"
            value={beeformData.Manufacturing_company_address}
            onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
          City/Town:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_city"
            value={beeformData.Manufacturing_company_city}
            onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
          Country:
          <input
            className="st805"
            name="Manufacturing_company_country"
            value={beeformData.Manufacturing_company_country}
            onChange={handleBISChange}
            type="text"
          />
        </label>

        <label className="st8012">
          State:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_state"
            value={beeformData.Manufacturing_company_state}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
         District:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_district"
            value={beeformData.Manufacturing_company_district}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
         Pincode:
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_pincode"
            value={beeformData.Manufacturing_company_pincode}
           onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
         State Code-Phone No:
          <input
            className="st805"
            name="Manufacturing_company_phonenumber"
            value={beeformData.Manufacturing_company_phonenumber}
           onChange={handleBISChange}
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
            value={beeformData.Manufacturing_company_mobilenumber}
           onChange={handleBISChange}
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
                    beeformData.Manufacturing_company_email
                  }
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const isValidEmail =
                      inputValue.includes("@") && inputValue.includes(".");
                    handleBISChange(event); // Call the original handleBISChange function if needed
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
            value={beeformData.Manufacturing_company_website}
           onChange={handleBISChange}
          />
        </label>

        
        <label className="st8012">
        Valid Till Date (ISO 9001):
          <input
            className="st805"
            type="text"
            name="Manufacturing_company_iso_valid_date"
            value={beeformData.Manufacturing_company_iso_valid_date}
           onChange={handleBISChange}
          />
        </label>


        {/* ----------------Top Management code Here---------------------- */}

        <label className="st8012">
            Select Contact Person or Top Mangement
          <select
            className="st804"
            name="Company_category"
            value={beeformData.Choose_one}
            onChange={handleBISChange}
          >
            <option value=""> Select Your Signing Person</option>
            <option value="contactperson ">Authorized Person Detail</option>
            <option value="Topmangement">Top Mangement Person</option>
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
                    beeformData.Contact_person_name
                  }
                  onChange={handleBISChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Designation"
                  name="Contact_person_designation"
                  value={
                    beeformData.Contact_person_designation
                  }
                  onChange={handleBISChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Mobie Number"
                  name="Contact_person_mobilenumber"
                  value={
                    beeformData.Contact_person_mobilenumber
                  }
                  onChange={handleBISChange}
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
                    beeformData.Contact_person_email
                  }
                  onChange={handleBISChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  placeholder="Phone Number"
                  name="Contact_person_phonenumber"
                  value={
                    beeformData.Contact_person_phonenumber
                  }
                  onChange={handleBISChange}
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
            value={beeformData.Company_registration_number}
            onChange={handleBISChange}
          />
        </label>


        <label className="st8012">
        Company Registration Date:
          <input
            className="st805"
            type="text"
            name="Company_registration_date"
            value={beeformData.Company_registration_date}
            onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
          Company pan Number:
          <input
            className="st805"
            type="text"
            name="Company_pan_number"
            value={beeformData.Company_pan_number}
            onChange={handleBISChange}
          />
        </label>


        <label className="st8012">
          Annual Turnover(in Lacs):
          <input
            className="st805"
            type="text"
            name="Company_annual_turnover"
            value={beeformData.Company_annual_turnover}
            onChange={handleBISChange}
          />
        </label>


        <label className="st8012">
         Equipment Details:
          <input
            className="st805"
            type="text"
            placeholder= "Product Name"
            name="Equipments_product_name"
            value={beeformData.Equipments_product_name}
            onChange={handleBISChange}
          />
        </label>

        <label className="st8012">
         Brand Name(Trademark):
          <input
            className="st805"
            type="text"
            name="Brand_registered"
            value={beeformData.Brand_registered}
            onChange={handleBISChange}
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

export default BEEPerviousData;