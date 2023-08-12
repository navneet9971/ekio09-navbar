import React, { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BEEUploadDoc({ onClose }) {
  const beeApplicationId = localStorage.getItem('beeapplication_id');
  const beeComplianceId = localStorage.getItem('beecompliance_id');
  console.log(localStorage.getItem('beecompliance_id'));
  const [isLoading, setIsLoading] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [uploads, setUploads] = useState([]);

  const options = [
    'List Of Retailers',
    'Upload Company Documents',
    'Trade Mark and Company Registration certificate',
    'Quality Management System Certificate (ISO 9001)',
    'Authorized Letter for Signatory',
    'ID Proof of Authorized Signatory',
  ];

  function handleUpload() {
    setIsLoading(true); // Start loading animation

    const formData = new FormData();
    for (let i = 0; i < uploads.length; i++) {
      formData.append('document', uploads[i]);
    }
    formData.append('application', beeApplicationId);
    formData.append('compliance', beeComplianceId);
    formData.append('document_type', documentType);
    formData.append('status', 'Submitted');

    console.log(beeApplicationId);
    console.log(beeComplianceId);

    axiosInstance
      .post('application/document/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res);
        const uploadStatus = res.data.status; // Assuming the response contains a status field

        if (uploadStatus) {
          Swal.fire({
            icon: 'success',
            title: 'Upload Success',
            text: 'Your documents have been uploaded successfully',
            confirmButtonText: 'OK'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Sorry, there was an error uploading your documents',
            confirmButtonText: 'OK'
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Sorry, there was an error uploading your documents',
          confirmButtonText: 'OK'
        });
      })
      .finally(() => {
        setIsLoading(false); // Stop loading animation
        onClose(); // Close the popup after download is complete or there was an error
      });
  }

  return (
    <div>
      <div>
        <h3>Upload a File</h3>
        <input type="file" name="file" multiple onChange={(e) => setUploads(e.target.files)} />
      </div>
      <div>
        <select className="optionss" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
          <option value="">Select Document Type</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <button className="btn809" onClick={handleUpload}>UPLOAD</button>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </div>
  );
}

export default BEEUploadDoc;
