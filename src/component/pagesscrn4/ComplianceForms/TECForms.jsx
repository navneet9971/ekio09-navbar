import React, { useState, useEffect } from 'react';
import "../Pages.css";
import Popup from "../popup/Popup";
//import { TiTick } from "react-icons/ti";
//import Select from 'react-select';
import axiosInstance from '../../../interceptors/axios';
import bgimage from "../../assets/pages-bgimages/15.svg";
import Swal from 'sweetalert2';


function MiddleSection() {
  // State variable
  const [middleData, setMiddleData] = useState("");
  const [applicationId, setNewApplicationId] = useState();

  useEffect(() => {
    axiosInstance
      .get(`compliance/${localStorage.getItem("compliance_id")}`)
      .then((response) => {
        setMiddleData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });


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






  // Rendered components
  return (
    <div style={{ backgroundImage: `url(${bgimage})` }}>
    <div className="ftch data">
      {/* Middle section component */}
      {middleData && (
        <>
          <div className="introdu">
          <h1 style={{ display: 'none' }}>Application Number: {applicationId}</h1>
            <h398 className="cont">{middleData.product_name} - Introduction</h398>
            <h2 className="content">{middleData.content}</h2>
          </div>

          <h398 className="regpro">{middleData.product_name} - Registration Process</h398>
          <img className="imgback" alt="flowchart" src={middleData.flowchart} />


        </>
      )}
    </div>
    </div>
  )
};


// -------------------------------Document Box Codes here---------------------------------------------------

/*  function DocumentBox() {

  const [buttonPopup1, setButtonPopup1] = useState(false);
  const docStatus1 = {
    Shareholding_Pattern: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Shareholding_Pattern.docx ',
    Manufacturing_details: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Manufacturing_details_tfyJoOx.xlsx',
    CDFCCL_Format: 'https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/CDF-CCL_Format_TMdRsOP.docx',
  };
  //const [document] = useState(null);
  const storedValue = JSON.parse(localStorage.getItem("myKey"));
  // console.log(storedValue[0]['form']);
if (storedValue !== null) {
  const base = "https://eikomp-backend-media.s3.amazonaws.com/";
  const docStatus = {};
  for (let i = 0; i < storedValue.length; i++) {
    const statusData = storedValue[i];
    docStatus[statusData["name"]] = `${base}${statusData["form"]}`;
  }
  console.log(docStatus);
} else {
  console.error("There is no data stored in localStorage with the key 'myKey'");
}
      // console.log(docStatus['Shareholding_Pattern'])
      // console.log(docStatus["Manufacturing details"])
      // console.log(docStatus['CDF-CCL Format'])


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
  
    const handleDownload = (event) => {
      event.preventDefault();
  
      // Build the URLs based on the selected options and the docStatus data
      const urls = [];
      selectedOptions.forEach(option => {
        urls.push(docStatus1[option.value]);
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
  
    // setButtonPopup1(false);


  const options = [
    { value: 'Shareholding_Pattern', label: 'Shareholding Pattern'},
    { value: 'Manufacturing_details', label: 'Manufacturing Details' },
    { value: 'CDFCCL_Format', label: 'CDF-CCL Format' },
  ];
*/



  // -------------------------------Document Box Codes here---------------------------------------------------
 /* return (
    <div className="document-box">

          //   DOWNLOAD BUTTON POPUP SECTION 

             <div className="tecforms-btn1">
                  <button className='tec-btn' onClick={() => setButtonPopup1(true)}>Download</button>
              </div>
    <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <h3>Download a File</h3>
        <label>
  <h4>Select file(s) to download:</h4>
  <div className="scroll-bar">
  <div className="select-container">
    <Select
      options={options}
      value={selectedOptions}
      onChange={setSelectedOptions}
      isMulti
      placeholder="Select files..."
    />
  </div>
</div>
</label>

        <div>
          <button className="button8" type="submit" onClick={handleDownload}>Download</button>
        </div>
    </Popup> 
{/*
    <div className="header-btn">
    <button className="button7" onClick={viewDocument}>View</button>
                </div> 

  </div>
);
}  */
    
// Video Section Codes Here----------------------------------------

   function Thirdpage() {
  // const [videoUrl, setVideoUrl] = useState('');
  // const [isWishlisted, setIsWishlisted] = useState(false);
  //const [buttonPopup2, setButtonPopup2] = useState(false);
/*  const [notifyData] = useState([
    { "s.no": '1', category: 'Mobile', Title: 'SAMSUNG', external: 'In Progress', date: '02-12-2023' },
    { "s.no": '2', category: 'Screen', Title: 'APPLE', external: 'Completed', date: '02-12-2023' },
    { "s.no": '3', category: 'Chipset', Title: 'SAMSUNG', external: 'Pending', date: '02-12-2023' },
  ]); */

  // Video Section Codes Here---or Section-----
  return (
    <div className="app55">
      <Startapp />
    {/*  <LabTestingBox /> */}
    {/*  <DocumentBox />   */}
      {/*  <div>
        <button className = "wishlist" 
        onClick={handleWishlistClick}>
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
      <div className="video-box55">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
  </div> */}
      <MiddleSection />

      {/*------------------Notify Section -----------------------*/}

       {/* <button className='tec-btn' onClick={() => setButtonPopup2(true)}>Notification</button> */}
     {/* <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
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
                </Popup> */}
     
 
    </div>
  )
};

// Start Applicatioon Form

function Startapp() {
  // state variables to store form data
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
 
  const [buttonPopup5, setButtonPopup5] = useState(false);



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
  
 
  return (
    <div>
      <div className="tecforms-btn3">
      <button className='tec-btn' onClick={() => setButtonPopup5(true)}>Start New Application</button>
      </div>
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

export default Thirdpage;