import React, { useState, useEffect } from "react";
import "../../../pages/stepper.css";
import Popup from "../../../popup/Popup";
import Message from "../../../popup/Message";
import axiosInstance from "../../../../interceptors/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactLoading from "react-loading";
import { FcDocument } from "react-icons/fc";
import { FiUpload, FiDownload } from "react-icons/fi";
// import { ReactComponent as Wrong } from "../../../assets/trckpg-rb/wrong.svg";
// import { ReactComponent as Right } from "../../../assets/trckpg-rb/right.svg";
// import file6png from "../../../assets/pdficon/Red02.png";
import pdflogo from "../../../assets/icons/eikomp_logo.png";
import StatusBar from "../../../Statusbar";
import Chatbot from "../../../Chatbot/Chatbot";
import WPCLabTesting from "../WPCRequsttesting";
// import TECDownloadDoc from "../../TEC/TECDownloadDoc";
import WPCSteps from "../WPCSteps";
import WPCHandleUpload from "../WPCUploadDoc";


function WPCcompleted() {
  const [docStatus, setDocStatus] = useState({});
  const [uniqueid, setUniqueid] = useState("");
  const [complianceid, setComplianceid] = useState("");
  const [testingbtnkey, setTestingbtnkey] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [docReport, setDocReport] = useState("");
  const [docType, setDocType] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const totalResponses = 5;
  const idel = localStorage.getItem("ide");
  const completedResponses = localStorage.getItem("stepstatus");
  const wpcdocStep = JSON.parse(localStorage.getItem("wpcdocStep"));

  //POPUP BUTTONS OF STEPS
  const [buttonPopupreport, setButtonPopupreport] = useState(false);

  //Notification Button Const Here all---------------
  // const [buttonPopup11, setButtonPopup11] = useState(false);
  // const [notifiData, setNotifiData] = useState([]);

  // //Notification Date Sequnce
  // function formatDate(dateString) {
  //   const date = new Date(dateString);
  //   const day = date
  //     .getDate()
  //     .toString()
  //     .padStart(2, "0");
  //   const month = (date.getMonth() + 1).toString().padStart(2, "0");
  //   const year = date.getFullYear().toString();
  //   return `${day}/${month}/${year}`;
  // }

  //LAB TESTING FROM CONST HERE ---------------------------------------
  const [buttonPopup2, setButtonPopup2] = useState(false);

  // API call to get document status
  useEffect(() => {
    const interval = setInterval(() => {
      axiosInstance.get(`application/compliance/${idel}/`);
      // console.log('Refreshing Data..!!');
      axiosInstance
        .get(`application/compliance/${idel}/`)
        .then((response) => {
          const data = response.data.data;
          const compliance_id = data["compliance"];
          const application_id = data["application"];
          const request_for = data["request_for"];
          console.log(compliance_id);
          console.log(application_id);

          console.log(data);
          // store local storage then show the values
          setUniqueid(data["uniqueid"]);
          setComplianceid(data["compliance_name"]);
          setTestingbtnkey(data["testing"]);
          console.log(data["testing"]);

          const compliancename = data["compliance_name"];
          localStorage.setItem("compliance_name", compliancename);

          //Store Compliance ID and Application ID
          localStorage.setItem("wpccompliance_id", compliance_id);
          localStorage.setItem("wpcapplication_id", application_id);
          localStorage.setItem("wpcrequest_for", request_for);

          //Notification DATA SET HERE ----------------------------------------------------
          // const notificationData = data["notifications"];
          // console.log(notificationData);
          // setNotifiData(notificationData);

          axiosInstance
            .get(
              `application/document/?compliance=${compliance_id}&application=${application_id}`
            )
            .then((response) => {
              const documentData = response.data.data;
              //console.log(response.data.key)

              //store button APIS data here button name download report and download certificate
              localStorage.setItem("report", response.data.report);
              localStorage.setItem("certificate", response.data.certificate);

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
                  console.log(docCertificate);
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
          "Portal Registration",
          wpcdocStep["1"] && wpcdocStep["1"][2].slice(0, 10),
          wpcdocStep["1"] && wpcdocStep["1"][0],
        ],
        [
          "Sample Testing",
          wpcdocStep["2"] && wpcdocStep["2"][2].slice(0, 10),
          wpcdocStep["2"] && wpcdocStep["2"][0],
        ],
        [
          "Documents Preparation",
          wpcdocStep["3"] && wpcdocStep["3"][2].slice(0, 10),
          wpcdocStep["3"] && wpcdocStep["3"][0],
        ],
        [
          "Application Submission",
          wpcdocStep["4"] && wpcdocStep["4"][2].slice(0, 10),
          wpcdocStep["4"] && wpcdocStep["4"][0],
        ],
        [
          "Issuance of Certificate",
          wpcdocStep["5"] && wpcdocStep["5"][2].slice(0, 10),
          wpcdocStep["5"] && wpcdocStep["5"][0],
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
        [
          "Authorized  Letter",
          docStatus["Authorized Letter"],
        ],
        ["Test Report", docStatus["Test Report"]],
        ["Technical Specification", docStatus["Technical Specification"]],
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

  /*-------------------------------------------handleOptions download report----------------------------------*/
  const ReportOptionClick = (option) => {
    const reportKey = localStorage.getItem("report");
    console.log(reportKey);
    if (reportKey === "Yes") {
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

  //Auto close POPup after click Sumbit
  const handlePopupClose = () => {
    setButtonPopup(false);
    setButtonPopup1(false);
    setButtonPopup2(false);
  };

  return (
    <div className="bgchangecompleted">
      <div className="ongoing-applications">
        <h1 className="ongo">WPC Completed Application</h1>
        <div>
          <h1 className="type">Compliance Type: {complianceid} </h1>
          <h1 className="appli">Application Number: {uniqueid} </h1>
          {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
        </div>

        {/*----------------UPLOAD BUTTON CODE ------------*/}
        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <WPCHandleUpload onClose={handlePopupClose} />
        </Popup>

        {/*-----------LAB TESTING JSX CODE IS HERE----------*/}
        <div className="lab-testing-box">
          <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
            <WPCLabTesting onClose={handlePopupClose} />
          </Popup>
        </div>

        {/*---------------Notification code Here------------------------*/}
        {/* <Popup trigger={buttonPopup11} setTrigger={setButtonPopup11}>
          <div>
            <h3 className="notif">Notification</h3>
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
                    <td style={{ cursor: "default" }}>{index + 1}</td>
                    <td style={{ cursor: "default" }}>{data.category}</td>
                    <td style={{ cursor: "default" }}>{data.title}</td>
                    <td>
                      <a
                        href={data.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#55B600", fontWeight: "bold" }}
                      >
                        Download Document
                      </a>
                    </td>
                    <td style={{ cursor: "default" }}>
                      {formatDate(data.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Popup> */}

        {/*------------------DOWNLOAD BUTTON CODE ----------------*/}
        <div className="header-btn1">
          <button
            className="testreq-btn"
            onClick={() => setButtonPopup2(true)}
            disabled={testingbtnkey === "Yes"}
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
          {/* <button className="button7" onClick={() => setButtonPopup11(true)}>
            Notification
          </button> */}
        </div>

        <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
          {/* <TECDownloadDoc onClose={handlePopupClose} /> */}
        </Popup>

        {/*--------Status Bar CODE IS HERE --------------------*/}
        <div>
          <StatusBar
            totalResponses={totalResponses}
            completedResponses={completedResponses}
          />
        </div>

        <WPCSteps />

        {/*---------------------- PDF DATA WRITE OR WRONG CODE HERE ------------------------------------------------ */}

        {/* <h2 className="pdfstep-name"> Documents To Be Submitted</h2>
        <div className="pdffilesup">
          <div className="row1">
            <div className="col doc-col">
              {docStatus["Authorized Signatory Letter"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Authorized Signatory Letter</h3>
            </div>

            <div className="col doc-col">
              {docStatus["MOU"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">MOU</h3>
            </div>

            <div className="col doc-col">
              {docStatus["AOA"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">AOA</h3>
            </div>

            <div className="col doc-col">
              {docStatus["OEM authorized to AIR"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}

              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">OEM Authorized to AIR</h3>
            </div>

            <div className="col doc-col">
              {docStatus["MOA"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}

              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">MOA</h3>
            </div>

            <div className="col doc-col">
              {docStatus["Certificate of Incorporation"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Certificate of Incorporation</h3>
            </div>

            <div className="col doc-col">
              {docStatus["PAN Card of Applicant Company"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">PAN Card of Applicant Company</h3>
            </div>

            <div className="col doc-col">
              {docStatus["Shareholding Pattern"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Shareholding Pattern</h3>
            </div>

            <div className="col doc-col">
              {docStatus["Board Resolution (If required)"] === "Submitted" ? (
                <>
                  {" "}
                  <Right size={24} className="pdfico" />{" "}
                </>
              ) : (
                <Wrong size={24} className="pdfico" />
              )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">Board Resolution</h3>
            </div>
          </div>
        </div> */}

        {/* POPUP OF LAST BUTTON OF DOWNLOAD REPORT FUNCTION AS WELL  */}
        <Message trigger={buttonPopupreport} setTrigger={setButtonPopupreport}>
          <h1 style={{ color: "black", fontSize: "24px", textAlign: "center" }}>
            Download Test Report
          </h1>
          <ul>
            {Object.entries(docReport).map(
              ([documentType, fileDownloadLink]) => (
                <li key={documentType}>
                  <a
                    href={fileDownloadLink}
                    download={`${documentType}.${fileDownloadLink
                      .split(".")
                      .pop()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button7">{documentType}</button>
                  </a>
                </li>
              )
            )}
          </ul>
        </Message>
        {/*------- LAST THREE BUTTON CODES HERE --------------------*/}

        <div className="dd-menu">
          <button className="reportbtn" onClick={handleDownloadreport}>
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
            Download Test Report
          </button>

          <button
            className="reportbtn"
            onClick={CertificateOptionClick}
            disabled={localStorage.getItem("certificate") === "No"}
          >
            Download Certificate
          </button>
        </div>

        <Chatbot />
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </div>
  );
}

export default WPCcompleted;
