import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Pages.css';
import axiosInstance from '../../interceptors/axios';

const Firstpage = () => {
  const [category, setCategory] = useState(''); // state for category input
  const [product, setProduct] = useState(''); // state for product input
  const [region, setRegion] = useState(''); // state for selected region
  const history = useHistory();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const handleRegionChange = (event) => {
    setRegion(event.target.value);
  };

  const handleGoClick = () => {
    if (!category || !product || !region) {
      alert('Please fill in at least one field!');
      return;
    }
    localStorage.setItem('category', category);
    localStorage.setItem('product', product);
    localStorage.setItem('region', region);
  
    axiosInstance.get(`/compliance/?category=${category}&product=${product}&region=${region}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      }
    })
    .then((response) => {
      console.log(response.data);
  
      // redirect the user to the second page with the compliance data
      history.push('/navbar/secondpage');
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        if (error.response.status === 404) {
          alert(`Sorry, the product "${product}" in category "${category}" was not found.`);
        } else if (error.response.status === 401) {
          alert('Unauthorized access. Please log in again.');
        } else if (error.response.status === 500) {
          alert('Internal server error. Please try again later.');
        } else {
          alert('Something went wrong. Please try again later.');
        }
      } else {
        alert('Network error. Please check your internet connection and try again.');
      }
    });
  };
  
  

  return (
    <div className="first-container22">
      <h3>Please Enter the following details to Start a new application :</h3>
      <h4 className="red-warning">You need to fill at least 1 data point to see the list of compliance.</h4>

      <div className="form-group22">
        <label htmlFor="category-input">Enter Category:</label>
        <input type="text" id="category-input" value={category} onChange={handleCategoryChange} />
      </div>
      <div className="form-group22">
        <label htmlFor="product-input">Enter Name of Product:</label>
        <input type="text" id="product-input" value={product} onChange={handleProductChange} />
      </div>

      <div className="region-group22">
        <label htmlFor="region-select22">Region:</label>
        <div className="centerdiv"> 
          <select id="region-select22" value={region} onChange={handleRegionChange}>
            <option value="">-- Select a region --</option>
            <option>Europe</option>
            <option>Africa</option>
            <option>Asia</option>
            <option>Americas</option>
          </select>
        </div>
      </div>

      <div className="gobutton22"> 
        <button onClick={handleGoClick}>GO</button>
      </div>     
    </div>
  );
};

export default Firstpage;
