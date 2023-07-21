import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";


function HPprevDataEdit({onClose}) {
  // const LabHomePreviousData = localStorage.getItem("labhomeprofile");
  const UserId = localStorage.getItem("storeLabUserID");
  

  const [labPreviousForm, setLabPreviousForm] = useState({
    compliance: "",
    product: "",
    region: "",
    address: "",
    capacity: "",
    website: "",
  });



  // useEffect(() => {
  //   if (LabHomePreviousData) {
  //     try {
  //       const parsedData = JSON.parse(LabHomePreviousData);
  //       setLabPreviousForm((prevForm) => ({
  //         ...prevForm,
  //         ...parsedData,
  //       }));
  //     } catch (error) {
  //       console.error("Error parsing LabHomePreviousData:", error);
  //       // Handle the parsing error, e.g., set default form values or show an error message.
  //     }
  //   }
  // }, [LabHomePreviousData]);

  const UpdatedLabHomeData = true; // Replace this with your actual condition

  useEffect(() => {
    if (UpdatedLabHomeData) {
      axiosInstance.get(`profile/section/${UserId}`)
        .then((response) => {
          // Assuming the response data is an object containing the fields you mentioned
          const responseData = response.data;
          setLabPreviousForm(responseData);
        })
        .catch((error) => {
          // Handle any errors that occur during the API request
          console.error("Error fetching data:", error);
        });
    }
  }, [UserId, UpdatedLabHomeData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const UpdatedLabHomeData = {
      compliance: labPreviousForm.compliance,
      product: labPreviousForm.product,
      region: labPreviousForm.region,
      address: labPreviousForm.address,
      capacity: labPreviousForm.capacity,
      website: labPreviousForm.website,
    };

    axiosInstance
  .put(`profile/section/${UserId}/`, UpdatedLabHomeData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  .then((response) => {
    const data = response.data;
    console.log(data);
    Swal.fire({
      title: "Success",
      text: "Form Submitted",
      icon: "success",
    });
    onClose();
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

  const handleChange = (e) => {
    setLabPreviousForm({ ...labPreviousForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Compliance</label>
              <input
                className="HomeProfile-text"
                type="text"
                name="compliance"
                value={labPreviousForm.compliance}
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
                value={labPreviousForm.product}
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
                value={labPreviousForm.region}
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
                value={labPreviousForm.address}
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
                value={labPreviousForm.capacity}
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
                value={labPreviousForm.website}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>

        <button className="homeprofile-btn" type="submit">
          Update
        </button>
      </form>

    </>
  );
}

export default HPprevDataEdit;
