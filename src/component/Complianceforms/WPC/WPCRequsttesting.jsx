import React, { useState } from "react";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

function WPCLabTesting({ onClose }) {
  
  const [isLoading, setIsLoading] = useState(false);  
  const idel = localStorage.getItem("ide");

  const [testingApplicantname, setTestingApplicantname] = useState("");
  const [testingApplicantaddress, setTestingApplicantaddress] = useState("");
  const [testingManufacturername, setTestingManufacturername] = useState("");
  const [testingManufactureraddress, setTestingManufactureraddress] = useState("");
  const [testingProductname, setTestingProductname] = useState("");
  const [testingLeadmodel, setTestingLeadmodel] = useState("");
  const [testingSeriesmodel, setTestingSeriesmodel] = useState("");
  const [testingRatings, setTestingRatings] = useState("");
  const [testingBrandname, setTestingBrandname] = useState("");
  const [testingProductdescription, setTestingProductdescription] = useState("");
  const [Antennagain, setAntennagain] = useState("");
  const [testingPackettype, setTestingPackettype] = useState("");
  const [
    testingNominaloperatingfrequency,
    setTestingNominaloperatingfrequency,
  ] = useState("");
  const [
    testingTestsignal,
    setTestingTestsignal,
  ] = useState("");
  const [
    testingOperatingChannelwidths,
    setTestingOperatingChannelwidths,
  ] = useState("");

  // const [testingRadioButton, setTestingRadioButton] = useState([]);

  // LAB TESTING FORM DATA HANDLE HERE WITH APIS ------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

    const formData = new FormData();
    formData.append("request_for", "lab_testing");
    formData.append("Product_name", testingApplicantname);
    formData.append("Model_number", testingApplicantaddress);
    formData.append("Associate_models", testingManufacturername);
    formData.append("Hardware_number", testingManufactureraddress);
    formData.append("Software_number", testingProductname);
    formData.append("Brand", testingLeadmodel);
    formData.append("Serial_number", testingSeriesmodel);
    formData.append("Electrical_rating", testingRatings);
    formData.append("Product_type", testingBrandname);
    formData.append("Product_type_other", testingProductdescription);
    formData.append("Product_use", Antennagain);
    formData.append("Product_use_other", testingPackettype);
    formData.append(
      "Technical_support_person_name",
      testingNominaloperatingfrequency
    );
    formData.append(
      "Technical_support_person_contact_number",
      testingTestsignal
    );
    formData.append(
      "Technical_support_person_contact_number",
      testingOperatingChannelwidths
    );
    // formData.append("Radiobutton", testingRadioButton.join(","));

    console.log("Application ID:", localStorage.getItem("newApplicationId"));

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

        console.log(formData);
        if (formSubmitted) {
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
        onClose();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Form Submitted Failed",
          text: "Sorry, there was an error submitting your form",
          confirmButtonText: "OK",
        });
        setIsLoading(false); // Stop loading animation
      });
  };

  return (
    <>
    <div style={{ height: "500px", overflow: "scroll" }}>
      <h1 className="h801">Testing Information Required</h1>
      <h1 className="h801" style={{fontSize: "14px"}}>If you already have previous Test Reports, please go and Upload them through the Upload button. You don't need to fill out the Request Testing Form.</h1>
      <form onSubmit={handleSubmit}>
        <label className="st8012">
          Applicant Name:
          <input
            className="st805"
            type="text"
            value={testingApplicantname}
            onChange={(event) => setTestingApplicantname(event.target.value)}
          />
        </label>
        <label className="st8012">
          Applicant Address:
          <input
            className="st805"
            type="text"
            value={testingApplicantaddress}
            onChange={(event) => setTestingApplicantaddress(event.target.value)}
          />
        </label>
        <label className="st8012">
          Manufacturer Name:
          <input
            className="st805"
            type="text"
            value={testingManufacturername}
            onChange={(event) => setTestingManufacturername(event.target.value)}
          />
        </label>
        <label className="st8012">
          Manufacturer Address:
          <input
            className="st805"
            type="text"
            value={testingManufactureraddress}
            onChange={(event) => setTestingManufactureraddress(event.target.value)}
          />
        </label>
        <label className="st8012">
          Product Name:
          <input
            className="st805"
            type="text"
            value={testingProductname}
            onChange={(event) => setTestingProductname(event.target.value)}
          />
        </label>
        <label className="st8012">
          Lead Model:
          <input
            className="st805"
            type="text"
            value={testingLeadmodel}
            onChange={(event) => setTestingLeadmodel(event.target.value)}
          />
        </label>
        <label className="st8012">
          Series Model:
          <input
            className="st805"
            type="text"
            value={testingSeriesmodel}
            onChange={(event) => setTestingSeriesmodel(event.target.value)}
          />
        </label>
        <label className="st8012">
          Ratings:
          <input
            className="st805"
            type="text"
            value={testingRatings}
            onChange={(event) => setTestingRatings(event.target.value)}
          />
        </label>
        <label className="st8012">
          Brand Name:
          <input
            className="st805"
            type="text"
            value={testingBrandname}
            onChange={(event) => setTestingBrandname(event.target.value)}
          />
        </label>

        <label className="st8012">
          Product Description:
          <input
            className="st805"
            type="text"
            value={testingProductdescription}
            onChange={(event) => setTestingProductdescription(event.target.value)}
          />
        </label>

        <label className="st8012">
          Antennagain:
          <input
            className="st805"
            type="text"
            value={Antennagain}
            onChange={(event) => setAntennagain(event.target.value)}
          />
        </label>

        <label className="st8012">
          Packet Type:
          <input
            className="st805"
            type="text"
            value={testingPackettype}
            onChange={(event) => setTestingPackettype(event.target.value)}
          />
        </label>

        <label className="st8012">
          Nominal Operating frequency:
          <input
            className="st805"
            type="text"
            value={testingNominaloperatingfrequency}
            onChange={(event) =>
              setTestingNominaloperatingfrequency(event.target.value)
            }
          />
        </label>

        <label className="st8012">
          Test Signal:
          <input
            className="st805"
            type="text"
            value={testingTestsignal}
            onChange={(event) => setTestingTestsignal(event.target.value)}
          />
        </label>

        <label className="st8012">
          Operating Channel Widths:
          <input
            className="st805"
            type="text"
            value={testingOperatingChannelwidths}
            onChange={(event) =>
              setTestingOperatingChannelwidths(event.target.value)
            }
          />
        </label>

   

        <button className="btn809" type="submit">
          Submit
        </button>
      </form>
    </div>

    {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </>
  );
}

export default WPCLabTesting;
