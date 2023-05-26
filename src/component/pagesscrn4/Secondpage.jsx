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
         console.log(localStorage.getItem("newApplicationId"))
        })
        .catch((error) => {
          console.log(error);
        });
}, []);



  //Start TEC New Application Form const Code Here ---------------------------------
  const [buttonpopupform1tec, setButtonpopupform1tec] = useState(false);
  const [buttonautofillpopuptec, setButtonautofillpopuptec] = useState(false);
  const [buttonautofilledtec, setButtonautofilledtec] = useState(false);

  //from const code here-----------
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
     console.log(formData);
  formData.append('application', applicationId);
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

   console.log('Application ID:', localStorage.getItem('newApplicationId'));
   console.log('Compliance ID:', localStorage.getItem("compliance_id"));


   // Make the API POST request with the formData
axiosInstance
.post('/application/compliance/', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
.then(response => {
  const data = response.data; // your JSON data here
  // form submission successful
  console.log(data);
  Swal.fire({
    title: 'Success',
    text: 'Form submitted successfully',
    icon: 'success',
  });

  // Loop through each form in the "forms" field
  for (const [formName, formData] of Object.entries(data.data.forms)) {
    // Create a new Blob object with the formData
    const file = new Blob([formData], { type: 'text/plain' });

    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);

    // Create a temporary anchor tag to trigger the download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${formName}.txt`;
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(fileUrl);
  }
})
.catch(error => {
  // handle error
  console.error(error);
  Swal.fire({
    title: 'Error',
    text: 'Failed to submit form',
    icon: 'error',
  });
});

  }


   //TEC AUTO FILL FORM CONST HERE And also CALL APIS for auto fill  ---------------------
   const [tecformData, setTecformData] = useState({
    Applicant_company_CIN: '',
    Applicant_company_address: '',
    Applicant_company_name: '',
    Applicant_contact_number: '',
    Applicant_director_designation: '',
    Applicant_director_name: '',
    Applicant_emailid: '',
    Authorised_signatory_designation: '',
    Authorised_signatory_emailid: '',
    Authorised_signatory_name: '',
    Authorised_signatory_number: '',
    Foreign_manufacturer_authorised_signatory_designation: '',
    Foreign_manufacturer_authorised_signatory_name: '',
    Foreign_manufacturer_company_address: '',
    Foreign_manufacturer_company_name: '',
    Foreign_manufacturer_contact_number: '',
    Foreign_manufacturer_emailid: '',
    Types_of_company: '',
    application: '',
    compliance: 'compliance_id',
    request_for: 'certification',
  });

   console.log(tecformData)  //TecForm Data consolelog here and checkout

  const handleSubmittecauto = (event) => {
    event.preventDefault();

    const updatedTecformData = { 
      Applicant_company_CIN: tecformData.Applicant_company_CIN, 
      Applicant_company_address: tecformData.Applicant_company_address,
      Applicant_company_name: tecformData.Applicant_company_name,
      Applicant_contact_number: tecformData.Applicant_contact_number,
      Applicant_director_designation: tecformData.Applicant_director_designation,
      Applicant_director_name: tecformData.Applicant_director_name,
      Applicant_emailid: tecformData.Applicant_emailid,
      Authorised_signatory_designation: tecformData.Authorised_signatory_designation,
      Authorised_signatory_emailid: tecformData.Authorised_signatory_emailid,
      Authorised_signatory_name: tecformData.Authorised_signatory_name,
      Authorised_signatory_number: tecformData.Authorised_signatory_number,
      Foreign_manufacturer_authorised_signatory_designation: tecformData.Foreign_manufacturer_authorised_signatory_designation,
      Foreign_manufacturer_authorised_signatory_name: tecformData.Foreign_manufacturer_authorised_signatory_name,
      Foreign_manufacturer_company_address: tecformData.Foreign_manufacturer_company_address,
      Foreign_manufacturer_company_name: tecformData.Foreign_manufacturer_company_name,
      Foreign_manufacturer_contact_number: tecformData.Foreign_manufacturer_contact_number,
      Foreign_manufacturer_emailid: tecformData.Foreign_manufacturer_emailid,
      Types_of_company: tecformData.Types_of_company,
      compliance: localStorage.getItem("compliance_id"),
    request_for: 'certification',
    application: applicationId,
    };
    console.log(updatedTecformData)
    axiosInstance
      .post('/application/compliance/', updatedTecformData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        Swal.fire({
          title: 'Success',
          text: 'Form submitted successfully',
          icon: 'success',
        });

        for (const [formName, formData] of Object.entries(data.data.forms)) {
          const file = new Blob([formData], { type: 'text/plain' });
          const fileUrl = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = `${formName}.txt`;
          link.click();
          URL.revokeObjectURL(fileUrl);
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit form',
          icon: 'error',
        });
      });
  };


  const handleChange = (e) => {
    setTecformData({ ...tecformData, [e.target.name]: e.target.value });
  };

  const fetchData = async () => {
    try {

      const response = await axiosInstance.get(
        `application/inclusive/?compliance=${localStorage.getItem('compliance_name')}`
      );
      const tecdata = response.data['fields'];
      console.log(tecdata);
      setTecformData({ ...tecformData, ...tecdata });
    } catch (error) {
      console.error(error);
    }
  };




   //TEC DYNAMIC POPUP CHOOSE OPTION YES OR NO  function handle here-------------------------
   function handletableautoform(event) {
    const value = event.target.value;
    
    if (autofillform === 'Yes' && value === 'Yesautofilledtec') {
      // Call the function for registering
      setButtonautofillpopuptec(true);
      console.log(autofillform);
    } else if (value === 'Noform1tec') {
      // Call the function for unregistering
      setButtonpopupform1tec(true);
    }
    setButtonautofilledtec(false);
  }

  
/*----------------------BIS FUNCTION CODE START HERE----------------*/


 //Start BIS New Application Form const Code Here ------------------------------------------------
  const[buttonRegisterbis, setButtonRegisterbis] = useState(false);
  const[buttonRegisterPagebis, setButtonRegisterPagebis ] = useState(false);
  const [buttonPopup6bis, setButtonPopup6bis] = useState(false);
  const [buttonautofilledbis, setButtonautofilledbis] = useState(false);
  const [buttonautofillpopupbis, setButtonautofillpopupbis] = useState(false);
  
  
  
  //BIS Register POPUP box Filled Const Data here--------------------------------------------------
  const [hasRNumber, setHasRNumber] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [autofillform, setAutofillform] = useState(null);
  const [hasBISReg, setHasBISReg] = useState(false);




//BIS USER  R NUMBER Submit CHOICE IF YES OR NO THEN SWITCH POPUP HANDLE HERE
const [rnumberformData, setRnumberformData] = useState({
  Username_BISPortal: '',
  Password_BISPortal: '',
  Rnumber:'',
  application: '',
  compliance: localStorage.getItem("compliance_id"),
  request_for: 'certification',
});

  const handleRnumberRegisterSubmit = (event) => {
    event.preventDefault();

    
     const updatedrnumberformData = { ...rnumberformData, application: applicationId };
console.log(updatedrnumberformData)
      axiosInstance
      .post('application/compliance/', updatedrnumberformData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        Swal.fire({
          title: 'Success',
          text: 'Form submitted successfully',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit form',
          icon: 'error',
        });
      });
    }

    const handleRNumbersubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
      if (hasRNumber) {
        // Logic when R number is selected
        handleRnumberRegisterSubmit(event);
        console.log("R Number:");
      } else {
        // Logic when R number is not selected
        setButtonPopup6bis(true);
        console.log("R Number not selected");
      }
      // setButtonRegisterPagebis(false);
    };
  
    const handleDropdownChange = (event) => {
      const { value } = event.target;
      setHasRNumber(value === "yes");
    };

    const handleBISprotelChange = (event) => {
      const value = event.target.value === 'yes';
      setHasBISReg(value);
    };


 //BIS NEW APPLICATION CONST DATA HERE------------------------------------------------------------
 const [types_of_biscompany, setTypes_of_biscompany] = useState("");
 const [Factory_name, setFactory_name] = useState("");
 const [Factory_address,setFactory_address] = useState("");
 const [Factory_contact_number, setFactory_contact_number] = useState("");
 const [Factory_emailid, setFactory_emailid] = useState("");
 const [Factory_signing_person, setFactory_signing_person] = useState("");
 const [Top_management_of_the_manufacturing_unit_name_1, setTop_management_of_the_manufacturing_unit_name_1] = useState("");
 const [Top_management_of_the_manufacturing_unit_name_2, setTop_management_of_the_manufacturing_unit_name_2] = useState("");
 const [Top_management_of_the_manufacturing_unit_name_3, setTop_management_of_the_manufacturing_unit_name_3] = useState("");
 const [Top_management_of_the_manufacturing_unit_name_4, setTop_management_of_the_manufacturing_unit_name_4] = useState("");
 const [Top_management_of_the_manufacturing_unit_name_5, setTop_management_of_the_manufacturing_unit_name_5] = useState("");
 const [Top_management_of_the_manufacturing_unit_designation_1, setTop_management_of_the_manufacturing_unit_designation_1] = useState("");
 const [Top_management_of_the_manufacturing_unit_designation_2, setTop_management_of_the_manufacturing_unit_designation_2] = useState("");
 const [Top_management_of_the_manufacturing_unit_designation_3, setTop_management_of_the_manufacturing_unit_designation_3] = useState("");
 const [Top_management_of_the_manufacturing_unit_designation_4, setTop_management_of_the_manufacturing_unit_designation_4] = useState("");
 const [Top_management_of_the_manufacturing_unit_designation_5, setTop_management_of_the_manufacturing_unit_designation_5] = useState("");
 const [Who_is_signing, setWho_is_signing] = useState("");
 const [Technical_management_of_the_manufacturing_unit_name_1, setTechnical_management_of_the_manufacturing_unit_name_1] = useState("");
 const [Technical_management_of_the_manufacturing_unit_name_2, setTechnical_management_of_the_manufacturing_unit_name_2] = useState("");
 const [Technical_management_of_the_manufacturing_unit_name_3, setTechnical_management_of_the_manufacturing_unit_name_3] = useState("");
 const [Technical_management_of_the_manufacturing_unit_designation_1, setTechnical_management_of_the_manufacturing_unit_designation_1] = useState("");
 const [Technical_management_of_the_manufacturing_unit_designation_2, setTechnical_management_of_the_manufacturing_unit_designation_2] = useState("");
 const [Technical_management_of_the_manufacturing_unit_designation_3, setTechnical_management_of_the_manufacturing_unit_designation_3] = useState("");
 const [Contact_person_of_the_manufacturing_unit_name_, setContact_person_of_the_manufacturing_unit_name] =useState("");
 const [Contact_person_of_the_manufacturing_unit_designation, setContact_person_of_the_manufacturing_unit_designation] = useState("");
 const [Contact_person_of_the_manufacturing_unit_contact_number, setContact_person_of_the_manufacturing_unit_contact_number] = useState("");
 const [Contact_person_of_the_manufacturing_unit_emailid, setContact_person_of_the_manufacturing_unit_emailid] = useState("");
 const [Brand_trademark, setBrand_trademark] = useState("");
 const [Brand_owned_by, setBrand_owned_by] = useState("");
 const [Brand_registered, setBrand_registered] = useState("");
 const [Brand_owner_company_name, setBrand_owner_company_name] = useState("");
 const [Brand_owner_company_address, setBrand_owner_company_address] = useState("");
 const [Name_of_the_AIR_company, setName_of_the_AIR_company] = useState("");
 const [Address_of_the_AIR_company, setAddress_of_the_AIR_company] = useState("");
 const [Top_management_of_the_AIR_company_name, setTop_management_of_the_AIR_company_name] = useState("");
 const [Top_management_of_the_AIR_company_designation, setTop_management_of_the_AIR_company_designation] = useState("");
 const [Top_management_of_the_AIR_company_contact_number, setTop_management_of_the_AIR_company_contact_number] = useState("");
 const [Top_management_of_the_AIR_company_emailid, setTop_management_of_the_AIR_company_emailid] = useState("");
 const [Authorized_signatory_name, setAuthorized_signatory_name] = useState("");
 const [Authorized_signatory_designation, setAuthorized_signatory_designation] = useState("");
 const [Authorized_signatory_contact_number, setAuthorized_signatory_contact_number] = useState("");
 const [Authorized_signatory_emailid, setAuthorized_signatory_emailid] = useState("");
 const [AIR_company_aadhar_card, setAIR_company_aadhar_card] = useState("");
 const [AIR_company_pan_card, setAIR_company_pan_card] = useState("");
 const [AIR_signing_person, setAIR_signing_person] = useState("");
 const [AIR_company_condition, setAIR_company_condition] = useState("");
 const [upload_business_license, setUpload_business_license] = useState("");
  const [upload_iso, setUpload_iso] = useState("");
  const [upload_trademark_cetificate, setUpload_trademark_cetificate] = useState("");
  const [upload_adharcard, setUpload_adharcard] = useState("");
  const [upload_pancard, setUpload_pancard] = useState("");
  const [upload_gst, setUpload_gst] = useState("");
  const [upload_employeeid_visitingcard, setUpload_employeeid_visitingcard] = useState("");
  const [upload_msme, setUpload_msme] = useState("");
  const [Password_BISPortal, setPassword_BISPortal] = useState("");
  const [Username_BISPortal, setUsername_BISPortal] = useState("");
 


 //Handle BIS from Data here-----------------------------------------------------------------------
 const handleBISSubmit = (event) => {
   event.preventDefault();

    const formData = new FormData();
 formData.append('application', applicationId);
 formData.append('compliance', localStorage.getItem("compliance_id"));
 formData.append('request_for', 'certification');

 formData.append('Types_of_company', types_of_biscompany);
 formData.append('Factory_name', Factory_name);
 formData.append('Factory_address', Factory_address);
 formData.append('Factory_contact_number', Factory_contact_number);
 formData.append('Factory_emailid', Factory_emailid);
 formData.append('Factory_signing_person ',Factory_signing_person);
 formData.append('Top_management_of_the_manufacturing_unit_name_1',Top_management_of_the_manufacturing_unit_name_1);
 formData.append('Top_management_of_the_manufacturing_unit_name_2',Top_management_of_the_manufacturing_unit_name_2);
 formData.append('Top_management_of_the_manufacturing_unit_name_3',Top_management_of_the_manufacturing_unit_name_3);
 formData.append('Top_management_of_the_manufacturing_unit_name_4',Top_management_of_the_manufacturing_unit_name_4);
 formData.append('Top_management_of_the_manufacturing_unit_name_5',Top_management_of_the_manufacturing_unit_name_5);
 formData.append('Top_management_of_the_manufacturing_unit_designation_1',Top_management_of_the_manufacturing_unit_designation_1);
 formData.append('Top_management_of_the_manufacturing_unit_designation_2',Top_management_of_the_manufacturing_unit_designation_2);
 formData.append('Top_management_of_the_manufacturing_unit_designation_3',Top_management_of_the_manufacturing_unit_designation_3);
 formData.append('Top_management_of_the_manufacturing_unit_designation_4',Top_management_of_the_manufacturing_unit_designation_4);
 formData.append('Top_management_of_the_manufacturing_unit_designation_5',Top_management_of_the_manufacturing_unit_designation_5);
 formData.append('Who_is_signing',Who_is_signing);
 formData.append('Technical_management_of_the_manufacturing_unit_name_1',Technical_management_of_the_manufacturing_unit_name_1);
 formData.append('Technical_management_of_the_manufacturing_unit_name_2',Technical_management_of_the_manufacturing_unit_name_2);
 formData.append('Technical_management_of_the_manufacturing_unit_name_3',Technical_management_of_the_manufacturing_unit_name_3);
 formData.append('Technical_management_of_the_manufacturing_unit_designation_1',Technical_management_of_the_manufacturing_unit_designation_1);
 formData.append('Technical_management_of_the_manufacturing_unit_designation_2',Technical_management_of_the_manufacturing_unit_designation_2);
 formData.append('Technical_management_of_the_manufacturing_unit_designation_3',Technical_management_of_the_manufacturing_unit_designation_3);
 formData.append('Contact_person_of_the_manufacturing_unit_name_',Contact_person_of_the_manufacturing_unit_name_);
 formData.append('Contact_person_of_the_manufacturing_unit_designation', Contact_person_of_the_manufacturing_unit_designation);
 formData.append('Contact_person_of_the_manufacturing_unit_contact_number',Contact_person_of_the_manufacturing_unit_contact_number);
 formData.append('Contact_person_of_the_manufacturing_unit_emailid', Contact_person_of_the_manufacturing_unit_emailid);
 formData.append('Brand_trademark',Brand_trademark);
 formData.append('Brand_owned_by', Brand_owned_by);
 formData.append('Brand_registered', Brand_registered);
 formData.append('Brand_owner_company_name',Brand_owner_company_name);
 formData.append('Brand_owner_company_address',Brand_owner_company_address);
 formData.append('Name_of_the_AIR_company', Name_of_the_AIR_company);
 formData.append('Address_of_the_AIR_company', Address_of_the_AIR_company);
 formData.append('Top_management_of_the_AIR_company_name', Top_management_of_the_AIR_company_name);
 formData.append('Top_management_of_the_AIR_company_designation', Top_management_of_the_AIR_company_designation);
 formData.append('Top_management_of_the_AIR_company_contact_number', Top_management_of_the_AIR_company_contact_number);
 formData.append('Top_management_of_the_AIR_company_emailid', Top_management_of_the_AIR_company_emailid);
 formData.append('Authorized_signatory_name', Authorized_signatory_name);
 formData.append('Authorized_signatory_designation', Authorized_signatory_designation);
 formData.append('Authorized_signatory_contact_number', Authorized_signatory_contact_number);
 formData.append('Authorized_signatory_emailid', Authorized_signatory_emailid);
 formData.append('AIR_company_aadhar_card', AIR_company_aadhar_card);
 formData.append('AIR_company_pan_card', AIR_company_pan_card);
 formData.append('AIR_signing_person', AIR_signing_person);
 formData.append('AIR_company_condition', AIR_company_condition);
 formData.append ('Username_BISPortal', Username_BISPortal);
 formData.append ('Password_BISPortal', Password_BISPortal);
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
           setButtonPopup6bis(false);
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



 //BIS PERVIOUS DATA FETCH HERE ITS CODE ------------------------------------------
const [bisformData, setBisformData] = useState({
  Types_of_company: '',
  Factory_name: '',
  Factory_address: '',
  Factory_contact_number: '',
  Factory_emailid: '',
  Factory_signing_person: '',
  Top_management_of_the_manufacturing_unit_name_1: '',
  Top_management_of_the_manufacturing_unit_designation_1: '',
  Top_management_of_the_manufacturing_unit_name_2: '',
  Top_management_of_the_manufacturing_unit_designation_2: '',
  Top_management_of_the_manufacturing_unit_name_3: '',
  Top_management_of_the_manufacturing_unit_designation_3: '',
  Top_management_of_the_manufacturing_unit_name_4: '',
  Top_management_of_the_manufacturing_unit_designation_4: '',
  Top_management_of_the_manufacturing_unit_name_5: '',
  Top_management_of_the_manufacturing_unit_designation_5: '',
  Who_is_signing: '',
  Technical_management_of_the_manufacturing_unit_name_1: '',
  Technical_management_of_the_manufacturing_unit_designation_1: '',
  Technical_management_of_the_manufacturing_unit_name_2: '',
  Technical_management_of_the_manufacturing_unit_designation_2: '',
  Technical_management_of_the_manufacturing_unit_name_3: '',
  Technical_management_of_the_manufacturing_unit_designation_3: '',
  Contact_person_of_the_manufacturing_unit_name_: '',
  Contact_person_of_the_manufacturing_unit_designation: '',
  Contact_person_of_the_manufacturing_unit_contact_number: '',
  Contact_person_of_the_manufacturing_unit_emailid: '',
  Brand_trademark: '',
  Brand_owned_by: '',
  Brand_registered: '',
  Brand_owner_company_name: '',
  Brand_owner_company_address: '',
  Name_of_the_AIR_company: '',
  Address_of_the_AIR_company: '',
  Top_management_of_the_AIR_company_name: '',
  Top_management_of_the_AIR_company_designation: '',
  Top_management_of_the_AIR_company_contact_number: '',
  Top_management_of_the_AIR_company_emailid: '',
  Authorized_signatory_name: '',
  Authorized_signatory_designation: '',
  Authorized_signatory_contact_number: '',
  Authorized_signatory_emailid: '',
  AIR_company_aadhar_card: '',
  AIR_company_pan_card: '',
  AIR_signing_person: '',
  AIR_company_condition: '',
})

const handleSubmitBISauto = (event) => {
  event.preventDefault();

  const updatedBISformData = { 
    Types_of_company: bisformData.Types_of_company, 
    Factory_name: bisformData.Factory_name,
    Factory_address: bisformData.Factory_address,
    Factory_contact_number: bisformData.Factory_contact_number,
    Factory_emailid: bisformData.Factory_emailid,
    Factory_signing_person: bisformData.Factory_signing_person,
    Top_management_of_the_manufacturing_unit_name_1: bisformData.Top_management_of_the_manufacturing_unit_name_1,
    Top_management_of_the_manufacturing_unit_designation_1: bisformData.Top_management_of_the_manufacturing_unit_designation_1,
    Top_management_of_the_manufacturing_unit_name_2: bisformData.Top_management_of_the_manufacturing_unit_name_2,
    Top_management_of_the_manufacturing_unit_designation_2: bisformData.Top_management_of_the_manufacturing_unit_designation_2,
    Top_management_of_the_manufacturing_unit_name_3: bisformData.Top_management_of_the_manufacturing_unit_name_3,
    Top_management_of_the_manufacturing_unit_designation_3: bisformData.Top_management_of_the_manufacturing_unit_designation_3,
    Top_management_of_the_manufacturing_unit_name_4: bisformData.Top_management_of_the_manufacturing_unit_name_4,
    Top_management_of_the_manufacturing_unit_designation_4: bisformData.Top_management_of_the_manufacturing_unit_designation_4,
    Top_management_of_the_manufacturing_unit_name_5: bisformData.Top_management_of_the_manufacturing_unit_name_5,
    Top_management_of_the_manufacturing_unit_designation_5: bisformData.Top_management_of_the_manufacturing_unit_designation_5,
    Who_is_signing: bisformData.Who_is_signing,
    Technical_management_of_the_manufacturing_unit_name_1: bisformData.Technical_management_of_the_manufacturing_unit_name_1,
    Technical_management_of_the_manufacturing_unit_designation_1: bisformData.Technical_management_of_the_manufacturing_unit_designation_1,
    Technical_management_of_the_manufacturing_unit_name_2: bisformData.Technical_management_of_the_manufacturing_unit_name_2,
    Technical_management_of_the_manufacturing_unit_designation_2: bisformData.Technical_management_of_the_manufacturing_unit_designation_2,
    Technical_management_of_the_manufacturing_unit_name_3: bisformData.Technical_management_of_the_manufacturing_unit_name_3,
    Technical_management_of_the_manufacturing_unit_designation_3: bisformData.Technical_management_of_the_manufacturing_unit_designation_3,
    Contact_person_of_the_manufacturing_unit_name_: bisformData.Contact_person_of_the_manufacturing_unit_name_,
    Contact_person_of_the_manufacturing_unit_designation:  bisformData.Contact_person_of_the_manufacturing_unit_designation,
    Contact_person_of_the_manufacturing_unit_contact_number:  bisformData.Contact_person_of_the_manufacturing_unit_contact_number,
    Contact_person_of_the_manufacturing_unit_emailid:  bisformData.Contact_person_of_the_manufacturing_unit_emailid,
    Brand_trademark: bisformData.Brand_trademark,
    Brand_owned_by: bisformData.Brand_owned_by,
    Brand_registered: bisformData.Brand_registered,
    Brand_owner_company_name: bisformData.Brand_owner_company_name,
    Brand_owner_company_address: bisformData.Brand_owner_company_address,
    Name_of_the_AIR_company: bisformData.Name_of_the_AIR_company,
    Address_of_the_AIR_company: bisformData.Address_of_the_AIR_company,
    Top_management_of_the_AIR_company_name: bisformData.Top_management_of_the_AIR_company_name,
    Top_management_of_the_AIR_company_designation: bisformData.Top_management_of_the_AIR_company_designation,
    Top_management_of_the_AIR_company_contact_number: bisformData.Top_management_of_the_AIR_company_contact_number,
    Top_management_of_the_AIR_company_emailid: bisformData.Top_management_of_the_AIR_company_emailid,
    Authorized_signatory_name: bisformData.Authorized_signatory_name,
    Authorized_signatory_designation: bisformData.Authorized_signatory_designation,
    Authorized_signatory_contact_number: bisformData.Authorized_signatory_contact_number,
    Authorized_signatory_emailid: bisformData.Authorized_signatory_emailid,
    AIR_company_aadhar_card: bisformData.AIR_company_aadhar_card,
    AIR_company_pan_card: bisformData.AIR_company_pan_card,
    AIR_signing_person: bisformData.AIR_signing_person,
    AIR_company_condition: bisformData.AIR_company_condition,
    compliance: localStorage.getItem("compliance_id"),
  request_for: 'certification',
  application: applicationId,
  };

  console.log(updatedBISformData)
    axiosInstance
      .post('/application/compliance/', updatedBISformData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        Swal.fire({
          title: 'Success',
          text: 'Form submitted successfully',
          icon: 'success',
        });

        for (const [formName, formData] of Object.entries(data.data.forms)) {
          const file = new Blob([formData], { type: 'text/plain' });
          const fileUrl = URL.createObjectURL(file);
          const link = document.createElement('a');
          link.href = fileUrl;
          link.download = `${formName}.txt`;
          link.click();
          URL.revokeObjectURL(fileUrl);
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit form',
          icon: 'error',
        });
      });
  };

  const handleBISChange = (e) => {
    setBisformData({ ...bisformData, [e.target.name]: e.target.value });
  }; 

  const fetchBISData = async () => {
    try {

      const response = await axiosInstance.get(
        `application/inclusive/?compliance=${localStorage.getItem('compliance_name')}`
      );
      const bisdata = response.data['fields'];
      console.log(bisdata);
      setBisformData({ ...bisformData, ...bisdata });
    } catch (error) {
      console.error(error);
    }
  };


 // open compliance video in new window
 const handleVideoClick = (e, videoUrl) => {
   e.preventDefault();
   window.open(videoUrl, "Compliance Video", "width=800,height=600");
 };


 

 const handleClick = async (complianceName, complianceId, event) => {
  localStorage.setItem("compliance_id", complianceId);
  localStorage.setItem("compliance_name", complianceName);

  try {
    // Fetch data on button click
    await fetchData();

    // Call the API to get autofill information for the compliance
    const response = await axiosInstance.get(`application/inclusive/?compliance=${localStorage.getItem("compliance_name")}`);
    const autofill = response.data["key"];
    setAutofillform(autofill);

    if (complianceName === "TEC") {
      if (autofill === 'Yes') {
        // Call the function for registering
        setButtonautofilledtec(true);
        console.log(autofill);
      } else if (autofill === 'No') {
        // Call the function for unregistering
        setButtonpopupform1tec(true);
      }
    } else if (complianceName === "BIS") {
      // Fetch BIS data
      await fetchBISData();

      if (autofill === 'Yes') {
        // Call the function for registering
        setButtonautofilledbis(true);
        console.log(autofill);
      } else if (autofill === 'No') {
        // Call the function for unregistering
        setButtonpopupform1tec(true); // Change with bis popupautofill form
      }
    }
  } catch (error) {
    console.error(error);
  }
};



  //BIS DYNAMIC POPUP CHOOSE OPTION YES OR NO  function handle here-------------------------
  function handleautofilled(event) {
    const value = event.target.value;
    
    if (autofillform === 'Yes' && value === 'Yesautofilled') {
      // Call the function for registering
      setButtonautofillpopupbis(true);
      console.log(autofillform);
    } else if (value === 'Noform1') {
      // Call the function for unregistering
      setButtonRegisterbis(true);
    }
    setButtonautofilledbis(false)
  }
  

  
  // HandleChange of Registerbutton---------
  function handleRadioChange(event) {
    setFactory_signing_person(event.target.value);  //Signing Person DropDown Event Here---------
  const value = event.target.value;
  
  if (value === 'register') {
    // Call the function for registering
    setButtonRegisterPagebis(true);
  } else if (value === 'unregister') {
    // Call the function for unregistering
    setButtonPopup6bis(true);
  }
  setButtonRegisterbis(false)
}

//Handle signingpersonchange Dropdown Option ------------



  return (
    <div className="table-bgsconpage">
    <div className="table">
    <h1 style={{ display: 'none' }}>Application Number: {applicationId}</h1>
    <h1 >List of Compliance</h1>
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
      onClick={(event) => handleClick(compliance.product_name, compliance.id, event)}
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


{/*------------------------ TEC DYNAMIC FORM DATA POPUP CODE HERE------------------------ */}
<Popup trigger={buttonautofilledtec} setTrigger={setButtonautofilledtec}
>
<h3 className="reg-popup-titlte">Continue with previous data?</h3>
<div className="checkbox-container">
  <div className="bis-register">
    <div>
      <label>
        <input
        className="bis-register"
          type="checkbox"
          value="Yesautofilledtec"
          //checked={radioValue === 'Option 1'}
          onChange={handletableautoform}
          onClick={() => setButtonautofilledtec(false)}
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
          value="Noform1tec"
          //checked={radioValue === 'Unregister'}
           onChange={handletableautoform}
           onClick={() => setButtonpopupform1tec(false)}
        />
        NO
      </label>
    </div>
  </div>
</div>

</Popup>


{/*-------------- TEC DYNAMIC AUTO FILL FORM CODE HERE --------------------------------- */}
<Popup trigger={buttonautofillpopuptec} setTrigger={setButtonautofillpopuptec}>
<div style={{ height: "500px", overflow: "scroll" }}>
          <form onSubmit={handleSubmittecauto}>

<h3>Applicant</h3>
          <label className="st8012">
      Applicant company CIN
   <input
        className="st805"
        type="text"
        name="Applicant_company_CIN"
        value={tecformData.Applicant_company_CIN}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Applicant company address
   <input
        className="st805"
        type="text"
        name="Applicant_company_address"
        value={tecformData.Applicant_company_address}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Applicant company name
   <input
        className="st805"
        type="text"
        name="Applicant_company_name"
        value={tecformData.Applicant_company_name}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Applicant contact number
   <input
        className="st805"
        type="text"
        name="Applicant_contact_number"
        value={tecformData.Applicant_contact_number}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Applicant director designation
   <input
        className="st805"
        type="text"
        name="Applicant_director_designation"
        value={tecformData.Applicant_director_designation}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Applicant director name
   <input
        className="st805"
        type="text"
        name="Applicant_director_name"
        value={tecformData.Applicant_director_name}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Applicant emailid
   <input
        className="st805"
        type="text"
        name="Applicant_emailid"
        value={tecformData.Applicant_emailid}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Authorised signatory designation
   <input
        className="st805"
        type="text"
        name="Authorised_signatory_designation"
        value={tecformData.Authorised_signatory_designation}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Authorised signatory emailid
   <input
        className="st805"
        type="text"
        name="Authorised_signatory_emailid"
        value={tecformData.Authorised_signatory_emailid}
        onChange={handleChange}
      />
      </label> 

      <label className="st8012">
      Authorised signatory name
   <input
        className="st805"
        type="text"
        name="Authorised_signatory_name"
        value={tecformData.Authorised_signatory_name}
        onChange={handleChange}
      />
      </label>

      <label className="st8012">
      Authorised signatory number
   <input
        className="st805"
        type="text"
        name="Authorised_signatory_number"
        value={tecformData.Authorised_signatory_number}
        onChange={handleChange}
      />
      </label>

<h3>Foreign Manufacturer</h3>
      <label className="st8012">
      Authorised signatory designation
   <input
        className="st805"
        type="text"
        name="Foreign_manufacturer_authorised_signatory_designation"
        value={tecformData.Foreign_manufacturer_authorised_signatory_designation}
        onChange={handleChange}
      />
      </label>

      <label className="st8012">
      Authorised signatory name
   <input
        className="st805"
        type="text"
        name="Foreign_manufacturer_authorised_signatory_name"
        value={tecformData.Foreign_manufacturer_authorised_signatory_name}
        onChange={handleChange}
      />
      </label>

      <label className="st8012">
      Company address
   <input
        className="st805"
        type="text"
        name="Foreign_manufacturer_company_address"
        value={tecformData.Foreign_manufacturer_company_address}
        onChange={handleChange}
      />
      </label>

      <label className="st8012">
      Company name
   <input
        className="st805"
        type="text"
        name="Foreign_manufacturer_company_name"
        value={tecformData.Foreign_manufacturer_company_name}
        onChange={handleChange}
      />
      </label>

      <label className="st8012">
      Contact_number
   <input
        className="st805"
        type="text"
        name="Foreign_manufacturer_contact_number"
        value={tecformData.Foreign_manufacturer_contact_number}
        onChange={handleChange}
      />
      </label>

      <label className="st8012">
      Email ID
   <input
        className="st805"
        type="text"
        name="Foreign_manufacturer_emailid"
        value={tecformData.Foreign_manufacturer_emailid}
        onChange={handleChange}
      />
      </label>

      <label className="st8012">
      Types of company
      <select className='st804' 
      name="Types_of_company"
      value={tecformData.Types_of_company}
      onChange={handleChange}
      >
              <option value="Foreign">Foreign</option>
              <option value="Indian">Indian</option>
             </select>
      </label>

      <button className='btn808' type="submit">Submit</button>

            </form>
            </div>

</Popup>

{/*---------------TEC FORMS START NEW APPLICATION POPUP CODE HERE ----------------------*/}
<Popup trigger={buttonpopupform1tec} setTrigger={setButtonpopupform1tec}>
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
              <option value="Foreign">Foreign</option>
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
    onChange={(event) => setApplicantContactNumber(event.target.value)}
    type="tel"
    pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
    required // Make the field required to ensure a value is entered
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
                onChange={(event) => setApplicantContactNumber1(event.target.value)}
                type="tel"
                pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
                title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                required // Make the field required to ensure a value is entered

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
                onChange={(event) => setForeignContactNumber(event.target.value)}
                type="tel"
                pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
                title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                required // Make the field required to ensure a value is entered

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
  <input className="stup805" type="file" onChange={(event) => setCoiApplicant(event.target.files)}  />
</label>

            <label className="st8012">
              PAN Card of Applicant Company:
              <input className="stup805" type="file" onChange={(event) => setPanCard(event.target.files)}  />
            </label>
            <label className="st8012">
              MOA:
              <input className="stup805" type="file"  onChange={(event) => setMoa(event.target.files)} />
            </label>
            <label className="st8012">
              AOA:
              <input className="stup805" type="file" onChange={(event) => setAoa(event.target.files)}  />
            </label>
            <label className="st8012">
              Shareholding Pattern:
              <input className="stup805" type="file"  onChange={(event) => setShareholding(event.target.files)} />
            </label>
            <label className="st8012">
              Board Resolution (If Director is not signing Authority):
              <input className="stup805" type="file"  onChange={(event) => setBoardresolution(event.target.files)} />
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

{/*----------------- TEC END HERE AND START BIS FROMS CODE HERE ---------------------- */}

{/*------------------------ BIS DYNAMIC FORM DATA POPUP CODE HERE------------------------ */}
<Popup trigger={buttonautofilledbis} setTrigger={setButtonautofilledbis}>
<h3 className="reg-popup-titlte">Continue with previous data?</h3>
<div className="checkbox-container">
  <div className="bis-register">
    <div>
      <label>
        <input
        className="bis-register"
          type="checkbox"
          value="Yesautofilled"
          //checked={radioValue === 'Option 1'}
          onChange={handleautofilled}
          onClick={() => setButtonautofilledbis(false)}
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
          value="Noform1"
          //checked={radioValue === 'Unregister'}
           onChange={handleautofilled}
           onClick={() => setButtonRegisterbis(false)}
        />
        NO
      </label>
    </div>
  </div>
</div>

</Popup>


{/*--------- BIS Pervious DYNAMIC FORM DATA AUTO FILL FORM CODE IS HERE -------------------- */}
<Popup trigger={buttonautofillpopupbis} setTrigger={setButtonautofillpopupbis}>
<div style={{ height: "500px", width:"608px", overflow: "scroll" }}>
          <form onSubmit={handleSubmitBISauto}>

          <h1 className='h802'>  Certification Process </h1>
          <label className="st8012">
            Manufacture:
             <select className='st804'
             name="Types_of_company"
       value={bisformData.Types_of_company}
       onChange={handleBISChange}
       >
              <option value="Foreign">Foreign</option>
              <option value="Indian">Indian</option>
             </select>
            </label>

            <label className="st8012">
            Factory Name:
              <input
                className="st805"
                type="text"
                name="Factory_name"
                value={bisformData.Factory_name}
                onChange={handleBISChange}
              />
            </label>

            <label className="st8012">
            Factory Address (complete address):
            <input
                className="st805"
                type="text"
                name="Factory_address"
                value={bisformData.Factory_address}
                onChange={handleBISChange}
              />
            </label>

            <label className="st8012">
            Contact Number:
            <input
                className="st805"
                name="Factory_contact_number"
                value={bisformData.Factory_contact_number}
                onChange={handleBISChange}
                type="tel"
                pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
                title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                required // Make the field required to ensure a value is entered
              />
            </label>

            <label className="st8012">
            Email id:
            <input
                className="st805"
                type="text"
                name="Factory_emailid"
                value={bisformData.Factory_emailid}
                onChange={handleBISChange}
              />
            </label>

            <select className="bisdrop" name="Factory_signing_person"
       value={bisformData.Factory_signing_person}
       onChange={handleBISChange}>

          <option value="Contact">SIGNING PERSON  WILL BE CONTACT PERSON</option>
          <option value="Top">SIGNING PERSON  WILL BE FROM TOP MANAGEMENT </option>
        </select>

 {/* ----------------Prvious Top Management code Here---------------------- */}       

 <h3 className='topmang'>Top Management (Fill atleast Two)</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
      <input className="st805" type="text" 
        placeholder="1)Name"
        name="Top_management_of_the_manufacturing_unit_name_1"
        value={bisformData.Top_management_of_the_manufacturing_unit_name_1}
        onChange={handleBISChange}
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text"
        placeholder="2)Name"
        name="Top_management_of_the_manufacturing_unit_name_2"
        value={bisformData.Top_management_of_the_manufacturing_unit_name_2}
        onChange={handleBISChange}
          />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="3)Name"
       name="Top_management_of_the_manufacturing_unit_name_3"
       value={bisformData.Top_management_of_the_manufacturing_unit_name_3}
       onChange={handleBISChange}
         />
      </label>

      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="4)Name"
       name="Top_management_of_the_manufacturing_unit_name_4"
       value={bisformData.Top_management_of_the_manufacturing_unit_name_4}
       onChange={handleBISChange}
       />
      </label>

      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="5)Name"
       name="Top_management_of_the_manufacturing_unit_name_5"
       value={bisformData.Top_management_of_the_manufacturing_unit_name_5}
       onChange={handleBISChange}
       />
      </label>
      </div>

      <div className="designations">
      <label className="st8012">
        <input className="st805" type="text" 
      placeholder="1)Designation"
      name="Top_management_of_the_manufacturing_unit_designation_1"
      value={bisformData.Top_management_of_the_manufacturing_unit_designation_1}
      onChange={handleBISChange}
       />
      </label>

      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="2)Designation"
       name="Top_management_of_the_manufacturing_unit_designation_2"
       value={bisformData.Top_management_of_the_manufacturing_unit_designation_2}
       onChange={handleBISChange}
       />
      </label>
      <label className="st8012">
      <input className="st805" type="text" 
     placeholder="3)Designation"
     name="Top_management_of_the_manufacturing_unit_designation_3"
       value={bisformData.Top_management_of_the_manufacturing_unit_designation_3}
       onChange={handleBISChange}
     />
    </label>

    <label className="st8012">
        <input className="st805" type="text" 
      placeholder="4)Designation"
      name="Top_management_of_the_manufacturing_unit_designation_4"
       value={bisformData.Top_management_of_the_manufacturing_unit_designation_4}
       onChange={handleBISChange}
      />
      </label> 
      <label className="st8012">
        <input className="st805" type="text" 
      placeholder="5)Designation"
      name="Top_management_of_the_manufacturing_unit_designation_5"
      value={bisformData.Top_management_of_the_manufacturing_unit_designation_5}
      onChange={handleBISChange}
       />
      </label>
      </div>
  </div>
</div>

{/* DropDown of Which person is Signin  */}
{Factory_signing_person === "Top" && (
        <div>
          {/* Render additional popup or options for signing person from top management */}
          <select className="bisdrop" name="Who_is_signing"
       value={bisformData.Who_is_signing}
       onChange={handleBISChange}>

            <option value="">Choose Signing Person from Top Management</option>
            <option value="1">Name 1</option>
            <option value="2">Name 2</option>
            <option value="3">Name 3</option>
            <option value="4">Name 4</option>
            <option value="5">Name 5</option>
          </select>
        </div>
      )}

{/*----------Pervious Technical Management Input code Here---------------- */}

<h3 className='techni'>Technical Management (Fill atleast Two)</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="1)Name"
       name="Technical_management_of_the_manufacturing_unit_name_1"
      value={bisformData.Technical_management_of_the_manufacturing_unit_name_1}
      onChange={handleBISChange}
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
      placeholder="2)Name"
      name="Technical_management_of_the_manufacturing_unit_name_2"
      value={bisformData.Technical_management_of_the_manufacturing_unit_name_2}
      onChange={handleBISChange}
         />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="3)Name"
       name="Technical_management_of_the_manufacturing_unit_name_3"
       value={bisformData.Technical_management_of_the_manufacturing_unit_name_3}
       onChange={handleBISChange}
       />
      </label>
    </div>

    <div className="designations">
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="1)Designation"
       name="Technical_management_of_the_manufacturing_unit_designation_1"
       value={bisformData.Technical_management_of_the_manufacturing_unit_designation_1}
       onChange={handleBISChange}
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="2)Designation"
       name="Technical_management_of_the_manufacturing_unit_designation_2"
       value={bisformData.Technical_management_of_the_manufacturing_unit_designation_2}
       onChange={handleBISChange} 
       />
      </label>
      <label className="st8012">
        <input className="st805" type="text" 
        placeholder="3)Designation"
        name="Technical_management_of_the_manufacturing_unit_designation_3"
        value={bisformData.Technical_management_of_the_manufacturing_unit_designation_3}
        onChange={handleBISChange}
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
        name="Contact_person_of_the_manufacturing_unit_name_"
        value={bisformData.Contact_person_of_the_manufacturing_unit_name_}
        onChange={handleBISChange}
         />
      </label>
     
      <label className="st8012">
        <input className="st805" type="text" 
         placeholder="Designation"
         name="Contact_person_of_the_manufacturing_unit_designation"
         value={bisformData.Contact_person_of_the_manufacturing_unit_designation}
         onChange={handleBISChange}
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
    placeholder="Contact Number"
    name="Contact_person_of_the_manufacturing_unit_contact_number"
    value={bisformData.Contact_person_of_the_manufacturing_unit_contact_number}
    onChange={handleBISChange}
    type="tel"
    pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
    required // Make the field required to ensure a value is entered
  />
</label>
     
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="Email Id"
       name="Contact_person_of_the_manufacturing_unit_emailid"
       value={bisformData.Contact_person_of_the_manufacturing_unit_emailid}
       onChange={handleBISChange}
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
    name="Brand_trademark"
    value={bisformData.Brand_trademark}
    onChange={handleBISChange}
  />
</label>

<label className="st8012">
Owned by self or others:
<select className="st801" name="Brand_owned_by"
    value={bisformData.Brand_owned_by}
    onChange={handleBISChange}
    >
<option value="self">Self</option>
<option value="others">Others</option>
</select>
</label>

<label className="st8012">
Is the Brand Name/Trade Mark Registered?:
<select className="st801" name="Brand_registered"
    value={bisformData.Brand_registered}
    onChange={handleBISChange}
    >
<option value="yes">Yes</option>
<option value="no">No</option>
</select>
</label>
<label className="st8012">
Brand Owner Company Name:
  <input
    className="st805"
    type="text"
    name="Brand_owner_company_name"
    value={bisformData.Brand_owner_company_name}
    onChange={handleBISChange}
  />
</label>
<label className="st8012">
Brand Owner Company Address:
  <input
    className="st805"
    type="number"
    name="Brand_owner_company_address"
    value={bisformData.Brand_owner_company_address}
    onChange={handleBISChange}

  />
</label>


<h1 className='h802'>AIR </h1>
<label className="st8012">
AIR company Name:
  <input
    className="st805"
    type="text"
    name="Name_of_the_AIR_company"
    value={bisformData.Name_of_the_AIR_company}
    onChange={handleBISChange}

  />
</label>
<label className="st8012">
AIR company Address:
  <input
    className="st805"
    type="text"
    name="Address_of_the_AIR_company"
    value={bisformData.Address_of_the_AIR_company}
    onChange={handleBISChange}
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
name="Top_management_of_the_AIR_company_name"
       value={bisformData.Top_management_of_the_AIR_company_name}
       onChange={handleBISChange}
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Designation"
name="Top_management_of_the_AIR_company_designation"
       value={bisformData.Top_management_of_the_AIR_company_designation}
       onChange={handleBISChange}
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
placeholder="Contact Number"
name="Top_management_of_the_AIR_company_contact_number"
       value={bisformData.Top_management_of_the_AIR_company_contact_number}
       onChange={handleBISChange}
       type="tel"
       pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
       title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
       required // Make the field required to ensure a value is entered
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Email Id"
name="Top_management_of_the_AIR_company_emailid"
       value={bisformData.Top_management_of_the_AIR_company_emailid}
       onChange={handleBISChange}
/>
</label>
</div>
</div>
</div>

{/*----------------Pervious Name of authorized Signatory -----------------------------*/}

<h3 className='techni'>Name of authorized Signatory</h3>
<div className="row">
<div className="name-row">
<div className="names">
<label className="st8012">
<input className="st805" type="text" 
placeholder="Name"
name="Authorized_signatory_name"
       value={bisformData.Authorized_signatory_name}
       onChange={handleBISChange}
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Designation"
name="Authorized_signatory_designation"
       value={bisformData.Authorized_signatory_designation}
       onChange={handleBISChange}
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
placeholder="Contact Number"
name="Authorized_signatory_contact_number"
       value={bisformData.Authorized_signatory_contact_number}
       onChange={handleBISChange}
       type="tel"
       pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
       title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
       required // Make the field required to ensure a value is entered
/>
</label>

<label className="st8012">
<input className="st805" type="text" 
placeholder="Email Id"
name="Authorized_signatory_emailid"
       value={bisformData.Authorized_signatory_emailid}
       onChange={handleBISChange}
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
    name="AIR_company_aadhar_card"
    value={bisformData.AIR_company_aadhar_card}
    onChange={handleBISChange}

  />
</label>
<label className="st8012">
PAN Card:
  <input
    className="st805"
    type="text"
    name="AIR_company_pan_card"
    value={bisformData.AIR_company_pan_card}
    onChange={handleBISChange}

  />
</label>

<select className="bisdrop" name="AIR_signing_person"
       value={bisformData.AIR_signing_person}
       onChange={handleBISChange}
       >
<option value="Top">SIGNING PERSON  WILL BE FROM TOP MANAGEMENT </option>
<option value="contact">SIGNING PERSON  WILL BE someone from the company </option>
</select>

<div>
<select className="bisdrop" 
name="AIR_company_condition"
value={bisformData.AIR_company_condition}
onChange={handleBISChange}
>
<option value="1">If the AIR company is the sister company of the manufacturer and have office in India  </option>
<option value="2">If the AIR company is the Brandowner and have office in India  </option>
<option value="3">If the AIR company is the Brandowner </option>
</select>
</div>   

<button className='btn808' type="submit">Submit</button>

          </form>
          </div>
</Popup>


{/*--------------BIS REGSITER AND UNREGISTER CODES HERE ------------------------------- */}
<Popup trigger={buttonRegisterbis} setTrigger={setButtonRegisterbis}>
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
          onClick={() => setButtonRegisterbis(false)}
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
          onClick={() => setButtonRegisterbis(false)}
        />
        NO
      </label>
    </div>
  </div>
</div>
</Popup>

{/*---------------- BIS REGISTER POPUP R number PAGE CODE HERE----------------------------------- */}
<Popup trigger={buttonRegisterPagebis} setTrigger={setButtonRegisterPagebis}>
  
<form onSubmit={handleRNumbersubmit}>
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
        <label htmlFor="user-id">User ID:</label>
        <input
          type="text"
          id="user-id"
          name="Username_BISPortal"
          value={rnumberformData.Username_BISPortal}
          onChange={(event) =>
            setRnumberformData({
              ...rnumberformData,
              Username_BISPortal: event.target.value
            })
          }
        />
      </div>
      )}

{hasRNumber && (
      <div className="bis-userid">
        <label htmlFor="password">Password:</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="Password_BISPortal"
            value={rnumberformData.Password_BISPortal}
            onChange={(event) =>
              setRnumberformData({
                ...rnumberformData,
                Password_BISPortal: event.target.value
              })
            }
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
      )}


      {hasRNumber && (
        <div className="bis-userid">
          <label htmlFor="r-number">R Number:</label>
          <input
            type="text"
            id="user-id"
            name="Rnumber"
            value={rnumberformData.Rnumber}
            onChange={(event) =>
              setRnumberformData({
                ...rnumberformData,
                Rnumber: event.target.value
              })
            }
          />
        </div>
      )}

      <button className="bis-register" type="submit">
        Submit
      </button>
    </form>
</Popup>




{/*---------------START NEW APPLICATION BIS REQUIRED DETAILS POPUP IF USER SELECTED YES PAGE CODE HERE  ----------------------*/}
<Popup trigger={buttonPopup6bis} setTrigger={setButtonPopup6bis}>
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

  <label className="st8012">
 Do you have BIS portal credentials? 
        <select className='st804'
          value={hasBISReg ? 'yes' : 'no'}
          onChange={handleBISprotelChange}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      {hasBISReg && (
        <div>
          <label className="st8012">
            Username:
            <input
              className="st805"
              type="text"
              onChange={(event) => setUsername_BISPortal(event.target.value)}
            />
            <div>
             
      </div>
          </label>

          <label className="st8012">
            Password:
            <input
              className="st805"
              type={showPassword ? 'text' : 'password'}
              onChange={(event) => setPassword_BISPortal(event.target.value)}
            />
            <div
      className="password-toggle-icon"
      onClick={() => setShowPassword(!showPassword)}
    >
       {showPassword ? '🙈' : '👁️'}
    </div>
          </label>
        </div>
      )}

  <h1 className='h802'>  Certification Process </h1>

<label className="st8012">
            Manufacture:
             <select className='st804' onChange={(event) =>  setTypes_of_biscompany(event.target.value)}>
              <option value="Foreign">Foreign</option>
              <option value="Indian">Indian</option>
             </select>
            </label>

            <label className="st8012">
            Factory Name:
              <input
                className="st805"
                type="text"

                onChange={(event) => setFactory_name(event.target.value)}

              />
            </label>
            <label className="st8012">
            Factory Address (complete address):
              <input
                className="st805"
                type="text"

                onChange={(event) => setFactory_address(event.target.value)}

              />
            </label>
            <label className="st8012">
            Contact Number:
              <input
                className="st805"
                onChange={(event) => setFactory_contact_number(event.target.value)}
                type="tel"
                pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
                title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                required // Make the field required to ensure a value is entered
              />
            </label>

            <label className="st8012">
            Email id:
              <input
                className="st805"
                type="email"
                onChange={(event) => {
                  const inputValue = event.target.value;
                  const isValidEmail = inputValue.includes('@') && inputValue.includes('.');
                  setFactory_emailid(inputValue);
                  const errorElement = document.getElementById('bis-email-error');
            
                  if (isValidEmail) {
                    errorElement.textContent = '';
                  } else {
                    errorElement.textContent = 'Please enter a valid email address. Use @ and .xyz';
                  }
                }}
              />
            </label>
            <span id="bis-email-error" style={{ color: 'red' }}></span>

            <select className="bisdrop" onChange={(event) => setFactory_signing_person(event.target.value)}>
          <option value="Contact">SIGNING PERSON  WILL BE CONTACT PERSON</option>
          <option value="Top">SIGNING PERSON  WILL BE FROM TOP MANAGEMENT </option>
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

{/* DropDown of Which person is Signin  */}
{Factory_signing_person === "Top" && (
        <div>
          {/* Render additional popup or options for signing person from top management */}
          <select className="bisdrop" onChange={(event) => setWho_is_signing(event.target.value)} required>
            <option value="">Choose Signing Person from Top Management</option>
            <option value="1">Name 1</option>
            <option value="2">Name 2</option>
            <option value="3">Name 3</option>
            <option value="4">Name 4</option>
            <option value="5">Name 5</option>
          </select>
        </div>
      )}


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
        onChange={(event) => setContact_person_of_the_manufacturing_unit_name(event.target.value)} 
         />
      </label>
     
      <label className="st8012">
        <input className="st805" type="text" 
         placeholder="Designation"
        onChange={(event) => setContact_person_of_the_manufacturing_unit_designation(event.target.value)} 
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
    placeholder="Contact Number"
    onChange={(event) =>setContact_person_of_the_manufacturing_unit_contact_number(event.target.value)}
    type="tel"
    pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
    required // Make the field required to ensure a value is entered
  />
</label>
     
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="Email Id"
       onChange={(event) => {
        const inputValue = event.target.value;
        const isValidEmail = inputValue.includes('@') && inputValue.includes('.');
        setContact_person_of_the_manufacturing_unit_emailid(inputValue);
        const errorElement = document.getElementById('contact-email-error');
  
        if (isValidEmail) {
          errorElement.textContent = '';
        } else {
          errorElement.textContent = 'Please enter a valid email address. Use @ and .xyz';
        }
      }}
    />
      </label>
      </div>
      </div>
      </div>
      <span id="contact-email-error" style={{ color: 'red' }}></span>
     


      <h1 className='h802'>Brand</h1>

            <label className="st8012">
            Trademark:
              <input
                className="st805"
                type="tel"
                onChange={(event) => setBrand_trademark(event.target.value)}

              />
            </label>
          
            <label className="st8012">
            Owned by self or others:
            <select className="st801" onChange={(event) =>  setBrand_owned_by(event.target.value)}>
          <option value="self">Self</option>
          <option value="others">Others</option>
        </select>
            </label>

            <label className="st8012">
            Is the Brand Name/Trade Mark Registered?:
            <select className="st801" onChange={(event) =>  setBrand_registered(event.target.value)}>
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
                type="text"
                onChange={(event) => setBrand_owner_company_address(event.target.value)}

              />
            </label>
           
  
            <h1 className='h802'>AIR </h1>
            <label className="st8012">
            AIR company Name:
              <input
                className="st805"
                type="text"
                onChange={(event) => setName_of_the_AIR_company(event.target.value)}

              />
            </label>
            <label className="st8012">
            AIR company Address:
              <input
                className="st805"
                type="text"
                onChange={(event) => setAddress_of_the_AIR_company(event.target.value)}
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
        onChange={(event) => setTop_management_of_the_AIR_company_name(event.target.value)} 
         />
      </label>
     
      <label className="st8012">
        <input className="st805" type="text" 
         placeholder="Designation"
        onChange={(event) => setTop_management_of_the_AIR_company_designation(event.target.value)} 
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
    placeholder="Contact Number"
    onChange={(event) =>setTop_management_of_the_AIR_company_contact_number(event.target.value)}
    type="tel"
    pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
    required // Make the field required to ensure a value is entered
  />
</label>
     
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="Email Id"
       onChange={(event) => {
        const inputValue = event.target.value;
        const isValidEmail = inputValue.includes('@') && inputValue.includes('.');
        setTop_management_of_the_AIR_company_emailid(inputValue);
        const errorElement = document.getElementById('top-email-error');
  
        if (isValidEmail) {
          errorElement.textContent = '';
        } else {
          errorElement.textContent = 'Please enter a valid email address. Use @ and .xyz';
        }
      }}
    />
      </label>
      </div>
      </div>
      </div>
      <span id="top-email-error" style={{ color: 'red' }}></span>

 {/*---------------- Name of authorized Signatory -----------------------------*/}

      <h3 className='techni'>Name of authorized Signatory</h3>
            <div className="row">
  <div className="name-row">
    <div className="names">
      <label className="st8012">
        <input className="st805" type="text" 
        placeholder="Name"
        onChange={(event) => setAuthorized_signatory_name(event.target.value)} 
         />
      </label>
     
      <label className="st8012">
        <input className="st805" type="text" 
         placeholder="Designation"
        onChange={(event) => setAuthorized_signatory_designation(event.target.value)} 
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
    placeholder="Contact Number"
    onChange={(event) => setAuthorized_signatory_contact_number(event.target.value)}
    type="tel"
    pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
    required // Make the field required to ensure a value is entered
  />
</label>
     
      <label className="st8012">
        <input className="st805" type="text" 
       placeholder="Email Id"
       onChange={(event) => {
        const inputValue = event.target.value;
        const isValidEmail = inputValue.includes('@') && inputValue.includes('.');
        setAuthorized_signatory_emailid(inputValue);
        const errorElement = document.getElementById('authorized-email-error');
  
        if (isValidEmail) {
          errorElement.textContent = '';
        } else {
          errorElement.textContent = 'Please enter a valid email address. Use @ and .xyz';
        }
      }}
    />
      </label>
      </div>
      </div>
      </div>
      <span id="authorized-email-error" style={{ color: 'red' }}></span>


            <label className="st8012">
            Aadhar Card:
              <input
                className="st805"
                type="text"

                onChange={(event) => setAIR_company_aadhar_card(event.target.value)}

              />
            </label>
            <label className="st8012">
            PAN Card:
              <input
                className="st805"
                type="text"

                onChange={(event) => setAIR_company_pan_card(event.target.value)}

              />
            </label>

            <select className="bisdrop" onChange={(event) => setAIR_signing_person(event.target.value)}>
          <option value="Top">SIGNING PERSON  WILL BE FROM TOP MANAGEMENT </option>
          <option value="contact">SIGNING PERSON  WILL BE someone from the company </option>
        </select>

 <div>
        <select className="bisdrop" onChange={(event) => setAIR_company_condition(event.target.value)}>
          <option value="1">If the AIR company is the sister company of the manufacturer and have office in India  </option>
          <option value="2">If the AIR company is the Brandowner and have office in India  </option>
          <option value="3">If the AIR company is the Brandowner </option>
        </select>
        </div>

            <h1 className='h802'>Upload documents</h1>
            <label className="st8012">
            Business License :
  <input className="stup805" type="file" onChange={(event) => setUpload_business_license(event.target.files)} />
</label>

            <label className="st8012">
              ISO:
              <input className="stup805" type="file" onChange={(event) =>  setUpload_iso(event.target.files)} />
            </label>
            <label className="st8012">
            Trademark Cetificate:
              <input className="stup805" type="file"  onChange={(event) => setUpload_trademark_cetificate(event.target.files)}/>
            </label>
            <label className="st8012">
            Adhar Card:
              <input className="stup805" type="file" onChange={(event) => setUpload_adharcard(event.target.files)} />
            </label>
            <label className="st8012">
            Pan Card:
              <input className="stup805" type="file"  onChange={(event) => setUpload_pancard(event.target.files)}/>
            </label>
            <label className="st8012">
            GST:
              <input className="stup805" type="file"  onChange={(event) => setUpload_gst(event.target.files)}/>
            </label>
            <label className="st8012">
            Employee ID / Visiting Card of Siging authority:
              <input className="stup805" type="file"  onChange={(event) => setUpload_employeeid_visitingcard(event.target.files)}/>
            </label>
            <label className="st8012">
            MSME:
              <input className="stup805" type="file"  onChange={(event) => setUpload_msme(event.target.files)}/>
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
    </div>
  );
};

export default Secondpage;