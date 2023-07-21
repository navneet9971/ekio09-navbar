import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { FaPencilAlt } from 'react-icons/fa';
import AddClient from "../AddClient/AddClient";
import HPprevDataEdit from "./HPprevDataEdit";
import axiosInstance from "../../../interceptors/axios";

function HomeProfilePreviousData() {
  // const LabHomePreviousData = localStorage.getItem("labhomeprofile");
  const [isEditing, setIsEditing] = useState(false);
  const [labPreviousForm, setLabPreviousForm] = useState({
    compliance: "",
    product: "",
    region: "",
    address: "",
    capacity: "",
    website: "",
  });

  useEffect(() => {
    axiosInstance
      .get(`profile/section/`)
      .then((response) => {
        const profiledata = response.data.data[0];
        console.log(profiledata);
        setLabPreviousForm(profiledata);
        localStorage.setItem("profileKey", profiledata.id)
        console.log(profiledata.id);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Add an empty dependency array to run the effect only once during component mount


  const handleEditClick = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handlePopupClose = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="home-profile-container">
        <h2 style={{ fontSize: '20px'}}>
          Profile
          <FaPencilAlt className="profile-header" onClick={handleEditClick} />
        </h2>
        {isEditing ? (
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
