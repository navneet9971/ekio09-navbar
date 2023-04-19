import React, { useState, useEffect } from 'react';
import { Link,  useHistory } from 'react-router-dom';
import "../Pages.css";
import Popup from "../popup/Popup";
import { TiTick } from "react-icons/ti";
import Multiselect from 'multiselect-react-dropdown';
import axiosInstance from '../../../interceptors/axios';

function MiddleSection() {
  // State variables
  const [activeSection, setActiveSection] = useState("introduction");
  const [middleData, setMiddleData] = useState("");
  const [sections] = useState({
    introduction: null,
    registrationProcess: null,
    requiredDocument: null,
  });

  // Effect hook to load data from local storage or API
  useEffect(() => {
    axiosInstance
    .get(`compliance/${localStorage.getItem("compliance_id")}`)
        .then((response) => {
          setMiddleData(response.data.data);
          
         // localStorage.setItem('compliance_content', res.data.data);         
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  // Function to handle section click
  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  // Rendered components
  return (
    <div>
      {/* Middle section component */}
      <div className="middle-section">
    <div>
      {(() => {
        if (activeSection==="introduction") {
          return (
            <div>
              <h1 className='cont'>{middleData.product_name} - Introduction</h1>
              <h1 className='content'>{middleData.content}</h1>
            </div>
          )
        } else if (activeSection==="registrationProcess") {
          return (
            <div>
              <h398>{middleData.product_name} - Registraion Process</h398>
              <img alt="flowchart1"src={'https://eikomp.pythonanywhere.com'+middleData.flowchart}/>
            </div>
          )
        } else if (activeSection==="requiredDocument") {
          return (
            <div>
              <h398>{middleData.product_name} - Required Documents</h398>
              <img alt="faq1" src={'https://eikomp.pythonanywhere.com'+middleData.faq}/>
          </div>
          )
        }
      })()}
    </div>

        {
        sections[activeSection] ? (
          <div>
            <h398>{sections[activeSection].title}</h398>
            <p className="middle-sc">{sections[activeSection].content}</p>
          </div>
        ) : (
          <div>
            <h399>No content to display.</h399>
          </div>
        )}
      </div>
      {/* Right section component */}
      <div className="right-section">
        <Link onClick={() => handleSectionClick("introduction")}>
          Introduction
        </Link>
        <Link onClick={() => handleSectionClick("registrationProcess")}>
          Registration Process
        </Link>
        <Link onClick={() => handleSectionClick("requiredDocument")}>
          Required Document
        </Link>
      </div>
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
          <h801>Testing Information Required</h801>
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
          <div className="popup-buttons-bottom">
            <button8 type="submit">Download</button8>
          </div>
        </form>
      </Popup>

      <button7 onClick={viewDocument}>View</button7>
    </div>
  );
}



function Thirdpage() {
  const [videoUrl] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
 

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
        <MiddleSection/>


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
  const [applicant_company_name, setApplicant_company_name] = useState("");
  const [applicant_company_address, setApplicant_company_address] = useState("");
  const [applicant_director_name, setApplicant_director_name] = useState("");
  const [applicant_contact_number, setApplicant_contact_number] = useState("");
  const [applicant_emailid, setApplicant_emailid] = useState("");
  const [authorised_signatory_name, setAuthorised_signatory_name] = useState("");
  const [authorised_signatory_designation, setAuthorised_signatory_designation] = useState("");
  const [authorised_signatory_number, setAuthorised_signatory_number] = useState("");
  const [authorised_signatory_emailid, setAuthorised_signatory_emailid] = useState("");
  const [Authorised_name_of_manufacturing_factory, setAuthorised_name_of_manufacturing_factory] = useState("");
  const [Authorised_address_of_factory, setAuthorised_address_of_factory] = useState("");
  const [foreign_manufacturer_company_name, setForeign_manufacturer_company_name] = useState("");
  const [foreign_manufacturer_company_address, setForeign_manufacturer_company_address] = useState("");
  const [foreign_manufacturer_authorised_signatory_name, setForeign_manufacturer_authorised_signatory_name] = useState("");
  const [foreign_manufacturer_authorised_signatory_designation, setForeign_manufacturer_authorised_signatory_designation] = useState("");
  const [foreign_manufacturer_contact_number, setForeign_manufacturer_contact_number] = useState("");
  const [foreign_manufacturer_emailid, setForeign_manufacturer_emailid ] = useState("");
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
                value={applicant_company_name}
                onChange={(event) => setApplicant_company_name(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Company Address:
              <input
              className="st805"
                type="text"
                value={applicant_company_address}
                onChange={(event) => setApplicant_company_address(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Director Name:
              <input
              className="st805"
                type="text"
                value={applicant_director_name}
                onChange={(event) => setApplicant_director_name(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
              className="st805"
                type="number"
                value={applicant_contact_number}
                onChange={(event) => setApplicant_contact_number(event.target.value)}
                required
              />
              </label>
               <label className="st8012">
              Email ID:
              <input
              className="st805"
                type="text"
                value={applicant_emailid}
                onChange={(event) => setApplicant_emailid(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Authorised Signatory Name:
              <input
              className="st805"
                type="text"
                value={authorised_signatory_name}
                onChange={(event) => setAuthorised_signatory_name(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Authorised Signatory Designation:
              <input
              className="st805"
                type="text"
                value={authorised_signatory_designation}
                onChange={(event) => setAuthorised_signatory_designation(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Contact Number:
              <input
              className="st805"
                type="number"
                value={authorised_signatory_number}
                onChange={(event) => setAuthorised_signatory_number(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Email ID:
              <input
              className="st805"
                type="text"
                value={authorised_signatory_emailid}
                onChange={(event) => setAuthorised_signatory_emailid(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Name of manufacturing factory:
              <input
              className="st805"
                type="text"
                value={Authorised_name_of_manufacturing_factory}
                onChange={(event) => setAuthorised_name_of_manufacturing_factory(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Address of factory:
              <input
              className="st805"
                type="text"
                value={Authorised_address_of_factory}
                onChange={(event) => setAuthorised_address_of_factory(event.target.value)}
                required
              />
              </label>


            <h802>Foreign Manufacture:</h802>
            <label className="st8012">
              Company Name:
              <input
              className="st805"
                type="text"
                value={foreign_manufacturer_company_name}
                onChange={(event) => setForeign_manufacturer_company_name(event.target.value)}
                
              />
            </label>
            <label className="st8012">
              Company Address:
              <input
              className="st805"
                type="text"
                value={foreign_manufacturer_company_address}
                onChange={(event) => setForeign_manufacturer_company_address(event.target.value)}
        
              />
            </label>
            <label className="st8012">
              Authorized Signatory Name:
              <input
              className="st805"
                type="text"
                value={foreign_manufacturer_authorised_signatory_name}
                onChange={(event) => setForeign_manufacturer_authorised_signatory_name(event.target.value)}
          
              />
            </label>
            <label className="st8012">
              Authorized Signatory Designation:
              <input
              className="st805"
                type="text"
                value={foreign_manufacturer_authorised_signatory_designation}
                onChange={(event) => setForeign_manufacturer_authorised_signatory_designation(event.target.value)}
          
              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
              className="st805"
                type="number"
                value={foreign_manufacturer_contact_number}
                onChange={(event) => setForeign_manufacturer_contact_number(event.target.value)}
            
              />
            </label>
            <label className="st8012">
              Email ID:
              <input
              className="st805"
                type="text"
                value={foreign_manufacturer_emailid}
                onChange={(event) => setForeign_manufacturer_emailid (event.target.value)}
           
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
