import React, { useState, useEffect } from "react";
//import jsPDF from 'jspdf';
import "../stepper.css";
import Popup from "../../pagesscrn4/popup/Popup";
import Message from "../../pagesscrn4/popup/Message";
import axiosInstance from "../../../interceptors/axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
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
import file6png from "../../assets/pdficon/Red02.png";
import pdflogo from "../../assets/icons/eikomp_logo.png"
import StatusBar from "../../Statusbar";
import Chatbot from "../../Chatbot/Chatbot";




function TECOngoing() {
  const [docStatus, setDocStatus] = useState({});
  const [docStep, setdocStep] = useState({});
  //const [startDate, setStartDate] = useState('');
  const [uniqueid, setUniqueid] = useState("");
  const [complianceid, setComplianceid] = useState("");
  const idel = localStorage.getItem('ide');
  const totalResponses = 8;
  const completedResponses = localStorage.getItem('stepstatus');
  const [docReport, setDocReport] = useState("");
  const [docType, setDocType] = useState("");
 
   //POPUP BUTTONS OF STEPS 
   const [buttonPopup3, setButtonPopup3] = useState(false);
   const [buttonPopup4, setButtonPopup4] = useState(false);
   const [buttonPopup5, setButtonPopup5] = useState(false);
   const [buttonPopup6, setButtonPopup6] = useState(false);
   const [buttonPopup7, setButtonPopup7] = useState(false);
   const [buttonPopup8, setButtonPopup8] = useState(false);
   const [buttonPopup9, setButtonPopup9] = useState(false);
   const [buttonPopup10, setButtonPopup10] = useState(false);
   const [buttonPopupreport, setButtonPopupreport] = useState(false);


//Notification Button Const Here all---------------
const [buttonPopup11, setButtonPopup11] = useState(false);
const [notifiData, setNotifiData] = useState([]);

//Notification Date Sequnce
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
}

  // API call to get document status

  useEffect(() => {
    const interval = setInterval(() => {
    axiosInstance.get(`application/compliance/${idel}/`)
      console.log('Refreshing Data..!!');
      axiosInstance.get(`application/compliance/${idel}/`)
      .then(response => {
        const data = response.data.data;
        const compliance_id = data["compliance"];
        const application_id = data["application"];
        const request_for = data["request_for"];
        console.log(compliance_id)
        console.log(application_id)
  
        console.log(data)
        // store local storage then show the values 
        setUniqueid(data["uniqueid"]);
        setComplianceid(data["compliance_name"])

  
        const compliancename = data["compliance_name"]
        localStorage.setItem("compliance_name", compliancename)
  
//Notification DATA SET HERE ----------------------------------------------------
const notificationData = data["notifications"]
console.log(notificationData)
setNotifiData(notificationData)


        //status APIs used 
        axiosInstance.get(`application/status/?compliance=${compliance_id}&application=${application_id}&request_for=${request_for}`)
          .then(response => {
            const stepstatus = response.data.data;
            const newDocStep = {}; // create a new object that copies the existing state
            for (let i = 0; i < stepstatus.length; i++) {
              const step = stepstatus[i];
              newDocStep[step.step] = [step.status, step.message, step.start_date];
            }

            // Store the length of stepstatus in localStorage
            localStorage.setItem('stepstatus', stepstatus.length);
            setdocStep(newDocStep);
            console.log(stepstatus.length);
            console.log(newDocStep);
          })
          .catch(error => {
            console.log(error);
          });
  
        axiosInstance.get(`application/document/?compliance=${compliance_id}&application=${application_id}`)
          .then(response => {
            const documentData = response.data.data;
            //console.log(response.data.key)

       //store button APIS data here button name download report and download certificate 
       localStorage.setItem("report", response.data.report);
       localStorage.setItem("certificate",response.data.certificate)
      
            const docReport = {};
            const docCertificate = {};

            response.data.data.forEach((item) => {
              const documentType = item.document_type;
              const fileType = item.document;
              
              if (documentType.toLowerCase().includes('report_')) {
                docReport[documentType] = fileType;
              }
              
              if (documentType.includes('certificate_')) {
                docCertificate[documentType] = fileType;
            }
            });

            // Assuming you want to store these objects in the state variables 'setdocreport' and 'setdoctype'
setDocReport(docReport);
setDocType(docCertificate);


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
    }, 2000);
    
      return () => clearInterval(interval);
  }, [idel]);
  
  

    //Download Button Code handleOptionClick


    const handleDownloadreport = () => {
      // create a new instance of jsPDF
      const doc = new jsPDF();

//load the image 
const logoImg = new Image();
logoImg.src = pdflogo;
   
//wait for the image to load 
logoImg.onload = function () {
         // Add the content to the PDF
    doc.addImage(logoImg, 'PNG', 10, 4, 50, 30);
  doc.text(`Compliance Type: ${complianceid}`, 10, 50);
  doc.text(`Application Number: ${uniqueid}`, 10, 60);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 70);
  doc.text('Details of Documents:-', 10, 160);
  

   // Define the table columns and rows
   const columns = ['Step Name', 'Start Date', 'Status'];
   const rows = [['Portal Registration', docStep["1"] && docStep["1"][2].slice(0,10), docStep["1"] && docStep["1"][0]],
                ['Initiation of Testing', docStep["2"] && docStep["2"][2].slice(0,10), docStep["2"] && docStep["2"][0] ],
                ['AIR registration', docStep["3"] && docStep["3"][2].slice(0,10), docStep["3"] && docStep["3"][0]  ],
                ['Foreign OEM Registration', docStep["4"] && docStep["4"][2].slice(0,10), docStep["4"] && docStep["4"][0] ],
                ['BOM Submission ', docStep["5"] && docStep["5"][2].slice(0,10), docStep["5"] && docStep["5"][0] ],
                ['Application Payment', docStep["6"] && docStep["6"][2].slice(0,10), docStep["6"] && docStep["6"][0]],
                ['Final Submission', docStep["7"] && docStep["7"][2].slice(0,10), docStep["7"] && docStep["7"][0] ],
                ['Issuance of certification', docStep["8"] && docStep["8"][2].slice(0,10), docStep["8"] && docStep["8"][0]], 
  ];

 
   // Generate the table using jspdf-autotable
   doc.autoTable({
     head: [columns],
     body: rows,
     startY: 75,
   });


   //SECOND TABLE DATA 
   const columns1 =['Step Name', 'Status']
   const rows1 =[['Authorized Signatory Letter', docStatus['Authorized Signatory Letter']],
   ['MOU', docStatus['MOU']],
   ['AOA', docStatus['AOA']],
   ['OEM authorized to AIR', docStatus['OEM authorized to AIR']],
   ['MOA', docStatus['MOA']],
   ['Certificate of Incorporation', docStatus['Certificate of Incorporation']],
   ]

  
   // Generate the table using jspdf-autotable
   doc.autoTable({
    head: [columns1],
    body: rows1,
    startY: 170,
  });
  // Save the PDF
  doc.save('Progress Tracker.pdf');
}
    }
  

    /*-------handleOptions download report-----*/
    const ReportOptionClick = (option) => {
      const reportKey = localStorage.getItem("report");
      console.log(reportKey);
      if (reportKey === 'Yes') { 
      
        // Create a popup window       
      }
    };

    const CertificateOptionClick = (option) => {
      const certificateKey = localStorage.getItem("certificate");
      console.log(certificateKey);
      if (certificateKey === 'Yes') {
       console.log(docType)
       var newWindow = window.open(Object.values(docType)[0], '_blank');
       newWindow.focus();
      }
    };
   
    return (
     <div className="bgchangecompleted">
      <div className="ongoing-applications">
      <h1 className="ongo">TEC Completed Application:-</h1>
      <div>
        <h1 className="type">Compliance Type: {complianceid} </h1>
        <h1 className="appli">Application Number:  {uniqueid}  </h1>
       {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
      </div>


{/*---------------Notification code Here------------------------*/}

<Popup trigger={buttonPopup11} setTrigger={setButtonPopup11}>
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
          {notifiData.map((data, index) => (
            <tr key={index}>
              <td style={{ cursor: 'default' }}>{index + 1}</td>
              <td style={{ cursor: 'default' }}>{data.category}</td>
              <td style={{ cursor: 'default' }}>{data.title}</td>
              <td>
               <a href={data.file} target="_blank" rel="noopener noreferrer" style={{ color: '#55B600', fontWeight: 'bold' }}>
               Download Document
                </a>
              </td>
              <td style={{ cursor: 'default' }}>{formatDate(data.date)}</td>
            </tr>
          ))}
        </tbody>
            </table>

          </div>
        </Popup>


{/*------------------DOWNLOAD BUTTON CODE ----------------*/}

<div className="header-btn1">
<button className="button7"  disabled>Request Testing</button>
<button className="button7"  disabled>Upload</button>
<button className="button7"  disabled>Download</button>
<button className='button7' onClick={() => setButtonPopup11(true)}>Notification</button>
</div>


{/*--------Status Bar CODE IS HERE --------------------*/}
     <div>
      <StatusBar
        totalResponses={totalResponses}
        completedResponses={completedResponses}
      />
    </div>

    <h2 className="steps-count">Steps To Be Completed</h2>
  <div className="tecon">
  
   <Message trigger={buttonPopup3} setTrigger={setButtonPopup3}>
  <h2 className="pop-msg">    Message :- 
   {docStep["1"] && docStep["1"][1]}</h2>
   <h2 className="pop-msg">  Start Date :- 
   {docStep["1"] && docStep["1"][2].slice(0,10)}</h2>
   </Message>

  <Thum1png className="mainsvg2" />
  {docStep["1"] && docStep["1"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup3(true)} />
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup3(true)}/>
  )}



<Message trigger={buttonPopup4} setTrigger={setButtonPopup4}>
<h2 className="pop-msg">    Message :- 
   {docStep["2"] && docStep["2"][1]}</h2>
   <h2 className="pop-msg">  Start Date :-
   {docStep["2"] && docStep["2"][2].slice(0,10)}</h2>
   </Message>

  <Thum2png className="mainsvg2" />
  {docStep["2"] && docStep["2"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
  )}


<Message trigger={buttonPopup5} setTrigger={setButtonPopup5}>
<h2 className="pop-msg">    Message :- 
   {docStep["3"] && docStep["3"][1]}</h2>
   <h2 className="pop-msg">  Start Date :-
   {docStep["3"] && docStep["3"][2].slice(0,10)}</h2>
   </Message>

  <Thum3png className="mainsvg2" />
  {docStep["3"] && docStep["3"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
  )}


<Message trigger={buttonPopup6} setTrigger={setButtonPopup6}>
<h2 className="pop-msg">    Message :- 
   {docStep["4"] && docStep["4"][1]}</h2>
   <h2 className="pop-msg">  Start Date :-
   {docStep["4"] && docStep["4"][2].slice(0,10)}</h2>
   </Message>

  <Thum4png className="mainsvg2" />
  {docStep["4"] && docStep["4"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
  )}

<Message trigger={buttonPopup7} setTrigger={setButtonPopup7}>
<h2 className="pop-msg">    Message :- 
   {docStep["5"] && docStep["5"][1]}</h2>
   <h2 className="pop-msg">  Start Date :-
   {docStep["5"] && docStep["5"][2].slice(0,10)}</h2>
   </Message>

  <Thum5png className="mainsvg2" />
  {docStep["5"] && docStep["5"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
  )}

<Message trigger={buttonPopup8} setTrigger={setButtonPopup8}>
<h2 className="pop-msg">    Message :- 
   {docStep["6"] && docStep["6"][1]}</h2>
   <h2 className="pop-msg">  Start Date :-
   {docStep["6"] && docStep["6"][2].slice(0,10)}</h2>
   </Message>

  <Thum6png className="mainsvg2" />
  {docStep["6"] && docStep["6"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
  )}

<Message trigger={buttonPopup9} setTrigger={setButtonPopup9}>
<h2 className="pop-msg">    Message :- 
   {docStep["7"] && docStep["7"][1]}</h2>
   <h2 className="pop-msg">  Start Date :-
   {docStep["7"] && docStep["7"][2].slice(0,10)}</h2>
   </Message>

  <Thum7png className="mainsvg2" />
  {docStep["7"] && docStep["7"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup9(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup9(true)}/>
  )}

<Message trigger={buttonPopup10} setTrigger={setButtonPopup10}>
<h2 className="pop-msg">    Message :- 
   {docStep["8"] && docStep["8"][1]}</h2>
   <h2 className="pop-msg">  Start Date :-
   {docStep["8"] && docStep["8"][2].slice(0,10)}</h2>
   </Message>

  <Thum8png className="mainsvg2" />
  {docStep["8"] && docStep["8"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup10(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup10(true)}/>
  )}
  </div>

  
  <h2 className="pdfstep-name"> Documents To Be Submitted</h2>  
        <div className="pdffilesup">
          <div className="row1">
           
          <div className="col doc-col">
          {docStatus['Authorized Signatory Letter'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" />  </>) : (<Wrong size={24} className="pdfico" />) }
          <div>
            <img src={file6png} alt="" className="pdfico1" />
          </div>
          <h3 className="be">Authorized Signatory Letter</h3>
    </div>

            <div className="col doc-col">
              {docStatus['MOU'] === 'Submitted' ? (  <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" />)}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">MOU</h3>
            </div>

            <div className="col doc-col">
              

            {docStatus['AOA'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> )  : ( <Wrong size={24} className="pdfico" /> )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">AOA</h3>
            </div>


            <div className="col doc-col">

            {docStatus['OEM authorized to AIR'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">OEM Authorized to AIR</h3>
            </div>

            <div className="col doc-col">

{docStatus['MOA'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">MOA</h3>
</div>

<div className="col doc-col">

{docStatus['Certificate of Incorporation'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">Certificate of Incorporation</h3>
</div>
           

          </div>
        </div>
      

       {/* POPUP OF LAST BUTTON OF DOWNLOAD REPORT FUNCTION AS WELL  */}
 <Message trigger={buttonPopupreport} setTrigger={setButtonPopupreport}>
  <h1 style={{ color: 'black', fontSize: '24px', textAlign: 'center' }}>Download Test Report</h1>
  <ul>
    {Object.entries(docReport).map(([documentType, fileDownloadLink]) => (
      <li key={documentType}>
        <a href={fileDownloadLink} download={`${documentType}.${fileDownloadLink.split('.').pop()}`} target="_blank" rel="noopener noreferrer">
          <button className="button7">{documentType}</button>
        </a>
      </li>
    ))}
  </ul>
</Message>  
{/*------- LAST THREE BUTTON CODES HERE --------------------*/}

<div className="dd-menu">
          <button className="reportbtn" onClick={handleDownloadreport}>Download Progress Report</button>
          <button className="reportbtn" onClick={() => {
  ReportOptionClick();
  setButtonPopupreport(true);
}} disabled={localStorage.getItem("report") === 'No'}>Download Test Report</button>

          <button className="reportbtn" onClick={CertificateOptionClick} disabled={localStorage.getItem('certificate') === 'No'}>Download Certificate</button>
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

   <Chatbot /> 
        </div>
       </div>
  
  
    );
  };

  export default TECOngoing;
  