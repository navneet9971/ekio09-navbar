import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Pages.css";
import axiosInstance from "../../interceptors/axios";
import "react-chatbot-kit/build/main.css";
import Swal from "sweetalert2";
import { ReactComponent as Sideimg } from "../assets/from-images.svg";

const Firstpage = () => {
  const [category, setCategory] = useState(""); // state for category input
  const [product, setProduct] = useState(""); // state for product input
  const [countries, setCountries] = useState(""); // state for selected region
  const [productDropdown, setProductDropdown] = useState([]); // state for product dropdown
  const history = useHistory();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);

    // send the product input be user to the backend whenever user inputs products to get the product recommendations
    axiosInstance
      .get(`/products?product=${event.target.value}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        setProductDropdown(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong. Please try again later.");
      });
  };

  const handleRegionChange = (event) => {
    setCountries(event.target.value);
  };

  const handleGoClick = () => {
    if (!category && !product && !countries) {
      alert("Please fill in at least one field!");
      return;
    }
    localStorage.setItem("category", category);
    localStorage.setItem("product", product);
    localStorage.setItem("region", countries);

    // send the input data to the backend API using axios GET request
    axiosInstance
      .get(
        `/compliance/?category=${category}&product=${product}&countries=${countries}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.data.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Compliance Not Found",
            text: " Please check your input and try again",
            confirmButtonText: "OK",
          });
        } else {
          console.log(response.data);
          console.log(category);
          // redirect the user to the second page with the compliance data
          history.push("/navbar/secondpage");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong. Please try again later.");
      });
  };

  //function to handle the product dropdown click
  const handleProductDropdownClick = (product) => {
    setProduct(product);
    setProductDropdown([]);
  };

  //component for product dropdown
  const ProductDropdown = (props) => {
    return (
      <div classname="" style={{ maxHeight: "15rem", width: "" }}>
        {props.dropDownData.slice(0, 5).map((item, index) => {
          return (
            <button
              key={index}
              value={item}
              style={{
                all: "unset",
                width: "100%",
                marginBottom: "0.5rem",
                paddingBlock: "0.5rem",
                paddingLeft: "0.8rem",
                color: "black",
                fontSize: "0.85rem",
                display: "block",
              }}
              onClick={() => handleProductDropdownClick(item.name)}
            >
              {item.name.length > 100
                ? item.name.slice(0, 100) + "..."
                : item.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bgchange">
      <div className="first-container22">
        <div className="fist-title">
          <h3
            style={{
              color: "black",
              fontWeight: "100",
              transform: "translate(14px, 60px)",
            }}
            className="firstpage-title"
          >
            Please enter the following details to Start a new application:
          </h3>
          <h4
            style={{
              color: "red",
              fontWeight: "100",
              padding: "3px",
              transform: "translate(14px, 60px)",
            }}
          >
            You need to fill at least 1 data point to see the list of
            compliance.
          </h4>
        </div>

        <div className="form-group22">
          {/* <label className='firsttext-input'>Enter Industry:</label> */}
          <select
            id="category-input"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">Choose Your Industry</option>
            <option value="telecom"> Telecom </option>
            <option value="it/electronics"> IT/Electronics </option>
            <option value="paper industry"> Paper Industry </option>
          </select>
        </div>

        <div className="form-group22">
          <input
            type="text"
            placeholder="Enter Name of Product"
            id="category-input"
            value={product}
            onChange={handleProductChange}
          />
          {productDropdown.length > 0 && (
            <ProductDropdown dropDownData={productDropdown} />
          )}
        </div>

        <div className="region-group22">
          <select
            id="category-input"
            value={countries}
            onChange={handleRegionChange}
          >
            <option value="india">India</option>
          </select>
        </div>

        <button className="first-go" onClick={handleGoClick}>
          GO
        </button>

        <div className="side-img">
          <Sideimg className="custom-side-img" />
        </div>
      </div>
    </div>
  );
};

export default Firstpage;
