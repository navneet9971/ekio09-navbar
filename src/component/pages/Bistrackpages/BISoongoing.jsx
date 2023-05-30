import React, { useState, useEffect } from "react";
//import jsPDF from 'jspdf';
import "../stepper.css";
import Select from 'react-select';
import Popup from "../../pagesscrn4/popup/Popup";
import Message from "../../pagesscrn4/popup/Message";
import axiosInstance from "../../../interceptors/axios";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { ReactComponent as Thum1png } from "../../assets/bis-track-icons/regi.svg";
import { ReactComponent as Thum2png } from "../../assets/bis-track-icons/testi.svg";
import { ReactComponent as Thum3png } from "../../assets/bis-track-icons/doc.svg";
import { ReactComponent as Thum4png } from "../../assets/bis-track-icons/appi.svg";
import { ReactComponent as Thum5png } from "../../assets/bis-track-icons/apro.svg";
import { ReactComponent as Thum6png } from "../../assets/bis-track-icons/certi.svg";
import { ReactComponent as Wrong } from "../../assets/trckpg-rb/wrong.svg";
import { ReactComponent as Right } from "../../assets/trckpg-rb/right.svg";
import file6png from "../../assets/pdficon/Red02.png";
import pdflogo from "../../assets/icons/eikomp_logo.png"
import StatusBar from "../../Statusbar";
import BISChatbot from "../../Chatbot/BISChatbot";
import Swal from 'sweetalert2';




function BISoongoing() {
   //const [currentStep] = useState(1);
  //const steps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Document pending with authorities", "Final report generated"];
   //const [current, setCurrentStep] = useState(1);
 //const [setComplete] = useState(false);
  const [docStatus, setDocStatus] = useState({});
  const [docStep, setdocStep] = useState({});
  //const [startDate, setStartDate] = useState('');
  const [uniqueid, setUniqueid] = useState("");
  const [complianceid, setComplianceid] = useState("");
  const idel = localStorage.getItem('ide');
  const [testingbtnkey, setTestingbtnkey] =useState("");
  const [documentType, setDocumentType] = useState('');
  const [uploades ,setUploades] = useState('');
  const [buttonPopup, setButtonPopup] = useState(false);
  const [options] = useState(['Business License', 'ISO', 'Trademark Cetificate', 'AdharCard', 'PanCard', 'GST', 'Employee ID/Visiting Card of Siging authority', 'MSME', 'Form 3 (AFFIDAVIT)']); 
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const totalResponses = 6; 
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

   //LAB TESTING FROM CONST HERE ---------------------------------------
const [buttonPopup2, setButtonPopup2] = useState(false);
  //const [buttonPopup1, setButtonPopup1] = useState(false);

  const [Testing_type, setTesting_type] = useState("");
  const [Product_name, setProduct_name] = useState("");
  const [Model_number, setModel_number] = useState("");
  const [Brand_name, setBrand_name] = useState("");
  const [Series_model, setSeries_model] = useState("");
  const [Electrical_rating, setElectrical_rating] = useState("");
  const [Lab_name, setLab_name] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [IS_standard, setIS_standard] = useState("");
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
  

  //Download Form Const------------HERE
 

  //const useing APIS call from upload button 
  const [compliance_id, setCompliance_id1] = useState(null);
  const [application_id, setApplication_id1]=  useState(null);

// LAB TESTING FROM DATA HANDLE HERE WITH APIS ------------------------------
const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData();
  // formData.append('application', localStorage.getItem('newApplicationId'));
  // formData.append('compliance', localStorage.getItem("compliance_id"));
  formData.append('request_for', 'lab_testing');
  formData.append("Testing_type", Testing_type);
  formData.append("Product_name", Product_name);
  formData.append("Model_number", Model_number);
  formData.append("Brand_name", Brand_name);  
  formData.append("Series_model", Series_model);
  formData.append("Electrical_rating", Electrical_rating);
  formData.append("Lab_name", Lab_name);
  formData.append("Quantity", Quantity);
  formData.append("IS_standard", IS_standard);
 
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
   

  console.log('Application ID:', localStorage.getItem('newApplicationId'));
  console.log('Compliance ID:', localStorage.getItem("compliance_id"));

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
        setCompliance_id1(compliance_id);
        setApplication_id1(application_id);
        console.log(compliance_id)
        console.log(application_id)
  
  
        console.log(data)
        // store local storage then show the values 
        setUniqueid(data["uniqueid"]);
        setComplianceid(data["compliance_name"])
        setTestingbtnkey(data["testing"]);
        console.log(data["testing"]);
  
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

            let count = 0;  
            for (let i = 0; i < stepstatus.length; i++) {
              if (stepstatus[i].status === 'Completed') {
                count += 1;
              }
            }
            localStorage.setItem('stepstatus', count);
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

           localStorage.setItem("report", response.data.report);
           localStorage.setItem("certificate",response.data.certificate)
         //  console.log(response.data.key)
          
       //store button APIS data here button name download report and download certificate 
      
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
   const rows = [['BIS Portal Registration', docStep["1"] && docStep["1"][2].slice(0,10), docStep["1"] && docStep["1"][0]],
                ['Sample Testing', docStep["2"] && docStep["2"][2].slice(0,10), docStep["2"] && docStep["2"][0] ],
                ['Documentation', docStep["3"] && docStep["3"][2].slice(0,10), docStep["3"] && docStep["3"][0]  ],
                ['Filling Application', docStep["4"] && docStep["4"][2].slice(0,10), docStep["4"] && docStep["4"][0] ],
                ['Approval', docStep["5"] && docStep["5"][2].slice(0,10), docStep["5"] && docStep["5"][0] ],
                ['Issuance of certificate', docStep["6"] && docStep["6"][2].slice(0,10), docStep["6"] && docStep["6"][0]], 
  ];

 
   // Generate the table using jspdf-autotable
   doc.autoTable({
     head: [columns],
     body: rows,
     startY: 75,
   });


   //SECOND TABLE DATA 
   const columns1 =['Step Name', 'Status']
   const rows1 =[['Business License', docStatus['Business License']],
   ['ISO', docStatus['ISO']],
   ['Trademark Cetificate', docStatus['Trademark Cetificate']],
   ['AdharCard', docStatus['AdharCard']],
   ['PanCard', docStatus['PanCard']],
   ['GST', docStatus['GST']],
   ['Employee ID/Visiting Card of Siging authority', docStatus['Employee ID/Visiting Card of Siging authority']],
   ['MSME', docStatus['MSME']],
  ['Form 3 (AFFIDAVIT)', docStatus['Form 3 (AFFIDAVIT)']],
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
     function handleUpload() {
      const formData = new FormData();
    
      for (let i = 0; i < uploades.length; i++) {
        formData.append('document', uploades[i]);
      }
      formData.append('application', application_id);
      formData.append('compliance', compliance_id);
      formData.append('document_type', documentType);
      formData.append('status', 'Submitted');
  
      console.log(application_id)
      console.log(compliance_id)
      console.log(documentType)
    
      axiosInstance.post('application/document/', formData, {
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
    const certificateKey = localStorage.getItem("certificate");
    console.log(certificateKey);
    if (certificateKey === 'Yes') {
     console.log(docType)
     var newWindow = window.open(Object.values(docType)[0], '_blank');
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

    //LINK CHANGE TEC FORMS TO BIS FORMS---------------------------------------------------------------------------
    const docDownload = {
      SELF_DECLARATION_FACTORY: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Shareholding_Pattern.docx ',
      Authorization_Form_top_management: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Manufacturing_details_tfyJoOx.xlsx',
      Brand_Authorization: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/CDF-CCL_Format_TMdRsOP.docx',
      Brand_Declaration: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annex_1_Signatory_authorization.docx', 
      SELF_Declaration_AIR: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annexure_2_OEM_authorized_to_AIR.docx', 
      Authorization_from_top_Management_AIR: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annexure_3_MOU.docx',
      Undertaking:"",
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
        })
        .catch(error => {
          console.error('There was an error downloading the file:', error);
        });
    };
  
  const options1 = [
    { value: 'SELF_DECLARATION_FACTORY', label: 'SELF-Declaration-Factory'},
    { value: 'Authorization_Form_top_management', label: 'Authorization from top management (Factory' },
    { value: 'Brand_Authorization', label: 'Brand Authorization' },
    { value: 'Brand_Declaration', label: 'Brand Declaration'},
    { value: 'SELF_Declaration(AIR)', label: 'SELF-Declaration(AIR)'},
    { value: 'Authorization_from_top_Management(AIR)', label: 'Authorization from top Management(AIR)'},
    { value: 'Undertaking', label: 'Undertaking'},
  ];


    return (
     <div className="bgchangecompleted">
      <div className="ongoing-applications">
      <h1 className="ongo">BIS Ongoing Application</h1>
      <div className="ongoing-title">
        <h1 className="type">Compliance Type: {complianceid} </h1>
        <h1 className="appli">Application Number:  {uniqueid}  </h1>
       {/* <button className="clidown" onClick={handleDownload}>Download</button> */}
      </div>

 {/*----------------UPLOAD BUTTON CODE ------------*/ }
 <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
<div>
  <div>
  <h3>Upload a File</h3>
  <input type ="file" name="file" onChange={(e) => setUploades(e.target.files)}/>
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
              Testing:
             <select className='st804' onChange={(event) =>  setTesting_type(event.target.value)}>
              <option value="Main">MAIN</option>
              <option value="Successive">SUCCESSIVE</option>
             </select>
            </label>
          
            <label className="st8012">
              Product Name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setProduct_name(event.target.value)}

              />
            </label>
            <label className="st8012">
              Model No:
              <input
                className="st805"
                type="text"
                onChange={(event) => setModel_number(event.target.value)}

              />
            </label>
           
            <label className="st8012">
              Brand:
              <input
                className="st805"
                type="text"
                onChange={(event) => setBrand_name(event.target.value)}

              />
            </label>
            <label className="st8012">
              Series Model:
              <input
                className="st805"
                type="text"
                onChange={(event) => setSeries_model(event.target.value)}

              />
            </label>
            <label className="st8012">
              Electrical Rating:
              <input
                className="st805"
                type="text"
                onChange={(event) =>  setElectrical_rating(event.target.value)}

              />
            </label>

            <label className="st8012">
              Lab Name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setLab_name(event.target.value)}

              />
            </label>

            
            <label className="st8012">
              Quantity:
              <input
                className="st805"
                type="text"
                onChange={(event) => setQuantity(event.target.value)}

              />
            </label>

                
            <label className="st8012">
              IS standard:
              <input
                className="st805"
                type="text"
                onChange={(event) => setIS_standard(event.target.value)}

              />
            </label>
            
          
            <label className="st8012">
              Filled CDF/CCL (Format attached):
              <input className="stup805" type="file"   onChange={(event) => setCdfccl(event.target.files)} />
            </label>
            <label className="st8012">
              Complete User Manual:
              <input className="stup805" type="file"  onChange={(event) => setUsermanual(event.target.files)} />
            </label>
            <label className="st8012">
              Circuit Diagram:
              <input className="stup805" type="file"  onChange={(event) => setCircuitdiagram(event.target.files)} />
            </label>
            <label className="st8012">
              PCB Layout:
              <input className="stup805" type="file"  onChange={(event) => setPcblayout(event.target.files)} />
            </label>
            <label className="st8012">
              Marking Label:
              <input className="stup805" type="file"  onChange={(event) => setPcblayout(event.target.files)} />
            </label>
            <label className="st8012">
              Technical Specification:
              <input className="stup805" type="file"  onChange={(event) => setPcblayout(event.target.files)} />
            </label>
           

            <button className='btn809' type="submit">Submit</button>
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
<button className="button7" onClick={() => setButtonPopup2(true)} disabled={testingbtnkey === 'Yes'} >Request Testing</button>
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

{/*--------Ststus Bar CODE IS HERE --------------------*/}
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



  </div>

  
  <h2 className="pdfstep-name"> Documents To Be Submitted</h2>  
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

{docStatus['Employee ID/Visiting Card of Siging authority'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">Employee ID/Visiting Card </h3>
</div>

<div className="col doc-col">

{docStatus['MSME'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">MSME</h3>
</div>

<div className="col doc-col">

{docStatus['Form 3 (AFFIDAVIT)'] === 'Submitted' ? ( <> <Right size={24} className="pdfico" /> </> ) : ( <Wrong size={24} className="pdfico" /> )}
  <div>
    <img src={file6png} alt="" className="pdfico1" />
  </div>
  <h3 className="be">Form 3 (AFFIDAVIT)</h3>
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
          <button className="reportbtn" onClick={handleDownloadreport} >Download Progress Report</button>
          <button className="reportbtn" onClick={() => {
  ReportOptionClick();
  setButtonPopupreport(true);
}} disabled={localStorage.getItem("report") === 'No'}>Download Test Report</button>

          <button className="reportbtn" onClick={CertificateOptionClick} disabled={localStorage.getItem("certificate") === 'No'}>Download Certificate
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
    <BISChatbot /> 
  
        </div>
       </div>
  
  
    );
  };

  export default BISoongoing;
  