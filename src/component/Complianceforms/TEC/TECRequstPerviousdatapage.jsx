import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../../interceptors/axios";

function TECRequstPerviousdatapage({ onClose }) {
  const applicationId = localStorage.getItem("applicationId");
  const tecmodificationData = localStorage.getItem("tecmodificationData");
  const history = useHistory();

  const [tecformData, setTecformData] = useState({
    Product_name:"",
    Model_number: "",
    Associate_models: "",
    Hardware_number: "",
    Software_number: "",
    Brand: "",
    Serial_number: "",
    Electrical_rating: "",
    Product_type: "",
    Product_type_other: "",
    Product_use: "",
    Product_use_other: "",
    Technical_support_person_name: "",
    Technical_support_person_contact_number: "",
    application: "",
    compliance: "compliance_id",
    request_for: "certification",
  });

  useEffect(() => {
    if (tecmodificationData) {
      const parsedData = JSON.parse(tecmodificationData);
      setTecformData(parsedData);
    }
  }, [tecmodificationData]);

  console.log(tecformData); //TecForm Data consolelog here and checkout

  const handleSubmittecauto = (event) => {
    event.preventDefault();

    const updatedTecformData = {
    Product_name: tecformData.Product_name,
    Model_number: tecformData.Model_number,
    Associate_models: tecformData.Associate_models,
    Hardware_number: tecformData.Hardware_number,
    Software_number: tecformData.Software_number,
    Brand: tecformData.Brand,
      Serial_number: tecformData.Serial_number,
      Electrical_rating: tecformData.Electrical_rating,
      Product_type: tecformData.Product_type,
      Product_type_other: tecformData.Product_type_other,
      Product_use: tecformData.Product_use,
      Product_use_other: tecformData.Product_use_other,
      Technical_support_person_name:
        tecformData.Technical_support_person_name,
      Technical_support_person_contact_number:
        tecformData.Technical_support_person_contact_number,
      Foreign_manufacturer_company_address:
        tecformData.Foreign_manufacturer_company_address,
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
        <h1 className="h801">Testing Information Required </h1>
        <label className="st8012">
         Product Name:
          <input
            className="st805"
            type="text"
            name="Product_name"
            value={tecformData.Product_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Model No:
          <input
            className="st805"
            type="text"
            name="Model_number"
            value={tecformData.Model_number}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Associated Models (if any):
          <input
            className="st805"
            type="text"
            name="Associate_models"
            value={tecformData.Associate_models}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
           Hardware Number:
          <input
            className="st805"
            name="Hardware_number"
            value={tecformData.Hardware_number}
            onChange={handleChange}
            type="tel"
            pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
            title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
            required // Make the field required to ensure a value is entered
          />
        </label>

        <label className="st8012">
          Software Number:
          <input
            className="st805"
            type="text"
            name="Software_number"
            value={tecformData.Software_number}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Brand:
          <input
            className="st805"
            type="text"
            name="Brand"
            value={tecformData.Brand}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Sr. No:
          <input
            className="st805"
            type="text"
            name="Serial_number"
            value={tecformData.Serial_number}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
         Electrical Rating:
          <input
            className="st805"
            type="text"
            name="Electrical_rating"
            value={tecformData.Electrical_rating}
            onChange={handleChange}
          />
        </label>


       <label className="st8012">
          Product Type:
          <select
            className="st804"
            type="text"
            name="Product_type"
            value={tecformData.Product_type}
            onChange={handleChange}
          >
            <option value="Fixed">Fixed</option>
            <option value="Industrial">Industrial</option>
            <option value="Portable">Portable</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="st8012">
              Product Type (if other):
          <input
            className="st805"
            type="text"
            name="Product_type_other"
            value={tecformData.Product_type_other}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Product Use:
          <select
            className="st804"
            type="text"
            name="Product_use"
            value={tecformData.Product_use}
            onChange={handleChange}
          >
            <option value="Indoor">Indoor</option>
            <option value="Outdoor">Outdoor</option>
            <option valur="Other">Other</option>
          </select>
        </label>

        <label className="st8012">
         Product Use(if other):
          <input
            className="st805"
            type="text"
            name="Product_use_other"
            value={tecformData.Product_use_other}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
       Technical support person name:
          <input
            className="st805"
            type="text"
            name="Technical_support_person_name"
            value={tecformData.Technical_support_person_name}
            onChange={handleChange}
          />
        </label>

        <label className="st8012">
          Technical support person contact number:
          <input
            className="st805"
            type="text"
            name="Technical_support_person_contact_number"
            value={tecformData.Technical_support_person_contact_number}
            onChange={handleChange}
          />
        </label>

        <button className="btn808" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default TECRequstPerviousdatapage;
