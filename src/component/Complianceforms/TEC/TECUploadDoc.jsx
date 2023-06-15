import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";

function HandleUpload({ onClose }) {
  const [documentType, setDocumentType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const storedComplianceId = localStorage.getItem("compliance_id");
  const storedApplicationId = localStorage.getItem("application_id");
  const options = [
    "Authorized Signatory Letter",
    "MOU",
    "AOA",
    "OEM authorized to AIR",
    "MOA",
    "Certificate of Incorporation",
    "PAN Card of Applicant Company",
    "Shareholding Pattern",
    "Board Resolution (If required)",
  ];

  const formData = new FormData();

  for (let i = 0; i < uploadedFiles.length; i++) {
    formData.append("document", uploadedFiles[i]);
  }
  formData.append("application", storedApplicationId);
  formData.append("compliance", storedComplianceId);
  formData.append("document_type", documentType);
  formData.append("status", "Submitted");

  const handleUploadSuccess = () => {
    Swal.fire({
      icon: "success",
      title: "Upload Success",
      text: "Your documents have been uploaded successfully",
      confirmButtonText: "OK",
    });
    onClose(); // Close the popup after download is complete
  };

  const handleUploadFailure = () => {
    Swal.fire({
      icon: "error",
      title: "Upload Failed",
      text: "Sorry, there was an error uploading your documents",
      confirmButtonText: "OK",
    });
  };

  const uploadDocuments = () => {
    axiosInstance
      .post("application/document/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        handleUploadSuccess();
      })
      .catch((error) => {
        console.error(error);
        handleUploadFailure();
      });
  };

  const handleFileChange = (e) => {
    setUploadedFiles(e.target.files);
  };

  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value);
  };

  return (
    <div>
      <div>
        <h3>Upload a File</h3>
        <input type="file" name="file" onChange={handleFileChange} />
      </div>
      <div>
        <select
          className="optionss"
          value={documentType}
          onChange={handleDocumentTypeChange}
        >
          <option value="">Select Document Type</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button className="btn809" onClick={uploadDocuments}>
          UPLOAD
        </button>
      </div>
    </div>
  );
}

export default HandleUpload;
