import React, { useState, useEffect } from "react";
//import jsPDF from 'jspdf';
import "../../../pages/stepper.css";
// import Popup from "../../../pagesscrn4/popup/Popup";
import Message from "../../../popup/Message";
import axiosInstance from "../../../../interceptors/axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import ReactLoading from "react-loading";
import { FcDocument } from "react-icons/fc";
import { FiUpload, FiDownload } from "react-icons/fi";
// import { ReactComponent as Wrong } from "../../../assets/trckpg-rb/wrong.svg";
// import { ReactComponent as Right } from "../../../assets/trckpg-rb/right.svg";
// import file6png from "../../../assets/pdficon/Red02.png";
import pdflogo from "../../../assets/icons/eikomp_logo.png"
import StatusBar from "../../../Statusbar";
import BISChatbot from "../../../Chatbot/BISChatbot";
import BISSteps from "../BISSteps";




function Completed() {
  const [docStatus, setDocStatus] = useState({});
  const [tableData, setTableData] = useState([]);

  //const [startDate, setStartDate] = useState('');
  const [uniqueid, setUniqueid] = useState("");
  const [complianceid, setComplianceid] = useState("");
  const idel = localStorage.getItem('ide');
  const [isLoading, setIsLoading] = useState(false); 
  const totalResponses = 6;
  const completedResponses = localStorage.getItem('stepstatus');
  const [docReport, setDocReport] = useState("");
  const [docType, setDocType] = useState("");
  const bisDocStep = JSON.parse(localStorage.getItem("bisdocStep"));
 
  
   //POPUP BUTTONS OF STEPS 
   const [buttonPopupreport, setButtonPopupreport] = useState(false);


//Notification Button Const Here all---------------
// const [buttonPopup11, setButtonPopup11] = useState(false);
// const [notifiData, setNotifiData] = useState([]);

// //Notification Date Sequnce
// function formatDate(dateString) {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, '0');
//   const month = (date.getMonth() + 1).toString().padStart(2, '0');
//   const year = date.getFullYear().toString();
//   return `${day}/${month}/${year}`;
// }

  // API call to get document status
  useEffect(() => {
    const interval = setInterval(() => {
    axiosInstance.get(`application/compliance/${idel}/`)
      console.log('Refreshing Data..!!');
      axiosInstance.get(`application/compliance/${idel}/`)
      .then(response => {
        const data = response.data.data;
        console.log(data.uniqueid,data.application_name);
        setTableData(data);
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
// const notificationData = data["notifications"]
// console.log(notificationData)
// setNotifiData(notificationData)

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
            // setdocStep(newDocStep);
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

      setIsLoading(true); // Start loading animation
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
   const rows = [['BIS Portal Registration', bisDocStep["1"] && bisDocStep["1"][2].slice(0,10), bisDocStep["1"] && bisDocStep["1"][0]],
                ['Sample Testing', bisDocStep["2"] && bisDocStep["2"][2].slice(0,10), bisDocStep["2"] && bisDocStep["2"][0] ],
                ['Documentation', bisDocStep["3"] && bisDocStep["3"][2].slice(0,10), bisDocStep["3"] && bisDocStep["3"][0]  ],
                ['Filling Application', bisDocStep["4"] && bisDocStep["4"][2].slice(0,10), bisDocStep["4"] && bisDocStep["4"][0] ],
                ['Approval', bisDocStep["5"] && bisDocStep["5"][2].slice(0,10), bisDocStep["5"] && bisDocStep["5"][0] ],
                ['Issuance of certificate', bisDocStep["6"] && bisDocStep["6"][2].slice(0,10), bisDocStep["6"] && bisDocStep["6"][0]], 
  ];

 
   // Generate the table using jspdf-autotable
   doc.autoTable({
     head: [columns],
     body: rows,
     startY: 75,
   });


   //SECOND TABLE DATA 
   const columns1 =['Step Name', 'Status']
   const rows1 = [
    ["Business License", docStatus["Business License"]],
    ["ISO", docStatus["ISO"]],
    ["Trademark Certificate", docStatus["Trademark Certificate"]],
    ["AadharCard", docStatus["AadharCard"]],
    ["PanCard", docStatus["PanCard"]],
    ["GST", docStatus["GST"]],
    ["Employee ID/Visiting Card", docStatus["Employee ID/Visiting Card"]],
    ["MSME", docStatus["MSME"]],
    ["Form 3 (AFFIDAVIT)", docStatus["Form 3 (AFFIDAVIT)"]],
  ];


   // Generate the table using jspdf-autotable
   doc.autoTable({
    head: [columns1],
    body: rows1,
    startY: 170,
  });
  // Save the PDF
  doc.save('Progress Tracker.pdf');
  setIsLoading(false); // Stop loading animation
}
    }
    
  

    /*-------handleOptions download report-----*/
    const ReportOptionClick = (option) => {
      const reportKey = localStorage.getItem("report");
      console.log(reportKey);
      if (reportKey === 'Yes') {      
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

    const myArray = Object.values(tableData);

   
    return (
     <div className="bgchangecompleted">
      <div className="ongoing-applications">
      <h1 className="ongo">BIS Completed Application:-</h1>
      <div>
        <h1 className="type">Compliance Type: {complianceid} </h1>
        <h1 className="appli">Application Number:  {uniqueid}  </h1>
       {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
      </div>


{/*---------------Notification code Here------------------------*/}
{/* 
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
        </Popup> */}



{/*------------------DOWNLOAD BUTTON CODE ----------------*/}

<div className="header-btn1">
<button className="testreq-btn"  disabled>< FcDocument />Request Testing</button>
<button className="upload-btn"  disabled>< FiUpload />Upload</button>
<button className="download-btn"  disabled><FiDownload />Download</button>
{/* <button className='button7' onClick={() => setButtonPopup11(true)}>Notification</button> */}
</div>


{/*--------Status Bar CODE IS HERE --------------------*/}
          <div>
      <StatusBar
        totalResponses={totalResponses}
        completedResponses={completedResponses}
      />
    </div>

{/* BIS STEPS CODE HERE 6 STeps */}
<BISSteps />

  {/* <h2 className="pdfstep-name"> Documents To Be Submitted</h2>  
        <div className="pdffilesup">
          <div className="row1">
           
          <div className="col doc-col">
          {docStatus['Business License'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" />  </>) : (<Wrong size={24} className="pdfico" />) }
          <div>
            <img src={file6png} alt="" className="pdfico1" />
          </div>
          <h3 className="be">Business License</h3>
    </div>

            <div className="col doc-col">
              {docStatus['ISO'] === 'Submitted' ? (  <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" />)}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">ISO</h3>
            </div>

            <div className="col doc-col">
              

            {docStatus['Trademark Cetificate'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> )  : ( <Wrong size={24} className="pdfico" /> )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Trademark Cetificate</h3>
            </div>


            <div className="col doc-col">

            {docStatus['AdharCard'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">AdharCard</h3>
            </div>

            <div className="col doc-col">

{docStatus['PanCard'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">PanCard</h3>
</div>

<div className="col doc-col">

{docStatus['GST'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">GST</h3>
</div>

<div className="col doc-col">

{docStatus['Employee ID/Visiting Card'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">Employee ID/Visiting Card</h3>
</div>

<div className="col doc-col">

{docStatus['MSME'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">MSME</h3>
</div>

<div className="col doc-col">

{docStatus['Form_3_Affidavit'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">Form 3 (AFFIDAVIT)</h3>
</div>
          </div>
        </div> */}
      

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

          <button className="reportbtn" onClick={CertificateOptionClick} disabled={localStorage.getItem('certificate') === 'No'}>Download finalCertificate</button>
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

   {/* <BISChatbot />  */}
        </div>

        {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}

<div className="table-wrapper">
  <table className="Review">
    <thead>
      <tr>
       
        <th className="header" style={{ cursor: "default" }}>
          unique_id
        </th>
        <th className="header" style={{ cursor: "default" }}>
          Application Name
        </th>
        <th className="header" style={{ cursor: "default" }}>
          Compliance Name
        </th>
        <th className="header" style={{ cursor: "default" }}>
          Brand
        </th>
        <th className="header" style={{ cursor: "default" }}>
          Certificate Expiry
        </th>
      </tr>
    </thead>

    <tbody>
      
          <tr>
            
            <td className="clickable1">{tableData.uniqueid}</td>
            <td style={{ cursor: "default" }}>{tableData.application_name}</td>
            <td style={{ cursor: "default" }}>{tableData.compliance_name}</td>
            <td style={{ cursor: "default" }}>{tableData.fields?.Brand_trademark}</td>
            <td style={{ cursor: "default" }}>{tableData.certificate_expiry}</td>
          </tr>
       
    </tbody>
  </table>
</div>





       </div>
  
  
    );
  };

  export default Completed;
  