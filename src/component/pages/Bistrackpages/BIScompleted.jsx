import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//import jsPDF from 'jspdf';
import "../stepper.css";
import axiosInstance from "../../../interceptors/axios";
//import { Chatbot } from 'react-chatbot-kit';
//import config from '../../eikomp-sasa-1f7361d6ec4a.json'; // contains your Dialogflow agent credentials
import { ReactComponent as Thum1png } from "../../assets/bis-track-icons/Application.svg";
import { ReactComponent as Thum2png } from "../../assets/bis-track-icons/Testing.svg";
import { ReactComponent as Thum3png } from "../../assets/bis-track-icons/Approval.svg";
import { ReactComponent as Thum4png } from "../../assets/bis-track-icons/Documentation.svg";
import { ReactComponent as Thum5png } from "../../assets/bis-track-icons/Approval.svg";
//import { ReactComponent as Thum6png } from "../../assets/bis-track-icons/Certificate.svg";
import { ReactComponent as Wrong } from "../../assets/trckpg-rb/wrong.svg";
import { ReactComponent as Right } from "../../assets/trckpg-rb/right.svg";
import file1png from "../../assets/pdficon/Green01.png";
import file2png from "../../assets/pdficon/Green02.png";
import file3png from "../../assets/pdficon/Green03.png";
import file4png from "../../assets/pdficon/Green04.png";
import file5png from "../../assets/pdficon/Red01.png";
import file6png from "../../assets/pdficon/Red02.png";


function Compdownload() {
  const location = useLocation();
  const uniqueid = new URLSearchParams(location.search).get("uniqueid");
  const compliance_name = new URLSearchParams(location.search).get("compliance_name");
   // const steps = ["Form Submitted", "Lab Testing", "Sample Completed", "End"];
    //const [currentStep] = useState(1);
   //const [current, setCurrentStep] = useState(1);
   // const [setComplete] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [setSelectedOption] = useState('');
  const [docStatus, setDocStatus] = useState({});
    //const [startDate, setStartDate] = useState(null);
    //const [endDate, setEndDate] = useState(null);
    //const [clickedColor, setClickedColor] = useState(false);
    //const [setClickedNext] = useState(false); // add state variable for tracking button click
    //const newSteps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Documents pending with authorities", "Final report generated"];
  

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


    // APIS for PDF file Status Success or Not

    useEffect(() => {
      axiosInstance.get(`application/document/24`)
        .then(response => {
          const data = response.data.data;
          const status = {};
          data.forEach(doc => {
            status[doc.name] = doc.status;
          });
          setDocStatus(status);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
    
    
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
    }; */
    
  
    return (
      <div className="ongoing-applications">
        <h1 className="ongo">BIS Completed Application:-</h1>
        <h1 className="type">Compliance Type: {compliance_name}</h1>
        <h1 className="appli">Application Number: {uniqueid}</h1>
       {/* <button className="clidown" onClick={handleDownload}>Download</button> */}

        
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
    <Right  className="mainsvg3"/>
   
    <Thum2png className="mainsvg2"/>
    <Right  className="mainsvg3"/>

    <Thum3png className="mainsvg2"/>
    <Right className="mainsvg3"/>
 
    <Thum4png className="mainsvg2"/>
    <Right className="mainsvg3"/>
   
    <Thum5png className="mainsvg2"/>
    <Right className="mainsvg3"/>

    </div>
  
          
    <div>
    <div className="row">
    <div className="col doc-col">
          {docStatus['Signatory Authorization'] === 'success' ? <Right size={24} className="pdfico" /> : <Wrong size={24} className="pdfico" />}
          <div>
            <img src={file1png} alt="" className="pdfico1" />
          </div>
          <h3 className="be">Manufacture authorization letter</h3>
    

              <div>
              {docStatus['OEM Authorization'] === 'success' ? <Right size={24} className="pdfico" /> : <Wrong size={24} className="pdfico" />}
                <img src={file2png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Manufacture nomination form</h3>
            </div>


            <div className="col doc-col">
            {docStatus['MOU'] === 'success' ? <Right size={24} className="pdfico" /> : <Wrong size={24} className="pdfico" />}
              <div>
                <img src={file3png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">AIR Affidavit Brand office
</h3>
            </div>
            <div className="col doc-col">

            {docStatus['Shareholding Pattern'] === 'success' ? <Right size={24} className="pdfico" /> : <Wrong size={24} className="pdfico" />}
              <div>
                <img src={file4png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">
AIR Afidavit Mfg branch office
</h3>
            </div>


            <div className="col doc-col">

            {docStatus['Annexure 1'] === 'success' ? <Right size={24} className="pdfico" /> : <Wrong size={24} className="pdfico" />}

              <div>
                <img src={file5png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">
AIR authorization letter
</h3>
            </div>
            <div className="col doc-col">

            {docStatus['BOM'] === 'success' ? <Right size={24} className="pdfico" /> : <Wrong size={24} className="pdfico" />}

              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">brand authorization letter</h3>
            </div>

          </div>
        </div>
  
      

        </div>

        
    );
  }
  export default Compdownload;
  