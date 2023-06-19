import React, { useState } from "react";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function TECLabTesting({ onClose }) {
  const idel = localStorage.getItem("ide");

  const [testingProductName, setTestingProductName] = useState("");
  const [testingModelNo, setTestingModelNo] = useState("");
  const [testingAssociated, setTestingAssociated] = useState("");
  const [testingHardwareNumber, setTestingHardwareNumber] = useState("");
  const [testingSoftwareNumber, setTestingSoftwareNumber] = useState("");
  const [testingBrand, setTestingBrand] = useState("");
  const [testingSr, setTestingSr] = useState("");
  const [testingElectrical, setTestingElectrical] = useState("");
  const [testingProductType, setTestingProductType] = useState("");
  const [testingProductTypeOther, setTestingProductTypeOther] = useState("");
  const [testingProductUse, setTestingProductUse] = useState("");
  const [testingProductOther, setTestingProductOther] = useState("");
  const [
    testingTechnicalsupportName,
    setTestingTechnicalsupportName,
  ] = useState("");
  const [
    testingTechnicalsuppoertNumber,
    setTestingTechnicalsuppoertNumber,
  ] = useState("");
  const [cdfccl, setCdfccl] = useState("");
  const [usermanual, setUsermanual] = useState("");
  const [circuitdiagram, setCircuitdiagram] = useState("");
  const [pcblayout, setPcblayout] = useState("");
  const [softwareuser, setSoftwareuser] = useState("");

  // LAB TESTING FROM DATA HANDLE HERE WITH APIS ------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("request_for", "lab_testing");
    formData.append("Product_name", testingProductName);
    formData.append("Model_number", testingModelNo);
    formData.append("Associate_models", testingAssociated);
    formData.append("Hardware_number", testingHardwareNumber);
    formData.append("Software_number", testingSoftwareNumber);
    formData.append("Brand", testingBrand);
    formData.append("Serial_number", testingSr);
    formData.append("Electrical_rating", testingElectrical);
    formData.append("Product_type", testingProductType);
    formData.append("Product_type_other", testingProductTypeOther);
    formData.append("Product_use", testingProductUse);
    formData.append("Product_use_other", testingProductOther);
    formData.append(
      "Technical_support_person_name",
      testingTechnicalsupportName
    );
    formData.append(
      "Technical_support_person_contact_number",
      testingTechnicalsuppoertNumber
    );

    // Add file to form data

    if (cdfccl) {
      for (let i = 0; i < cdfccl.length; i++) {
        formData.append("documents", cdfccl[i]);
      }
    }
    if (usermanual) {
      for (let i = 0; i < usermanual.length; i++) {
        formData.append("documents", usermanual[i]);
      }
    }
    if (circuitdiagram) {
      for (let i = 0; i < circuitdiagram.length; i++) {
        formData.append("documents", circuitdiagram[i]);
      }
    }
    if (pcblayout) {
      for (let i = 0; i < pcblayout.length; i++) {
        formData.append("documents", pcblayout[i]);
      }
    }
    if (softwareuser) {
      for (let i = 0; i < softwareuser.length; i++) {
        formData.append("documents", softwareuser[i]);
      }
    }

    console.log("Application ID:", localStorage.getItem("newApplicationId"));

    // function to handle form submission
  
    axiosInstance
      .put(`/application/compliance/${idel}/`, formData, {
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
      })
  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <h1 className="h801">Testing Information Required </h1>
      <form onSubmit={handleSubmit}>
        <label className="st8012">
          Product Name:
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingProductName(event.target.value)}
          />
        </label>
        <label className="st8012">
          Model No:
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingModelNo(event.target.value)}
          />
        </label>
        <label className="st8012">
          Associated Models (if any):
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingAssociated(event.target.value)}
          />
        </label>
        <label className="st8012">
          Hardware Number:
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingHardwareNumber(event.target.value)}
          />
        </label>
        <label className="st8012">
          Software Number :
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingSoftwareNumber(event.target.value)}
          />
        </label>
        <label className="st8012">
          Brand:
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingBrand(event.target.value)}
          />
        </label>
        <label className="st8012">
          Sr. No:
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingSr(event.target.value)}
          />
        </label>
        <label className="st8012">
          Electrical Rating:
          <input
            className="st805"
            type="text"
            onChange={(event) => setTestingElectrical(event.target.value)}
          />
        </label>
        <label className="st8012">
          Product Type:
          <select
            className="st804"
            onChange={(event) => setTestingProductType(event.target.value)}
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
            onChange={(event) => setTestingProductTypeOther(event.target.value)}
          />
        </label>

        <label className="st8012">
          Product Use:
          <select
            className="st804"
            onChange={(event) => setTestingProductUse(event.target.value)}
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
            onChange={(event) => setTestingProductOther(event.target.value)}
          />
        </label>

        <label className="st8012">
          Filled CDF/CCl (Format attached):
          <input
            className="stup805"
            type="file"
            onChange={(event) => setCdfccl(event.target.files)}
          />
        </label>
        <label className="st8012">
          Complete User Manual:
          <input
            className="stup805"
            type="file"
            onChange={(event) => setUsermanual(event.target.files)}
          />
        </label>
        <label className="st8012">
          Circuit Diagram:
          <input
            className="stup805"
            type="file"
            onChange={(event) => setCircuitdiagram(event.target.files)}
          />
        </label>
        <label className="st8012">
          PCB Layout:
          <input
            className="stup805"
            type="file"
            onChange={(event) => setPcblayout(event.target.files)}
          />
        </label>
        <label className="st8012">
          Software used (if any):
          <input
            className="stup805"
            type="file"
            onChange={(event) => setSoftwareuser(event.target.files)}
          />
        </label>

        <label className="st8012">
          Technical support person name:
          <input
            className="st805"
            type="text"
            onChange={(event) =>
              setTestingTechnicalsupportName(event.target.value)
            }
          />
        </label>
        <label className="st8012">
          Technical support person contact number:
          <input
            className="st805"
            type="text"
            onChange={(event) =>
              setTestingTechnicalsuppoertNumber(event.target.value)
            }
          />
        </label>
          <button className="btn809" type="submit">
            Submit
          </button>

      </form>
    </div>
  );
}

export default TECLabTesting;
