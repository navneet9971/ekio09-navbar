import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function WPCHandleUpload({ onClose }) {
  const [documentType, setDocumentType] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const storedComplianceId = localStorage.getItem("wpccompliance_id");
  const storedApplicationId = localStorage.getItem("wpcapplication_id");
  const options = [
    "Authorization letter",
    "Test report",
    "Technical Specification",
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
    setIsLoading(true); // Start loading animation

    const modifiedFormData = new FormData();

    for (let i = 0; i < uploadedFiles.length; i++) {
      modifiedFormData.append("document", uploadedFiles[i]);
    }

    modifiedFormData.append("application", storedApplicationId);
    modifiedFormData.append("compliance", storedComplianceId);

    if (documentType === "Test report") {
      modifiedFormData.append("document_type", "report_");
    } else {
      modifiedFormData.append("document_type", documentType);
    }

    modifiedFormData.append("status", "Submitted");

    axiosInstance
      .post("application/document/", modifiedFormData, {
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
      })
      .finally(() => {
        setIsLoading(false); // Stop loading animation, regardless of success or failure
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

      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </div>
  );
}

export default WPCHandleUpload;
