import React, { useState, useEffect } from 'react';
import "../Pages.css";
import Popup from "../popup/Popup";
import { TiTick } from "react-icons/ti";
import Multiselect from 'multiselect-react-dropdown';
import axiosInstance from '../../../interceptors/axios';

function MiddleSection() {
  // State variable
  const [middleData, setMiddleData] = useState("");

  // Effect hook to load data from local storage or API
  useEffect(() => {
    axiosInstance
      .get(`compliance/${localStorage.getItem("compliance_id")}`)
      .then((response) => {
        setMiddleData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Rendered components
  return (
    <div className="ftch data">
      {/* Middle section component */}
        {middleData && (
          <>
            <div className="introdu">
              <h398 className="cont">{middleData.product_name} - Introduction</h398>
              <h2 className="content">{middleData.content}</h2>
            </div>

            <h398 className= "regpro">{middleData.product_name} - Registration Process</h398>
              <img className="imgback" alt="flowchart" src={"https://eikomp.pythonanywhere.com" + middleData.flowchart} />
    

          </>
        )}
      </div>
  )
        };

// -------------Lab Testing Box Codes Here-------------------------------

function LabTestingBox() {
  const [buttonPopup, setButtonPopup] = useState(false);
  //const [buttonPopup1, setButtonPopup1] = useState(false);
  const [submitPopup] = useState(false);

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



return (
  <div className="lab-testing-box">
    <button className="button7" onClick={() => setButtonPopup(true)}>Request Testing</button>
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
     {/* <div className="header-btn">
      <button className="button7" onClick={() => setButtonPopup1(true)}>Status</button>
      </div>
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
      </Popup>*/}
              </div>
  );
}
 

// -------------------------------Document Box Codes here---------------------------------------------------

function DocumentBox() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [selectedFile] = useState(null);
  const [selectedOption] = useState('');
  const [documentType] = useState('');
  const [files, setFiles] = useState([]);
  const [options] = useState(['Signatory Authorization', 'OEM Authorization', 'MOU','Shareholding Pattern','Annexure 1', 'BOM', 'Non Applicability Proforma', 'Proforma Seeking Exemption' ]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles([...files, ...newFiles]);


    setButtonPopup(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting form with file:', selectedFile);
    console.log('Selected option:', selectedOption);

    const data = new FormData();
    data.append('application', 'your_application_value');
    data.append('compliance', 'your_compliance_value');
    data.append('document_type', documentType);
    if (selectedFile) {
      data.append('document', selectedFile);
    }
    
    axiosInstance.post(`/application/document/`, data)
      .then(response => {
        console.log("GOT Response = " + response);
        console.log(response.data);
        // Show success message and navigate to success page
        //const uploadedFileName = selectedFile ? selectedFile.name : files[files.length - 1].name;
        // navigate to success page
      })
      .catch(error => {
        console.log(error);
      });
  
    setButtonPopup(false);
  }


  const handleDownload = (event, form) => {
    event.preventDefault();
    console.log('Downloading file:', form);
  
    axiosInstance.get(`compliance-form/?compliance=BIS${form}`, {
      params: {
        document_type: form
      },
      responseType: 'blob',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
        'accept': 'application/json',
      }
    })
    .then(response => {
      console.log(response.data);
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${form}.docx`);
  
      // Add the link element to the document and trigger the download
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => {
      console.log(error);
    });
  
    setButtonPopup1(false);
  }
  

 // -------------------------------Document Box Codes here---------------------------------------------------
  return (
    <div className="document-box">
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
       
        <h3>Upload a File</h3>
          <div className='upload-form1'>
            <label htmlFor="file-input">
              <h4>Choose File:</h4>
            </label>
            <input className="upload-file-input" type="file" accept=".pdf,.jpg,.jpeg" onChange={handleFileChange} />
          </div>
          
          
            <div className='upload-form2'>
            {files.length > 0 && (
              <div>
                <ul>
                  {files.map((file, index) => (
                    <li key={index}>{file.name} <TiTick size={24} /></li>
                  ))}
                </ul>
              </div>
            )}
            <div className='upload-buttons'>
              <button className="button8" onClick={() => {
                    setButtonPopup(false);
                      setFiles([]);
                      }}>Cancel</button>
              <button className="button8" type="submit" onClick={handleSubmit}>Upload</button>
            </div>
            
            </div>
      </Popup>
      <div className="header-btn">
      <button className="button7" onClick={() => setButtonPopup(true)}>Upload</button>
      </div>
       

               {/*DOWNLOAD BUTTON POPUP SECTION */}

               <div className="header-btn1">
                    <button className="button7" onClick={() => setButtonPopup1(true)}>Download</button>
                </div>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
          <h3>Download a File</h3>
          <label>
            <h4>Select a file to download:</h4>
            <div className='download-form1'>
              <Multiselect
              isObject={false}
              options={ options }
              onRemove={(event)=> { console.log(event) }}
              onSelect={ (event)=> { console.log(event) }}
              showCheckbox
              />
            </div>
          </label>
          <div>
            <button className="button8" type="submit" onClick={handleDownload}>Download</button>
          </div>
      </Popup>
{/*
      <div className="header-btn">
      <button className="button7" onClick={viewDocument}>View</button>
                  </div> */}

    </div>
  );
}

// Video Section Codes Here----------------------------------------

function Thirdpage() {
 // const [videoUrl, setVideoUrl] = useState('');
 // const [isWishlisted, setIsWishlisted] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [notifyData] = useState([
    { "s.no": '1', category: 'Mobile', Title: 'SAMSUNG', external: 'In Progress', date: '02-12-2023' },
    { "s.no": '2', category: 'Screen', Title: 'APPLE', external: 'Completed', date: '02-12-2023' },
    { "s.no": '3', category: 'Chipset', Title: 'SAMSUNG', external: 'Pending', date: '02-12-2023' },
  ]);

// Video Section Codes Here---or Section-----
  return (
    <div className="app55"> 
        <Startapp />
        <LabTestingBox />
        <DocumentBox />
    {/*  <div>
        <button className = "wishlist" 
        onClick={handleWishlistClick}>
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
      <div className="video-box55">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
  </div> */}
        <MiddleSection/>

{/*------------------Notify Section -----------------------*/}
      <div className= "notifyy" >
     
      <button className="button7"  onClick={() => setButtonPopup2(true)}>Notification</button>

      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <div>
          <h3 className='notif'>Notification</h3>
          <table>
  <thead>
    <tr>
      <th>S.No</th>
      <th>Category</th>
      <th>Title</th>
      <th>External Link/Filepath</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {notifyData.map((data, index) => (
      <tr key={index}>
        <td>{data["s.no"]}</td>
        <td>{data.category}</td>
        <td>{data.Title}</td>
        <td onClick={() => window.open(data.external)} style={{cursor: 'pointer'}}>{data.external}</td>
        <td>{data.date}</td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </Popup>
      </div>
      <div1 class="vl"></div1>  
    </div>
  )
 };

    // Start Applicatioon Form

function Startapp() {
 // state variables to store form data
 const [types_of_company, setTypes_of_company] = useState("");
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
     <button className='button10' onClick={() => setButtonPopup5(true)}>Start New Application</button>
     <Popup trigger={buttonPopup5} setTrigger={setButtonPopup5}>
       <div style={{ height: "500px", overflow: "scroll" }}>
         <h801></h801>
         <form onSubmit={handleSubmit}>
        
           <h802>Applicant Company:</h802>
           <label className="st8012">
         Indian OEM/Foreign Manufacture:
             <input
               className="st805"
               type="text"
               value={types_of_company}
               onChange={(event) => setTypes_of_company(event.target.value)}
               required
             />
           </label>
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