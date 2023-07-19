import React, { useState } from "react";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";


function BisIsiProduction({ onClose }) {
  const idel = localStorage.getItem("ide");

  const [formData, setFormData] = useState({
    Total_installed_capacity_for_particular_product: "",
    Quantity_produced_last_year: "",
    Value_of_quantity_produced_last_year: "",
    Cost_per_unit: "",
    Brand_name: "",
    Details_of_pervious_license: "",
    Registered_as_startup: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { Total_installed_capacity_for_particular_product, Quantity_produced_last_year, Value_of_quantity_produced_last_year, Cost_per_unit, Brand_name, Details_of_pervious_license,  Registered_as_startup } = formData;

    const requestData = {
      request_for: "lab_testing",
      Total_installed_capacity_for_particular_product,
      Quantity_produced_last_year,
      Value_of_quantity_produced_last_year,
      Cost_per_unit,
      Brand_name,
      Details_of_pervious_license,
      Registered_as_startup,
    };

    console.log("Application ID:", localStorage.getItem("newApplicationId"));
    console.log("Compliance ID:", localStorage.getItem("compliance_id"));

    axiosInstance
      .put(`/application/compliance/${idel}/`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        const formSubmitted = true;

        if (formSubmitted) {
          Swal.fire({
            icon: "success",
            title: "Form Submitted",
            text: "Your request for testing has been successfully submitted",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Form Submitted Failed",
            text: "Testing Form failed. Please try again.",
            confirmButtonText: "OK",
          });
        }

        onClose();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Form Submitted Failed",
          text: "Sorry, there was an error submitting your form",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <h1 className="h801">Production</h1>
      <form onSubmit={handleSubmit}>
        <label className="st8012">
           Total Installed Capacity For Particular Product:
           <input
            className="st805"
            type="text"
            name="Total_installed_capacity_for_particular_product"
            value={formData.Total_installed_capacity_for_particular_product}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
         Quantity Produced Last Year:
          <input
            className="st805"
            type="text"
            name="Quantity_produced_last_year"
            value={formData.Quantity_produced_last_year}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Value of Quantity Produced Last Year(Approximate)(in INR):
          <input
            className="st805"
            type="text"
            name="Value_of_quantity_produced_last_year"
            value={formData.Value_of_quantity_produced_last_year}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Cost Per Unit (in INR):
          <input
            className="st805"
            type="text"
            name="Cost_per_unit"
            value={formData.Cost_per_unit}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
          Brand Name(Registered/Unregistered):
          <input
            className="st805"
            type="text"
            name="Brand_name"
            value={formData.Brand_name}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
          Details of Pervious License if any:
          <input
            className="st805"
            type="text"
            name="Details_of_pervious_license"
            value={formData.Details_of_pervious_license}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Registered as Startup(Govt. of India):
          <select
            className="st804"
            name="Registered_as_startup"
            value={formData.Registered_as_startup}
            onChange={handleChange}
          >
            <option value="">Select a Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

    

        <button className="btn809" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default BisIsiProduction;
