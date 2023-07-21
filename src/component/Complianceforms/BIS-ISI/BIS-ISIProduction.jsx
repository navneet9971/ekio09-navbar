import React, { useState } from "react";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";


function BisIsiProduction({ onClose }) {
  const idel = localStorage.getItem("ide");

  const [formData, setFormData] = useState({
    Indian_standard: "",
    Date_of_manufacturing: "",
    Shelf: "",
    Batch_number: "",
    Quantity: "",
    Model_of_disposal: "",
    Serial_number: "",
    Grade_type: "",
    Declared_value:"",
    Test_required:"",
    Sample_description:"",
    Additional_information:"",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { Indian_standard, Date_of_manufacturing, Shelf, Batch_number, 
      Quantity,
      Model_of_disposal,
      Serial_number,
      Grade_type,
      Declared_valu,
      Test_require,
      Sample_descriptio,
      Additional_informatio,
    } = formData;

    const requestData = {
      request_for: "lab_testing",
      Indian_standard,
      Date_of_manufacturing,
      Shelf,
      Batch_number,
      Quantity,
      Model_of_disposal,
      Serial_number,
      Grade_type,
      Declared_valu,
      Test_require,
      Sample_descriptio,
      Additional_informatio,
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
        Indian Standard:
           <input
            className="st805"
            type="text"
            name="Indian_standard"
            value={formData.Indian_standard}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Date of manufacturing:
          <input
            className="st805"
            type="text"
            name="Date_of_manufacturing"
            value={formData.Date_of_manufacturing}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Shelf Life/Expiry/Best Before:
          <input
            className="st805"
            type="text"
            name="Shelf"
            value={formData.Shelf}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Batch Number/Control Unit Number:
          <input
            className="st805"
            type="text"
            name="Batch_number"
            value={formData.Batch_number}
            onChange={handleChange}
          />
        </label>
        <label className="st8012">
        Quantity:
          <input
            className="st805"
            type="text"
            name="Quantity"
            value={formData.Quantity}
            onChange={handleChange}
          />
        </label>


        <label className="st8012">
        Model of Disposal:
          <select
            className="st804"
            name="Model_of_disposal"
            value={formData.Model_of_disposal}
            onChange={handleChange}
          >
            <option value="">Select Model of Disposal</option>
            <option value="to_be_disposed_off">To be disposed off</option>
            <option value="return_back_to_manufacture">Return back to manufacture</option>
          </select>
        </label>

        <label className="st8012">
        Serial Number:
          <input
            className="st805"
            type="text"
            name="Serial_number"
            value={formData.Serial_number}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Grade/Type/Veriety/Size:
        <textarea
          style={{
            width: "45%",
            marginLeft: "9rem",
            height: "7rem"
          }}
            type="text"
            name="Grade_type"
            value={formData.Grade_type}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Declared Value:
          <input
            className="st805"
            type="text"
            name="Declared_value"
            value={formData.Declared_value}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Test Required:
          <select
            className="st804"
            name="Test_required"
            value={formData.Test_required}
            onChange={handleChange}
          >
            <option value="">Select Test Required</option>
            <option value="all">All</option>
            <option value="chemical">Chemical Test</option>
            <option value="mechanical">Mechanical Test</option>
            <option value="electrical">Electrical Test</option>
            <option value="microbiological">Micro Biological</option>
            <option value="radioactive">Radioactive</option>
          </select>
        </label>

        <label className="st8012">
        Sample Description:
        <textarea
          style={{
            width: "45%",
            marginLeft: "10rem",
            height: "7rem"
          }}
            type="text"
            name="Sample_description"
            value={formData.Sample_description}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
        Additional Information:
         <textarea
          style={{
            width: "45%",
            marginLeft: "9rem",
            height: "7rem"
          }}
            type="text"
            name="Additional_information"
            value={formData.Additional_information}
            onChange={handleChange}
          />
        </label>


    

        <button className="btn809" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default BisIsiProduction;
