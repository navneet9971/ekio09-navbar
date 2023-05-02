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
import file6png from "../../assets/pdficon/Red02.png";




function TECcompleted() {
   // const [currentStep] = useState(1);
  // const steps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Document pending with authorities", "Final report generated"];
   // const [current, setCurrentStep] = useState(1);
 //   const [setComplete] = useState(false);
  const [setSelectedOption] = useState('');
  const [docStatus, setDocStatus] = useState({});
  const [docStep, setdocStep] = useState({});
  //const [startDate, setStartDate] = useState('');
  const [uniqueid, setUniqueid] = useState("");
  const [complianceid, setComplianceid] = useState("");
  const idel = localStorage.getItem('ide');
  const applicationID = localStorage.getItem('newApplicationId');
  const compliance = localStorage.getItem('compliance_id');
  const [documentType, setDocumentType] = useState('');
  const [uploades ,setUploades] = useState('');
    const [buttonPopup, setButtonPopup] = useState(false);
  const [options] = useState(['Authorized Signatory Letter', 'MOU', 'AOA', 'OEM authorized to AIR', 'MOA', 'Certificate of Incorporation']); 
  const [buttonPopup1, setButtonPopup1] = useState(false);
 // const [document] = useState(null);
   // const [startDate, setStartDate] = useState(null);
   // const [endDate, setEndDate] = useState(null);
  //  const [clickedColor, setClickedColor] = useState(false);
   // const [setClickedNext] = useState(false); // add state variable for tracking button click
   // const newSteps = ["Portal Registration", "Initation of testing", "AIR Regis", "Foreign OEM Registration", "BOM Submission", "Application Payment", "Final Submission", "Issuance of Cartification"];
  
   //POPUP BUTTONS OF STEPS 
   const [buttonPopup3, setButtonPopup3] = useState(false);
   const [buttonPopup4, setButtonPopup4] = useState(false);
   const [buttonPopup5, setButtonPopup5] = useState(false);
   const [buttonPopup6, setButtonPopup6] = useState(false);
   const [buttonPopup7, setButtonPopup7] = useState(false);
   const [buttonPopup8, setButtonPopup8] = useState(false);
   const [buttonPopup9, setButtonPopup9] = useState(false);
   const [buttonPopup10, setButtonPopup10] = useState(false);

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
  //hover mouse const 
  

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
            const stepstatus = response.data.data;
            const newDocStep = {}; // create a new object that copies the existing state
            for (let i = 0; i < stepstatus.length; i++) {
              const step = stepstatus[i];
              newDocStep[step.step] = [step.status, step.message, step.start_date];
            }
            setdocStep(newDocStep);
            console.log(stepstatus);
            console.log(newDocStep);
          })
          .catch(error => {
            console.log(error);
          });
  
        axiosInstance.get(`application/document/?compliance=${compliance_id}&application=${application_id}`)
          .then(response => {
            const documentData = response.data.data;
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
          })
      })
      .catch(error => {
        console.log(error);
      })
  }, [idel]);
  
  

    //Download Button Code handleOptionClick


  const handleOptionClick = (option) => {
    setSelectedOption(option);
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

  axiosInstance.get(`compliance-form/?compliance=TEC`, {
    responseType: 'blob',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      console.log(response.data)
      link.href = url;
      link.setAttribute('download', `${form}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
    .catch(error => {
      console.log(error);
    });

  setButtonPopup1(false);
}  




    return (
     <div className="bgchangecompleted">
      <div className="ongoing-applications">
      <h1 className="ongo">TEC Completed Application:-</h1>
      <div>
        <h1 className="type">Compliance Type: {complianceid} </h1>
        <h1 className="appli">Application Number:  {uniqueid}  </h1>
       {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
      </div>

        <div className="dd-menu">
          <button className="reportbtn" onClick={() => handleOptionClick('Process')}>Process</button>
          <button className="reportbtn" onClick={() => handleOptionClick('Testing')}>Testing</button>
          <button className="reportbtn" onClick={() => handleOptionClick('Certificate')}>Certificate</button>
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




{/*-----------LAB TESTING JSX CODE IS HERE----------*/}

<div className="lab-testing-box">
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
<button className="button7" onClick={() => setButtonPopup2(true)}>Request Testing</button>
<button className="button7" onClick={() => setButtonPopup(true)}>Upload</button>
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
   
   <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3}>
  <h2>  Meassge :- 
   {docStep["1"] && docStep["1"][1]}</h2>
   <h2>Start Date :-
   {docStep["1"] && docStep["1"][2]}</h2>
   </Popup>

  <Thum1png className="mainsvg2" />
  {docStep["1"] && docStep["1"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup3(true)} />
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup3(true)}/>
  )}



<Popup trigger={buttonPopup4} setTrigger={setButtonPopup4}>
<h2>  Meassge :- 
   {docStep["2"] && docStep["2"][1]}</h2>
   <h2>Start Date :-
   {docStep["2"] && docStep["2"][2]}</h2>
   </Popup>

  <Thum2png className="mainsvg2" />
  {docStep["2"] && docStep["2"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
  )}


<Popup trigger={buttonPopup5} setTrigger={setButtonPopup5}>
<h2>  Meassge :- 
   {docStep["3"] && docStep["3"][1]}</h2>
   <h2>Start Date :-
   {docStep["3"] && docStep["3"][2]}</h2>
   </Popup>

  <Thum3png className="mainsvg2" />
  {docStep["3"] && docStep["3"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
  )}


<Popup trigger={buttonPopup6} setTrigger={setButtonPopup6}>
<h2>  Meassge :- 
   {docStep["4"] && docStep["4"][1]}</h2>
   <h2>Start Date :-
   {docStep["4"] && docStep["4"][2]}</h2>
   </Popup>
  <Thum4png className="mainsvg2" />
  {docStep["4"] && docStep["4"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
  )}

<Popup trigger={buttonPopup7} setTrigger={setButtonPopup7}>
<h2>  Meassge :- 
   {docStep["5"] && docStep["5"][1]}</h2>
   <h2>Start Date :-
   {docStep["5"] && docStep["5"][2]}</h2>
   </Popup>

  <Thum5png className="mainsvg2" />
  {docStep["5"] && docStep["5"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
  )}

<Popup trigger={buttonPopup8} setTrigger={setButtonPopup8}>
<h2>  Meassge :- 
   {docStep["6"] && docStep["6"][1]}</h2>
   <h2>Start Date :-
   {docStep["6"] && docStep["6"][2]}</h2>
   </Popup>

  <Thum6png className="mainsvg2" />
  {docStep["6"] && docStep["6"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
  )}

<Popup trigger={buttonPopup9} setTrigger={setButtonPopup9}>
<h2>  Meassge :- 
   {docStep["7"] && docStep["7"][1]}</h2>
   <h2>Start Date :-
   {docStep["7"] && docStep["7"][2]}</h2>
   </Popup>

  <Thum7png className="mainsvg2" />
  {docStep["7"] && docStep["7"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup9(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup9(true)}/>
  )}

<Popup trigger={buttonPopup10} setTrigger={setButtonPopup10}>
<h2>  Meassge :- 
   {docStep["8"] && docStep["8"][1]}</h2>
   <h2>Start Date :-
   {docStep["8"] && docStep["8"][2]}</h2>
   </Popup>

  <Thum8png className="mainsvg2" />
  {docStep["8"] && docStep["8"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup10(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup10(true)}/>
  )}


  </div>
            
        <div className="pdffilesup">
          <div className="row">
           
          <div className="col doc-col">
          {docStatus['Authorized Signatory Letter'] === 'submitted' ? ( <> <Right size={24} className="pdfico" />  </>) : (<Wrong size={24} className="pdfico" />) }
          <div>
            <img src={file1png} alt="" className="pdfico1" />
          </div>
          <h3 className="be">Authorized Signatory Letter</h3>
    </div>

            <div className="col doc-col">
              {docStatus['MOU'] === 'submitted' ? (  <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={48} className="pdfico" />)}
              <div>
                <img src={file2png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">MOU</h3>
            </div>

            <div className="col doc-col">
              

            {docStatus['AOA'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> )  : ( <Wrong size={24} className="pdfico" /> )}
              <div>
                <img src={file3png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">AOA</h3>
            </div>


            <div className="col doc-col">

            {docStatus['OEM authorized to AIR'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

              <div>
                <img src={file4png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">OEM Authorized to AIR</h3>
            </div>

            <div className="col doc-col">

{docStatus['MOA'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

  <div>
    <img src={file5png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">MOA</h3>
</div>

<div className="col doc-col">

{docStatus['Certificate of Incorporation'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">Certificate of Incorporation</h3>
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
       </div>
  
  
    );
  };

  export default TECcompleted;
  