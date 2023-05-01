import React, { useState, useEffect } from "react";
//import jsPDF from 'jspdf';
import "../stepper.css";
import Popup from "../../pagesscrn4/popup/Popup";
import axiosInstance from "../../../interceptors/axios";
import Multiselect from 'multiselect-react-dropdown';
import { ReactComponent as Thum1png } from "../../assets/track-icon/reg.svg";
import { ReactComponent as Thum2png } from "../../assets/track-icon/testing.svg";
import { ReactComponent as Thum3png } from "../../assets/track-icon/AIR.svg";
import { ReactComponent as Thum4png } from "../../assets/track-icon/OEM.svg";
import { ReactComponent as Thum5png } from "../../assets/track-icon/BOM.svg";
import { ReactComponent as Thum6png } from "../../assets/track-icon/payment.svg";
import { ReactComponent as Thum7png } from "../../assets/track-icon/final.svg";
import { ReactComponent as Thum8png } from "../../assets/track-icon/certif.svg";
import { ReactComponent as Wrong } from "../../assets/trckpg-rb/wrong.svg";
import { ReactComponent as Right } from "../../assets/trckpg-rb/right.svg";
import file1png from "../../assets/pdficon/Green01.png";
import file2png from "../../assets/pdficon/Green02.png";
import file3png from "../../assets/pdficon/Green03.png";
import file4png from "../../assets/pdficon/Green04.png";
import file5png from "../../assets/pdficon/Red01.png";



function TECcompleted() {
   // const [currentStep] = useState(1);
  // const steps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Document pending with authorities", "Final report generated"];
   // const [current, setCurrentStep] = useState(1);
 //   const [setComplete] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [setSelectedOption] = useState('');
  const [docStatus, setDocStatus] = useState({});
  //const [startDate, setStartDate] = useState('');
  const [uniqueid, setUniqueid] = useState("");
  const [complianceid, setComplianceid] = useState("");
  const idel = localStorage.getItem('ide');
  const applicationID = localStorage.getItem('newApplicationId');
  const compliance = localStorage.getItem('compliance_id');
  const [documentType, setDocumentType] = useState('');
  const [uploades ,setUploades] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
  const [options] = useState(['Manufacturing details', 'Shareholding Pattern', 'Annexure 2 OEM authorized AIR', 'Annexure 3 MOU', 'Annex 1 Signatory authorization']); 
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [document] = useState(null);
   // const [startDate, setStartDate] = useState(null);
   // const [endDate, setEndDate] = useState(null);
  //  const [clickedColor, setClickedColor] = useState(false);
   // const [setClickedNext] = useState(false); // add state variable for tracking button click
   // const newSteps = ["Portal Registration", "Initation of testing", "AIR Regis", "Foreign OEM Registration", "BOM Submission", "Application Payment", "Final Submission", "Issuance of Cartification"];
  
//LAB TESTING FROM CONST HERE ---------------------------------------
const [buttonPopup2, setButtonPopup2] = useState(false);
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

// LAB TESTING FROM DATA HANDLE HERE WITH APIS ------------------------------
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



  /*  const calculateEndDate = () => {
      const currentDate = new Date();
      const endDate = new Date(currentDate.setDate(currentDate.getDate() + 45));
      setEndDate(endDate);
    
      const intervalId = setInterval(() => {
        const remainingTime = endDate.getTime() - new Date().getTime();
        if (remainingTime >= 0) {
          const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
          const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
          const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
          setEndDate({
            days: remainingDays,
            hours: remainingHours,
            minutes: remainingMinutes,
            seconds: remainingSeconds,
          });
        } else {
          clearInterval(intervalId);
        }
      }, 1000);
    }; */


  // API call to get document status
  useEffect(() => {
    axiosInstance.get(`application/compliance/${idel}/`)
      .then(response => {
        const data = response.data.data;
       const compliance_id = data["compliance"];
        const application_id = data["application"];
        const request_for = data["request_for"];

        // store local storage then show the values 
        setUniqueid(data["uniqueid"]);
        setComplianceid(data["compliance_name"])
    
        const compliancename = data["compliance_name"]
        localStorage.setItem("compliance_name", compliancename)
        
  //status APIs used 

        axiosInstance.get(`application/status/?compliance=${compliance_id}&application=${application_id}&request_for=${request_for}`)
          .then(response => {
            const statusData = response.data.data[0];
           // setStartDate(statusData.start_date);
           // setStep(statusData.step);
           console.log(statusData)
          })
          .catch(error => {
            console.log(error);
          });
  
        axiosInstance.get(`application/document/?compliance=${compliance_id}&application=${application_id}`)
          .then(response => {
            const documentData = response.data.data;
           // setStartDate(statusData.start_date);
           // setStep(statusData.step);
           const docStatus = {};
      for (let i = 0; i < documentData.length; i++) {
        const statusData = documentData[i];
        docStatus[statusData["document_type"]] = statusData["status"];
      }
         setDocStatus(docStatus);
         console.log(docStatus)
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, [idel]);


    //Download Button Code handleOptionClick

  const handleButtonClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };
    
 /*   const handleDownload = () => {
      const input = document.getElementById('pdf-content');
      const pdf = new jsPDF();
      pdf.addHTML(input, () => {
        pdf.save('document.pdf');
      });
    }; 
  */

    /*---- upload button APIS CALLS */

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


    /*---------DOWNLOAD BUTTON APS CALLS------*/
    
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
  
  
  
    return (
      <div className="ongoing-applications">
      <h1 className="ongo">TEC Completed Application:-</h1>
      <div>
        <h1 className="type">Compliance Type: {complianceid} </h1>
        <h1 className="appli">Application Number:  {uniqueid}  </h1>
       {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
      </div>

      <div className="dropdown">
      <button className="dd-button" onClick={handleButtonClick}>
        {'Report'}
      </button>
      {isDropdownOpen && (
        <ul className="dd-menu">
          <li onClick={() => handleOptionClick('Process')}>Process</li>
          <li onClick={() => handleOptionClick('Testing')}>Testing</li>
          <li onClick={() => handleOptionClick('Certificate')}>Certificate</li>
        </ul>
      )}
    </div>



 {/*----------------UPLOAD BUTTON CODE ------------*/ }
 <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
<div>
  <div>
  <h3>Upload a File</h3>
  <input type ="file" name="file" onChange={(e) => setUploades(e.target.files)} accept/>
  </div>
  <div>
  <select className="optionss" value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
          
          <option value="">Select Document Type</option>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
  </div>
  <div>
  <button className = "button8" onClick={handleUpload}>UPLOAD</button>
  </div>
</div>
</Popup>
<div className="header-btn">
<button className="button7" onClick={() => setButtonPopup(true)}>Upload</button>
</div>


{/*-----------LAB TESTING JSX CODE IS HERE----------*/}

<div className="lab-testing-box">
      <button className="button7" onClick={() => setButtonPopup2(true)}>Request Testing</button>
      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
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
</div>

{/*------------------DOWNLOAD BUTTON CODE ----------------*/}

<div className="header-btn1">
<button className="button7" onClick={() => setButtonPopup1(true)}>Download</button>
</div>
<Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <h3>Download a File</h3>
        <label>
          <h4>Select a file to download:</h4>
          <div className="download-form1"> 
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
          
  <div className="tecon">
   
      <Thum1png className="mainsvg2"/>
      {docStatus.Thum1png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
   
      <Thum2png className="mainsvg2"/>
      {docStatus.Thum2png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
   
      <Thum3png className="mainsvg2"/>
      {docStatus.Thum3png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
   
      <Thum4png className="mainsvg2"/>
      {docStatus.Thum4png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
   
      <Thum5png className="mainsvg2"/>
      {docStatus.Thum5png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
   
      <Thum6png className="mainsvg2"/>
      {docStatus.Thum6png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
   
      <Thum7png className="mainsvg2"/>
      {docStatus.Thum7png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
   
      <Thum8png className="mainsvg2"/>
      {docStatus.Thum8png === 'success' ? <Right className="mainsvg3"/> : <Wrong className="mainsvg3"/>}
    
  </div>
            
        <div>
          <div className="row">
           
          <div className="col doc-col">
          {docStatus['Manufacturing details'] === 'submitted' ? ( <> <Right size={24} className="pdfico" />  </>) : (<Wrong size={24} className="pdfico" />) }
          <div>
            <img src={file1png} alt="" className="pdfico1" />
          </div>
          <h3 className="be">Manufacturing details</h3>
    </div>

    <div className="col doc-col">
              {docStatus['Shareholding_Pattern'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </>) : (<Wrong size={24} className="pdfico" />) }
              <div>
                <img src={file2png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Shareholding Pattern</h3>
          </div>


            <div className="col doc-col">
              {docStatus['Annexure 2 OEM authorized AIR'] === 'submitted' ? (  <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={48} className="pdfico" />)}
              <div>
                <img src={file3png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Annexure 2 OEM authorized AIR</h3>
            </div>

            <div className="col doc-col">
              

            {docStatus['Annexure 3 MOU'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> )  : ( <Wrong size={24} className="pdfico" /> )}
              <div>
                <img src={file4png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Annexure 3 MOU</h3>
            </div>


            <div className="col doc-col">

            {docStatus['Annex 1 Signatory authorization'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

              <div>
                <img src={file5png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Annex 1 Signatory authorization</h3>
            </div>
           

          </div>
        </div>
      

      
  {/* {startDate && endDate && (
    <div>
      <p className="stdate">Start Date: {startDate.toDateString()}</p>
      {typeof endDate === 'object' ? (
        <p className="enddate">
          End Date: {endDate.days}days {endDate.hours}h {endDate.minutes}m {endDate.seconds}s
        </p>
      ) : (
        <p>End Date: {endDate.days} days left</p>
      )}
    </div>
  )}  */}
  
        </div>
  
  
    );
  };

  export default TECcompleted;
  