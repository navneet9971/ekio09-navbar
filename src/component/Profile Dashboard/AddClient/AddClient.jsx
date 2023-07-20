import React, { useState } from "react";
import "./AddClient.css";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function AddClient() {
  // const [message, setMessage] = useState("");
  const [addclientName, setAddClientName] = useState({
    name: "",
    logo: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "logo") {
      setAddClientName((prevState) => ({
        ...prevState,
        logo: files[0],
      }));
    } else {
      setAddClientName((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", addclientName.name);

    const logoFile = addclientName.logo;
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      const response = await axiosInstance.post(`profile/clients/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.message) {
        // setMessage(response.data.message);
        console.log(response);

        // Display success message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Client added successfully!",
        });

        // Reset form fields
        setAddClientName({
          name: "",
          logo: null,
        });

        // Reset file input value
        document.getElementById("logo-input").value = "";

        // Handle successful submission
        console.log("Client added:", response.data);
      } else {
        // Display error message if the response data is missing or doesn't have a message property
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add client. Invalid response data.",
        });
        console.error("Error adding client: Invalid response data:", response.data);
      }
    } catch (error) {
      // Display error message for request failure
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add client. An error occurred while making the request.",
      });

      // Handle error
      console.error("Error adding client:", error);
    }
  };

  return (
    <div>
      {/* <h3> Message: {message}</h3> */}
      <form onSubmit={handleFormSubmit}>
        <div className="Add-client_input">
          <h4 style={{ padding: ".2rem" }}> Add Client:</h4>
          <input
            style={{ padding: "0.2rem" }}
            type="text"
            placeholder="Client Name"
            name="name"
            value={addclientName.name}
            onChange={handleChange}
          />
          <h4 style={{ padding: ".2rem", marginLeft: "1rem" }}> Add Logo:</h4>
          <input
            type="file"
            accept="image/*"
            name="logo"
            id="logo-input"
            onChange={handleChange}
          />
        </div>
        <button className="addclient-submit">Submit</button>
      </form>
    </div>
  );
}

export default AddClient;
