import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

const BISISIFreashForm = () => {
  const storedApplicationId = localStorage.getItem("applicationId");
  const [isLoading, setIsLoading] = useState(false);   
  const navigate = useNavigate();

  const [bisIsiFormData, setBisIsiFormData] = useState({
    Is_no: "",
    Name_of_company: "",
    Office_Address: "",
    Office_emailid: "",
    Office_mobile_number: "",
    Factory_Address: "", 
    Factory_emailid: "",
    Factory_mobile_number: "",
    Scale: "",
    Factory_weekly_off: "",
    Top_management_name_1: "",
    Top_management_designation_1: "",
    Top_management_name_2: "",
    Top_management_designation_2: "",
    Quality_control_incharge_name: "",
    Quality_control_incharge_designation: "",
    Authorised_signatory_name: "",
    Authorised_signatory_designation: "",
    Authorised_signatory_number: "",
    Authorised_signatory_emailid: "",
    Scope_as_per_is: "",
    Scope_requested_by_client: "",
    Total_installed_capacity_for_particular_product: "",
    Quantity_produced_last_year: "",
    Value_of_quantity_produced_last_year: "",
    Cost_per_unit: "",
    Brand_name: "",
    Details_of_pervious_license: "",
    Registered_as_startup: "",
    request_for: "certification",
    application: storedApplicationId,
    compliance: localStorage.getItem("compliance_id"),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBisIsiFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBISSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

    axiosInstance
      .post("/application/compliance/", bisIsiFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // const data = response.data;

        const formSubmitted = true;

        if (formSubmitted) {
          Swal.fire({
            icon: "success",
            title: "Form Submitted",
            text:
              'Form submitted successfully. Please head over to the "Track Application" Page to upload documents and review progress ',
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/navbar/review");
            setIsLoading(false); // Stop loading animation
          });
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
        Swal.fire({
          icon: "error",
          title: "Form Submission Failed",
          text: "Sorry, there was an error submitting your form",
          confirmButtonText: "OK",
        });
        setIsLoading(false); // Stop loading animation
      });
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

        <h1 className="h802">Certification Process</h1>

        <label className="st8012">
          Name of company:
          <input
            className="st805"
            type="text"
            name="Name_of_company"
            value={bisIsiFormData.Name_of_company}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          IS No:
          <input
            className="st805"
            type="text"
            name="Is_no"
            value={bisIsiFormData.Is_no}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Office Address:
          <input
            className="st805"
            type="text"
            name="Office_Address"
            value={bisIsiFormData.Office_Address}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Office mobile number:
          <input
            className="st805"
            name="Office_mobile_number"
            value={bisIsiFormData.Office_mobile_number}
            onChange={handleChange}
            type="tel"
            pattern="[+0-9]{1,13}"
            title="Please enter a 10-digit number"
            required
          />
        </label>

        <label className="st8012">
          Office email ID:
          <input
            className="st805"
            type="text"
            name="Office_emailid"
            value={bisIsiFormData.Office_emailid}
            onChange={(event) => {
              const inputValue = event.target.value;
              const isValidEmail =
                inputValue.includes("@") && inputValue.includes(".");
              handleChange(event);
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
        <span
          className="email-warning"
          id="applicant-email-error1"
          style={{ color: "red" }}
        ></span>

        <h1 className="h802">Brand</h1>

        <label className="st8012">
          Factory Address:
          <input
            className="st805"
            type="tel"
            name="Factory_Address"
            value={bisIsiFormData.Factory_Address}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Factory email ID:
          <input
            className="st805"
            type="text"
            name="Factory_emailid"
            value={bisIsiFormData.Factory_emailid}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Factory mobile number:
          <input
            className="st805"
            type="text"
            name="Factory_mobile_number"
            value={bisIsiFormData.Factory_mobile_number}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
  Scale:
  <select
    className="st804"
    name="Scale"
    value={bisIsiFormData.Scale}
    onChange={handleChange}
  >
    <option value="">Choose Brand Owned By</option>
    <option value="micro">Micro</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large Scale</option>
  </select>
</label>

<label htmlFor="factoryWeeklyOff" className="st8012">
  Factory Weekly Off:
  <select
    id="factoryWeeklyOff"
    className="st804"
    name="Factory_weekly_off"
    value={bisIsiFormData.Factory_weekly_off}
    onChange={handleChange}
  >
    <option value="">Choose Factory Weekly Off</option>
    <option value="monday">Monday</option>
    <option value="tuesday">Tuesday</option>
    <option value="wednesday">Wednesday</option>
    <option value="thursday">Thursday</option>
    <option value="friday">Friday</option>
    <option value="saturday">Saturday</option>
    <option value="sunday">Sunday</option>
  </select>
</label>


        <h3 className="techni">Top Management Details</h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="1)Name"
                  name="Top_management_name_1"
                  value={bisIsiFormData.Top_management_name_1}
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Name"
                  name="Top_management_name_2"
                  value={bisIsiFormData.Top_management_name_2}
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
                  name="Top_management_designation_1"
                  value={bisIsiFormData.Top_management_designation_1}
                  onChange={handleChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Designation"
                  name="Top_management_designation_2"
                  value={bisIsiFormData.Top_management_designation_2}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        <h3 className="techni">Quality Control Incharge</h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="1)Name"
                  name="Quality_control_incharge_name"
                  value={bisIsiFormData.Quality_control_incharge_name}
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
                  name="Quality_control_incharge_designation"
                  value={
                    bisIsiFormData.Quality_control_incharge_designation
                  }
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>

        <h3 className="techni">Authorised Details</h3>
        <div className="row">
          <div className="name-row">
            <div className="names">
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Name"
                  name="Authorised_signatory_name"
                  value={bisIsiFormData.Authorised_signatory_name}
                  onChange={handleChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Designation"
                  name="Authorised_signatory_designation"
                  value={bisIsiFormData.Authorised_signatory_designation}
                  onChange={handleChange}
                />
              </label>
      </div>

          <div className="designations">
            <label className="st8012">
              <input
                className="st805"
                placeholder="Contact Number"
                name="Authorised_signatory_number"
                value={bisIsiFormData.Authorised_signatory_number}
                onChange={handleChange}
                type="tel"
                pattern="[+0-9]{1,13}"
                title="Please enter a 10-digit number"
                required
              />
            </label>

            <label className="st8012">
              <input
                className="st805"
                type="text"
                placeholder="Email ID"
                name="Authorised_signatory_emailid"
                value={bisIsiFormData.Authorised_signatory_emailid}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  const isValidEmail =
                    inputValue.includes("@") && inputValue.includes(".");
                  handleChange(event);
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
        <span
          className="email-warning"
          id="applicant-email-error2"
          style={{ color: "red" }}
        ></span>

        <label className="st8012">
          Scope as per IS (Grade/Type/Class):
          <textarea
          style={{
            width: "45%",
            marginLeft: "9rem",
            height: "7rem"
          }}
            type="text"
            name="Scope_as_per_is"
            value={bisIsiFormData.Scope_as_per_is}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Scope requested by client:
          <textarea
           style={{
            width: "45%",
            marginLeft: "12.4rem",
            height: "7rem"
          }}
            type="text"
            name="Scope_requested_by_client"
            value={bisIsiFormData.Scope_requested_by_client}
            onChange={handleChange}
          />
        </label>

        <h1 className="h802">Production</h1>
        
        <label className="st8012">
        Total Installed Capacity for particular product:
          <input
            className="st805"
            type="text"
            name="Total_installed_capacity_for_particular_product"
            value={bisIsiFormData.Total_installed_capacity_for_particular_product}
            onChange={handleChange}
          />
        </label>

        
        <label className="st8012">
        Quantity produced last year:
          <input
            className="st805"
            type="text"
            name="Quantity_produced_last_year"
            value={bisIsiFormData.Quantity_produced_last_year}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Value of quantity produced last year:
          <input
            className="st805"
            type="text"
            name="Value_of_quantity_produced_last_year"
            value={bisIsiFormData.Value_of_quantity_produced_last_year}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Cost per unit:
          <input
            className="st805"
            type="text"
            name="Cost_per_unit"
            value={bisIsiFormData.Cost_per_unit}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Brand name:
          <input
            className="st805"
            type="text"
            name="Brand_name"
            value={bisIsiFormData.Brand_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Details of pervious license:
          <input
            className="st805"
            type="text"
            name="Details_of_pervious_license"
            value={bisIsiFormData.Details_of_pervious_license}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Registered as startup:
  <select
    className="st804"
    name="Registered_as_startup"
    value={bisIsiFormData.Registered_as_startup}
    onChange={handleChange}
  >
    <option value="">Choose Option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</label>
        

        <button className="btn808" type="submit">
          Submit
        </button>
      </form>
      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </div>
  );
};

export default BISISIFreashForm;
