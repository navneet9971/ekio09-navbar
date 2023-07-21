import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../../interceptors/axios";
import Swal from "sweetalert2";


function ClientDataUpdate({ onClose }) {
  const clientSendID = localStorage.getItem("storeClientID");
  const [clientData, setClientData] = useState({
    name: "",
    logo: null,
  });

  // Function to fetch client data and set the state
  const fetchClientData = useCallback(() => {
    axiosInstance
      .get(`profile/clients/${clientSendID}`)
      .then((response) => {
        const clientData = response.data;
        setClientData((prevState) => ({
          ...prevState,
          name: clientData.name,
          logo: null,
        }));
      })
      .catch((error) => {
        console.log("Error fetching client data:", error);
      });
  }, [clientSendID]);

  useEffect(() => {
    fetchClientData();
  }, [fetchClientData]);

  // Handler for regular text input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setClientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for file input changes
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setClientData((prevState) => ({
        ...prevState,
        logo: file,
      }));
    }
  };

  const handleClientDataUpdate = (event) => {
    event.preventDefault();
  
    // Create a FormData object to handle file data
    const formData = new FormData();
    formData.append("name", clientData.name);
    if (clientData.logo) {
      formData.append("logo", clientData.logo, clientData.logo.name);
    }
  
    axiosInstance
      .put(`profile/clients/${clientSendID}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const updatedClientData = response.data;
        setClientData(updatedClientData);
        console.log("Updated client data:", updatedClientData);
  
        // Show success message using swal
        Swal.fire({
          title: "Success", // or "Error" for the error case
          text: "Client data updated successfully!", // or "Failed to update client data. 😢" for the error case
          icon: "success", // or "error" for the error case
        });
        onClose();
      })
      .catch((error) => {
        console.log("Error updating client data:", error);
        // Show error message using swal
        Swal.fire({
          title: "Error",
          text: "Failed to update client data.",
          icon: "error",
        });
      });
  };
  
  return (
    <div>
      <form onSubmit={handleClientDataUpdate} encType="multipart/form-data">
        <div className="Add-client_input">
          <h4 style={{ padding: ".2rem",fontSize:"12px" }}> Client:</h4>
          <input
            style={{ padding: "0.2rem" }}
            type="text"
            id="name"
            name="name"
            value={clientData.name || ""} // Ensure a default value if clientData.name is null/undefined
            onChange={handleInputChange}
          />
          <h4 style={{ marginLeft: ".5rem", fontSize:"12px" }}>Logo:</h4>
          <input
          style={{margin: "1px"}}
            type="file"
            accept="image/*"
            id="logo"
            name="logo"
            onChange={handleFileChange}
          />
          {clientData.logo && (
            <img
              src={URL.createObjectURL(clientData.logo)}
              alt="Client Logo"
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>
        <button className="addclient-submit">Update</button>
      </form>
    </div>
  );
}

export default ClientDataUpdate;
