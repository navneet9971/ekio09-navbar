import React, { useState } from "react";
import { Row, Col } from "antd";
import "./HomeProfile.css"; // Import the CSS file containing the styles
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function HomeProfile() {
  const [labForm, setLabForm] = useState({
    compliance: "",
    product: "",
    region: "",
    address: "",
    capacity: "",
    website: "",
    products_and_success: [
      {product: "", success: ""}
    ], // Initial two boxes with empty values
    products_and_time: "",
  });

  console.log(labForm);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLabForm((labForm) => ({ ...labForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    axiosInstance
      .post("profile/section/", labForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // store User ID and send to the HomeProfilePrevious page with API
        console.log(response);
        localStorage.setItem("storeLabUserID", response.data.data.id);
        console.log(localStorage.getItem("storeLabUserID"));
        Swal.fire({
          title: "Success",
          text: "Submitted successfully",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to submit form",
          icon: "error",
        });
      });
  };
  

  const handleAddBox = () => {
    setLabForm({
      ...labForm,
      products_and_success: [
        ...labForm.products_and_success,
        { product: "", success: "" }, // Add a new empty pair of input boxes
      ],
    });
  };

  const handleChangeBox = (index, field, value) => {
    const updatedProductsAndSuccess = [...labForm.products_and_success];
    updatedProductsAndSuccess[index][field] = value === "" ? null : value;
    setLabForm((prevLabForm) => ({
      ...prevLabForm,
      products_and_success: updatedProductsAndSuccess,
    }));
  };
  

  return (
    <>
      <div className="home-profile-container">
        <h2 style={{ fontSize: "20px" }}>Profile</h2>

        <form onSubmit={handleSubmit}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Compliance</label>
                <input
                  className="HomeProfile-text"
                  type="text"
                  name="compliance"
                  value={labForm.compliance}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Product</label>
                <input
                  className="HomeProfile-text"
                  type="text"
                  name="product"
                  value={labForm.product}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Region</label>
                <input
                  className="HomeProfile-text"
                  type="text"
                  name="region"
                  value={labForm.region}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Address</label>
                <input
                  className="HomeProfile-text"
                  type="text"
                  name="address"
                  value={labForm.address}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Capacity</label>
                <input
                  className="HomeProfile-text"
                  type="text"
                  name="capacity"
                  value={labForm.capacity}
                  onChange={handleChange}
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className="column">
                <label className="HomeProfile-label">Website</label>
                <input
                  className="HomeProfile-text"
                  type="text"
                  name="website"
                  value={labForm.website}
                  onChange={handleChange}
                />
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 0]}>
      <Col xs={24} md={12}>
        <div className="column">
          {labForm.products_and_success.map((product, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "10px" }}>
              <input
              className="HomeProfile-text"
                type="text"
                placeholder="Product Name"
                value={product.product}
                onChange={(e) => handleChangeBox(index, "product", e.target.value)}
              />
              <input
              className="HomeProfile-text"
                type="text"
                placeholder="Success"
                value={product.success}
                onChange={(e) => handleChangeBox(index, "success", e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddBox}>
            +
          </button>
        </div>
      </Col>
    </Row>

          <button className="homeprofile-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default HomeProfile;
