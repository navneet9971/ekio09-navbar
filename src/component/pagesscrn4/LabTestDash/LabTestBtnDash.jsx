import { Row, Col } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function LabTestBtnDash() {
    const navigate = useNavigate();
    const [labTestData, setLabTestData] = useState({
      Product_name: "",
      Compliance: "",
      Budget: "",
      Time: "",
      Testing: "",
    });
  
    const handleLabTestSubmit = (event) => {
      event.preventDefault(); // Prevent default form submission behavior
    
      const productName = labTestData.Product_name.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    
      if (productName === "router" || productName === "iot gateway") {
        navigate("/navbar/labtest");
      } else if (productName === "footwear") {
        navigate("/navbar/labtestbis");
      }
    };
    
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setLabTestData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };

  return (
    <div>
      <h2 style={{ fontSize: "20px"}}>Find your partner</h2>

      <form onSubmit={handleLabTestSubmit}>
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Product Name</label>
              <input
                className="HomeProfile-text"
                type="text"
                name="Product_name"
                value={labTestData.Product_name}
                onChange={handleInputChange}
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Compliance</label>
              <input
                className="HomeProfile-text"
                type="text"
                name="Compliance"
                value={labTestData.Compliance}
                onChange={handleInputChange}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Budget</label>
              <input
                className="HomeProfile-text"
                type="text"
                name="Budget"
                value={labTestData.Budget}
                onChange={handleInputChange}
              />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Time</label>
              <input
                className="HomeProfile-text"
                type="text"
                name="Time"
                value={labTestData.Time}
                onChange={handleInputChange}
              />
            </div>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            <div className="column">
              <label className="HomeProfile-label">Testing / Consultant</label>
              <input
                className="HomeProfile-text"
                type="text"
                name="Testing"
                value={labTestData.Testing}
                onChange={handleInputChange}
              />
            </div>
          </Col>
        </Row>

        <button
          style={{
            backgroundColor: "#082A71",
            color: "#fff",
            borderRadius: "7px",
            padding: ".5rem",
            marginLeft: "15rem",
            cursor: "pointer",
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default LabTestBtnDash;
