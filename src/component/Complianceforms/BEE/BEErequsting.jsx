import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BEErequsting({onClose}) {
  const [isLoading, setIsLoading] = useState(false); 
  const idel = localStorage.getItem("ide");

  const [Manufacture_name , setManufacture_name] = useState("");
  const [Manufacture_address, setManufacture_address] = useState("");
  const [Brand_owner_name , setBrand_owner_name] = useState("");
  const [Brand_owner_address, setBrand_owner_address] = useState("");
  const [Series_model_number, setSeries_model_number] = useState("");
  const [Power_ratings, setPower_ratings] = useState("");
  const [Bee_testing_standard , setBee_testing_standard] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

    const formData = new FormData();
    // formData.append("application",  localStorage.getItem("newApplicationId"));
    // formData.append("compliance",   localStorage.getItem("compliance_id"));
    formData.append("request_for", "lab_testing");
    formData.append("Manufacture_name", Manufacture_name);
    formData.append("Manufacture_address", Manufacture_address);
    formData.append("Brand_owner_name",Brand_owner_name);
    formData.append("Brand_owner_address", Brand_owner_address);
    formData.append("Series_model_number", Series_model_number);
    formData.append("Power_ratings", Power_ratings);
    formData.append("Bee_testing_standard",Bee_testing_standard);

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
        Manufacture Name:
        <input
            className="st805"
            type="text"
            onChange={(event) => setManufacture_name(event.target.value)}
          />
        </label>

        <label className="st8012">
        Manufacture Address:
          <input
            className="st805"
            type="text"
            onChange={(event) => setManufacture_address(event.target.value)}
          />
        </label>
        <label className="st8012">
        Brand Owner Name:
          <input
            className="st805"
            type="text"
            onChange={(event) => setBrand_owner_name(event.target.value)}
          />
        </label>

        <label className="st8012">
        Brand Owner Address:
          <input
            className="st805"
            type="text"
            onChange={(event) =>  setBrand_owner_address(event.target.value)}
          />
        </label>
        <label className="st8012">
        Series Model Number:
          <input
            className="st805"
            type="text"
            onChange={(event) => setSeries_model_number(event.target.value)}
          />
        </label>
        <label className="st8012">
        Power Ratings:
          <input
            className="st805"
            type="text"
            onChange={(event) => setPower_ratings(event.target.value)}
          />
        </label>

        <label className="st8012">
        BEE Testing Standard:
          <input
            className="st805"
            type="text"
            onChange={(event) => setBee_testing_standard(event.target.value)}
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

export default BEErequsting;
