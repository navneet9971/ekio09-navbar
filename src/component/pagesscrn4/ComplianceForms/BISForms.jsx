import React, { useState, useEffect } from 'react';
import { Link,  useHistory } from 'react-router-dom';
import "../Pages.css";
import Popup from "../popup/Popup";
import { TiTick } from "react-icons/ti";
import Multiselect from 'multiselect-react-dropdown';

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
  const [submitPopup] = useState(false);

    // state variables to store form data
    const [testingApplicantName, setTestingApplicantName] = useState("");
    const [testingAddress, setTestingAddress] = useState("");
    const [testingOEMName, setTestingOEMName] = useState("");
    const [testingOEMAddress, setTestingOEMAddress] = useState("");
    const [testingProductName, setTestingProductName] = useState("");
    const [testingModelNo, setTestingModelNo] = useState("");
    const [testingAssociated, setTestingAssociated] = useState("");
    const [testingHardwareNumber, setTestingHardwareNumber] = useState("");
    const [testingSoftwareNumber, setTestingSoftwareNumber] = useState("");
    const [testingBrand, setTestingBrand] = useState("");
    const [testingSr, setTestingSr] = useState("");
    const [testingElectrical, setTestingElectrical] = useState("");
    const [testingProductType, setTestingProductType] = useState("");
    const [testingProductUse, setTestingProductUse] = useState("");
    const [testingSoftware, setTestingSoftware] = useState("");
    const [testingTechnicalsupportName, setTestingTechnicalsupportName] = useState("");
    const [testingTechnicalsuppoertNumber, setTestingTechnicalsuppoertNumber] = useState("");
    const [manufacturingProductName, setManufacturingProductName ] = useState("");
    const [manufacturingModelNo, setManufacturingModelNo ] = useState("");
    const [manufacturingAssociatedModels, setManufacturingAssociatedModels] = useState("");
    const [manufacturingManufacturingName, setManufacturingManufacturingName ] = useState("");
    const [manufacturingManufacturingAddress, setManufacturingManufacturingAddress ] = useState("");
    const [manufacturingManufacturingCountry, setManufacturingManufacturingCountry] = useState("");
    const [manufacturingContactName, setManufacturingContactName] = useState ("");
    const [manufacturingContactNumber, setManufacturingContactNumber] = useState ("");
    const [manufacturingContactEmail, setManufacturingContactEmail] = useState ("");
    const [manufacturingOrigin, setManufacturingOrigin] = useState ("");
    const [manufacturingContract, setManufacturingContract] = useState ("");
    


    // function to handle file uploads
  const handleFileUpload = (event) => {
    // TODO: handle file upload logic
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission logic
  };
 
  const statusData = [
    { "s.no": '1', category: 'Mobile', onDate: '2022-02-01', currentStatus: 'In Progress' },
    { "s.no": '2', category: 'Screen', onDate: '2022-02-02', currentStatus: 'Completed' },
    { "s.no": '3', category: 'Chipset', onDate: '2022-02-03', currentStatus: 'Pending' },
  ];



  return (
    <div className="lab-testing-box">
      <p>Want lab testing services?</p>
      <button7 onClick={() => setButtonPopup(true)}>Request Testing</button7>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <div style={{ height: "500px", overflow: "scroll" }}>
          <h801>BIS FORMS</h801>
          <form onSubmit={handleSubmit}>
            <label className="st8012">
              Applicant Name:
              <input
                className="st805"
                type="text"
                value={testingApplicantName}
                onChange={(event) => setTestingApplicantName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address:
              <input
              className="st805"
                type="text"
                value={testingAddress}
                onChange={(event) => setTestingAddress(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              OEM Name:
              <input
              className="st805"
                type="text"
                value={testingOEMName}
                onChange={(event) => setTestingOEMName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              OEM Address:
              <input
              className="st805"
                type="text"
                value={testingOEMAddress}
                onChange={(event) => setTestingOEMAddress(event.target.value)}
                required
              />
              </label>
               <label className="st8012">
              Product Name:
              <input
              className="st805"
                type="text"
                value={testingProductName}
                onChange={(event) => setTestingProductName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Model No:
              <input
              className="st805"
                type="text"
                value={testingModelNo}
                onChange={(event) => setTestingModelNo(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Associated Models (if any):
              <input
              className="st805"
                type="text"
                value={testingAssociated}
                onChange={(event) => setTestingAssociated(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Hardware Number:
              <input
              className="st805"
                type="text"
                value={testingHardwareNumber}
                onChange={(event) => setTestingHardwareNumber(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Software Number	:
              <input
              className="st805"
                type="text"
                value={testingSoftwareNumber}
                onChange={(event) => setTestingSoftwareNumber(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Brand:
              <input
              className="st805"
                type="text"
                value={testingBrand}
                onChange={(event) => setTestingBrand(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Sr. No:
              <input
              className="st805"
                type="text"
                value={testingSr}
                onChange={(event) => setTestingSr(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Electrical Rating:
              <input
              className="st805"
                type="text"
                value={testingElectrical}
                onChange={(event) => setTestingElectrical(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Product Type (Fixed/Industrial/Portable/other):
              <input
              className="st805"
                type="text"
                value={testingProductType}
                onChange={(event) => setTestingProductType(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Product Use (Indoor/Outdoor/other):
              <input
              className="st805"
                type="text"
                value={testingProductUse}
                onChange={(event) => setTestingProductUse(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Filled CDF/CCl (Format attached):
              <input  classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              Complete USer Manual:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              Circuit Diagram:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              PCB Layout:
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
            <label className="st8012">
              Software used (if any):
              <input classname ="stup805" type="file" onChange={handleFileUpload} accept=".pdf" required />
            </label>
              <label className="st8012">
              Software used (if any)	If yes, please upload:
              <input
              className="st805"
                type="text"
                value={testingSoftware}
                onChange={(event) => setTestingSoftware(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Technical support person name:
              <input
              className="st805"
                type="text"
                value={testingTechnicalsupportName}
                onChange={(event) => setTestingTechnicalsupportName(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Technical support person contact number:
              <input
              className="st805"
                type="text"
                value={testingTechnicalsuppoertNumber}
                onChange={(event) => setTestingTechnicalsuppoertNumber(event.target.value)}
                required
              />
              </label>


            <h805>Manufacturing Location Information:</h805>
            <label className="st8012">
              Product Name:
              <input
              className="st805"
                type="text"
                value={manufacturingProductName}
                onChange={(event) => setManufacturingProductName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Model No:
              <input
              className="st805"
                type="text"
                value={manufacturingModelNo}
                onChange={(event) => setManufacturingModelNo(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Associated Models:
              <input
              className="st805"
                type="text"
                value={manufacturingAssociatedModels}
                onChange={(event) => setManufacturingAssociatedModels(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Manufacturer Name:
              <input
              className="st805"
                type="text"
                value={manufacturingManufacturingName}
                onChange={(event) => setManufacturingManufacturingName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Manufacturer Address:
              <input
              className="st805"
                type="text"
                value={manufacturingManufacturingAddress}
                onChange={(event) => setManufacturingManufacturingAddress(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Manufacturing Country:
              <input
              className="st805"
                type="text"
                value={manufacturingManufacturingCountry}
                onChange={(event) => setManufacturingManufacturingCountry(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact Person Name:
              <input
              className="st805"
                type="text"
                value={manufacturingContactName}
                onChange={(event) => setManufacturingContactName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact Person's Number:
              <input
              className="st805"
                type="text"
                value={manufacturingContactNumber}
                onChange={(event) => setManufacturingContactNumber(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact Person's Email Id:
              <input
              className="st805"
                type="text"
                value={manufacturingContactEmail}
                onChange={(event) => setManufacturingContactEmail(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Country of Origin:
              <input
              className="st805"
                type="text"
                value={manufacturingOrigin}
                onChange={(event) => setManufacturingOrigin(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contract Manufacturing(Yes/No):
              <input
              className="st805"
                type="text"
                value={manufacturingContract}
                onChange={(event) => setManufacturingContract(event.target.value)}
                required
              />
            </label>
           
            <button className='btn809' type="submit">Submit</button>
          </form>
        </div>
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
  const [options] = useState(['Signatory Authorization', 'OEM Authorization', 'MOU','Shareholding Pattern','Annexure 1', 'BOM', 'Non Applicability Proforma', 'Proforma Seeking Exemption' ]);

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
  const [portalEmail, setPortalEmail] = useState("");
  const [portalContactperson, setPortalContactperson] = useState("");
  const [portalDesignation, setPortalDesignation] = useState("");
  const [portalMobileNo, setPortalMobileNo] = useState("");
  const [portalManufacturingName, setPortalManufacturingName] = useState("");
  const [portalAddress, setPortalAddress] = useState("");
  const [portalCountry, setPortalCountry] = useState("");
  const [portalState, setPortalState] = useState("");
  const [portalZipcode, setPortalZipcode] = useState("");
  const [portalContactNo, setPortalContactNo] = useState("");
  const [form1Name1, setForm1Name1] = useState("");
  const [form1Name2, setForm1Name2] = useState("");
  const [form1Name3, setForm1Name3] = useState("");
  const [form1NameDesignation1, setForm1NameDesignation1] = useState("");
  const [form1NameDesignation2, setForm1NameDesignation2] = useState("");
  const [form1NameDesignation3, setForm1NameDesignation3] = useState("");
  const [form1TechnicalName1, setForm1TechnicalName1] = useState("");
  const [form1TechnicalName2, setForm1TechnicalName2] = useState("");
  const [form1TechnicalName3, setForm1TechnicalName3] = useState("");
  const [form1TechnicalNameDesignation1, setForm1TechnicalNameDesignation1] = useState("");
  const [form1TechnicalNameDesignation2, setForm1TechnicalNameDesignation2] = useState("");
  const [form1TechnicalNameDesignation3, setForm1TechnicalNameDesignation3] = useState("");
  const [form1ContactPersonName1, setForm1ContactPersonName1] = useState("");
  const [form1ContactPersonName2, setForm1ContactPersonName2] = useState("");
  const [form1ContactPersonName3, setForm1ContactPersonName3] = useState("");
  const[form1ContactPersonDesignation1, setForm1ContactPersonDesignation1] =useState("");
  const[form1ContactPersonDesignation2, setForm1ContactPersonDesignation2] =useState("");
  const[form1ContactPersonDesignation3, setForm1ContactPersonDesignation3] =useState("");
  const [form1AIRNameCompany, setForm1AIRNameCompany] = useState("");
  const [form1AIRAddressCompany, setForm1AIRAddressCompany] = useState("");
  const [form1AuthorizedName, setForm1AuthorizedName ] = useState("");
  const [form1Designation, setForm1Designation ] = useState("");
  const [form1PhoneNumber, setForm1PhoneNumber ] = useState("");
  const [form1EmailID, setForm1EmailID ] = useState("");
  const [nominationSigningAuth, setNominationSigningAuth ] = useState("");
  const [nominationDesignation, setNominationDesignation ] = useState("");
  const [nominationFactoryName, setNominationFactoryName ] = useState("");
  const [nominationAddress, setNominationAddress ] = useState("");
  const [nominationContactNo, setNominationContactNo ] = useState("");
  const [nominationEmail, setNominationEmail ] = useState("");
  const [nominationAIRCompanyName, setNominationAIRCompanyName ] = useState("");
  const [nominationAddress1, setNominationAddress1 ] = useState("");
  const [nominationContactNo1, setNominationContactNo1 ] = useState("");
  const [nominationEmail1, setNominationEmail1 ] = useState("");
  const [brandBrandOwnwerName, setBrandBrandOwnwerName ] = useState("");
  const [brandManufactureNameandAddress, setBrandManufactureNameandAddress ] = useState("");
  const [brandProduct, setBrandProduct ] = useState("");
  const [brandBrandName, setBrandBrandName ] = useState("");
  const [brandModelsProduct, setBrandModelsProduct ] = useState("");
  const [brandBrandOwnerSigning, setBrandBrandOwnerSigning ] = useState("");
  const [brandDesignation, setBrandDesignation ] = useState("");
  const [buttonPopup5, setButtonPopup5] = useState(false);

  
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
          <h801>BIS FORMS</h801>
          <form onSubmit={handleSubmit}>
            <h802>Portal registration form:</h802>
            <label className="st8012">
              Email:
              <input
                className="st805"
                type="text"
                value={portalEmail}
                onChange={(event) => setPortalEmail(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Name of Contact Person:
              <input
              className="st805"
                type="text"
                value={portalContactperson}
                onChange={(event) => setPortalContactperson(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={portalDesignation}
                onChange={(event) => setPortalDesignation(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Mobile NO:
              <input
              className="st805"
                type="number"
                value={portalMobileNo}
                onChange={(event) => setPortalMobileNo(event.target.value)}
                required
              />
              </label>
               <label className="st8012">
              Manufacturing Unit Name:
              <input
              className="st805"
                type="text"
                value={portalManufacturingName}
                onChange={(event) => setPortalManufacturingName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address:
              <input
              className="st805"
                type="text"
                value={portalAddress}
                onChange={(event) => setPortalAddress(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Country:
              <input
              className="st805"
                type="text"
                value={portalCountry}
                onChange={(event) => setPortalCountry(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              State/Province:
              <input
              className="st805"
                type="text"
                value={portalState}
                onChange={(event) => setPortalState(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Zip Code:
              <input
              className="st805"
                type="text"
                value={portalZipcode}
                onChange={(event) => setPortalZipcode(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Contact No:
              <input
              className="st805"
                type="text"
                value={portalContactNo}
                onChange={(event) => setPortalContactNo(event.target.value)}
                required
              />
              </label>


            <h802>Form 1:</h802>
            <h3 className='topmang'>Top Management of the manufacturing unit:</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <h3 className="manufacunit">Name</h3>
      <label className="st8012">
        1
        <input className="st805" type="text" value={form1Name1} onChange={(event) => setForm1Name1(event.target.value)} required />
      </label>
      <label className="st8012">
        2
        <input className="st805" type="text" value={form1Name2} onChange={(event) => setForm1Name2(event.target.value)} required />
      </label>
      <label className="st8012">
        3
        <input className="st805" type="text" value={form1Name3} onChange={(event) => setForm1Name3(event.target.value)} required />
      </label>
    </div>
    <div className="designations">
      <h3 className="manufacunit1">Designation</h3>
      <label className="st8012">
        <input className="st805" type="text" value={form1NameDesignation1} onChange={(event) => setForm1NameDesignation1(event.target.value)} required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" value={form1NameDesignation2} onChange={(event) => setForm1NameDesignation2(event.target.value)} required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" value={form1NameDesignation3} onChange={(event) => setForm1NameDesignation3(event.target.value)} required />
      </label>
    </div>
  </div>
</div>

<h3 className='techni'>Technical Management of the manufacturing unit:</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <h3 className="manufacunit">Name</h3>
      <label className="st8012">
        1
        <input className="st805" type="text" value={form1TechnicalName1} onChange={(event) => setForm1TechnicalName1(event.target.value)} required />
      </label>
      <label className="st8012">
        2
        <input className="st805" type="text" value={form1TechnicalName2} onChange={(event) => setForm1TechnicalName2(event.target.value)} required />
      </label>
      <label className="st8012">
        3
        <input className="st805" type="text" value={form1TechnicalName3} onChange={(event) => setForm1TechnicalName3(event.target.value)} required />
      </label>
    </div>
    <div className="designations">
      <h3 className="manufacunit1">Designation</h3>
      <label className="st8012">
        <input className="st805" type="text" value={form1TechnicalNameDesignation1} onChange={(event) => setForm1TechnicalNameDesignation1(event.target.value)} required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" value={form1TechnicalNameDesignation2} onChange={(event) => setForm1TechnicalNameDesignation2(event.target.value)} required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" value={form1TechnicalNameDesignation3} onChange={(event) => setForm1TechnicalNameDesignation3(event.target.value)} required />
      </label>
    </div>
  </div>
</div>
            
<h3 className='Contctprson'>Contact Person of the manufacturing unit:</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <h3 className="manufacunit">Name</h3>
      <label className="st8012">
        1
        <input className="st805" type="text" value={form1ContactPersonName1} onChange={(event) => setForm1ContactPersonName1(event.target.value)} required />
      </label>
      <label className="st8012">
        2
        <input className="st805" type="text" value={form1ContactPersonName2} onChange={(event) => setForm1ContactPersonName2(event.target.value)} required />
      </label>
      <label className="st8012">
        3
        <input className="st805" type="text" value={form1ContactPersonName3} onChange={(event) => setForm1ContactPersonName3(event.target.value)} required />
      </label>
    </div>
    <div className="designations">
      <h3 className="manufacunit1">Designation</h3>
      <label className="st8012">
        <input className="st805" type="text" value={form1ContactPersonDesignation1} onChange={(event) => setForm1ContactPersonDesignation1(event.target.value)} required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" value={form1ContactPersonDesignation2} onChange={(event) => setForm1ContactPersonDesignation2(event.target.value)} required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" value={form1ContactPersonDesignation3} onChange={(event) => setForm1ContactPersonDesignation3(event.target.value)} required />
      </label>
    </div>
  </div>
</div>


        
            <label className="st8012">
              Name of the AIR Company:
              <input
              className="st805"
                type="text"
                value={form1AIRNameCompany}
                onChange={(event) => setForm1AIRNameCompany(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address of the AIR Company:
              <input
              className="st805"
                type="text"
                value={form1AIRAddressCompany}
                onChange={(event) => setForm1AIRAddressCompany(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Authorized signatory Name:
              <input
              className="st805"
                type="text"
                value={form1AuthorizedName}
                onChange={(event) => setForm1AuthorizedName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={form1Designation}
                onChange={(event) => setForm1Designation(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Phone Number:
              <input
              className="st805"
                type="text"
                value={form1PhoneNumber}
                onChange={(event) => setForm1PhoneNumber(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Email id:
              <input
              className="st805"
                type="text"
                value={form1EmailID}
                onChange={(event) => setForm1EmailID(event.target.value)}
                required
              />
            </label>


            <h802>Nomination Form</h802>
            <label className="st8012">
              Signing Auth name:
              <input
              className="st805"
                type="text"
                value={nominationSigningAuth}
                onChange={(event) => setNominationSigningAuth(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={nominationDesignation}
                onChange={(event) => setNominationDesignation(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
             Factory Name:
              <input
              className="st805"
                type="text"
                value={nominationFactoryName}
                onChange={(event) => setNominationFactoryName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address:
              <input
              className="st805"
                type="text"
                value={nominationAddress}
                onChange={(event) => setNominationAddress(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact No:
              <input
              className="st805"
                type="text"
                value={nominationContactNo}
                onChange={(event) => setNominationContactNo(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
               Email:
              <input
              className="st805"
                type="text"
                value={nominationEmail}
                onChange={(event) => setNominationEmail(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              AIR company name:
              <input
              className="st805"
                type="text"
                value={nominationAIRCompanyName}
                onChange={(event) => setNominationAIRCompanyName (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address:
              <input
              className="st805"
                type="text"
                value={nominationAddress1}
                onChange={(event) => setNominationAddress1(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact No:
              <input
              className="st805"
                type="text"
                value={nominationContactNo1}
                onChange={(event) => setNominationContactNo1(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
             Email:
              <input
              className="st805"
                type="text"
                value={nominationEmail1}
                onChange={(event) => setNominationEmail1(event.target.value)}
                required
              />
            </label>


            <h802>Brand Auth</h802>
            <label className="st8012">
              Brand Owner's Comapany Name and Address:
              <input
              className="st805"
                type="text"
                value={brandBrandOwnwerName}
                onChange={(event) => setBrandBrandOwnwerName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Manufacture Name and Address:
              <input
              className="st805"
                type="text"
                value={brandManufactureNameandAddress}
                onChange={(event) => setBrandManufactureNameandAddress(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
             Product:
              <input
              className="st805"
                type="text"
                value={brandProduct}
                onChange={(event) => setBrandProduct(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Brand Name:
              <input
              className="st805"
                type="text"
                value={brandBrandName}
                onChange={(event) => setBrandBrandName(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Models for the Product:
              <input
              className="st805"
                type="text"
                value={brandModelsProduct}
                onChange={(event) => setBrandModelsProduct (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
               Brand Owner Signing Person Name:
              <input
              className="st805"
                type="text"
                value={brandBrandOwnerSigning}
                onChange={(event) => setBrandBrandOwnerSigning(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={brandDesignation}
                onChange={(event) => setBrandDesignation(event.target.value)}
                required
              />
            </label>

            <button className='btn808' type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </div>
  );
  };  

export default Thirdpage;
