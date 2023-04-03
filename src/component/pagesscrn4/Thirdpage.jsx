import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Pages.css";
import Popup from "./popup/Popup";
import Multiselect from 'multiselect-react-dropdown';
import { Row, Col } from "antd";

function MiddleSection() {
  return (
    <div className="middle-section">
      <h3>Middle Section</h3>
      <p>Description of Middle Section</p>
    </div>
  );
}

function LabTestingBox() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [streetAddress, setstreetAddress] = useState(null);
  const [postalCode, setpostalCode] = useState(null);
  const [city, setcity] = useState(null);
  const [firstName, setfirstName] = useState(null);
  const [mobileNumber, setmobileNumber] = useState(null);
 
  const statusData = [
    { "s.no": '1', category: 'Mobile', onDate: '2022-02-01', currentStatus: 'In Progress' },
    { "s.no": '2', category: 'Screen', onDate: '2022-02-02', currentStatus: 'Completed' },
    { "s.no": '3', category: 'Chipset', onDate: '2022-02-03', currentStatus: 'Pending' },
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "streetAddress") {
      setstreetAddress(value);
    }
    if (id === "postalCode") {
      setpostalCode(value);
    }
    if (id === "city") {
      setcity(value);
  };
  if (id === "firstName") {
    setfirstName(value);
};
if (id === "mobileNumber") {
  setmobileNumber(value);
};
  };



const handleSubmit = () => {
  console.log(streetAddress, postalCode, city, firstName);
};



  return (
    <div className="lab-testing-box">
      <p>Want lab testing services?</p>
      <button7 onClick={() => setButtonPopup(true)}>Request Testing</button7>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <h51 className="title">Where Does the Sample need to be Collected</h51>
        <Row className="form-body" gutter={[16, 0]}>
          <Col xs={24} md={12}>
            <div className="firstname">
              <label className="form__label" for="firstName">
              {" "}
              </label>
              <input
                type="text"
                name=""
                id="streetAddress"
                className="form__input"
                value={streetAddress}
                required
                onChange={(e) => handleInputChange(e)}
                placeholder="Street Address"
              />
            </div>
          </Col>
          <Col xs={20} md={10}>
            <div className="lastname">
              <label className="form__label" for="postalCode">
                {" "}
              </label>
              <input
                type="text"
                name=""
                id="postalCode"
                value={postalCode}
                required
                className="form__input"
                onChange={(e) => handleInputChange(e)}
                placeholder="Postal Code"
              />
            </div>
          </Col>
          <Col xs={24}>
          <div className="lastname">
              <label className="form__label" for="city">
                {" "}
              </label>
              <input
                type="text"
                name=""
                id="city"
                value={city}
                required
                className="form__input"
                onChange={(e) => handleInputChange(e)}
                placeholder="City"
              />
            </div>

            <div className='titlecontact'>
              <h999>Contact Details Person:</h999>
            </div>

            <Col>
            <div className="lastname">
              <label className="form__label" for="contactName">
                {" "}
              </label>
              <input
                type="text"
                name=""
                id="contactName"
                value={firstName}
                required
                className="form__input"
                onChange={(e) => handleInputChange(e)}
                placeholder="Full Name"
              />
            </div>
          </Col>
          
          
            <div className="lastname">
              <label className="form__label" for="contactNumber">
                {" "}
              </label>
              <input
                type="text"
                name=""
                id="contactNumber"
                value={mobileNumber}
                required
                className="form__input"
                onChange={(e) => handleInputChange(e)}
                placeholder="Mobile Number"
              />
            </div>
        
           
            <button onClick={() => handleSubmit()} type="submit">
            Submit
          </button>
          </Col>
          </Row>
      </Popup>

      <button7 onClick={() => setButtonPopup1(true)}>Status</button7>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <div>
          <h32>My Order</h32>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Order Category</th>
                <th>On Date</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {statusData.map((data, index) => (
                <tr key={index}>
                  <td>{data["s.no"]}</td>
                  <td>{data.category}</td>
                  <td>{data.onDate}</td>
                  <td>{data.currentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Popup>
    </div>
  );
}
 

function DocumentBox() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [selectedOption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [options] = useState(['Signatory Authorization', 'OEM Authorization', 'MOU','Shareholding Pattern','Annexure', 'BOM', 'Non Applicability', 'Proforma Seeking Exemption' ]);

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    event.preventDefault();

    // Set the URL of the file to be downloaded based on the selected option
    let fileUrl;
    if (selectedOption === "Option 1") {
      fileUrl = "https://example.com/signatory-authorization.pdf";
    } else if (selectedOption === "Option 2") {
      fileUrl = "https://example.com/oem-authorization.pdf";
    } else if (selectedOption === "Option 3") {
      fileUrl = "https://example.com/mou.pdf";
    } else if (selectedOption === "Option 4") {
      fileUrl = "https://example.com/shareholding-pattern.pdf";
    } else if (selectedOption === "Option 5") {
      fileUrl = "https://example.com/annexure.pdf";
    } else if (selectedOption === "Option 6") {
      fileUrl = "https://example.com/bom.pdf";
    } else if (selectedOption === "Option 7") {
      fileUrl = "https://example.com/non-applicability.pdf";
    } else if (selectedOption === "Option 8") {
      fileUrl = "https://example.com/proforma-seeking-exemption.pdf";
    }

    // Trigger the download of the file
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    link.click();

    setButtonPopup(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting form with file:', selectedFile);
    console.log('Selected option:', selectedOption);
    // Code to handle uploading the file and selected option
    setButtonPopup(false);
  }

  function viewDocument() {
    // Code to open a new tab and display the file
    console.log("Viewing file...");
    const viewUrl = 'https://example.com/document.pdf';
    window.open(viewUrl, '_blank');
  }

  return (
    <div className="document-box">
      <h3>Documents</h3>
      <p>Description of Documents</p>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
          <div><h3 className="upload-files">Upload a File</h3>
          <input id="file-input12" type="file" accept="application/pdf" onChange={handleFileChange} />
          <div className="file-change-button"><label >
            <Multiselect 
             isObject={false}
            options={ options }
            onRemove={(event)=> { console.log(event) }}
            onSelect={ (event)=> { console.log(event) }}
            showCheckbox
            />
          </label>
          </div>
          </div>
          <div className="popup-buttons-bottom">
            <button8 onClick={() => setButtonPopup(false)}>Cancel</button8>
            <button8 type="submit">Upload</button8>
          </div>
        </form>
      </Popup>
       <button7 onClick={() => setButtonPopup(true)}>Upload</button7>

               {/*DOWNLOAD BUTTON POPUP SECTION */}


       <button7 onClick={() => setButtonPopup1(true)}>Download</button7>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <form onSubmit={handleSubmit}>
        <div>
          <h3 className="upload-files">Download a File</h3>
        <div className="file-change-button">
          <label>
            <h98 >Select a file to download:</h98>
            <Multiselect
            isObject={false}
            options={ options }
            onRemove={(event)=> { console.log(event) }}
            onSelect={ (event)=> { console.log(event) }}
            showCheckbox
             />
          </label></div>
          <div class="popup-buttons-bottom">
            <button8 type="submit">Download</button8>
          </div>
          </div>
        </form>
      </Popup>

      <button7 onClick={viewDocument}>View</button7>
    </div>
  );
}



function Thirdpage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);

  useEffect(() => {
    fetch('https://example.com/video')
      .then(response => response.json())
      .then(data => {
        setVideoUrl(data.url);
      })
      .catch(error => console.error(error));
  }, []);


  const handleWishlistClick = () => {
    if (!isWishlisted) {
      // Add the video to the wishlist
      const wishlist = JSON.parse(localStorage.getItem('bookmarkItem') || '[]');
      wishlist.push({ name: 'Video 1', url: videoUrl });
      localStorage.setItem('bookmarkItem', JSON.stringify(wishlist));
      setIsWishlisted(true);
    } else {
      // Remove the video from the wishlist
      const wishlist = JSON.parse(localStorage.getItem('bookmarkItem') || '[]');
      const index = wishlist.findIndex(item => item.url === videoUrl);
      if (index > -1) {
        wishlist.splice(index, 1);
        localStorage.setItem('bookmarkItem', JSON.stringify(wishlist));
        setIsWishlisted(false);
      }
    }
  };

  const notifyData = [
    { "s.no": '1', notifaction: 'Mobile', Date: '2022-02-01', linked: 'In Progress' },
    { "s.no": '2', notifaction: 'Screen', Date: '2022-02-02', linked: 'Completed' },
    { "s.no": '3', notifaction: 'Chipset', Date: '2022-02-03', linked: 'Pending' },
  ];


  return (
    <div className="app55 thirdpagefix">
          {/*------------------Notify Section -----------------------*/}
<div className= "notify" >
      <div className="right-section66">
      
      </div>
      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <div>
          <h32>Notification</h32>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Notification</th>
                <th>Date</th>
                <th>Linked Notification</th>
              </tr>
            </thead>
            <tbody>
              {notifyData.map((data, index) => (
                <tr key={index}>
                  <td>{data["s.no"]}</td>
                  <td>{data.notifaction}</td>
                  <td>{data.Date}</td>
                  <td>{data.linked}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Popup>
      </div>

      <div className="row thirdpagefix2">
      <div className="right-section66">
          <Link className="right-section66-links" to="/introduction">Introduction</Link>
          <Link className="right-section66-links" to="/required-document">Required Document</Link>
          <Link className="right-section66-links" to="/registration-process">Registration Process</Link>
          <Link className="right-section66-links" onClick={() => setButtonPopup2(true)}>Notification</Link>
        </div>
        <div className="vl"></div>
        <div className="main-container">
          <MiddleSection/>
          <div className="middle-section2">
            <LabTestingBox />
            <DocumentBox />
          <div className="video-box55">
            <video controls>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </div>
          </div>
        </div>
        </div>
       
      {/*-----<div>
       <button className = "wishlist" 
        onClick={handleWishlistClick}>
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div> -----*/}
      
      
  

      {/*---------ChatBot Code Here---------*/}

      
    </div>

  );
}

export default Thirdpage;
