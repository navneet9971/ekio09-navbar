import React, { useState, useEffect } from 'react';
import "../Pages.css";
import Popup from "../popup/Popup";
//import { TiTick } from "react-icons/ti";
import Multiselect from 'multiselect-react-dropdown';
import axiosInstance from '../../../interceptors/axios';

function MiddleSection() {
  // State variable
  const [middleData, setMiddleData] = useState("");
  const [applicationId, setNewApplicationId] = useState();

  useEffect(() => {
    axiosInstance
      .get(`compliance/${localStorage.getItem("compliance_id")}`)
      .then((response) => {
        setMiddleData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });


    axiosInstance
      .post(`application/form/`, {
        category: localStorage.getItem("category"),
        product: localStorage.getItem("product"),
      })
      .then((response) => {
        const id = response.data.data['id'];
        setNewApplicationId(id);
        localStorage.setItem("newApplicationId", id); // store id in localStorage
        console.log(id)
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
          <h1 style={{ display: 'none' }}>Application Number: {applicationId}</h1>
            <h398 className="cont">{middleData.product_name} - Introduction</h398>
            <h2 className="content">{middleData.content}</h2>
          </div>

          <h398 className="regpro">{middleData.product_name} - Registration Process</h398>
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
  //const [testingSoftware, setTestingSoftware] = useState("");
  const [testingTechnicalsupportName, setTestingTechnicalsupportName] = useState("");
  const [testingTechnicalsuppoertNumber, setTestingTechnicalsuppoertNumber] = useState("");
  const [manufacturingProductName, setManufacturingProductName] = useState("");
  const [manufacturingModelNo, setManufacturingModelNo] = useState("");
  const [manufacturingAssociatedModels, setManufacturingAssociatedModels] = useState("");
  const [manufacturingManufacturingName, setManufacturingManufacturingName] = useState("");
  const [manufacturingManufacturingAddress, setManufacturingManufacturingAddress] = useState("");
  const [manufacturingManufacturingCountry, setManufacturingManufacturingCountry] = useState("");
  const [manufacturingContactName, setManufacturingContactName] = useState("");
  const [manufacturingContactNumber, setManufacturingContactNumber] = useState("");
  const [manufacturingContactEmail, setManufacturingContactEmail] = useState("");
  const [manufacturingOrigin, setManufacturingOrigin] = useState("");
  const [manufacturingContract, setManufacturingContract] = useState("");
  const [cdfccl, setCdfccl] = useState("");
  const [usermanual, setUsermanual] = useState("");
  const [circuitdiagram, setCircuitdiagram] = useState("");
  const [pcblayout, setPcblayout] = useState("");
  const [softwareuser, setSoftwareuser] = useState("");


  
  //APIS Form DATA
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('application', localStorage.getItem('newApplicationId'));
    formData.append('compliance', localStorage.getItem("compliance_id"));
    formData.append('request_for', 'lab testing');
    formData.append("testingApplicantName", testingApplicantName);
    formData.append("testingAddress", testingAddress);
    formData.append("testingOEMName", testingOEMName);
    formData.append("testingOEMAddress", testingOEMAddress);
    formData.append("testingProductName", testingProductName);
    formData.append("testingModelNo", testingModelNo);
    formData.append("testingAssociated", testingAssociated);
    formData.append("testingHardwareNumber", testingHardwareNumber);
    formData.append("testingSoftwareNumber", testingSoftwareNumber);
    formData.append("testingBrand", testingBrand);
    formData.append("testingSr", testingSr);
    formData.append("testingElectrical", testingElectrical);
    formData.append("testingProductType", testingProductType);
    formData.append("testingProductUse", testingProductUse);
   // formData.append("testingSoftware", testingSoftware);
    formData.append("testingTechnicalsupportName", testingTechnicalsupportName);
    formData.append("testingTechnicalsuppoertNumber", testingTechnicalsuppoertNumber);
    formData.append("manufacturingProductName", manufacturingProductName);
    formData.append("manufacturingModelNo", manufacturingModelNo);
    formData.append("manufacturingAssociatedModels", manufacturingAssociatedModels);
    formData.append("manufacturingManufacturingName", manufacturingManufacturingName);
    formData.append("manufacturingManufacturingAddress", manufacturingManufacturingAddress);
    formData.append("manufacturingManufacturingCountry", manufacturingManufacturingCountry);
    formData.append("manufacturingContactName", manufacturingContactName);
    formData.append("manufacturingContactNumber", manufacturingContactNumber);
    formData.append("manufacturingContactEmail", manufacturingContactEmail);
    formData.append("manufacturingOrigin", manufacturingOrigin);
    formData.append("manufacturingContract", manufacturingContract);


      // Add file to form data
      
      if (cdfccl) {
        for (let i = 0; i < cdfccl.length; i++) {
          formData.append('documents', cdfccl[i]);
        }
      }
      if (usermanual) {
        for (let i = 0; i < usermanual.length; i++) {
          formData.append('documents', usermanual[i]);
        }
      }
      if (circuitdiagram) {
        for (let i = 0; i < circuitdiagram.length; i++) {
          formData.append('documents', circuitdiagram[i]);
        }
      }
      if (pcblayout) {
        for (let i = 0; i < pcblayout.length; i++) {
          formData.append('documents', pcblayout[i]);
        }
      }
      if (softwareuser) {
        for (let i = 0; i < softwareuser.length; i++) {
          formData.append('documents', softwareuser[i]);
        }
      }

    console.log('Application ID:', localStorage.getItem('newApplicationId'));
    console.log('Compliance ID:', localStorage.getItem("compliance_id"));

    // function to handle form submission
    axiosInstance.post('/application/compliance/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }
  



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
                onChange={(event) => setTestingApplicantName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Address:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingAddress(event.target.value)}

              />
            </label>
            <label className="st8012">
              OEM Name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingOEMName(event.target.value)}

              />
            </label>
            <label className="st8012">
              OEM Address:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingOEMAddress(event.target.value)}

              />
            </label>
            <label className="st8012">
              Product Name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingProductName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Model No:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingModelNo(event.target.value)}

              />
            </label>
            <label className="st8012">
              Associated Models (if any):
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingAssociated(event.target.value)}

              />
            </label>
            <label className="st8012">
              Hardware Number:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingHardwareNumber(event.target.value)}

              />
            </label>
            <label className="st8012">
              Software Number	:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingSoftwareNumber(event.target.value)}

              />
            </label>
            <label className="st8012">
              Brand:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingBrand(event.target.value)}

              />
            </label>
            <label className="st8012">
              Sr. No:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingSr(event.target.value)}

              />
            </label>
            <label className="st8012">
              Electrical Rating:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingElectrical(event.target.value)}

              />
            </label>
            <label className="st8012">
              Product Type (Fixed/Industrial/Portable/other):
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingProductType(event.target.value)}

              />
            </label>
            <label className="st8012">
              Product Use (Indoor/Outdoor/other):
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingProductUse(event.target.value)}

              />
            </label>
            <label className="st8012">
              Filled CDF/CCl (Format attached):
              <input classname="stup805" type="file"   onChange={(event) => setCdfccl(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              Complete User Manual:
              <input classname="stup805" type="file"  onChange={(event) => setUsermanual(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              Circuit Diagram:
              <input classname="stup805" type="file"  onChange={(event) => setCircuitdiagram(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              PCB Layout:
              <input classname="stup805" type="file"  onChange={(event) => setPcblayout(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              Software used (if any):
              <input classname="stup805" type="file"  onChange={(event) => setSoftwareuser(event.target.files)} multiple accept />
            </label>
           
            <label className="st8012">
              Technical support person name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingTechnicalsupportName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Technical support person contact number:
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingTechnicalsuppoertNumber(event.target.value)}

              />
            </label>


            <h805>Manufacturing Location Information:</h805>
            <label className="st8012">
              Product Name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingProductName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Model No:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingModelNo(event.target.value)}

              />
            </label>
            <label className="st8012">
              Associated Models:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingAssociatedModels(event.target.value)}

              />
            </label>
            <label className="st8012">
              Manufacturer Name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingManufacturingName(event.target.value)}
              />
            </label>

          <label className="st8012">
            Manufacturer Address:
            <input
            className="st805"
              type="text"
              onChange={(event) => setManufacturingManufacturingAddress(event.target.value)}
            />
          </label>
            <label className="st8012">
              Manufacturer Country:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingManufacturingCountry(event.target.value)}

              />
            </label>

            <label className="st8012">
              Contact Person Name:
              <input
                className="st805"
                type="text" 
                onChange={(event) => setManufacturingContactName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Person's Number:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingContactNumber(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Person's Email Id:
              <input
                className="st805"
                type="text" 
                onChange={(event) => setManufacturingContactEmail(event.target.value)}

              />
            </label>
            <label className="st8012">
              Country of Origin:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingOrigin(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contract Manufacturing(Yes/No):
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturingContract(event.target.value)}

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
  const [documentType, setDocumentType] = useState('');
  const [options] = useState(['Signatory Authorization', 'OEM Authorization', 'MOU', 'Shareholding Pattern', 'Annexure 1', 'BOM', 'Non Applicability Proforma', 'Proforma Seeking Exemption']);
  const [document] = useState(null);
  const [uploades ,setUploades] = useState('');
  const applicationID = localStorage.getItem('newApplicationId');
  const compliance = localStorage.getItem('compliance_id');

  
  function handleUpload() {
    const formData = new FormData();
  
    for (let i = 0; i < uploades.length; i++) {
      formData.append('document', uploades[i]);
    }
    formData.append('application', applicationID);
    formData.append('compliance', compliance);
    formData.append('document_type', documentType);
    formData.append('status', 'sumbitted');

    console.log(applicationID)
    console.log(compliance)
    console.log(documentType)
  
    axiosInstance.post(`application/document/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
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

        <div>
      <div>
        <input type ="file" name="file" onChange={(e) => setUploades(e.target.files)} accept/>
      </div>
      <div>
        <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
          <option value="">Select Document Type</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleUpload}>UPLOAD</button>
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
              options={options}
              onRemove={(event) => { console.log(event) }}
              onSelect={(event) => { console.log(event) }}
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
      <MiddleSection />

      {/*------------------Notify Section -----------------------*/}
      <div className="notifyy" >

        <button className="button7" onClick={() => setButtonPopup2(true)}>Notification</button>

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
                    <td onClick={() => window.open(data.external)} style={{ cursor: 'pointer' }}>{data.external}</td>
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
  const [foreignEmailID, setForeignEmailID] = useState("");
  const [coiApplicant, setCoiApplicant] = useState("");
  const [panCard, setPanCard] = useState("");
  const [moa, setMoa] = useState("");
  const [aoa, setAoa] = useState("");
  const [shareholding, setShareholding] = useState("");
  const [authorizationletter, setAuthorizationletter] = useState("");
  const [mouApplicantOem, setMouApplicantOem] = useState("");
  const [aIRAuthorizationLetter, setAIRAuthorizationLetter] = useState("");
  const [buttonPopup5, setButtonPopup5] = useState(false);



  //handle from sumit here----------------------

  const handleSubmit = (event) => {
    event.preventDefault();

     const formData = new FormData();
  formData.append('application', localStorage.getItem('newApplicationId'));
  formData.append('compliance', localStorage.getItem("compliance_id"));
  formData.append('request_for', 'certification');
  formData.append('types_of_company', types_of_company);
  formData.append('applicantCompanyName', applicantCompanyName);
  formData.append('applicantCompanyAddress', applicantCompanyAddress);
  formData.append('applicantDirectorName', applicantDirectorName);
  formData.append('applicantContactNumber', applicantContactNumber);
  formData.append('applicantEmailID', applicantEmailID);
  formData.append('applicantAuthorisedSignatoryName', applicantAuthorisedSignatoryName);
  formData.append('applicantAuthorisedSignatoryDesignation', applicantAuthorisedSignatoryDesignation);
  formData.append('applicantContactNumber1', applicantContactNumber1);
  formData.append('applicantEmailID1', applicantEmailID1);
  formData.append('applicantNameofmanufacturingfactory', applicantNameofmanufacturingfactory);
  formData.append('applicantAddressoffactory', applicantAddressoffactory);
  formData.append('foreignCompanyName', foreignCompanyName);
  formData.append('foreignCompanyAddress', foreignCompanyAddress);
  formData.append('foreignAuthorizedSignatoryName', foreignAuthorizedSignatoryName);
  formData.append('foreignAuthorizedSignatoryDesignation', foreignAuthorizedSignatoryDesignation);
  formData.append('foreignContactNumber', foreignContactNumber);
  formData.append('foreignEmailID', foreignEmailID);

  // Add the selected file to the form data
  if (coiApplicant) {
    for (let i = 0; i < coiApplicant.length; i++) {
      formData.append('documents', coiApplicant[i]);
    }
  }
  if (panCard) {
    for (let i = 0; i < panCard.length; i++) {
      formData.append('documents', panCard[i]);
    }
  }
  if (moa) {
    for (let i = 0; i < moa.length; i++) {
      formData.append('documents', moa[i]);
    }
  }
  if (aoa) {
    for (let i = 0; i < aoa.length; i++) {
      formData.append('documents', aoa[i]);
    }
  }
  if (shareholding) {
    for (let i = 0; i < shareholding.length; i++) {
      formData.append('documents', shareholding[i]);
    }
  }
  if (authorizationletter) {
    for (let i = 0; i < authorizationletter.length; i++) {
      formData.append('documents', authorizationletter[i]);
    }
  }
  if (mouApplicantOem) {
    for (let i = 0; i < mouApplicantOem.length; i++) {
      formData.append('documents', mouApplicantOem[i]);
    }
  }
  if (aIRAuthorizationLetter) {
    for (let i = 0; i < aIRAuthorizationLetter.length; i++) {
      formData.append('documents', aIRAuthorizationLetter[i]);
    }
  }

    /*  if (image) {
        formData.append('documents', image, image.name);
      }
  
      if (pdf) {
        formData.append('documents', pdf, pdf.name);
      }  */
    
    console.log(formData)
    console.log('Application ID:', localStorage.getItem('newApplicationId'));
    console.log('Compliance ID:', localStorage.getItem("compliance_id"));

    // function to handle form submission
    axiosInstance.post('/application/compliance/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  }


  return (
    <div>
      <button className='button10' onClick={() => setButtonPopup5(true)}>Start New Application</button>
      <Popup trigger={buttonPopup5} setTrigger={setButtonPopup5}>
        <div style={{ height: "500px", overflow: "scroll" }}>
          <h801></h801>
          <form onSubmit={handleSubmit}>


      {/*      <div className="compliance-container" style={{ display: 'none' }}>
              <h2>Compliance Data</h2>
              <div>
                <p>Application ID: {localStorage.getItem('newApplicationId') || "No application created yet"}</p>
                <p>Compliance ID: {localStorage.getItem("compliance_id") || "No compliance selected yet"}</p>
                <p>Request For: certification</p>
              </div>
  </div> */}


            <h802>Applicant Company:</h802>
            <label className="st8012">
              Indian OEM/Foreign Manufacture:
              <input
                className="st805"
                type="text"

                onChange={(event) => setTypes_of_company(event.target.value)}

              />
            </label>
            <label className="st8012">
              Company Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantCompanyName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Company Address:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantCompanyAddress(event.target.value)}

              />
            </label>
            <label className="st8012">
              Director Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantDirectorName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
                className="st805"
                type="number"

                onChange={(event) => setApplicantContactNumber(event.target.value)}

              />
            </label>
            <label className="st8012">
              Email ID:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantEmailID(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorised Signatory Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantAuthorisedSignatoryName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorised Signatory Designation:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantAuthorisedSignatoryDesignation(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
                className="st805"
                type="number"

                onChange={(event) => setApplicantContactNumber1(event.target.value)}

              />
            </label>
            <label className="st8012">
              Email ID:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantEmailID1(event.target.value)}

              />
            </label>
            <label className="st8012">
              Name of manufacturing factory:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantNameofmanufacturingfactory(event.target.value)}

              />
            </label>
            <label className="st8012">
              Address of factory:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantAddressoffactory(event.target.value)}

              />
            </label>


            <h802>Foreign Manufacture:</h802>
            <label className="st8012">
              Company Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignCompanyName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Company Address:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignCompanyAddress(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorized Signatory Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignAuthorizedSignatoryName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorized Signatory Designation:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignAuthorizedSignatoryDesignation(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
                className="st805"
                type="number"

                onChange={(event) => setForeignContactNumber(event.target.value)}

              />
            </label>
            <label className="st8012">
              Email ID:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignEmailID(event.target.value)}

              />
            </label>


            <h802>Document Required:</h802>
            <label className="st8012">
              COI of Applicant Company:
              <input classname="stup805" type="file" onChange={(event) => setCoiApplicant(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              PAN Card of Applicant Company:
              <input classname="stup805" type="file" onChange={(event) => setPanCard(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              MOA:
              <input classname="stup805" type="file"  onChange={(event) => setMoa(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
              AOA:
              <input classname="stup805" type="file" onChange={(event) => setAoa(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              Shareholding Pattern:
              <input classname="stup805" type="file"  onChange={(event) => setShareholding(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
              Authorization letter:
              <input classname="stup805" type="file"  onChange={(event) => setAuthorizationletter(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
              MOU between Applicant & OEM:
              <input classname="stup805" type="file"  onChange={(event) => setMouApplicantOem(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
              AIR Authorization Letter for Appliicant:
              <input classname="stup805" type="file"  onChange={(event) => setAIRAuthorizationLetter(event.target.files)} multiple accept/>
            </label>
            <button className='btn808' type="submit">Submit</button>
          </form>
        </div>
      </Popup>
    </div>
  );
};

export default Thirdpage;