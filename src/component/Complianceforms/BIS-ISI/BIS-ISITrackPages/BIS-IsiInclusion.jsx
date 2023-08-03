import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../interceptors/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactLoading from "react-loading";
import { FcDocument } from "react-icons/fc";
import { FiUpload, FiDownload } from "react-icons/fi";
import pdflogo from "../../../assets/icons/eikomp_logo.png";
import Popup from "../../../popup/Popup";
import Message from "../../../popup/Message";
import BISISIInclusionSteps from "../BIS-ISIinclusionSteps";
import BisIsiDownload from "../BIS-ISIDownload";
import BisIsiUploadDoc from "../BIS-ISIUploadDoc";
import StatusBar from "../../../Statusbar";
import BisIsiProduction from "../BIS-ISIProduction";


function BisIsiInclusion () {

    const [docStatus, setDocStatus] = useState({});
    const [uniqueid, setUniqueid] = useState("");
    const [complianceid, setComplianceid] = useState("");
    const idel = localStorage.getItem("ide");
    // const [testingbtnkey, setTestingbtnkey] = useState("");
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup1, setButtonPopup1] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const totalResponses = 6;
    const completedResponses = localStorage.getItem("stepstatus");
    const [docReport, setDocReport] = useState("");
    const [docType, setDocType] = useState("");
    const bisDocStep = JSON.parse(localStorage.getItem("bisdocStep"));
  
    //POPUP BUTTONS OF STEPS
    const [buttonPopupreport, setButtonPopupreport] = useState(false);
  
    //LAB TESTING FROM CONST HERE ---------------------------------------
    const [buttonPopup2, setButtonPopup2] = useState(false);
    //const [buttonPopup1, setButtonPopup1] = useState(false);

    
    // API call to get document status

  useEffect(() => {
    const interval = setInterval(() => {
      axiosInstance.get(`application/compliance/${idel}/`);
      console.log("Refreshing Data..!!");
      axiosInstance
        .get(`application/compliance/${idel}/`)
        .then((response) => {
          const data = response.data.data;
          const bisIsicompliance_id = data["compliance"];
          const bisIsiapplication_id = data["application"];
          const bisIsirequest_for = data["request_for"];
          // setCompliance_id1(compliance_id);
          // setApplication_id1(application_id);
          console.log(bisIsicompliance_id);
          console.log(bisIsiapplication_id);

          console.log(data);
          // store local storage then show the values
          setUniqueid(data["uniqueid"]);
          setComplianceid(data["compliance_name"]);
          // setTestingbtnkey(data["testing"]);
          console.log(data["testing"]);

          const compliancename = data["compliance_name"];
          localStorage.setItem("compliance_name", compliancename);

          //IMPORTANT COMMENT    //Store Compliance ID and Application ID BISISI USE FOR BISISI UPLOAD LOCALSTORAGE FOR BISISI UPLOAD DOC
          localStorage.setItem("bisIsicompliance_id", bisIsicompliance_id);
          localStorage.setItem("bisIsiapplication_id", bisIsiapplication_id);
          localStorage.setItem("bisIsirequest_for", bisIsirequest_for);

          //Notification DATA SET HERE ----------------------------------------------------
          // const notificationData = data["notifications"]
          // console.log(notificationData)
          // setNotifiData(notificationData)

          axiosInstance
            .get(
              `application/document/?compliance=${bisIsicompliance_id}&application=${bisIsiapplication_id}`
            )
            .then((response) => {
              const bisIsidocumentData = response.data.data;
              //console.log(response.data.key)

              localStorage.setItem("report", response.data.report);
              localStorage.setItem("certificate", response.data.certificate);
              //  console.log(response.data.key)

              //store button APIS data here button name download report and download certificate

              const docReport = {};
              const docCertificate = {};

              response.data.data.forEach((item) => {
                const documentType = item.document_type;
                const fileType = item.document;

                if (documentType.toLowerCase().includes("report_")) {
                  docReport[documentType] = fileType;
                }

                if (documentType.includes("certificate_")) {
                  docCertificate[documentType] = fileType;
                }
              });

              // Assuming you want to store these objects in the state variables 'setdocreport' and 'setdoctype'
              setDocReport(docReport);
              setDocType(docCertificate);

              const docStatus = {};
              for (let i = 0; i < bisIsidocumentData.length; i++) {
                const statusData = bisIsidocumentData[i];
                docStatus[statusData["document_type"]] = statusData["status"];
              }
              setDocStatus(docStatus);
              console.log(docStatus);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);

    return () => clearInterval(interval);
  }, [idel]);


    /*-------------------------------------------handleOptions download report----------------------------------*/
    const ReportOptionClick = (option) => {
        const reportKey = localStorage.getItem("report");
        console.log(reportKey);
        if (reportKey === "Yes") {
          // Create a popup window
        }
      };
    
      const CertificateOptionClick = (option) => {
        const certificateKey = localStorage.getItem("certificate");
        console.log(certificateKey);
        if (certificateKey === "Yes") {
          console.log(docType);
          var newWindow = window.open(Object.values(docType)[0], "_blank");
          newWindow.focus();
        }
      };


        //Download Button Code handleOptionClick

  const handleDownloadreport = () => {

    setIsLoading(true); // Start loading animation
    // create a new instance of jsPDF
    const doc = new jsPDF();

    //load the image
    const logoImg = new Image();
    logoImg.src = pdflogo;

    //wait for the image to load
    logoImg.onload = function() {
      // Add the content to the PDF
      doc.addImage(logoImg, "PNG", 10, 4, 50, 30);
      doc.text(`Compliance Type: ${complianceid}`, 10, 50);
      doc.text(`Application Number: ${uniqueid}`, 10, 60);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 70);
      doc.text("Details of Documents:-", 10, 160);

      // Define the table columns and rows
      const columns = ["Step Name", "Start Date", "Status"];
      const rows = [
        [
          "BIS Portal Registration",
          bisDocStep["1"] && bisDocStep["1"][2].slice(0, 10),
          bisDocStep["1"] && bisDocStep["1"][0],
        ],
        [
          "Sample Testing",
          bisDocStep["2"] && bisDocStep["2"][2].slice(0, 10),
          bisDocStep["2"] && bisDocStep["2"][0],
        ],
        [
          "Documentation",
          bisDocStep["3"] && bisDocStep["3"][2].slice(0, 10),
          bisDocStep["3"] && bisDocStep["3"][0],
        ],
        [
          "Filling Application",
          bisDocStep["4"] && bisDocStep["4"][2].slice(0, 10),
          bisDocStep["4"] && bisDocStep["4"][0],
        ],
        [
          "Approval",
          bisDocStep["5"] && bisDocStep["5"][2].slice(0, 10),
          bisDocStep["5"] && bisDocStep["5"][0],
        ],
        [
          "Issuance of certificate",
          bisDocStep["6"] && bisDocStep["6"][2].slice(0, 10),
          bisDocStep["6"] && bisDocStep["6"][0],
        ],
      ];

      // Generate the table using jspdf-autotable
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 75,
      });

      //SECOND TABLE DATA
      const columns1 = ["Step Name", "Status"];
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
      doc.save("Progress Tracker.pdf");
      setIsLoading(false); // Stop loading animation
    };
  };


       //Auto close POPup after click Sumbit
   const handlePopupClose = () => { 
    setButtonPopup(false);
    setButtonPopup2(false);
    setButtonPopup1(false);
   }



    return(
<div className="bgchangecompleted">
      <div className="ongoing-applications">
        <h1 className="ongo">BIS-ISI Inclusion Application</h1>
        <div className="ongoing-title">
          <h1 className="type">Compliance Type: {complianceid} </h1>
          <h1 className="appli">Application Number: {uniqueid} </h1>
          {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
        </div>

        {/*----------------UPLOAD BUTTON CODE ------------*/}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <BisIsiUploadDoc  onClose={handlePopupClose} />
        </Popup>

        {/*-----------LAB TESTING JSX CODE IS HERE----------*/}

        <div className="lab-testing-box">
          <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
            <BisIsiProduction onClose={handlePopupClose} />
          </Popup>
        </div>

        {/*------------------DOWNLOAD BUTTON CODE ----------------*/}

        <div className="header-btn1">
          <button
            className="testreq-btn"
            onClick={() => setButtonPopup2(true)}
            // disabled={testingbtnkey === "Yes"}
          >< FcDocument />
            Request Testing
          </button>
          <button className="upload-btn" onClick={() => setButtonPopup(true)}>
          < FiUpload />
            Upload
          </button>
          <button className="download-btn" onClick={() => setButtonPopup1(true)}>
          <FiDownload />
            Download
          </button>
          {/* <button className='button7' onClick={() => setButtonPopup11(true)}>Notification</button> */}
        </div>

        <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
          <BisIsiDownload onClose={handlePopupClose} />
        </Popup>

        {/*--------Ststus Bar CODE IS HERE --------------------*/}
        <div>
          <StatusBar
            totalResponses={totalResponses}
            completedResponses={completedResponses}
          />
        </div>
        {/* BISISIInclusion STEPS SET HER MESSAGE AND ALL */}
        <BISISIInclusionSteps />


        {/* POPUP OF LAST BUTTON OF DOWNLOAD REPORT FUNCTION AS WELL  */}
        <Message trigger={buttonPopupreport} setTrigger={setButtonPopupreport}>
          <h1 style={{ color: "black", fontSize: "24px", textAlign: "center" }}>
            Download Test Report
          </h1>
          <ul>
            {Object.entries(docReport).map(
              ([documentType, fileDownloadLink]) => {
                const modifiedDocumentType = documentType.replace(
                  /report_/i,
                  ""
                );
                return (
                  <li key={documentType}>
                    <a
                      href={fileDownloadLink}
                      download={`${documentType}.${fileDownloadLink
                        .split(".")
                        .pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="button7">
                        {modifiedDocumentType}
                      </button>
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </Message>

        {/*------- LAST THREE BUTTON CODES HERE --------------------*/}

        <div className="dd-menu">
          <button className="reportbtn" onClick={handleDownloadreport}>
          <FiDownload />
            Download Progress Report
          </button>
          <button
            className="reportbtn"
            onClick={() => {
              ReportOptionClick();
              setButtonPopupreport(true);
            }}
            disabled={localStorage.getItem("report") === "No"}
          >
               <FiDownload />
            Download Test Report
          </button>

          <button
            className="reportbtn"
            onClick={CertificateOptionClick}
            disabled={localStorage.getItem("certificate") === "No"}
          >
               <FiDownload />
            Download Certificate
          </button>
        </div>

        {/* <BISChatbot /> */}
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </div>
    );
};

export default BisIsiInclusion;