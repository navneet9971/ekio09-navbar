import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BISrequsting({onClose}) {
  const [isLoading, setIsLoading] = useState(false); 
  const idel = localStorage.getItem("ide");

  const [Testing_type, setTesting_type] = useState("");
  const [Product_name, setProduct_name] = useState("");
  const [Model_number, setModel_number] = useState("");
  const [Brand_name, setBrand_name] = useState("");
  const [Series_model, setSeries_model] = useState("");
  const [Electrical_rating, setElectrical_rating] = useState("");
  const [Lab_name, setLab_name] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [IS_standard, setIS_standard] = useState("");
  const [cdfccl, setCdfccl] = useState("");
  const [usermanual, setUsermanual] = useState("");
  const [circuitdiagram, setCircuitdiagram] = useState("");
  const [pcblayout, setPcblayout] = useState("");
  const [markingLabel, setMarkingLabel] = useState("");
  const [technicalSpecification, setTechnicalSpecification] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

    const formData = new FormData();
    // formData.append("application",  localStorage.getItem("newApplicationId"));
    // formData.append("compliance",   localStorage.getItem("compliance_id"));
    formData.append("request_for", "lab_testing");
    formData.append("Testing_type", Testing_type);
    formData.append("Product_name", Product_name);
    formData.append("Model_number", Model_number);
    formData.append("Brand_name", Brand_name);
    formData.append("Series_model", Series_model);
    formData.append("Electrical_rating", Electrical_rating);
    formData.append("Lab_name", Lab_name);
    formData.append("Quantity", Quantity);
    formData.append("IS_standard", IS_standard);
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
    if (markingLabel) {
      for (let i = 0; i < pcblayout.length; i++) {
        formData.append("documents", pcblayout[i]);
      }
    }
    if (technicalSpecification) {
      for (let i = 0; i < pcblayout.length; i++) {
        formData.append("documents", pcblayout[i]);
      }
    }

    console.log("Application ID:", localStorage.getItem("newApplicationId"));
    console.log("Compliance ID:", localStorage.getItem("compliance_id"));

    // function to handle form submission
    axiosInstance
      .put(`/application/compliance/${idel}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        // form submission successful
        console.log(response.data);

        const formSubmitted = true; // Corrected the assignment statement

        if (formSubmitted) {
          // Assuming success status is available in uploadStatus
          Swal.fire({
            icon: "success",
            title: "Form Submitted",
            text: "Your request for testing has been successfully submitted",
            confirmButtonText: "OK",
          });
          setIsLoading(false); // Stop loading animation
        } else {
          Swal.fire({
            icon: "error",
            title: "Form Submitted Failed",
            text: "Testing Form failed. Please try again.",
            confirmButtonText: "OK",
          });
        }
        setIsLoading(false); // Stop loading animation
        onClose(); // Close the popup after download is complete
      })
      .catch((error) => {
        // Handle error case here
        Swal.fire({
          icon: "error",
          title: "Form Submitted Failed",
          text: "Sorry, there was an error Submitted your form",
          confirmButtonText: "OK",
        });
        setIsLoading(false); // Stop loading animation
      });
  };

  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <h1 className="h801">Testing Information Required</h1>
      <form onSubmit={handleSubmit}>
        <label className="st8012">
          Testing:
          <select
            className="st804"
            onChange={(event) => setTesting_type(event.target.value)}
          >
            <option value="Main">MAIN</option>
            <option value="Successive">SUCCESSIVE</option>
          </select>
        </label>

        <label className="st8012">
          Product Name:
          <input
            className="st805"
            type="text"
            onChange={(event) => setProduct_name(event.target.value)}
          />
        </label>
        <label className="st8012">
          Model No:
          <input
            className="st805"
            type="text"
            onChange={(event) => setModel_number(event.target.value)}
          />
        </label>

        <label className="st8012">
          Brand:
          <input
            className="st805"
            type="text"
            onChange={(event) => setBrand_name(event.target.value)}
          />
        </label>
        <label className="st8012">
          Series Model:
          <input
            className="st805"
            type="text"
            onChange={(event) => setSeries_model(event.target.value)}
          />
        </label>
        <label className="st8012">
          Electrical Rating:
          <input
            className="st805"
            type="text"
            onChange={(event) => setElectrical_rating(event.target.value)}
          />
        </label>

        <label className="st8012">
          Lab Name:
          <input
            className="st805"
            type="text"
            onChange={(event) => setLab_name(event.target.value)}
          />
        </label>

        <label className="st8012">
          Quantity:
          <input
            className="st805"
            type="text"
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>

        <label className="st8012">
          IS standard:
          <input
            className="st805"
            type="text"
            onChange={(event) => setIS_standard(event.target.value)}
          />
        </label>

        <label className="st8012">
          Filled CDF/CCL (Format attached):
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
          Marking Label:
          <input
            className="stup805"
            type="file"
            onChange={(event) => setMarkingLabel(event.target.files)}
          />
        </label>
        <label className="st8012">
          Technical Specification:
          <input
            className="stup805"
            type="file"
            onChange={(event) => setTechnicalSpecification(event.target.files)}
          />
        </label>

        <button className="btn809" type="submit">
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
}

export default BISrequsting;
