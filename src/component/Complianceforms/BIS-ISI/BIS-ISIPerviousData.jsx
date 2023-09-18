import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BISISIPerviousData ({ onClose }) {

  const autofillBisIsiData = localStorage.getItem('bisIsidata');
  const storedApplicationId = localStorage.getItem("applicationId");
// console.log(localStorage.getItem('bisdata'))
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate();

    //BISISI PERVIOUS DATA FETCH HERE ITS CODE ------------------------------------------
    const [bisIsiPrevFormData, setBisIsiPrevFormData] = useState({
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

  const applicationId = localStorage.getItem("applicationId");

  useEffect(() => {
    if (autofillBisIsiData) {
      const parsedData = JSON.parse(autofillBisIsiData);
      setBisIsiPrevFormData(parsedData);
    }
  }, [autofillBisIsiData]);
  
  
  const handleSubmitBISauto = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

      const updatedBisIsiPrevFormData = {
    Is_no: bisIsiPrevFormData.Is_no,
    Name_of_company: bisIsiPrevFormData.Name_of_company,
    Office_Address: bisIsiPrevFormData.Office_Address,
    Office_emailid: bisIsiPrevFormData.Office_emailid,
    Office_mobile_number: bisIsiPrevFormData.Office_mobile_number,
    Factory_Address: bisIsiPrevFormData.Factory_Address,
    Factory_emailid: bisIsiPrevFormData.Factory_emailid,
    Factory_mobile_number: bisIsiPrevFormData.Factory_mobile_number,
    Scale: bisIsiPrevFormData.Scale,
    Factory_weekly_off: bisIsiPrevFormData.Factory_weekly_off,
    Top_management_name_1: bisIsiPrevFormData.Top_management_name_1,
    Top_management_designation_1: bisIsiPrevFormData.Top_management_designation_1,
    Top_management_name_2: bisIsiPrevFormData.Top_management_name_1,
    Top_management_designation_2: bisIsiPrevFormData.Top_management_designation_2,
    Quality_control_incharge_name: bisIsiPrevFormData.Quality_control_incharge_name,
    Quality_control_incharge_designation: bisIsiPrevFormData.Quality_control_incharge_designation,
    Authorised_signatory_name: bisIsiPrevFormData.Authorised_signatory_name,
    Authorised_signatory_designation: bisIsiPrevFormData.Authorised_signatory_designation,
    Authorised_signatory_number: bisIsiPrevFormData.Authorised_signatory_number,
    Authorised_signatory_emailid: bisIsiPrevFormData.Authorised_signatory_emailid,
    Scope_as_per_is: bisIsiPrevFormData.Scope_as_per_is,
    Scope_requested_by_client: bisIsiPrevFormData.Scope_requested_by_client,
    Total_installed_capacity_for_particular_product: bisIsiPrevFormData.Total_installed_capacity_for_particular_product,
    Quantity_produced_last_year: bisIsiPrevFormData.Quantity_produced_last_year,
    Value_of_quantity_produced_last_year: bisIsiPrevFormData.Value_of_quantity_produced_last_year,
    Cost_per_unit: bisIsiPrevFormData.Cost_per_unit,
    Brand_name: bisIsiPrevFormData.Brand_name,
    Details_of_pervious_license: bisIsiPrevFormData.Details_of_pervious_license,
    Registered_as_startup: bisIsiPrevFormData.Registered_as_startup,
    compliance: localStorage.getItem("compliance_id"),
    request_for: "certification",
    application: applicationId,
      };
    
      setBisIsiPrevFormData(updatedBisIsiPrevFormData);
    

    console.log(updatedBisIsiPrevFormData);
    axiosInstance
      .post("/application/compliance/", updatedBisIsiPrevFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setIsLoading(false); // Stop loading animation
        Swal.fire({
          title: "Success",
          text:
            'Form submitted successfully. Please head over to the "Track Application" Page to upload documents and review progress ',
          icon: "success",
        }).then(() => {
          navigate('/navbar/review');
        })
       
        // onClose(); // Close the popup after download is complete
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

  const handleBisIsiPrevChange = (e) => {
    setBisIsiPrevFormData({ ...bisIsiPrevFormData, [e.target.name]: e.target.value });
  };

    return (

        <div style={{ height: "500px", overflow: "scroll" }}>
        <form onSubmit={handleSubmitBISauto}>
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
            value={bisIsiPrevFormData.Name_of_company}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
          IS No:
          <input
            className="st805"
            type="text"
            name="Is_no"
            value={bisIsiPrevFormData.Is_no}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
          Office Address:
          <input
            className="st805"
            type="text"
            name="Office_Address"
            value={bisIsiPrevFormData.Office_Address}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
          Office mobile number:
          <input
            className="st805"
            name="Office_mobile_number"
            value={bisIsiPrevFormData.Office_mobile_number}
            onChange={handleBisIsiPrevChange}
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
            value={bisIsiPrevFormData.Office_emailid}
            onChange={(event) => {
              const inputValue = event.target.value;
              const isValidEmail =
                inputValue.includes("@") && inputValue.includes(".");
              handleBisIsiPrevChange(event);
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
            value={bisIsiPrevFormData.Factory_Address}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
          Factory email ID:
          <input
            className="st805"
            type="text"
            name="Factory_emailid"
            value={bisIsiPrevFormData.Factory_emailid}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
          Factory mobile number:
          <input
            className="st805"
            type="text"
            name="Factory_mobile_number"
            value={bisIsiPrevFormData.Factory_mobile_number}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
        Scale:
  <select
    className="st804"
    name="Scale"
    value={bisIsiPrevFormData.Scale}
    onChange={handleBisIsiPrevChange}
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
    value={bisIsiPrevFormData.Factory_weekly_off}
    onChange={handleBisIsiPrevChange}
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
                  value={bisIsiPrevFormData.Top_management_name_1}
                  onChange={handleBisIsiPrevChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Name"
                  name="Top_management_name_2"
                  value={bisIsiPrevFormData.Top_management_name_2}
                  onChange={handleBisIsiPrevChange}
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
                  value={bisIsiPrevFormData.Top_management_designation_1}
                  onChange={handleBisIsiPrevChange}
                />
              </label>
              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="2)Designation"
                  name="Top_management_designation_2"
                  value={bisIsiPrevFormData.Top_management_designation_2}
                  onChange={handleBisIsiPrevChange}
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
                  value={bisIsiPrevFormData.Quality_control_incharge_name}
                  onChange={handleBisIsiPrevChange}
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
                    bisIsiPrevFormData.Quality_control_incharge_designation
                  }
                  onChange={handleBisIsiPrevChange}
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
                  value={bisIsiPrevFormData.Authorised_signatory_name}
                  onChange={handleBisIsiPrevChange}
                />
              </label>

              <label className="st8012">
                <input
                  className="st805"
                  type="text"
                  placeholder="Designation"
                  name="Authorised_signatory_designation"
                  value={bisIsiPrevFormData.Authorised_signatory_designation}
                  onChange={handleBisIsiPrevChange}
                />
              </label>
      </div>

          <div className="designations">
            <label className="st8012">
              <input
                className="st805"
                placeholder="Contact Number"
                name="Authorised_signatory_number"
                value={bisIsiPrevFormData.Authorised_signatory_number}
                onChange={handleBisIsiPrevChange}
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
                value={bisIsiPrevFormData.Authorised_signatory_emailid}
                onChange={(event) => {
                  const inputValue = event.target.value;
                  const isValidEmail =
                    inputValue.includes("@") && inputValue.includes(".");
                  handleBisIsiPrevChange(event);
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
            value={bisIsiPrevFormData.Scope_as_per_is}
            onChange={handleBisIsiPrevChange}
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
            value={bisIsiPrevFormData.Scope_requested_by_client}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <h1 className="h802">Production</h1>

        <label className="st8012">
        Total Installed Capacity for particular product:
          <input
            className="st805"
            type="text"
            name="Total_installed_capacity_for_particular_product"
            value={bisIsiPrevFormData.Total_installed_capacity_for_particular_product}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
        Quantity produced last year:
          <input
            className="st805"
            type="text"
            name="Quantity_produced_last_year"
            value={bisIsiPrevFormData.Quantity_produced_last_year}
            onChange={handleBisIsiPrevChange}
          />
        </label>


        <label className="st8012">
        Value of quantity produced last year:
          <input
            className="st805"
            type="text"
            name="Value_of_quantity_produced_last_year"
            value={bisIsiPrevFormData.Value_of_quantity_produced_last_year}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
        Cost per unit:
          <input
            className="st805"
            type="text"
            name="Cost_per_unit"
            value={bisIsiPrevFormData.Cost_per_unit}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
        Brand name:
          <input
            className="st805"
            type="text"
            name="Brand_name"
            value={bisIsiPrevFormData.Brand_name}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
        Details of pervious license:
          <input
            className="st805"
            type="text"
            name="Details_of_pervious_license"
            value={bisIsiPrevFormData.Details_of_pervious_license}
            onChange={handleBisIsiPrevChange}
          />
        </label>

        <label className="st8012">
        Registered as startup:
  <select
    className="st804"
    name="Registered_as_startup"
    value={bisIsiPrevFormData.Registered_as_startup}
    onChange={handleBisIsiPrevChange}
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
    )
}

export default BISISIPerviousData;

