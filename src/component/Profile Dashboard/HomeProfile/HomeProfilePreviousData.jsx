import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { FaPencilAlt } from 'react-icons/fa';
import AddClient from "../AddClient/AddClient";
import HPprevDataEdit from "./HPprevDataEdit";

function HomeProfilePreviousData() {
  const LabHomePreviousData = localStorage.getItem("labhomeprofile"); //
  const [isEditing, setIsEditing] = useState(false); // State variable for controlling edit mode

  const [labPreviousForm, setLabPreviousForm] = useState({
    compliance: "",
    product: "",
    region: "",
    address: "",
    capacity: "",
    website: "",
  });


  useEffect(() => {
    const interval = setInterval(() => {
    if (LabHomePreviousData) {
      try {
        const parsedData = JSON.parse(LabHomePreviousData);
        setLabPreviousForm((prevForm) => ({
          ...prevForm,
          ...parsedData,
        }));
      } catch (error) {
        console.error("Error parsing LabHomePreviousData:", error);
        // Handle the parsing error, e.g., set default form values or show an error message.
      }
    }
  },  1000);

  return () => clearInterval(interval);
}, [LabHomePreviousData]);

  const handleEditClick = () => {
    setIsEditing(true); // Set isEditing to true when the pencil icon is clicked
  };

  const handlePopupClose = () => {
    setIsEditing(false);
  }

  return (
    <>
      <div className="home-profile-container">
        <h2 style={{ fontSize: '20px'}}>
          Profile
          <FaPencilAlt className="profile-header" onClick={handleEditClick} />
        </h2>
        {isEditing ? ( // Render HPprevDataEdit component when isEditing is true
          <HPprevDataEdit onClose={handlePopupClose}/>
        ) : (
          <form>
            <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Compliance: {labPreviousForm.compliance}</label>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Product: {labPreviousForm.product}</label>
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Region: {labPreviousForm.region}</label>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Address: {labPreviousForm.address}</label>
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Capacity: {labPreviousForm.capacity}</label>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Website: {labPreviousForm.website}</label>
              </div>
            </Col>
          </Row>
          </form>
        )}
      </div>

      <div className="home-profile-container">
        <AddClient />
      </div>
    </>
  );
}

export default HomeProfilePreviousData;
