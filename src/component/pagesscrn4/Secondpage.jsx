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

  //Start New Application Form const Code Here ------------------
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


  //handle from sumit here----------------------

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

    /*  if (image) {
        formData.append('documents', image, image.name);
      }
  
      if (pdf) {
        formData.append('documents', pdf, pdf.name);
      }  */
    
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


    //New form Application ID here ---------------
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
    //  else if (complianceName === "WPS") {
    //   history.push(`/navbar/compliance/WPS`);
    // } else if (complianceName === "BIS") {
    //   setButtonPopup6(true)
    // } else {
    //   // handle other compliance names
    // }
  };

 


  //Start New Application Code Here ----------------------------------------------------------------------



  return (
    <div className="table">
    <h1 style={{ display: 'none' }}>Application Number: {applicationId}</h1>
      <h1>List of Compliance</h1>
      <div className="table-wrapper">
        <table className="Review">
          <thead>
            <tr>
         {/*     <th>S.no</th> */}
              <th>Compliance Name</th>
              <th>Description</th>
              <th>Video</th>
             
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
                <td>{compliance.details}</td>
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






{/*---------------START NEW APPLICATION POPUP CODE HERE----------------------*/}
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


    </div>
  );
};

export default Secondpage;