import React, { useState, useEffect } from 'react';
import { Link,  useHistory } from 'react-router-dom';
import "./Pages.css";
import Popup from "./popup/Popup";
import { TiTick } from "react-icons/ti";
import Multiselect from 'multiselect-react-dropdown';
import { Row, Col } from "antd";

function MiddleSection() {
  return (
    <div className="middle-section">
      <h398>Middle Section</h398>
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
  const [submitPopup, setSubmitPopup] = useState(false);

 
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
    setSubmitPopup(true);
    setButtonPopup(false);
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
      {submitPopup && (
  <Popup>
    <div>Hello everyone</div>
  </Popup>
)}

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
  const [selectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const history = useHistory();
  const [options] = useState(['TEC', 'WPS', 'BEE','BIS','EPR', 'Legal Metrology', 'Mandatory ISI', 'Management System' ]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);

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
  
    // Show success message and navigate to success page
    const uploadedFileName = selectedFile ? selectedFile.name : files[files.length - 1].name;
    const successUrl = `/success/${encodeURIComponent(uploadedFileName)}`;
    history.push(successUrl);
  
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
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
          <h3>Upload a File</h3>
          <label htmlFor="file-input">
            <h94>Choose File:</h94>
          </label>
          <input className="file-input12" type="file" accept="application/pdf"  multiple onChange={handleFileChange} />
          {files.length > 0 && (
              <div>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name} <TiTick size={24} /></li>
                  ))}
                </ul>
              </div>
            )}
          <label>
            <h98>Select an Option:</h98>
            <Multiselect 
             isObject={false}
            options={ options }
            onRemove={(event)=> { console.log(event) }}
            onSelect={ (event)=> { console.log(event) }}
            showCheckbox
            />
          
          </label>
          <div>
          <button8 onClick={() => {
                  setButtonPopup(false);
                    setFiles([]);
                    }}>Cancel</button8>
            <button8 type="submit">Upload</button8>
          </div>
        </form>
      </Popup>
       <button7 onClick={() => setButtonPopup(true)}>Upload</button7>

               {/*DOWNLOAD BUTTON POPUP SECTION */}


       <button7 onClick={() => setButtonPopup1(true)}>Download</button7>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <form onSubmit={handleSubmit}>
          <h3>Download a File</h3>
          <label>
            <h98>Select a file to download:</h98>
            <Multiselect
            isObject={false}
            options={ options }
            onRemove={(event)=> { console.log(event) }}
            onSelect={ (event)=> { console.log(event) }}
            showCheckbox
             />
          </label>
          <div>
            <button8 type="submit">Download</button8>
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
    <div className="app55">
      <div className="left-section55">
        <Startapp />
        <LabTestingBox />
        <DocumentBox />
      </div>
      <div>
        <button className = "wishlist" 
        onClick={handleWishlistClick}>
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
      <div className="video-box55">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <div className="center-section55">
        <MiddleSection/>
      </div>
      <div className="right-section66">
        <Link to="/introduction">Introduction</Link>
        <Link to="/required-document">Required Document</Link>
        <Link to="/registration-process">Registration Process</Link>
      </div> 

{/*------------------Notify Section -----------------------*/}
      <div className= "notify" >
      <div className="right-section66">
      <Link className='notify' onClick={() => setButtonPopup2(true)}>Notification</Link>
      </div>
      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <div>
          <h3 className='notif'>Notification</h3>
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
      <div1 class="vl"></div1>  
    </div>
  );
 };

    // Start Applicatioon Form

function Startapp() {
  // state variables to store form data
  const [applicantCompanyName, setApplicantCompanyName] = useState("");
  const [applicantCompanyAddress, setApplicantCompanyAddress] = useState("");
  const [applicantDirectorName, setApplicantDirectorName] = useState("");
  const [applicantContactNumber, setApplicantContactNumber] = useState("");
  const [applicantEmailID, setApplicantEmailID] = useState("");
  const [applicantAuthorisedSignatoryName, setApplicantAuthorisedSignatoryName] = useState("");
  const [applicantAuthorisedSignatoryDesignation, setApplicantAuthorisedSignatoryDesignation] = useState("");
  const [applicantContactNumber1, setApplicantContactNumber1] = useState("");
  const [applicantEmailID1, setApplicantEmailID1] = useState("");
  const [applicantNameofmanufacturingfactory, setApplicantNameofmanufacturingfactory] = useState("");
  const [applicantAddressoffactory, setApplicantAddressoffactory] = useState("");
  const [foreignCompanyName, setForeignCompanyName] = useState("");
  const [foreignCompanyAddress, setForeignCompanyAddress] = useState("");
  const [foreignAuthorizedSignatoryName, setForeignAuthorizedSignatoryName] = useState("");
  const [foreignAuthorizedSignatoryDesignation, setForeignAuthorizedSignatoryDesignation] = useState("");
  const [foreignContactNumber, setForeignContactNumber] = useState("");
  const [foreignEmailID, setForeignEmailID ] = useState("");
  const [buttonPopup5, setButtonPopup5] = useState(false);

  // function to handle file uploads
  const handleFileUpload = (event) => {
    // TODO: handle file upload logic
  };

  // function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission logic
  
    // Generate a random 4-digit number
    const uniqueCode = Math.floor(Math.random() * 10000);
  
    // Display the unique code to the user
    alert(`Your Project code is ${uniqueCode}.`);
  
    setButtonPopup5(false);
  };



  return (
    <div>
      <button10 onClick={() => setButtonPopup5(true)}>Start New Application</button10>
      <Popup trigger={buttonPopup5} setTrigger={setButtonPopup5}>
        <div style={{ height: "500px", overflow: "scroll" }}>
          <h801>Indian OEM/Foreign Manufacture</h801>
          <form onSubmit={handleSubmit}>
            <h802>Applicant Company:</h802>
            <label className="st8012">
              Company Name:
              <input
                className="st805"
                type="text"
                value={applicantCompanyName}
                onChange={(event) => setApplicantCompanyName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Company Address:
              <input
              className="st805"
                type="text"
                value={applicantCompanyAddress}
                onChange={(event) => setApplicantCompanyAddress(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Director Name:
              <input
              className="st805"
                type="text"
                value={applicantDirectorName}
                onChange={(event) => setApplicantDirectorName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
              className="st805"
                type="number"
                value={applicantContactNumber}
                onChange={(event) => setApplicantContactNumber(event.target.value)}
                required
              />
              </label>
               <label className="st8012">
              Email ID:
              <input
              className="st805"
                type="text"
                value={applicantEmailID}
                onChange={(event) => setApplicantEmailID(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Authorised Signatory Name:
              <input
              className="st805"
                type="text"
                value={applicantAuthorisedSignatoryName}
                onChange={(event) => setApplicantAuthorisedSignatoryName(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Authorised Signatory Designation:
              <input
              className="st805"
                type="text"
                value={applicantAuthorisedSignatoryDesignation}
                onChange={(event) => setApplicantAuthorisedSignatoryDesignation(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Contact Number:
              <input
              className="st805"
                type="number"
                value={applicantContactNumber1}
                onChange={(event) => setApplicantContactNumber1(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Email ID:
              <input
              className="st805"
                type="text"
                value={applicantEmailID1}
                onChange={(event) => setApplicantEmailID1(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Name of manufacturing factory:
              <input
              className="st805"
                type="text"
                value={applicantNameofmanufacturingfactory}
                onChange={(event) => setApplicantNameofmanufacturingfactory(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Address of factory:
              <input
              className="st805"
                type="text"
                value={applicantAddressoffactory}
                onChange={(event) => setApplicantAddressoffactory(event.target.value)}
                required
              />
              </label>


            <h802>Foreign Manufacture:</h802>
            <label className="st8012">
              Company Name:
              <input
              className="st805"
                type="text"
                value={foreignCompanyName}
                onChange={(event) => setForeignCompanyName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Company Address:
              <input
              className="st805"
                type="text"
                value={foreignCompanyAddress}
                onChange={(event) => setForeignCompanyAddress(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Authorized Signatory Name:
              <input
              className="st805"
                type="text"
                value={foreignAuthorizedSignatoryName}
                onChange={(event) => setForeignAuthorizedSignatoryName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Authorized Signatory Designation:
              <input
              className="st805"
                type="text"
                value={foreignAuthorizedSignatoryDesignation}
                onChange={(event) => setForeignAuthorizedSignatoryDesignation(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
              className="st805"
                type="number"
                value={foreignContactNumber}
                onChange={(event) => setForeignContactNumber(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Email ID:
              <input
              className="st805"
                type="text"
                value={foreignEmailID}
                onChange={(event) => setForeignEmailID(event.target.value)}
                required
              />
            </label>


            <h802>Document Required:</h802>
            <label className="st8012">
              COI of Applicant Company:
              <input  classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              PAN Card of Applicant Company:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              MOA:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              AOA:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              Shareholding Pattern:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              Authorization letter:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              MOU between Applicant & OEM:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              AIR Authorization Letter for Appliicant:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <button className='btn808' type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </div>
  );
  };  

export default Thirdpage;
