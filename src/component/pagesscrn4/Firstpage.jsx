import React, { useState, useEffect  } from "react";
import { useHistory } from "react-router-dom";
import "./Pages.css";
import axiosInstance from "../../interceptors/axios";
import "react-chatbot-kit/build/main.css";
import Swal from "sweetalert2";
import { ReactComponent as Sideimg } from "../assets/from-images.svg";


const Firstpage = () => {
  const [category, setCategory] = useState([]); // state for category input
  const [selectedCategory, setSelectedCategory] = useState('');
  const [product, setProduct] = useState(""); // state for product input
  const [selectedCountry, setSelectedCountry] = useState('');// state for selected region
  const [productDropdown, setProductDropdown] = useState([]); // state for product dropdown
  const history = useHistory();

  const options = [
    'India',
    'Europe',
    'China',
    'Bangladesh',
    'Indonesia',
    'Japan',
    'Korea',
    'Malaysia',
    'Saudi Arabia',
    'Sri Lanka',
    'Taiwan',
    'Thailand',
    'UAE (United Arab Emirates)',
    'USA (United States)',
  ];

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
    setProduct(event.target.value);
  
    // Add a delay of 1 second (1000 milliseconds) before making the API call
    const delay = 1000;
    // Clear the timeout if the user keeps changing the product selection quickly
    if (typeof handleProductChange.timeoutId === "number") {
      clearTimeout(handleProductChange.timeoutId);
    }

    console.log(selectedCategory);
    // Set a new timeout for the API call
    handleProductChange.timeoutId = setTimeout(() => {
      axiosInstance
        .get(`/compliance/?category=${selectedCategory}&products&product=${event.target.value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        })        
        .then((response) => {
          if (response.data && response.data.data) {
            const responseData = response.data.data;
            let uniqueValues = [];
    
            if (Array.isArray(responseData)) {
              // Use a Set to store unique values
              const uniqueSet = new Set();
    
              // Add unique values to the Set
              responseData.forEach((item) => {
                uniqueSet.add(item);
              });
    
              // Convert the Set back to an array
              uniqueValues = Array.from(uniqueSet);
            }
    
            setProductDropdown(uniqueValues);
            console.log(uniqueValues); // You can log the response data if you want to see it in the console.
          } else {
            // Handle empty or invalid response data
            setProductDropdown([]);
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Something went wrong. Please try again later.");
          setProductDropdown([]); // Set an empty array to clear the dropdown in case of an error.
        });
    }, delay);
      
  }
  
  const handleRegionChange = (event) => {
    setSelectedCountry(event.target.value);
    // console.log(selectedCountry);
  };

  const handleGoClick = () => {
    if (!selectedCategory && !product && !selectedCountry) {
      alert("Please fill in at least one field!");
      return;
    }
    localStorage.setItem("category", selectedCategory);
    localStorage.setItem("product", product);
    localStorage.setItem("region", selectedCountry);
  
    // send the input data to the backend API using axios GET request
    axiosInstance
      .get(
        `/compliance/?category=${selectedCategory}&product=${product}&countries=${selectedCountry}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data)
        if (response.data.data.length === 0) {
          Swal.fire({
            icon: "error",
            title: "Compliance Not Found",
            text: "Please check your input and try again",
            confirmButtonText: "OK",
          });
        } else {
          console.log(response.data);
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
    const { dropDownData } = props;
  
    // Create a new array with unique product names using Set
    const uniqueProductNames = Array.from(new Set(dropDownData.map(item => item.product && item.product.name)));
  
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
        {uniqueProductNames.map((name, index) => (
          <span
            key={index + 1}
            style={{
              animationDuration: "300ms",
              opacity: 1,
              height: "auto",
              visibility: "visible",
              color: "black",
              cursor: "pointer",
              display: "block",
              borderBottom: "1px solid #7bdcb5",
              marginBottom: ".5rem",
            }}
            onClick={() => {
              handleProductDropdownClick(name);
            }}
          >
            {name}
          </span>
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
        <option key = {option.id} value={option.name}>
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
          autoComplete="off"
        />
        {product && productDropdown.length > 0 && (
          <ProductDropdown dropDownData={productDropdown} />
        )}
      </div>

        <div className="region-group22">
        <select
      id="category-input"
      value={selectedCountry}
      onChange={handleRegionChange}
    >
      <option value="">Select Your Country</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
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
