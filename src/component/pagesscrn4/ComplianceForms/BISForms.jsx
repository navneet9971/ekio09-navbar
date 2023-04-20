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
 

  const notifyData = [
    { "s.no": '1', notifaction: 'Mobile', Date: '2022-02-01', linked: 'In Progress' },
    { "s.no": '2', notifaction: 'Screen', Date: '2022-02-02', linked: 'Completed' },
    { "s.no": '3', notifaction: 'Chipset', Date: '2022-02-03', linked: 'Pending' },
  ];

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
      <div className= "notify" >
      <div className="notify-btnn1">
      <button7  onClick={() => setButtonPopup2(true)}>Notification</button7>
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
  const [company_email, setCompany_email] = useState("");
  const [company_name_of_contact_person, setCompany_name_of_contact_person] = useState("");
  const [company_designation, setCompany_designation] = useState("");
  const [company_mobile_number, setCompany_mobile_number] = useState("");
  const [company_manufacturing_unit_name, setCompany_manufacturing_unit_name] = useState("");
  const [company_address, setCompany_address] = useState("");
  const [company_country, setCompany_country] = useState("");
  const [company_state, setCompany_state] = useState("");
  const [company_zipcode, setCompany_zipcode] = useState("");
  const [company_contact_number, setCompany_contact_number] = useState("");
  const [top_management_of_the_manufacturing_unit_name_1, setTop_management_of_the_manufacturing_unit_name_1] = useState("");
  const [top_management_of_the_manufacturing_unit_name_2, setTop_management_of_the_manufacturing_unit_name_2] = useState("");
  const [top_management_of_the_manufacturing_unit_name_3, setTop_management_of_the_manufacturing_unit_name_3] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_1, setTop_management_of_the_manufacturing_unit_designation_1] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_2, setTop_management_of_the_manufacturing_unit_designation_2] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_3, setTop_management_of_the_manufacturing_unit_designation_3] = useState("");
  const [technical_management_of_the_manufacturing_unit_name_1, setTechnical_management_of_the_manufacturing_unit_name_1] = useState("");
  const [technical_management_of_the_manufacturing_unit_name_2, setTechnical_management_of_the_manufacturing_unit_name_2] = useState("");
  const [technical_management_of_the_manufacturing_unit_name_3, setTechnical_management_of_the_manufacturing_unit_name_3] = useState("");
  const [technical_management_of_the_manufacturing_unit_designation_1, setTechnical_management_of_the_manufacturing_unit_designation_1] = useState("");
  const [technical_management_of_the_manufacturing_unit_designation_2, setTechnical_management_of_the_manufacturing_unit_designation_2] = useState("");
  const [technical_management_of_the_manufacturing_unit_designation_3, setTechnical_management_of_the_manufacturing_unit_designation_3] = useState("");
  const [contact_person_of_the_manufacturing_unit_name_1, setContact_person_of_the_manufacturing_unit_name_1] = useState("");
  const [contact_person_of_the_manufacturing_unit_name_2, setContact_person_of_the_manufacturing_unit_name_2] = useState("");
  const [contact_person_of_the_manufacturing_unit_name_3, setContact_person_of_the_manufacturing_unit_name_3] = useState("");
  const[contact_person_of_the_manufacturing_unit_designation_1, setContact_person_of_the_manufacturing_unit_designation_1] =useState("");
  const[contact_person_of_the_manufacturing_unit_designation_2, setContact_person_of_the_manufacturing_unit_designation_2] =useState("");
  const[contact_person_of_the_manufacturing_unit_designation_3, setContact_person_of_the_manufacturing_unit_designation_3] =useState("");
  const [name_of_the_AIR_company, setName_of_the_AIR_company] = useState("");
  const [address_of_the_AIR_company, setAddress_of_the_AIR_company] = useState("");
  const [authorized_signatory_name, setAuthorized_signatory_name ] = useState("");
  const [aIR_Designation, setAIR_Designation ] = useState("");
  const [aIR_Phone_number, setAIR_Phone_number ] = useState("");
  const [aIR_Emailid, setAIR_Emailid ] = useState("");
  const [nomination_signing_auth_name, setNomination_signing_auth_name ] = useState("");
  const [nomination_designation, setNomination_designation ] = useState("");
  const [nomination_factory_name, setNomination_factory_name ] = useState("");
  const [nomination_address, setNomination_address ] = useState("");
  const [nomination_contact_number, setNomination_contact_number ] = useState("");
  const [nomination_email, setNomination_email ] = useState("");
  const [nomination_AIR_company_name, setNomination_AIR_company_name ] = useState("");
  const [nomination_AIR_company_address, setNomination_AIR_company_address ] = useState("");
  const [nomination_AIR_company_contact_number, setNomination_AIR_company_contact_number ] = useState("");
  const [nomination_AIR_company_email, setNomination_AIR_company_email ] = useState("");
  const [brand_owner_company_name_and_address, setBrand_owner_company_name_and_address ] = useState("");
  const [manufacture_name_and_address, setManufacture_name_and_address ] = useState("");
  const [brand_Product, setBrand_Product ] = useState("");
  const [brand_name, setBrand_name ] = useState("");
  const [models_for_the_Product, setModels_for_the_Product ] = useState("");
  const [brand_auth_owner_signing_person_name, setBrand_auth_owner_signing_person_name ] = useState("");
  const [brand_auth_designation, setBrand_auth_designation ] = useState("");
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


// Start Applicatioon Form----------------------------------------------------
  return (
    <div>
      <div className="header-btn">
      <button10 onClick={() => setButtonPopup5(true)}>Start New Application</button10>
      </div>

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
                value={company_email}
                onChange={(event) => setCompany_email(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Name of Contact Person:
              <input
              className="st805"
                type="text"
                value={company_name_of_contact_person}
                onChange={(event) => setCompany_name_of_contact_person(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={company_designation}
                onChange={(event) => setCompany_designation(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Mobile NO:
              <input
              className="st805"
                type="number"
                value={company_mobile_number}
                onChange={(event) => setCompany_mobile_number(event.target.value)}
                required
              />
              </label>
               <label className="st8012">
              Manufacturing Unit Name:
              <input
              className="st805"
                type="text"
                value={company_manufacturing_unit_name}
                onChange={(event) => setCompany_manufacturing_unit_name(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address:
              <input
              className="st805"
                type="text"
                value={company_address}
                onChange={(event) => setCompany_address(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Country:
              <input
              className="st805"
                type="text"
                value={company_country}
                onChange={(event) => setCompany_country(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              State/Province:
              <input
              className="st805"
                type="text"
                value={company_state}
                onChange={(event) => setCompany_state(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Zip Code:
              <input
              className="st805"
                type="text"
                value={company_zipcode}
                onChange={(event) => setCompany_zipcode(event.target.value)}
                required
              />
              </label>
              <label className="st8012">
              Contact No:
              <input
              className="st805"
                type="text"
                value={company_contact_number}
                onChange={(event) => setCompany_contact_number(event.target.value)}
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
        <input className="st805" type="text" 
        value={top_management_of_the_manufacturing_unit_name_1} 
        onChange={(event) => setTop_management_of_the_manufacturing_unit_name_1(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        2
        <input className="st805" type="text"
         value={top_management_of_the_manufacturing_unit_name_2} 
         onChange={(event) => setTop_management_of_the_manufacturing_unit_name_2(event.target.value)} 
         required />
      </label>
      <label className="st8012">
        3
        <input className="st805" type="text" 
        value={top_management_of_the_manufacturing_unit_name_3} 
        onChange={(event) => setTop_management_of_the_manufacturing_unit_name_3(event.target.value)} 
        required />
      </label>
    </div>
    <div className="designations">
      <h3 className="manufacunit1">Designation</h3>
      <label className="st8012">
        <input className="st805" type="text" 
        value={top_management_of_the_manufacturing_unit_designation_1} 
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_1(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        value={top_management_of_the_manufacturing_unit_designation_2} 
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_2(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        value={top_management_of_the_manufacturing_unit_designation_3} 
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_3(event.target.value)} 
        required />
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
        <input className="st805" type="text" 
        value={technical_management_of_the_manufacturing_unit_name_1} 
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_name_1(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        2
        <input className="st805" type="text" 
        value={technical_management_of_the_manufacturing_unit_name_2} 
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_name_2(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        3
        <input className="st805" type="text" 
        value={technical_management_of_the_manufacturing_unit_name_3}
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_name_3(event.target.value)} 
        required />
      </label>
    </div>
    <div className="designations">
      <h3 className="manufacunit1">Designation</h3>
      <label className="st8012">
        <input className="st805" type="text" 
        value={technical_management_of_the_manufacturing_unit_designation_1} 
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_designation_1(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        value={technical_management_of_the_manufacturing_unit_designation_2} 
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_designation_2(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        value={technical_management_of_the_manufacturing_unit_designation_3} 
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_designation_3(event.target.value)} 
        required />
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
        <input className="st805" type="text" 
        value={contact_person_of_the_manufacturing_unit_name_1} 
        onChange={(event) => setContact_person_of_the_manufacturing_unit_name_1(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        2
        <input className="st805" type="text" 
        value={contact_person_of_the_manufacturing_unit_name_2} 
        onChange={(event) => setContact_person_of_the_manufacturing_unit_name_2(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        3
        <input className="st805" type="text" 
        value={contact_person_of_the_manufacturing_unit_name_3}
         onChange={(event) => setContact_person_of_the_manufacturing_unit_name_3(event.target.value)} 
         required />
      </label>
    </div>
    <div className="designations">
      <h3 className="manufacunit1">Designation</h3>
      <label className="st8012">
        <input className="st805" type="text" 
        value={contact_person_of_the_manufacturing_unit_designation_1} 
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_1(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        value={contact_person_of_the_manufacturing_unit_designation_2} 
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_2(event.target.value)} 
        required />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        value={contact_person_of_the_manufacturing_unit_designation_3} 
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_3(event.target.value)} 
        required />
      </label>
    </div>
  </div>
</div>


        
            <label className="st8012">
              Name of the AIR Company:
              <input
              className="st805"
                type="text"
                value={name_of_the_AIR_company}
                onChange={(event) => setName_of_the_AIR_company(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address of the AIR Company:
              <input
              className="st805"
                type="text"
                value={address_of_the_AIR_company}
                onChange={(event) => setAddress_of_the_AIR_company(event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Authorized signatory Name:
              <input
              className="st805"
                type="text"
                value={authorized_signatory_name}
                onChange={(event) => setAuthorized_signatory_name (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={aIR_Designation}
                onChange={(event) => setAIR_Designation (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Phone Number:
              <input
              className="st805"
                type="text"
                value={aIR_Phone_number}
                onChange={(event) => setAIR_Phone_number (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Email id:
              <input
              className="st805"
                type="text"
                value={aIR_Emailid}
                onChange={(event) => setAIR_Emailid (event.target.value)}
                required
              />
            </label>


            <h802>Nomination Form</h802>
            <label className="st8012">
              Signing Auth name:
              <input
              className="st805"
                type="text"
                value={nomination_signing_auth_name}
                onChange={(event) => setNomination_signing_auth_name (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={nomination_designation}
                onChange={(event) => setNomination_designation (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
             Factory Name:
              <input
              className="st805"
                type="text"
                value={nomination_factory_name}
                onChange={(event) => setNomination_factory_name (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address:
              <input
              className="st805"
                type="text"
                value={nomination_address}
                onChange={(event) => setNomination_address (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact No:
              <input
              className="st805"
                type="text"
                value={nomination_contact_number}
                onChange={(event) => setNomination_contact_number (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
               Email:
              <input
              className="st805"
                type="text"
                value={nomination_email}
                onChange={(event) => setNomination_email (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              AIR company name:
              <input
              className="st805"
                type="text"
                value={nomination_AIR_company_name}
                onChange={(event) => setNomination_AIR_company_name  (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Address:
              <input
              className="st805"
                type="text"
                value={nomination_AIR_company_address}
                onChange={(event) => setNomination_AIR_company_address (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Contact No:
              <input
              className="st805"
                type="text"
                value={nomination_AIR_company_contact_number}
                onChange={(event) => setNomination_AIR_company_contact_number (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
             Email:
              <input
              className="st805"
                type="text"
                value={nomination_AIR_company_email}
                onChange={(event) => setNomination_AIR_company_email (event.target.value)}
                required
              />
            </label>


            <h802>Brand Auth</h802>
            <label className="st8012">
              Brand Owner's Comapany Name and Address:
              <input
              className="st805"
                type="text"
                value={brand_owner_company_name_and_address}
                onChange={(event) => setBrand_owner_company_name_and_address (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Manufacture Name and Address:
              <input
              className="st805"
                type="text"
                value={manufacture_name_and_address}
                onChange={(event) => setManufacture_name_and_address (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
             Product:
              <input
              className="st805"
                type="text"
                value={brand_Product}
                onChange={(event) => setBrand_Product (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Brand Name:
              <input
              className="st805"
                type="text"
                value={brand_name}
                onChange={(event) => setBrand_name (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Models for the Product:
              <input
              className="st805"
                type="text"
                value={models_for_the_Product}
                onChange={(event) => setModels_for_the_Product  (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
               Brand Owner Signing Person Name:
              <input
              className="st805"
                type="text"
                value={brand_auth_owner_signing_person_name}
                onChange={(event) => setBrand_auth_owner_signing_person_name (event.target.value)}
                required
              />
            </label>
            <label className="st8012">
              Designation:
              <input
              className="st805"
                type="text"
                value={brand_auth_designation}
                onChange={(event) => setBrand_auth_designation (event.target.value)}
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
