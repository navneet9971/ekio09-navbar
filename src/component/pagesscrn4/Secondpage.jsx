import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import Popup from "./popup/Popup";
import "./Pages.css";
import Swal from 'sweetalert2';



const Secondpage = () => {
  // const history = useHistory();
  const [complianceData, setComplianceData] = useState([]);
  const [applicationId, setNewApplicationId] = useState();


  // Calls APIs HERE ---------------------------------------------------------
  useEffect(() => {
    axiosInstance.get(`/compliance/?category=${localStorage.getItem("category")}&product=${localStorage.getItem("product")}&region=${localStorage.getItem("region")}`)
    .then(res => {
      const uniqueComplianceData = [];
      res?.data?.data.forEach(compliance => {
        // check if the compliance id already exists in the array
        if (!uniqueComplianceData.some(item => item.id === compliance.id)) {
          uniqueComplianceData.push(compliance);
        }
      });
      setComplianceData(uniqueComplianceData);
    }) 
    .catch(err => {
      alert('Something went wrong.')
    });

    //New form Application Create New ID APIS Call HERE  here ---------------
       axiosInstance
        .post(`application/form/`, {
          category: localStorage.getItem("category"),
          product: localStorage.getItem("product"),
        })
        .then((response) => {
          const id = response.data.data['id'];
          setNewApplicationId(id);
          localStorage.setItem("newApplicationId", id); // store id in localStorage
          console.log(id)
        })
        .catch((error) => {
          console.log(error);
        });
}, []);



  //Start TEC New Application Form const Code Here ---------------------------------
  const [buttonPopup5, setButtonPopup5] = useState(false);
  const [types_of_company, setTypes_of_company] = useState("");
  const [applicantCompanyName, setApplicantCompanyName] = useState("");
  const [applicantCompanyAddress, setApplicantCompanyAddress] = useState("");
  const [applicantDirectorName, setApplicantDirectorName] = useState("");
  const [applicantDesignation, setApplicantDesignation] = useState("");
  const [applicantContactNumber, setApplicantContactNumber] = useState("");
  const [applicantEmailID, setApplicantEmailID] = useState("");
  const [applicantCIN, setApplicantCIN] = useState("");
  const [applicantAuthorisedSignatoryName, setApplicantAuthorisedSignatoryName] = useState("");
  const [applicantAuthorisedSignatoryDesignation, setApplicantAuthorisedSignatoryDesignation] = useState("");
  const [applicantContactNumber1, setApplicantContactNumber1] = useState("");
  const [applicantEmailID1, setApplicantEmailID1] = useState("");
  const [foreignCompanyName, setForeignCompanyName] = useState("");
  const [foreignCompanyAddress, setForeignCompanyAddress] = useState("");
  const [foreignAuthorizedSignatoryName, setForeignAuthorizedSignatoryName] = useState("");
  const [foreignAuthorizedSignatoryDesignation, setForeignAuthorizedSignatoryDesignation] = useState("");
  const [foreignContactNumber, setForeignContactNumber] = useState("");
  const [foreignEmailID, setForeignEmailID] = useState("");
  const [coiApplicant, setCoiApplicant] = useState("");
  const [panCard, setPanCard] = useState("");
  const [moa, setMoa] = useState("");
  const [aoa, setAoa] = useState("");
  const [shareholding, setShareholding] = useState("");
  const [boardresolution, setBoardresolution] = useState("");


  //Handle TEC from Data here-----------------------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

     const formData = new FormData();
  formData.append('application', localStorage.getItem('newApplicationId'));
  formData.append('compliance', localStorage.getItem("compliance_id"));
  formData.append('request_for', 'certification');
  formData.append('Types_of_company', types_of_company);
  formData.append('Applicant_company_name', applicantCompanyName);
  formData.append('Applicant_company_address', applicantCompanyAddress);
  formData.append('Applicant_director_name', applicantDirectorName);
  formData.append('Applicant_director_designation', applicantDesignation);
  formData.append('Applicant_contact_number', applicantContactNumber);
  formData.append('Applicant_emailid', applicantEmailID);
  formData.append('Applicant_company_CIN', applicantCIN);
  formData.append('Authorised_signatory_name', applicantAuthorisedSignatoryName);
  formData.append('Authorised_signatory_designation', applicantAuthorisedSignatoryDesignation);
  formData.append('Authorised_signatory_number', applicantContactNumber1);
  formData.append('Authorised_signatory_emailid', applicantEmailID1);
  formData.append('Foreign_manufacturer_company_name', foreignCompanyName);
  formData.append('Foreign_manufacturer_company_address', foreignCompanyAddress);
  formData.append('Foreign_manufacturer_authorised_signatory_name', foreignAuthorizedSignatoryName);
  formData.append('Foreign_manufacturer_authorised_signatory_designation', foreignAuthorizedSignatoryDesignation);
  formData.append('Foreign_manufacturer_contact_number', foreignContactNumber);
  formData.append('Foreign_manufacturer_emailid', foreignEmailID);

  // Add the selected file to the form data
  if (coiApplicant) {
    for (let i = 0; i < coiApplicant.length; i++) {
      formData.append('documents', coiApplicant[i]);
    }
  }
  if (panCard) {
    for (let i = 0; i < panCard.length; i++) {
      formData.append('documents', panCard[i]);
    }
  }
  if (moa) {
    for (let i = 0; i < moa.length; i++) {
      formData.append('documents', moa[i]);
    }
  }
  if (aoa) {
    for (let i = 0; i < aoa.length; i++) {
      formData.append('documents', aoa[i]);
    }
  }
  if (shareholding) {
    for (let i = 0; i < shareholding.length; i++) {
      formData.append('documents', shareholding[i]);
  }
  }
  if (boardresolution) {
    for (let i = 0; i < boardresolution.length; i++) {
      formData.append('documents', boardresolution[i]);
  }
  }

    console.log(formData)
    console.log('Application ID:', localStorage.getItem('newApplicationId'));
    console.log('Compliance ID:', localStorage.getItem("compliance_id"));

    // function to handle form submission
    axiosInstance.post('/application/compliance/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      const data = response.data; // your JSON data here

      // form submission successful
      setButtonPopup5(true);
 console.log(data)
// loop through each form in the "forms" field
      for (const [formName, formData] of Object.entries(data.data.forms)) {
        // create a new Blob object with the formData
        const file = new Blob([formData], { type: 'text/plain' });

        // create a URL for the file
        const fileUrl = URL.createObjectURL(file);

        // create a temporary anchor tag to trigger the download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${formName}.txt`;
        link.click();

        // clean up the URL object
        URL.revokeObjectURL(fileUrl);
      }
      const formSubmitted = true; // Corrected the assignment statement
      
          if (formSubmitted) { // Assuming success status is available in uploadStatus
            Swal.fire({
              icon: 'success',
              title: 'Form Submitted',
              text: 'Your Application has been submitted successfully.You can track the progress in Track Application section',
              confirmButtonText: 'OK',
            });
            setButtonPopup5(false);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Form not submitted',
              text: 'Form submission failed. Please try again.',
              confirmButtonText: 'OK',
            });
          }
        })
        .catch((error) => {
          // Handle error case here
          Swal.fire({
            icon: 'error',
            title: 'Form Submission Failed',
            text: 'Sorry, there was an error Submission your form',
            confirmButtonText: 'OK',
          });
        });      
  }


 //Start BIS New Application Form const Code Here ------------------------------------------------
  const[buttonRegister, setButtonRegister] = useState(false);
  const[buttonRegisterPage, setButtonRegisterPage ] = useState(false);
  const [buttonPopup6, setButtonPopup6] = useState(false);
  const [ buttonbisrqdetails, setButtonbisrqdetails] = useState(false);
  
  
  
  //BIS REgister POPUP box Filled Const Data here--------------------------------------------------
const [userId, setUserId] = useState("");
  const [password, setPassword] = useState('');
  const [hasRNumber, setHasRNumber] = useState(false);
  const [rNumber, setRNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);



   const handleRNumberChange = (event) => {
    const { value } = event.target;
    setRNumber(value);
  };


   const handleDropdownChange = (event) => {
    const { value } = event.target;
    setHasRNumber(value === "yes");
  };

//BIS USER CHOICE IF YES OR NO THEN SWITCH POPUP HANDLE HERE

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    if (hasRNumber) {
      // Logic when R number is selected
      console.log("R Number:", rNumber);
    } else {
      // Logic when R number is not selected
      setButtonbisrqdetails(true);
      console.log("R Number not selected");
    }
    setButtonRegisterPage(false);
  };





  //BIS NEW APPLICATION CONST DATA HERE------------------------------------------------------------
  const [types_of_biscompany, setTypes_of_biscompany] = useState("");
  const [manufacturerfactoryname, setManufacturerfactoryname] = useState("");
  const [manufacturerfactoryaddress, setManufacturerfactoryaddress] = useState("");
  const [manufacturerContactno, setManufacturerContactno] = useState("");
  const [dropdown_signing_person, setDropdown_signing_person] = useState("");
  const [manufacturerEmailid, setManufacturerEmailid] = useState("");
  const [top_management_of_the_manufacturing_unit_name_1, setTop_management_of_the_manufacturing_unit_name_1] = useState("");
  const [top_management_of_the_manufacturing_unit_name_2, setTop_management_of_the_manufacturing_unit_name_2] = useState("");
  const [top_management_of_the_manufacturing_unit_name_3, setTop_management_of_the_manufacturing_unit_name_3] = useState("");
  const [top_management_of_the_manufacturing_unit_name_4, setTop_management_of_the_manufacturing_unit_name_4] = useState("");
  const [top_management_of_the_manufacturing_unit_name_5, setTop_management_of_the_manufacturing_unit_name_5] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_1, setTop_management_of_the_manufacturing_unit_designation_1] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_2, setTop_management_of_the_manufacturing_unit_designation_2] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_3, setTop_management_of_the_manufacturing_unit_designation_3] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_4, setTop_management_of_the_manufacturing_unit_designation_4] = useState("");
  const [top_management_of_the_manufacturing_unit_designation_5, setTop_management_of_the_manufacturing_unit_designation_5] = useState("");
  const [technical_management_of_the_manufacturing_unit_name_1, setTechnical_management_of_the_manufacturing_unit_name_1] = useState("");
  const [technical_management_of_the_manufacturing_unit_name_2, setTechnical_management_of_the_manufacturing_unit_name_2] = useState("");
  const [technical_management_of_the_manufacturing_unit_name_3, setTechnical_management_of_the_manufacturing_unit_name_3] = useState("");
  const [technical_management_of_the_manufacturing_unit_designation_1, setTechnical_management_of_the_manufacturing_unit_designation_1] = useState("");
  const [technical_management_of_the_manufacturing_unit_designation_2, setTechnical_management_of_the_manufacturing_unit_designation_2] = useState("");
  const [technical_management_of_the_manufacturing_unit_designation_3, setTechnical_management_of_the_manufacturing_unit_designation_3] = useState("");
  const [contact_person_of_the_manufacturing_unit_name_1, setContact_person_of_the_manufacturing_unit_name_1] = useState("");
  const[contact_person_of_the_manufacturing_unit_designation_1, setContact_person_of_the_manufacturing_unit_designation_1] =useState("");
  const [brand_trademark, setBrand_trademark] = useState("");
  const [brand_owned_self_others, setBrand_owned_self_others] = useState("");
  const [brand_name_trademark_registered, setBrand_name_trademark_registered] = useState("");
  const [brand_owner_company_name, setBrand_owner_company_name] = useState("");
  const [brand_owner_company_address, setBrand_owner_company_address] = useState("");
  const [air_company_name, setAir_company_name] = useState("");
  const [air_comapny_address, setAir_comapny_address] = useState("");
  const [air_top_management_name, setAir_top_management_name] = useState("");
  const [air_top_management_designation, setAir_top_management_designation] = useState("");
  const [air_authorized_signatory_name, setAir_authorized_signatory_name] = useState("");
  const [air_authorized_signatory_designation, setAir_authorized_signatory_designation] = useState("");
  const [air_aadharcard, setAir_aadharcard] = useState("");
  const [air_pancard, setAir_pancard] = useState("");
  const [upload_business_license, setUpload_business_license] = useState("");
  const [upload_iso, setUpload_iso] = useState("");
  const [upload_trademark_cetificate, setUpload_trademark_cetificate] = useState("");
  const [upload_adharcard, setUpload_adharcard] = useState("");
  const [upload_pancard, setUpload_pancard] = useState("");
  const [upload_gst, setUpload_gst] = useState("");
  const [upload_employeeid_visitingcard, setUpload_employeeid_visitingcard] = useState("");
  const [upload_msme, setUpload_msme] = useState("");
  


  //Handle BIS from Data here-----------------------------------------------------------------------
  const handleBISSubmit = (event) => {
    event.preventDefault();

     const formData = new FormData();
  formData.append('application', localStorage.getItem('newApplicationId'));
  formData.append('compliance', localStorage.getItem("compliance_id"));
  formData.append('request_for', 'certification');
  formData.append('Types_of_company', types_of_biscompany);
  formData.append('Types_of_company', manufacturerfactoryname);
  formData.append('Applicant_company_name', manufacturerfactoryaddress);
  formData.append('Applicant_company_address', manufacturerContactno);
  formData.append('Applicant_director_name', dropdown_signing_person);
    formData.append('Applicant_director_name', manufacturerEmailid);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_name_1);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_name_2);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_name_3);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_name_4);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_name_5);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_designation_1);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_designation_2);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_designation_3);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_designation_4);
  formData.append('Applicant_director_designation',top_management_of_the_manufacturing_unit_designation_5);
  formData.append('Applicant_director_designation',technical_management_of_the_manufacturing_unit_name_1);
  formData.append('Applicant_director_designation',technical_management_of_the_manufacturing_unit_name_2);
  formData.append('Applicant_director_designation',technical_management_of_the_manufacturing_unit_name_3);
  formData.append('Applicant_director_designation',technical_management_of_the_manufacturing_unit_designation_1);
  formData.append('Applicant_director_designation',technical_management_of_the_manufacturing_unit_designation_2);
  formData.append('Applicant_director_designation',technical_management_of_the_manufacturing_unit_designation_3);
  formData.append('Applicant_director_designation',contact_person_of_the_manufacturing_unit_name_1);
  formData.append('Applicant_director_designation',contact_person_of_the_manufacturing_unit_designation_1);
  formData.append('Applicant_contact_number', brand_trademark);
  formData.append('Applicant_emailid', brand_owned_self_others);
  formData.append('Applicant_company_CIN', brand_name_trademark_registered);
  formData.append('Authorised_signatory_name', brand_owner_company_name);
  formData.append('Authorised_signatory_designation',brand_owner_company_address);
  formData.append('Authorised_signatory_number', air_company_name);
  formData.append('Authorised_signatory_emailid', air_comapny_address);
  formData.append('Foreign_manufacturer_company_name',air_top_management_name);
  formData.append('Foreign_manufacturer_company_address',air_top_management_designation);
  formData.append('Foreign_manufacturer_authorised_signatory_name', air_authorized_signatory_name);
  formData.append('Foreign_manufacturer_authorised_signatory_designation', air_authorized_signatory_designation);
  formData.append('Foreign_manufacturer_contact_number', air_aadharcard);
  formData.append('Foreign_manufacturer_emailid', air_pancard);

  // Add the selected file to the form data
  if (upload_business_license) {
    for (let i = 0; i < upload_business_license.length; i++) {
      formData.append('documents', upload_business_license[i]);
    }
  }
  if (upload_iso) {
    for (let i = 0; i < upload_iso.length; i++) {
      formData.append('documents', upload_iso[i]);
    }
  }
  if (upload_trademark_cetificate) {
    for (let i = 0; i < upload_trademark_cetificate.length; i++) {
      formData.append('documents', upload_trademark_cetificate[i]);
    }
  }
  if (upload_adharcard) {
    for (let i = 0; i < upload_adharcard.length; i++) {
      formData.append('documents', upload_adharcard[i]);
    }
  }
  if (upload_pancard) {
    for (let i = 0; i < upload_pancard.length; i++) {
      formData.append('documents', upload_pancard[i]);
  }
  }
  if (upload_gst) {
    for (let i = 0; i < upload_gst.length; i++) {
      formData.append('documents', upload_gst[i]);
  }
  }
  if (upload_employeeid_visitingcard) {
    for (let i = 0; i < upload_employeeid_visitingcard.length; i++) {
      formData.append('documents', upload_employeeid_visitingcard[i]);
  }
  }
  if (upload_msme) {
    for (let i = 0; i < upload_msme.length; i++) {
      formData.append('documents', upload_msme[i]);
  }
  }

    console.log(formData)
    console.log('Application ID:', localStorage.getItem('newApplicationId'));
    console.log('Compliance ID:', localStorage.getItem("compliance_id"));

    // function to handle form submission
    axiosInstance.post('/application/compliance/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      const data = response.data; // your JSON data here

      // form submission successful
      setButtonPopup5(true);
 console.log(data)
// loop through each form in the "forms" field
      for (const [formName, formData] of Object.entries(data.data.forms)) {
        // create a new Blob object with the formData
        const file = new Blob([formData], { type: 'text/plain' });

        // create a URL for the file
        const fileUrl = URL.createObjectURL(file);

        // create a temporary anchor tag to trigger the download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${formName}.txt`;
        link.click();

        // clean up the URL object
        URL.revokeObjectURL(fileUrl);
      }
      const formSubmitted = true; // Corrected the assignment statement
      
          if (formSubmitted) { // Assuming success status is available in uploadStatus
            Swal.fire({
              icon: 'success',
              title: 'Form Submitted',
              text: 'Your Application has been submitted successfully.You can track the progress in Track Application section',
              confirmButtonText: 'OK',
            });
            setButtonPopup5(false);
            setButtonPopup6(false);
            setButtonbisrqdetails(false);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Form not submitted',
              text: 'Form submission failed. Please try again.',
              confirmButtonText: 'OK',
            });
          }
        })
        .catch((error) => {
          // Handle error case here
          Swal.fire({
            icon: 'error',
            title: 'Form Submission Failed',
            text: 'Sorry, there was an error Submission your form',
            confirmButtonText: 'OK',
          });
        });      
  }
  // open compliance video in new window
  const handleVideoClick = (e, videoUrl) => {
    e.preventDefault();
    window.open(videoUrl, "Compliance Video", "width=800,height=600");
  };

 // navigate to compliance page based on compliance name
  const handleClick = (complianceName, complianceId) => {
   localStorage.setItem("compliance_id", complianceId);
    if (complianceName === "TEC") {
       setButtonPopup5(true)
    }
    
    else if (complianceName === "BIS") {
      setButtonRegister(true)
    } 
    //  else if (complianceName === "WPS") {
    //   history.push(`/navbar/compliance/WPS`);} 
    // else {
    //   // handle other compliance names
    // }
  };


  // HandleChange of Registerbutton---------
  function handleRadioChange(event) {
  const value = event.target.value;
  
  if (value === 'register') {
    // Call the function for registering
    setButtonRegisterPage(true);
  } else if (value === 'unregister') {
    // Call the function for unregistering
    setButtonPopup6(true);
  }
}



  return (
    <div className="table">
    <h1 style={{ display: 'none' }}>Application Number: {applicationId}</h1>
      <h1>List of Compliance</h1>
      <div className="table-wrapper">
        <table className="Review">
          <thead>
            <tr>
         {/*     <th>S.no</th> */}
              <th style={{ cursor: 'default' }}>Compliance Name</th>
              <th style={{ cursor: 'default' }}>Description</th>
              <th style={{ cursor: 'default' }}>Video</th>
             
            </tr>
          </thead>
          <tbody>
  {complianceData.map((compliance, index) => (
    
    <tr key={index}>
      {/* <td>{compliance.id}</td> */}
      <td
        className="clickable"
        onClick={() => handleClick(compliance.product_name, compliance.id)}
      > 
        {compliance.product_name}
      </td>
                <td style={{ cursor: 'default' }}>{compliance.details}</td>
                <td>
                  {/* display compliance video */}
                  <a
                    href={compliance.video}
                    onClick={(e) => handleVideoClick(e, compliance.video)}
                  >
                    <div className="video-banner">
                      <div className="play-button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </td>
                {/* <td 
                 onClick={() => handleClick(compliance.product_name, compliance.id)}>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>




{/*---------------TEC FORMS START NEW APPLICATION POPUP CODE HERE ----------------------*/}
<Popup trigger={buttonPopup5} setTrigger={setButtonPopup5}>
        <div style={{ height: "500px", overflow: "scroll" }}>
          <form onSubmit={handleSubmit}>


      {/*      <div className="compliance-container" style={{ display: 'none' }}>
              <h2>Compliance Data</h2>
              <div>
                <p>Application ID: {localStorage.getItem('newApplicationId') || "No application created yet"}</p>
                <p>Compliance ID: {localStorage.getItem("compliance_id") || "No compliance selected yet"}</p>
                <p>Request For: certification</p>
              </div>
  </div> */}

            <label className="st8012">
              Indian OEM/Foreign Manufacture:
             <select className='st804' onChange={(event) =>  setTypes_of_company(event.target.value)}>
              <option value="Foregin">Foregin</option>
              <option value="Indian">Indian</option>
             </select>
            </label>

            <h1 className='h802'>Applicant Company:</h1>

            <label className="st8012">
              Company Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantCompanyName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Company Address:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantCompanyAddress(event.target.value)}

              />
            </label>
            <label className="st8012">
              Director Name/(Any other higher Authority)
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantDirectorName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Designation:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantDesignation(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
                className="st805"
                type="number"

                onChange={(event) => setApplicantContactNumber(event.target.value)}

              />
            </label>
          
            <label className="st8012">
  Email ID:
  <input
    className="st805"
    type="text"
    onChange={(event) => {
      const inputValue = event.target.value;
      const isValidEmail = inputValue.includes('@') && inputValue.includes('.');
      setApplicantEmailID(inputValue);
      const errorElement = document.getElementById('applicant-email-error');

      if (isValidEmail) {
        errorElement.textContent = '';
      } else {
        errorElement.textContent = 'Please enter a valid email address. Use @ and .xyz';
      }
    }}
  />
</label>
<span id="applicant-email-error" style={{ color: 'red' }}></span>


            <label className="st8012">
             Company CIN:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantCIN(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorised Signatory Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantAuthorisedSignatoryName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorised Signatory Designation:
              <input
                className="st805"
                type="text"

                onChange={(event) => setApplicantAuthorisedSignatoryDesignation(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
                className="st805"
                type="number"

                onChange={(event) => setApplicantContactNumber1(event.target.value)}

              />
            </label>
           
            <label className="st8012">
  Email ID:
  <input
    className="st805"
    type="text"
    onChange={(event) => {
      const inputValue = event.target.value;
      const isValidEmail = inputValue.includes('@') && inputValue.includes('.');
      setApplicantEmailID1(inputValue);
      const errorElement = document.getElementById('applicant-email-error1');

      if (isValidEmail) {
        errorElement.textContent = '';
      } else {
        errorElement.textContent = 'Please enter a valid email address. Use @ and .xyz';
      }
    }}
  />
</label>
<span id="applicant-email-error1" style={{ color: 'red' }}></span>

  
            <h1 className='h802'>Foreign Manufacture:</h1>
            <label className="st8012">
              Company Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignCompanyName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Company Address:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignCompanyAddress(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorized Signatory Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignAuthorizedSignatoryName(event.target.value)}

              />
            </label>
            <label className="st8012">
              Authorized Signatory Designation:
              <input
                className="st805"
                type="text"

                onChange={(event) => setForeignAuthorizedSignatoryDesignation(event.target.value)}

              />
            </label>
            <label className="st8012">
              Contact Number:
              <input
                className="st805"
                type="number"

                onChange={(event) => setForeignContactNumber(event.target.value)}

              />
            </label>
        
            <label className="st8012">
  Email ID:
  <input
    className="st805"
    type="text"
    onChange={(event) => {
      const inputValue = event.target.value;
      const isValidEmail = inputValue.includes('@') && inputValue.includes('.');
      setForeignEmailID(inputValue);
      const errorElement = document.getElementById('foreign-email-error');

      if (isValidEmail) {
        errorElement.textContent = '';
      } else {
        errorElement.textContent = 'Please enter a valid email address. Use @ and .xyz';
      }
    }}
  />
</label>
<span id="foreign-email-error" style={{ color: 'red' }}></span>


            <h1 className='h802'>Document Required:</h1>
            <label className="st8012">
  COI of Applicant Company:
  <input className="stup805" type="file" onChange={(event) => setCoiApplicant(event.target.files)} multiple accept />
</label>

            <label className="st8012">
              PAN Card of Applicant Company:
              <input classname="stup805" type="file" onChange={(event) => setPanCard(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              MOA:
              <input classname="stup805" type="file"  onChange={(event) => setMoa(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
              AOA:
              <input classname="stup805" type="file" onChange={(event) => setAoa(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
              Shareholding Pattern:
              <input classname="stup805" type="file"  onChange={(event) => setShareholding(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
              Board Resolution (If Director is not signing Authority):
              <input classname="stup805" type="file"  onChange={(event) => setBoardresolution(event.target.files)} multiple accept/>
            </label>
            <button className='btn808' type="submit">Submit</button>
            
            {/* {formSubmitted && (
        <div className="submit-pop">
          {formSubmitted === true ? (
            <p>Your Application has been submitted successfully.You can track the progress in Track Application section</p>
          ) : (
            <p>Form submission failed. Please try again.</p>
          )}
          <button className="sumbitpop-btn" onClick={handleClosePopup}>OK</button>
        </div>
      )} */}
          </form>
        </div>
      </Popup>



{/*--------------BIS REGSITER AND UNREGISTER CODES HERE ------------------------------- */}
<Popup trigger={buttonRegister} setTrigger={setButtonRegister}>
<h3 className="reg-popup-titlte">Are You Registered On The BIS Portal? </h3>
<div className="checkbox-container">
  <div className="bis-register">
    <div>
      <label>
        <input
        className="bis-register"
          type="checkbox"
          value="register"
          //checked={radioValue === 'Option 1'}
          onChange={handleRadioChange}
          onClick={() => setButtonRegister(false)}
        />
       YES
      </label>
    </div>
  </div>
  <div className="bis-register">
    <div>
      <label>
        <input
          className="bis-register"
          type="checkbox"
          value="unregister"
          //checked={radioValue === 'Unregister'}
          onChange={handleRadioChange}
          onClick={() => setButtonRegister(false)}
        />
        NO
      </label>
    </div>
  </div>
</div>
</Popup>

{/*---------------- BIS REGISTER POPUP PAGE CODE HERE----------------------------------- */}
<Popup trigger={buttonRegisterPage} setTrigger={setButtonRegisterPage}>
  
<form onSubmit={handleRegisterSubmit}>
 
      <div className="bis-userid">
        <label htmlFor="user-id">User ID:</label>
        <input
          type="text"
          id="user-id"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
      </div>

      <div className="bis-userid">
      <label htmlFor="password">Password:</label>
      <div className="password-input-container">
      <input
        type={showPassword ? 'text' : 'password'}
        id="user-id"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <span
        className="eye-icon-fun"
        onClick={() => setShowPassword(!showPassword)}
        role="button"
        tabIndex={0}
      >
        {showPassword ? '🙈' : '👁️'}
      </span>
      </div>
    </div>
    
      <div className="bis-userid">
  <label htmlFor="has-r-number">Do you have an R number?</label>
  <select
    id="has-r-number"
    value={hasRNumber ? "yes" : "no"}
    onChange={handleDropdownChange}
  >
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</div>
      {hasRNumber && (
        <div className="bis-userid">
          <label htmlFor="r-number">R Number:</label>
          <input
            type="text"
            id="user-id"
            value={rNumber}
            onChange={handleRNumberChange}
          />
        </div>
      )}
      <button className="bis-register" type="submit">Submit</button>
    </form>
</Popup>


{/*------------------ BIS REQUIRED DETAILS POPUP IF USER SELECTED NO PAGE CODE HERE-------------------------- */}
<Popup trigger={buttonbisrqdetails} setTrigger={setButtonbisrqdetails}>
<div style={{ height: "500px", width:"608px", overflow: "scroll" }}>
          <form onSubmit={handleBISSubmit}>

<h1 className='h802'>Brand</h1>
<label className="st8012">
Trademark:
  <input
    className="st805"
    type="number"

    onChange={(event) => setBrand_trademark(event.target.value)}

  />
</label>

<label className="st8012">
Owned by self or others:
<select className="st801" onChange={(event) =>  setBrand_owned_self_others(event.target.value)}>
<option value="self">Self</option>
<option value="others">Others</option>
</select>
</label>

<label className="st8012">
Is the Brand Name/Trade Mark Registered?:
<select className="st801" onChange={(event) =>  setBrand_name_trademark_registered(event.target.value)}>
<option value="yes">Yes</option>
<option value="no">No</option>
</select>
</label>
<label className="st8012">
Brand Owner Company Name:
  <input
    className="st805"
    type="text"

    onChange={(event) => setBrand_owner_company_name(event.target.value)}

  />
</label>
<label className="st8012">
Brand Owner Company Address:
  <input
    className="st805"
    type="number"

    onChange={(event) => setBrand_owner_company_address(event.target.value)}

  />
</label>


<h1 className='h802'>AIR </h1>
<label className="st8012">
AIR company Name:
  <input
    className="st805"
    type="text"

    onChange={(event) => setAir_company_name(event.target.value)}

  />
</label>
<label className="st8012">
AIR company Address:
  <input
    className="st805"
    type="text"

    onChange={(event) => setAir_comapny_address(event.target.value)}
  />
</label>

{/*----------------- Top Mangement Box here ------------------------- */}
<h3 className='techni'>Top management AIR </h3>
<div className="row">
<div className="name-row">
<div className="names">
<label className="st8012">
<input className="st805" type="text" 
placeholder="Name"
onChange={(event) => setAir_authorized_signatory_name(event.target.value)} 
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Designation"
onChange={(event) => setAir_authorized_signatory_designation(event.target.value)} 
/>
</label>
</div>
</div>
</div>

<div className="row">
<div className="name-row">
<div className="side-div">

<label className="st8012">
<input
className="st805"
type="text"
placeholder="Contact Number"
onChange={(event) =>setContact_person_of_the_manufacturing_unit_name_1(event.target.value)}
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Email Id"
onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_1(event.target.value)} 
/>
</label>
</div>
</div>
</div>

{/*---------------- Name of authorized Signatory -----------------------------*/}

<h3 className='techni'>Name of authorized Signatory</h3>
<div className="row">
<div className="name-row">
<div className="names">
<label className="st8012">
<input className="st805" type="text" 
placeholder="Name"
onChange={(event) => setAir_top_management_name(event.target.value)} 
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Designation"
onChange={(event) => setAir_top_management_designation(event.target.value)} 
/>
</label>
</div>
</div>
</div>

<div className="row">
<div className="name-row">
<div className="side-div">

<label className="st8012">
<input
className="st805"
type="text"
placeholder="Contact Number"
onChange={(event) =>setContact_person_of_the_manufacturing_unit_name_1(event.target.value)}
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Email Id"
onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_1(event.target.value)} 
/>
</label>
</div>
</div>
</div>


<label className="st8012">
Aadhar Card:
  <input
    className="st805"
    type="text"

    onChange={(event) => setAir_aadharcard(event.target.value)}

  />
</label>
<label className="st8012">
PAN Card:
  <input
    className="st805"
    type="text"

    onChange={(event) => setAir_pancard(event.target.value)}

  />
</label>

<select className="bisdrop" onChange={(event) => setDropdown_signing_person(event.target.value)}>
<option value="TOPMANAGEMENT1">SIGNING PERSON  WILL BE FROM TOP MANAGEMENT </option>
<option value="SomeOne">SIGNING PERSON  WILL BE someone from the company </option>
</select>

<div>
<select className="bisdrop" onChange={(event) => setDropdown_signing_person(event.target.value)}>
<option value="AIRSISTER">If the AIR company is the sister company of the manufacturer and have office in India  </option>
<option value="AIRINDIA">If the AIR company is the Brandowner and have office in India  </option>
<option value="AIRBRANDOWNER">If the AIR company is the Brandowner </option>
</select>
</div>
<button className='btn808' type="submit">Submit</button>
</form>
</div>
</Popup>


{/*---------------BIS FORMS START NEW APPLICATION POPUP CODE HERE ----------------------*/}
<Popup trigger={buttonPopup6} setTrigger={setButtonPopup6}>
        <div style={{ height: "500px", width:"608px", overflow: "scroll" }}>
          <form onSubmit={handleBISSubmit}>


          <div className="compliance-container" style={{ display: 'none' }}>
              <h2>Compliance Data</h2>
              <div>
                <p>Application ID: {localStorage.getItem('newApplicationId') || "No application created yet"}</p>
                <p>Compliance ID: {localStorage.getItem("compliance_id") || "No compliance selected yet"}</p>
                <p>Request For: certification</p>
              </div>
  </div> 
  <h1 className='h802'>  Certification Process </h1>

<label className="st8012">
            Manufacture:
             <select className='st804' onChange={(event) =>  setTypes_of_biscompany(event.target.value)}>
              <option value="Foregin">Foregin</option>
              <option value="Indian">Indian</option>
             </select>
            </label>

            <label className="st8012">
            Factory Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setManufacturerfactoryname(event.target.value)}

              />
            </label>
            <label className="st8012">
            Factory Address (complete address):
              <input
                className="st805"
                type="text"

                onChange={(event) => setManufacturerfactoryaddress(event.target.value)}

              />
            </label>
            <label className="st8012">
            Contact Number:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturerContactno(event.target.value)}
              />
            </label>

            <label className="st8012">
            Email id:
              <input
                className="st805"
                type="text"
                onChange={(event) => setManufacturerEmailid(event.target.value)}
              />
            </label>

            <select className="bisdrop" onChange={(event) => setDropdown_signing_person(event.target.value)}>
          <option value="TOPMANAGEMENT">SIGNING PERSON  WILL BE FROM TOP MANAGEMENT </option>
          <option value="CONTACTPERSON">SIGNING PERSON  WILL BE CONTACT PERSON</option>
        </select>


{/* ----------------Top Management code Here---------------------- */}

            <h3 className='topmang'>Top Management (Fill atleast Two)</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
        <input className="st805" type="text" 
        placeholder="1)Name"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_name_1(event.target.value)} 
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text"
        placeholder="2)Name"
         onChange={(event) => setTop_management_of_the_manufacturing_unit_name_2(event.target.value)} 
          />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="3)Name"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_name_3(event.target.value)} 
         />
      </label>

      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="4)Name"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_name_4(event.target.value)} 
       />
      </label>

      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="5)Name"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_name_5(event.target.value)} 
       />
      </label>
    </div>

    <div className="designations">
      <label className="st8012">
        <input className="st805" type="text" 
      placeholder="1)Designation"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_1(event.target.value)} 
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="2)Designation"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_2(event.target.value)} 
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="3)Designation"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_3(event.target.value)} 
       />
      </label>

      <label className="st8012">
        <input className="st805" type="text" 
      placeholder="4)Designation"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_4(event.target.value)} 
      />
      </label>

      <label className="st8012">
        <input className="st805" type="text" 
      placeholder="5)Designation"
        onChange={(event) => setTop_management_of_the_manufacturing_unit_designation_5(event.target.value)} 
       />
      </label>
    </div>
  </div>
</div>


{/*---------- Technical Management Input code Here---------------- */}

<h3 className='techni'>Technical Management (Fill atleast Two)</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="1)Name"
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_name_1(event.target.value)} 
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
      placeholder="2)Name"
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_name_2(event.target.value)} 
         />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="3)Name"
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_name_3(event.target.value)} 
       />
      </label>
    </div>

    <div className="designations">
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="1)Designation"
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_designation_1(event.target.value)} 
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="2)Designation"
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_designation_2(event.target.value)} 
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        placeholder="3)Designation"
        onChange={(event) => setTechnical_management_of_the_manufacturing_unit_designation_3(event.target.value)} 
       />
      </label>
    </div>
  </div>
</div>


<h3 className='techni'>Contact Person Details</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
        <input className="st805" type="text" 
        placeholder="Name"
        onChange={(event) => setContact_person_of_the_manufacturing_unit_name_1(event.target.value)} 
         />
      </label>
     
      <label className="st8012">
        <input className="st805" type="text" 
         placeholder="Designation"
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_1(event.target.value)} 
         />
      </label>
      </div>
      </div>
      </div>

    <div className="row">
  <div className="name-row">
    <div className="side-div">
      
    <label className="st8012">
  <input
    className="st805"
    type="text"
    placeholder="Contact Number"
    onChange={(event) =>setContact_person_of_the_manufacturing_unit_name_1(event.target.value)}
  />
</label>
     
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="Email Id"
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_1(event.target.value)} 
         />
      </label>
      </div>
      </div>
      </div>
     


      <h1 className='h802'>Brand</h1>

            <label className="st8012">
            Trademark:
              <input
                className="st805"
                type="number"

                onChange={(event) => setBrand_trademark(event.target.value)}

              />
            </label>
          
            <label className="st8012">
            Owned by self or others:
            <select className="st801" onChange={(event) =>  setBrand_owned_self_others(event.target.value)}>
          <option value="self">Self</option>
          <option value="others">Others</option>
        </select>
            </label>

            <label className="st8012">
            Is the Brand Name/Trade Mark Registered?:
            <select className="st801" onChange={(event) =>  setBrand_name_trademark_registered(event.target.value)}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
            </label>
            <label className="st8012">
            Brand Owner Company Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setBrand_owner_company_name(event.target.value)}

              />
            </label>
            <label className="st8012">
            Brand Owner Company Address:
              <input
                className="st805"
                type="number"

                onChange={(event) => setBrand_owner_company_address(event.target.value)}

              />
            </label>
           
  
            <h1 className='h802'>AIR </h1>
            <label className="st8012">
            AIR company Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setAir_company_name(event.target.value)}

              />
            </label>
            <label className="st8012">
            AIR company Address:
              <input
                className="st805"
                type="text"

                onChange={(event) => setAir_comapny_address(event.target.value)}
              />
            </label>

{/*----------------- Top Mangement Box here ------------------------- */}
            <h3 className='techni'>Top management AIR </h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
        <input className="st805" type="text" 
        placeholder="Name"
        onChange={(event) => setAir_authorized_signatory_name(event.target.value)} 
         />
      </label>
     
      <label className="st8012">
        <input className="st805" type="text" 
         placeholder="Designation"
        onChange={(event) => setAir_authorized_signatory_designation(event.target.value)} 
         />
      </label>
      </div>
      </div>
      </div>

    <div className="row">
  <div className="name-row">
    <div className="side-div">
      
    <label className="st8012">
  <input
    className="st805"
    type="text"
    placeholder="Contact Number"
    onChange={(event) =>setContact_person_of_the_manufacturing_unit_name_1(event.target.value)}
  />
</label>
     
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="Email Id"
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_1(event.target.value)} 
         />
      </label>
      </div>
      </div>
      </div>

 {/*---------------- Name of authorized Signatory -----------------------------*/}

      <h3 className='techni'>Name of authorized Signatory</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
        <input className="st805" type="text" 
        placeholder="Name"
        onChange={(event) => setAir_top_management_name(event.target.value)} 
         />
      </label>
     
      <label className="st8012">
        <input className="st805" type="text" 
         placeholder="Designation"
        onChange={(event) => setAir_top_management_designation(event.target.value)} 
         />
      </label>
      </div>
      </div>
      </div>

    <div className="row">
  <div className="name-row">
    <div className="side-div">
      
    <label className="st8012">
  <input
    className="st805"
    type="text"
    placeholder="Contact Number"
    onChange={(event) =>setContact_person_of_the_manufacturing_unit_name_1(event.target.value)}
  />
</label>
     
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="Email Id"
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation_1(event.target.value)} 
         />
      </label>
      </div>
      </div>
      </div>


            <label className="st8012">
            Aadhar Card:
              <input
                className="st805"
                type="text"

                onChange={(event) => setAir_aadharcard(event.target.value)}

              />
            </label>
            <label className="st8012">
            PAN Card:
              <input
                className="st805"
                type="text"

                onChange={(event) => setAir_pancard(event.target.value)}

              />
            </label>

            <select className="bisdrop" onChange={(event) => setDropdown_signing_person(event.target.value)}>
          <option value="TOPMANAGEMENT1">SIGNING PERSON  WILL BE FROM TOP MANAGEMENT </option>
          <option value="SomeOne">SIGNING PERSON  WILL BE someone from the company </option>
        </select>

 <div>
        <select className="bisdrop" onChange={(event) => setDropdown_signing_person(event.target.value)}>
          <option value="AIRSISTER">If the AIR company is the sister company of the manufacturer and have office in India  </option>
          <option value="AIRINDIA">If the AIR company is the Brandowner and have office in India  </option>
          <option value="AIRBRANDOWNER">If the AIR company is the Brandowner </option>
        </select>
        </div>

            <h1 className='h802'>Upload documents</h1>
            <label className="st8012">
            Business License :
  <input className="stup805" type="file" onChange={(event) => setUpload_business_license(event.target.files)} multiple accept />
</label>

            <label className="st8012">
              ISO:
              <input classname="stup805" type="file" onChange={(event) =>  setUpload_iso(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
            Trademark Cetificate:
              <input classname="stup805" type="file"  onChange={(event) => setUpload_trademark_cetificate(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
            Adhar Card:
              <input classname="stup805" type="file" onChange={(event) => setUpload_adharcard(event.target.files)} multiple accept />
            </label>
            <label className="st8012">
            Pan Card:
              <input classname="stup805" type="file"  onChange={(event) => setUpload_pancard(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
            GST:
              <input classname="stup805" type="file"  onChange={(event) => setUpload_gst(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
            Employee ID / Visiting Card of Siging authority:
              <input classname="stup805" type="file"  onChange={(event) => setUpload_employeeid_visitingcard(event.target.files)} multiple accept/>
            </label>
            <label className="st8012">
            MSME:
              <input classname="stup805" type="file"  onChange={(event) => setUpload_msme(event.target.files)} multiple accept/>
            </label>
            <button className='btn808' type="submit">Submit</button>
            
            {/* {formSubmitted && (
        <div className="submit-pop">
          {formSubmitted === true ? (
            <p>Your Application has been submitted successfully.You can track the progress in Track Application section</p>
          ) : (
            <p>Form submission failed. Please try again.</p>
          )}
          <button className="sumbitpop-btn" onClick={handleClosePopup}>OK</button>
        </div>
      )} */}
          </form>
        </div>
      </Popup>


    </div>
  );
};

export default Secondpage;