import React, { useState } from "react";
import "./AddClient.css";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function AddClient() {

  const [message, setMessage] = useState("");
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
      const response = await axiosInstance.post("profile/clients/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
  
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
    } catch (error) {
      // Display error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add client.",
      });
  
      // Handle error
      console.error("Error adding client:", error);
    }
  };
  

  return (
    <div>
      <h3> Message:-{message}</h3>
      <form onSubmit={handleFormSubmit}>
      {/* <Row gutter={[0, 0]}> */}
        <div className="Add-client_input">
           <h4 style={{padding: ".2rem"}}> Add Client:</h4>
        <input
          style={{padding: "0.2rem"}}
          type="text"
          placeholder="Client Name"
          name="name"
          value={addclientName.name}
          onChange={handleChange}
        />
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
