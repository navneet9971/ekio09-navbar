import React, { useState, useEffect } from "react";
//import jsPDF from 'jspdf';
import "../stepper.css";
import axiosInstance from "../../../interceptors/axios";
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
import file7png from "../../assets/pdficon/Red03.png";
import file8png from "../../assets/pdficon/Red04.png";


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

   // const [startDate, setStartDate] = useState(null);
   // const [endDate, setEndDate] = useState(null);
  //  const [clickedColor, setClickedColor] = useState(false);
   // const [setClickedNext] = useState(false); // add state variable for tracking button click
   // const newSteps = ["Portal Registration", "Initation of testing", "AIR Regis", "Foreign OEM Registration", "BOM Submission", "Application Payment", "Final Submission", "Issuance of Cartification"];
  


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
        {'Download'}
      </button>
      {isDropdownOpen && (
        <ul className="dd-menu">
          <li onClick={() => handleOptionClick('Process')}>Process</li>
          <li onClick={() => handleOptionClick('Testing')}>Testing</li>
          <li onClick={() => handleOptionClick('Certificate')}>Certificate</li>
        </ul>
      )}
    </div>
    
           
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
          {docStatus['Authorized Signatory Letter'] === 'submitted' ? ( <> <Right size={24} className="pdfico" />  </>) : (<Wrong size={24} className="pdfico" />) }
          <div>
            <img src={file1png} alt="" className="pdfico1" />
          </div>
          <h3 className="be">Authorized Signatory Letter</h3>
    

              <div>
              {docStatus['OEM authorized to AIR'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </>) : (<Wrong size={24} className="pdfico" />) }
                <img src={file2png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">OEM Authorized to AIR</h3>
            </div>


            <div className="col doc-col">
              {docStatus['MOU'] === 'submitted' ? (  <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={48} className="pdfico" />)}
              <div>
                <img src={file3png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">MOU</h3>
            </div>

            <div className="col doc-col">
              

            {docStatus['Shareholding Pattern'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> )  : ( <Wrong size={24} className="pdfico" /> )}
              <div>
                <img src={file4png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Shareholding Pattern</h3>
            </div>


            <div className="col doc-col">

            {docStatus['Annexure 1'] === 'submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

              <div>
                <img src={file5png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Annexure 1</h3>
            </div>
            <div className="col doc-col">

            {docStatus['BOM'] === 'sumbitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" />)}

              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">BOM</h3>
            </div>

            <div className="col doc-col">

            {docStatus['Non Applicability Proforma'] === 'sumbitted' ? ( <> <Right size={24} className="pdfico" /> </>) : (<Wrong size={24} className="pdfico" />)}

              <div>
                <img src={file7png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Non Applicability Proforma</h3>
            </div>
            <div className="col doc-col">

            {docStatus['Proforma Seeking Exemption'] === 'sumbitted' ? (<> <Right size={24} className="pdfico" /> </>) : ( <Wrong size={24} className="pdfico" />)}

              <div>
                <img src={file8png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Proforma Seeking Exemption</h3>
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
  