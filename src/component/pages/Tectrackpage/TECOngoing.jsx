import React, { useState, useEffect } from "react";
//import jsPDF from 'jspdf';
import "../stepper.css";
import Select from 'react-select';
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
import Swal from 'sweetalert2';




function TECOngoing() {
   // const [currentStep] = useState(1);
  // const steps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Document pending with authorities", "Final report generated"];
   // const [current, setCurrentStep] = useState(1);
 //   const [setComplete] = useState(false);
  const [docStatus, setDocStatus] = useState({});
  const [docStep, setdocStep] = useState({});
  //const [startDate, setStartDate] = useState('');
  const [uniqueid, setUniqueid] = useState("");
  const [complianceid, setComplianceid] = useState("");
  const idel = localStorage.getItem('ide');
  const [testingbtnkey, setTestingbtnkey] =useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const totalResponses = 8;
  const completedResponses = localStorage.getItem('stepstatus');
  const [docReport, setDocReport] = useState("");
  const [docType, setDocType] = useState("");

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
   const [buttonPopupreport, setButtonPopupreport] = useState(false);


//Notification Button Const Here all---------------
const [buttonPopup11, setButtonPopup11] = useState(false);
  const [notifyData] = useState([
    { "s.no": '1', category: 'Mobile', Title: 'SAMSUNG', external: 'In Progress', date: '02-12-2023' },
    { "s.no": '2', category: 'Screen', Title: 'APPLE', external: 'Completed', date: '02-12-2023' },
    { "s.no": '3', category: 'Chipset', Title: 'SAMSUNG', external: 'Pending', date: '02-12-2023' },
  ]);


   //LAB TESTING FROM CONST HERE ---------------------------------------
const [buttonPopup2, setButtonPopup2] = useState(false);
  //const [buttonPopup1, setButtonPopup1] = useState(false);
  const [testingProductName, setTestingProductName] = useState("");
  const [testingModelNo, setTestingModelNo] = useState("");
  const [testingAssociated, setTestingAssociated] = useState("");
  const [testingHardwareNumber, setTestingHardwareNumber] = useState("");
  const [testingSoftwareNumber, setTestingSoftwareNumber] = useState("");
  const [testingBrand, setTestingBrand] = useState("");
  const [testingSr, setTestingSr] = useState("");
  const [testingElectrical, setTestingElectrical] = useState("");
  const [testingProductType, setTestingProductType] = useState("");
  const [testingProductTypeOther, setTestingProductTypeOther] = useState("")
  const [testingProductUse, setTestingProductUse] = useState("");
  const [testingProductOther, setTestingProductOther] = useState("");
  //const [testingSoftware, setTestingSoftware] = useState("");
  const [testingTechnicalsupportName, setTestingTechnicalsupportName] = useState("");
  const [testingTechnicalsuppoertNumber, setTestingTechnicalsuppoertNumber] = useState("");
  // const [manufacturingProductName, setManufacturingProductName] = useState("");
  // const [manufacturingModelNo, setManufacturingModelNo] = useState("");
  // const [manufacturingAssociatedModels, setManufacturingAssociatedModels] = useState("");
  // const [manufacturingManufacturingName, setManufacturingManufacturingName] = useState("");
  // const [manufacturingManufacturingAddress, setManufacturingManufacturingAddress] = useState("");
  // const [manufacturingManufacturingCountry, setManufacturingManufacturingCountry] = useState("");
  // const [manufacturingContactName, setManufacturingContactName] = useState("");
  // const [manufacturingContactNumber, setManufacturingContactNumber] = useState("");
  // const [manufacturingContactEmail, setManufacturingContactEmail] = useState("");
  // const [manufacturingOrigin, setManufacturingOrigin] = useState("");
  // const [manufacturingContract, setManufacturingContract] = useState("");
  const [cdfccl, setCdfccl] = useState("");
  const [usermanual, setUsermanual] = useState("");
  const [circuitdiagram, setCircuitdiagram] = useState("");
  const [pcblayout, setPcblayout] = useState("");
  const [softwareuser, setSoftwareuser] = useState("");
  

  //Download Form Const------------HERE
 

  //const useing APIS call from upload button 
  // const [compliance_id, setCompliance_id1] = useState(null);
  // const [application_id, setApplication_id1]=  useState(null);

// LAB TESTING FROM DATA HANDLE HERE WITH APIS ------------------------------
const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData();
  // formData.append('application', localStorage.getItem('newApplicationId'));
  // formData.append('compliance', localStorage.getItem("compliance_id"));
  formData.append('request_for', 'lab_testing');
  formData.append("Product_name", testingProductName);
  formData.append("Model_number", testingModelNo);
  formData.append("Associate_models", testingAssociated);
  formData.append("Hardware_number", testingHardwareNumber);
  formData.append("Software_number", testingSoftwareNumber);
  formData.append("Brand", testingBrand);
  formData.append("Serial_number", testingSr);
  formData.append("Electrical_rating", testingElectrical);
  formData.append("Product_type", testingProductType);
  formData.append("Product_type_other", testingProductTypeOther)
  formData.append("Product_use", testingProductUse);
  formData.append("Product_use_other", testingProductOther);
 // formData.append("testingSoftware", testingSoftware);
  formData.append("Technical_support_person_name", testingTechnicalsupportName);
  formData.append("Technical_support_person_contact_number", testingTechnicalsuppoertNumber);
  // formData.append("manufacturingProductName", manufacturingProductName);
  // formData.append("manufacturingModelNo", manufacturingModelNo);
  // formData.append("manufacturingAssociatedModels", manufacturingAssociatedModels);
  // formData.append("manufacturingManufacturingName", manufacturingManufacturingName);
  // formData.append("manufacturingManufacturingAddress", manufacturingManufacturingAddress);
  // formData.append("manufacturingManufacturingCountry", manufacturingManufacturingCountry);
  // formData.append("manufacturingContactName", manufacturingContactName);
  // formData.append("manufacturingContactNumber", manufacturingContactNumber);
  // formData.append("manufacturingContactEmail", manufacturingContactEmail);
  // formData.append("manufacturingOrigin", manufacturingOrigin);
  // formData.append("manufacturingContract", manufacturingContract);


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

  // function to handle form submission
  axiosInstance.put(`/application/compliance/${idel}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    }
  }).then(response => {
    // form submission successful
    setButtonPopup2(true);
    console.log(response.data);

    const formSubmitted = true ; // Corrected the assignment statement
      
    if (formSubmitted) { // Assuming success status is available in uploadStatus
      Swal.fire({
        icon: 'success',
        title: 'Form Submitted',
        text: 'Your request for testing has been successfully submitted',
        confirmButtonText: 'OK',
      });
      setButtonPopup2(false);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Form Submitted Failed',
        text: 'Testing Form failed. Please try again.',
        confirmButtonText: 'OK',
      });
    }
  })
  .catch((error) => {
    // Handle error case here
    Swal.fire({
      icon: 'error',
      title: 'Form Submitted Failed',
      text: 'Sorry, there was an error Submitted your form',
      confirmButtonText: 'OK',
    });
  });      
}

 //setButtonPopup2(false);




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
    const interval = setInterval(() => {
    axiosInstance.get(`application/compliance/${idel}/`)
      console.log('Refreshing Data..!!');
      axiosInstance.get(`application/compliance/${idel}/`)
      .then(response => {
        const data = response.data.data;
        const compliance_id = data["compliance"];
        const application_id = data["application"];
        const request_for = data["request_for"];
        // setCompliance_id1(compliance_id);
        // setApplication_id1(application_id);
        console.log(compliance_id)
        console.log(application_id)
  
        console.log(data)
        // store local storage then show the values 
        setUniqueid(data["uniqueid"]);
        setComplianceid(data["compliance_name"]);
        setTestingbtnkey(data["testing"]);
        console.log(data["testing"]);

  
        const compliancename = data["compliance_name"]
        localStorage.setItem("compliance_name", compliancename)
  
        //status APIs used 
        axiosInstance.get(`application/status/?compliance=${compliance_id}&application=${application_id}&request_for=${request_for}`)
          .then(response => {
            const stepstatus = response.data.data;
            console.log(stepstatus)
            const newDocStep = {}; // create a new object that copies the existing state
            for (let i = 0; i < stepstatus.length; i++) {
              const step = stepstatus[i];
              newDocStep[step.step] = [step.status, step.message, step.start_date];
            }

            // Store the length of stepstatus in localStorage

            let count = 0;  
            for (let i = 0; i < stepstatus.length; i++) {
              if (stepstatus[i].status === 'Completed') {
                count += 1;
              }
            }
            localStorage.setItem('stepstatus', count);   
            console.log(count);         
            setdocStep(newDocStep);
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
           localStorage.setItem("finalcertificate",response.data.certificate)
          
                const docReport = {};
                const docCertificate = {};

                response.data.data.forEach((item) => {
                  const documentType = item.document_type;
                  const fileType = item.document;
                  
                  if (documentType.includes('report_')) {
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
           console.log(docStatus);
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
    


 /*   const handleDownload = () => {
      const input = document.getElementById('pdf-content');
      const pdf = new jsPDF();
      pdf.addHTML(input, () => {
        pdf.save('document.pdf');
      });
    }; 
  */

    /*---- upload button APIS CALLS */
    const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState([]);

  const options = [
    { label: 'Authorized Signatory Letter', value: 'authorized_signatory_letter' },
    { label: 'MOU', value: 'mou' },
    { label: 'AOA', value: 'aoa' },
    { label: 'OEM authorized to AIR', value: 'oem_authorized' },
    { label: 'MOA', value: 'moa' },
    { label: 'Certificate of Incorporation', value: 'certificate_of_incorporation' }
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDocumentTypeChange = (selectedOptions) => {
    setSelectedDocumentTypes(selectedOptions);
  };

  const handleRemoveFile = (file) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };


  function handleUpload() {
    const formData = new FormData();
  
    uploadedFiles.forEach((file) => {
      formData.append('documents', file);
    });
  
    axiosInstance.put(`application/compliance/${idel}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log(res);
        setButtonPopup('status');
  
        const uploadStatus = 'status'; // Corrected the assignment statement
  
        if (uploadStatus) { // Assuming success status is available in uploadStatus
          Swal.fire({
            icon: 'success',
            title: 'Upload Success',
            text: 'Your documents have been uploaded successfully',
            confirmButtonText: 'OK',
          });
          setButtonPopup(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'Sorry, there was an error uploading your documents',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((error) => {
        // Handle error case here
        Swal.fire({
          icon: 'error',
          title: 'Upload Failed',
          text: 'Sorry, there was an error uploading your documents',
          confirmButtonText: 'OK',
        });
      });
    
    console.log('Uploaded Files:', uploadedFiles);
    console.log('Selected Document Types:', selectedDocumentTypes);
    // setButtonPopup(false);
  }




/*-------------------------------------------handleOptions download report----------------------------------*/
    const ReportOptionClick = (option) => {
      const reportKey = localStorage.getItem("report");
      console.log(reportKey);
      if (reportKey === 'Yes') { 
      
        // Create a popup window       
      }
    };

    const CertificateOptionClick = (option) => {
      const certificateKey = localStorage.getItem("finalcertificate");
      console.log(certificateKey);
      if (certificateKey === 'Yes') {
       console.log(docType)
       var newWindow = window.open(docType.certificate_, '_blank');
       newWindow.focus();
      }
    };

    /*---------DOWNLOAD BUTTON APS CALLS------*/
    
    useEffect(() => {
      axiosInstance
        .get(`compliance-form/?compliance=TEC`)
        .then((response) => {
          const downloadData = response.data;
          localStorage.setItem("myKey", JSON.stringify(downloadData));

        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    
    const [selectedOptions, setSelectedOptions] = useState([]);

    const docDownload = {
      Shareholding_Pattern: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Shareholding_Pattern.docx',
      Manufacturing_details: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Manufacturing_Details.docx',
      CDFCCL_Format: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/CDF-CCL_Format.docx',
      Annex_1_Signatory_authorization: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annex_1_Signatory_authorization.docx', 
      Annexure_2_OEM_authorized_to_AIR: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annexure_2_OEM_authorized_to_AIR.docx', 
      Annexure_3_MOU: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annexure_3_MOU.docx',
    };
  
    const storedValue = JSON.parse(localStorage.getItem("myKey"));
    
  if (storedValue !== null) {
    const base = "https://eikomp-backend-media.s3.amazonaws.com/";
  const docStatus2 = {};

  for (let i = 0; i < storedValue.length; i++) {
    const statusData = storedValue[i];
    docStatus2[statusData["name"]] = `${base}${statusData["form"]}`;
  }
} else {
  console.error("There is no data stored in localStorage with the key 'myKey'");
}


    const handleDownload = (event) => {
      event.preventDefault();

         // Build the URLs based on the selected options and the docStatus data
         const urls = [];
         selectedOptions.forEach(option => {
           urls.push(docDownload[option.value]);
         });

          // Download the files
      const downloadPromises = urls.map(url => fetch(url));
      Promise.all(downloadPromises)
        .then(responses => Promise.all(responses.map(response => response.blob())))
        .then(blobs => {
          blobs.forEach((blob, index) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${selectedOptions[index].label}.docx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
          });

          
          if (downloadPromises) { // Assuming success status is available in uploadStatus
            Swal.fire({
              icon: 'success',
              title: 'Download Success',
              text: 'Your documents have been downloaded successfully',
              confirmButtonText: 'OK',
            });
            setButtonPopup1(false);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Download Failed',
              text: 'Sorry, there was an error downloading your documents',
              confirmButtonText: 'OK',
            });
          }
        })
        .catch(error => {
          console.error('There was an error downloading the file:', error);
        });
    };
  
  const options1 = [
    { value: 'Shareholding_Pattern', label: 'Shareholding Pattern'},
    { value: 'Manufacturing_details', label: 'Manufacturing Details' },
    { value: 'CDFCCL_Format', label: 'CDF/CCL Format' },
    { value: 'Annex_1_Signatory_authorization', label: 'Annex 1 Signatory authorization'},
    { value: 'Annexure_2_OEM_authorized_to_AIR', label: 'Annexure 2 OEM authorized to AIR'},
    { value: 'Annexure_3_MOU', label: 'Annexure 3 MOU'},
  ];


  

    return (
     <div className="bgchangecompleted">
      <div className="ongoing-applications">
      <h1 className="ongo">TEC Ongoing Application</h1>
      <div>
        <h1 className="type">Compliance Type: {complianceid} </h1>
        <h1 className="appli">Application Number:  {uniqueid}  </h1>
       {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
      </div>

 {/*----------------UPLOAD BUTTON CODE ------------*/ }
 <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
<div>
  <div>
  <h3>Upload Files</h3>
      <input type="file" name="file" onChange={handleFileChange} multiple />
</div>
<div>
        <Select
          className="optionss"
          value={selectedDocumentTypes}
          onChange={handleDocumentTypeChange}
          options={options}
          isMulti
          placeholder="Select Document Types"
        />
      </div>
 
      <div>
        <h4 className="showselectfiles">Selected Files:</h4>
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked
                onChange={() => handleRemoveFile(file)}
              />
              {file.name}
            </li>
          ))}
        </ul>
      </div>

      {uploadedFiles.length > 0 && (
        <button className="showselectfiles" onClick={() => setUploadedFiles([])}>Clear Files</button>
      )}

  <div>
  <button className = "btn809" onClick={handleUpload}>UPLOAD</button>
  {/* {uploadStatus &&
    <div className="submit-pop">
      <p>{uploadStatus === 'status' ? 'Your documents have been uploaded successfully' : 'There was an error uploading your document.'}</p>
      <button className="sumbitpop-btn" onClick={() => setUploadStatus('')}>OK</button>
    </div>  
  } */}
  </div>
</div>
</Popup>

{/*-----------LAB TESTING JSX CODE IS HERE----------*/}

<div className="lab-testing-box">
      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
        <div style={{ height: "500px", overflow: "scroll" }}>
          <h1 className="h801">Testing Information Required</h1>
          <form onSubmit={handleSubmit}>
          
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
        Product Type:
        <select className="st804" onChange={(event) => setTestingProductType(event.target.value)}>
          <option value="Fixed">Fixed</option>
          <option value="Industrial">Industrial</option>
          <option value="Portable">Portable</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label className="st8012">
              Product Type (if other):
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingProductTypeOther(event.target.value)}
              />
            </label>
          
            <label className="st8012">
              Product Use:
              <select className="st804" onChange={(event) => setTestingProductUse(event.target.value)}>
                <option value="Indoor">Indoor</option>
                <option value="Outdoor">Outdoor</option> 
                <option valur="Other">Other</option>              
              </select>
            </label>

            <label className="st8012">
              Product Use(if other):
              <input
                className="st805"
                type="text"
                onChange={(event) => setTestingProductOther(event.target.value)}

              />
            </label>

            <label className="st8012">
              Filled CDF/CCl (Format attached):
              <input className="stup805" type="file"   onChange={(event) => setCdfccl(event.target.files)}/>
            </label>
            <label className="st8012">
              Complete User Manual:
              <input className="stup805" type="file"  onChange={(event) => setUsermanual(event.target.files)}/>
            </label>
            <label className="st8012">
              Circuit Diagram:
              <input className="stup805" type="file"  onChange={(event) => setCircuitdiagram(event.target.files)}/>
            </label>
            <label className="st8012">
              PCB Layout:
              <input className="stup805" type="file"  onChange={(event) => setPcblayout(event.target.files)}/>
            </label>
            <label className="st8012">
              Software used (if any):
              <input className="stup805" type="file"  onChange={(event) => setSoftwareuser(event.target.files)}/>
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


            {/* <h1 className="h801">Manufacturing Location Information:</h1>
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
            </label> */}

            <button className='btn809' type="submit">Submit</button>

            {/* {formSubmitted && (
        <div className="submit-pop">
          {formSubmitted === true ? (
            <p>Your request for testing has been successfully submitted</p>
          ) : (
            <p>Testing Form failed. Please try again.</p>
          )}
          <button className="sumbitpop-btn" onClick={handleClosePopup}>OK</button>
        </div>
      )} */}
          </form>
        </div>
      </Popup>
      
      
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



{/*------------------DOWNLOAD BUTTON CODE ----------------*/}

<div className="header-btn1">
<button className="button7" onClick={() => setButtonPopup2(true)} disabled={testingbtnkey === 'Yes'}>Request Testing</button>
<button className="button7" onClick={() => setButtonPopup(true)}>Upload</button>
<button className="button7" onClick={() => setButtonPopup1(true)}>Download</button>
<button className='button7' onClick={() => setButtonPopup11(true)}>Notification</button>
</div>
<Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <h3>Download a File</h3>
        <label>
  <h4>Select file(s) to download:</h4>
  <div className="scroll-bar">
  <div className="select-container">
    <Select
      options={options1}
      value={selectedOptions}
      onChange={setSelectedOptions}
      isMulti
      placeholder="Select files..."
    />
  </div>
</div>
</label>
          <div>
          <button className="btn809" type="submit" onClick={handleDownload}>Download</button>
          </div>
          </Popup>

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
  <h2>  Message :- 
   {docStep["1"] && docStep["1"][1]}</h2>
   <h2>Start Date :- 
   {docStep["1"] && docStep["1"][2].slice(0,10)}</h2>
   </Message>

  <Thum1png className="mainsvg2" />
  {docStep["1"] && docStep["1"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup3(true)} />
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup3(true)}/>
  )}



<Message trigger={buttonPopup4} setTrigger={setButtonPopup4}>
<h2>  Message :- 
   {docStep["2"] && docStep["2"][1]}</h2>
   <h2>Start Date :-
   {docStep["2"] && docStep["2"][2].slice(0,10)}</h2>
   </Message>

  <Thum2png className="mainsvg2" />
  {docStep["2"] && docStep["2"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
  )}


<Message trigger={buttonPopup5} setTrigger={setButtonPopup5}>
<h2>  Message :- 
   {docStep["3"] && docStep["3"][1]}</h2>
   <h2>Start Date :-
   {docStep["3"] && docStep["3"][2].slice(0,10)}</h2>
   </Message>

  <Thum3png className="mainsvg2" />
  {docStep["3"] && docStep["3"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
  )}


<Message trigger={buttonPopup6} setTrigger={setButtonPopup6}>
<h2>  Message :- 
   {docStep["4"] && docStep["4"][1]}</h2>
   <h2>Start Date :-
   {docStep["4"] && docStep["4"][2].slice(0,10)}</h2>
   </Message>

  <Thum4png className="mainsvg2" />
  {docStep["4"] && docStep["4"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
  )}

<Message trigger={buttonPopup7} setTrigger={setButtonPopup7}>
<h2>  Message :- 
   {docStep["5"] && docStep["5"][1]}</h2>
   <h2>Start Date :-
   {docStep["5"] && docStep["5"][2].slice(0,10)}</h2>
   </Message>

  <Thum5png className="mainsvg2" />
  {docStep["5"] && docStep["5"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
  )}

<Message trigger={buttonPopup8} setTrigger={setButtonPopup8}>
<h2>  Message :- 
   {docStep["6"] && docStep["6"][1]}</h2>
   <h2>Start Date :-
   {docStep["6"] && docStep["6"][2].slice(0,10)}</h2>
   </Message>

  <Thum6png className="mainsvg2" />
  {docStep["6"] && docStep["6"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
  )}

<Message trigger={buttonPopup9} setTrigger={setButtonPopup9}>
<h2>  Message :- 
   {docStep["7"] && docStep["7"][1]}</h2>
   <h2>Start Date :-
   {docStep["7"] && docStep["7"][2].slice(0,10)}</h2>
   </Message>

  <Thum7png className="mainsvg2" />
  {docStep["7"] && docStep["7"][0] === "Completed" ? (
    <Right className="mainsvg3" onClick={() => setButtonPopup9(true)}/>
  ) : (
    <Wrong className="mainsvg3" onClick={() => setButtonPopup9(true)}/>
  )}

<Message trigger={buttonPopup10} setTrigger={setButtonPopup10}>
<h2>  Message :- 
   {docStep["8"] && docStep["8"][1]}</h2>
   <h2>Start Date :-
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
          {docStatus['Authorized Signatory Letter'] === "Submitted" ? ( <> <Right size={24} className="pdfico" />  </>) : (<Wrong size={24} className="pdfico" />) }
          <div>
            <img src={file6png} alt="" className="pdfico1" />
          </div>
          <h3 className="be">Authorized Signatory Letter</h3>
    </div>

            <div className="col doc-col">
              {docStatus['MOU'] === "Submitted" ? (  <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" />)}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">MOU</h3>
            </div>

            <div className="col doc-col">
              

            {docStatus['AOA'] === "Submitted" ? ( <> <Right size={24} className="pdfico" /> </> )  : ( <Wrong size={24} className="pdfico" /> )}
              <div>
                <img src={file6png} alt="" className="pdfico1" />
              </div>
              <h3 className="be">AOA</h3>
            </div>


            <div className="col doc-col">

            {docStatus['OEM authorized to AIR'] === "Submitted" ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}

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

{docStatus['Certificate of Incorporation'] === "Submitted" ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">Certificate of Incorporation</h3>
</div>
           

          </div>
        </div>
      


 {/* POPUP OF LAST BUTTON OF DOWNLOAD REPORT FUNCTION AS WELL  */}
 <Message trigger={buttonPopupreport} setTrigger={setButtonPopupreport}>
  <h1 style={{ color: 'black', fontSize: '24px', textAlign: 'center' }}>Report Popup</h1>
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
          <button className="reportbtn" onClick={handleDownloadreport} >Download Progress Report</button>
          <button className="reportbtn" onClick={() => {
  ReportOptionClick();
  setButtonPopupreport(true);
}} disabled={localStorage.getItem("report") === 'No'}>Download Test Report</button>

          <button className="reportbtn" onClick={CertificateOptionClick} disabled={localStorage.getItem("finalcertificate") === 'No'}>Download Certificate
          </button>                                      
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
  