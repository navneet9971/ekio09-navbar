import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

    // state variables to store form data
    const [testingManufacturernameaddress, setTestingManufacturernameaddress] = useState("");
    const [testingTestitemdescription, setTestingTestitemdescription] = useState("");
    const [testingTradeMark, setTestingTradeMark] = useState("");
    const [testingModelTypereference, setTestingModelTypereference] = useState("");
    const [testingRatedcurrentRatedvoltage, setTestingRatedcurrentRatedvoltage] = useState("");
    const [testingOverallsize, setTestingOverallsize] = useState("");
    const [testingMassoftheequipment, setTestingMassoftheequipment] = useState("");
    const [testingSeriesModel, setTestingSeriesModel] = useState("");
    const [testingSimilarities, setTestingSimilarities] = useState("");
    const [testingDifferences, setTestingDifferences] = useState("");
    const [testingWorstCase, setTestingWorstCase] = useState("");
    const [testingMaxAccessoriesused, setTestingMaxAccessoriesused] = useState("");
    const [testingModelsamplesubmittedfortesting, setTestingModelsamplesubmittedfortesting] = useState("");
    

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: handle form submission logic
  };
 
// -------------Lab Testing Box Codes Here-------------------------------
// TESTING BUTTON CODE HERE !!!!!!!!!!!

  return (
    <div className="lab-testing-box">
            <div className="header-btn">
      <button7 onClick={() => setButtonPopup(true)}>Request Testing</button7>
      </div>

      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <div style={{ height: "500px", overflow: "scroll" }}>
          <h801>Testing Details</h801>
          <form onSubmit={handleSubmit}>
            <label className="st8012">
            Manufacturer’s name & Address:
              <input
                className="st805"
                type="text"
                value={testingManufacturernameaddress}
                onChange={(event) => setTestingManufacturernameaddress(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
            Test item description:
              <input
              className="st805"
                type="text"
                value={testingTestitemdescription}
                onChange={(event) => setTestingTestitemdescription(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
            Trade Mark:
              <input
              className="st805"
                type="text"
                value={testingTradeMark}
                onChange={(event) => setTestingTradeMark(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
            Model/Type reference:
              <input
              className="st805"
                type="text"
                value={testingModelTypereference}
                onChange={(event) => setTestingModelTypereference(event.target.value)}
                required
              />
              </label>
               <label className="st8012">
               Rated current (A) / Rated voltage (V):
              <input
              className="st805"
                type="text"
                value={testingRatedcurrentRatedvoltage}
                onChange={(event) => setTestingRatedcurrentRatedvoltage(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
            Overall size of the equipment :
              <input
              className="st805"
                type="text"
                value={testingOverallsize}
                onChange={(event) => setTestingOverallsize(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Mass of the equipment (kg):
              <input
              className="st805"
                type="text"
                value={testingMassoftheequipment}
                onChange={(event) => setTestingMassoftheequipment(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Series  Model:
              <input
              className="st805"
                type="text"
                value={testingSeriesModel}
                onChange={(event) => setTestingSeriesModel(event.target.value)}
                required
              />
              </label>

              <h3 className='model'>Models included in this series</h3>
              <label className="st8012">
              Similarities:
              <input
              className="st805"
                type="text"
                value={testingSimilarities}
                onChange={(event) => setTestingSimilarities(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Differences:
              <input
              className="st805"
                type="text"
                value={testingDifferences}
                onChange={(event) => setTestingDifferences(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Worst Case:
              <input
              className="st805"
                type="text"
                value={testingWorstCase}
                onChange={(event) => setTestingWorstCase(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Max.  Accessories used:
              <input
              className="st805"
                type="text"
                value={testingMaxAccessoriesused}
                onChange={(event) => setTestingMaxAccessoriesused(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Model / sample submitted for testing:
              <input
              className="st805"
                type="text"
                value={testingModelsamplesubmittedfortesting}
                onChange={(event) => setTestingModelsamplesubmittedfortesting(event.target.value)}
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
      <button7 onClick={() => setButtonPopup1(true)}>Status</button7>
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



 // -------------------------------Document Box Codes here---------------------------------------------------
  return (
    <div className="document-box">
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
        <h3>Upload a File</h3>
          <div className='upload-form1'>
            <label htmlFor="file-input">
              <h4>Choose File:</h4>
            </label>
            <input className="upload-file-input" type="file" accept="application/pdf"  multiple onChange={handleFileChange} />
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
              <label>
              <h4>Select an Option:</h4>
              <div className='upload-form3'>
                <Multiselect 
                isObject={false}
                options={ options }
                onRemove={(event)=> { console.log(event) }}
                onSelect={ (event)=> { console.log(event) }}
                showCheckbox
                />
              </div>
              
            
            </label>
            <div className='upload-buttons'>
              <button8 onClick={() => {
                    setButtonPopup(false);
                      setFiles([]);
                      }}>Cancel</button8>
              <button8 type="submit">Upload</button8>
            </div>
            
            </div>
          
        </form>
      </Popup>
      <div className="header-btn">
      <button7 onClick={() => setButtonPopup(true)}>Upload</button7>
      </div>
       

               {/*DOWNLOAD BUTTON POPUP SECTION */}

               <div className="header-btn1">
                    <button7 onClick={() => setButtonPopup1(true)}>Download</button7>
                </div>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <form onSubmit={handleSubmit}>
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
            <button8 type="submit">Download</button8>
          </div>
        </form>
      </Popup>
{/*
      <div className="header-btn">
      <button7 onClick={viewDocument}>View</button7>
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
     
      <button7  onClick={() => setButtonPopup2(true)}>Notification</button7>

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
                  <td>{data.external}</td>
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