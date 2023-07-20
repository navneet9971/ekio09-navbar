import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "../Pages.css";
import axiosInstance from "../../../interceptors/axios";
import "react-chatbot-kit/build/main.css";
import Swal from "sweetalert2";
import { ReactComponent as Sideimg } from "../../assets/from-images.svg";


const Firstcompliance = () => {
  const [category, setCategory] = useState([]); // state for category input
  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState(""); // state for product input
  const [countries, setCountries] = useState(""); // state for selected region
  const [productDropdown, setProductDropdown] = useState([]); // state for product dropdown
  const history = useHistory();

  useEffect(() => {
    // Fetch data from the 'industry' endpoint when the component mounts
    handleCategoryChange();
  }, []);

  const handleCategoryChange = () => {
    axiosInstance
      .get('industry')
      .then((response) => {
        // Update the options state with the fetched data
        setCategory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching dropdown data:', error);
      });
  };

  const handleChange = (event) => {
    // Update the selected category when the user selects an option
    setSelectedCategory(event.target.value);
  };
  const handleProductChange = (event) => {
    const inputValue = event.target.value;
  
    setProduct(inputValue);
  
    if (inputValue.length >= 1) {
      // send the product input by the user to the backend whenever the user inputs products to get the product recommendations
      axiosInstance
        .get(`/products?product=${inputValue}`, {
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
    } else {
      setProductDropdown([]);
    }
  };
  

  const handleRegionChange = (event) => {
    setCountries(event.target.value);
  };

  const handleGoClick = () => {
    if (!selectedCategory && !product && !countries) {
      alert("Please fill in at least one field!");
      return;
    }
    localStorage.setItem("category", selectedCategory);
    localStorage.setItem("product", product);
    localStorage.setItem("region", countries);

    // send the input data to the backend API using axios GET request
    axiosInstance
      .get(
        `/compliance/?category=${selectedCategory}&product=${product}&countries=${countries}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response)
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
          history.push("/navbar/secondcompliance");
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
    const { dropDownData, inputValue } = props;
  
    // Filter the product names based on the input value
    const filteredProducts = dropDownData.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  
    // Function to highlight the search term in the product name
    const highlightSearchTerm = (productName) => {
      const regex = new RegExp(`(${inputValue})`, "gi");
      return productName.replace(regex, "<mark>$1</mark>");
    };
  
    return (
      <div
        className=""
        style={{
          width: "97%",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 0px 8px #ddd",
          borderRadius: "10px",
          marginLeft: "-0.2rem",
          marginTop: "-0.7rem",
          maxHeight: "90px",
          overflow: "hidden",
          padding: "0px 14px",
          border: "#7bdcb5 solid 2px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.overflowY = "scroll";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.overflowY = "hidden";
        }}
      >
        {filteredProducts.slice(0, 5).map((item, index) => (
          <span
            key={index}
            value={item}
            style={{
              animationDuration: "300ms",
              opacity: 1,
              height: "auto",
              visibility: "visible",
              color: "black",
              cursor: "pointer",
              display: "block",
              borderTop: "2px solid black",
              borderBottom: "2px solid black", // Setting the borderBottom color to light blue (#ADD8E6 is the hexadecimal representation of light blue)
               // marginBottom: ".2rem",
             }}
            onClick={() => handleProductDropdownClick(item.name)}
            dangerouslySetInnerHTML={{
              __html: highlightSearchTerm(item.name),
            }}
          />
        ))}
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
          <select id="category-input" value={selectedCategory} onChange={handleChange}>
      <option value="">Select Your Industry</option>
      {category.map((option) => (
        <option value={option.name}>
          {option.name}
        </option>
      ))}
    </select>
        </div>

      <div className="form-group22">
  <input
    type="text"
    placeholder="Enter Name of Product"
    id="category-input"
    value={product}
    onChange={handleProductChange}
    autoComplete="off" // Add this line to disable autocomplete
  />
  {product && productDropdown.length > 0 && (
  <ProductDropdown dropDownData={productDropdown} inputValue={product} />
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

export default Firstcompliance;
