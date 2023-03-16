import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Pages.css";
import Popup from "./popup/Popup";

function MiddleSection() {
  return (
    <div className="middle-section">
      <h3>Middle Section</h3>
      <p>Description of Middle Section</p>
    </div>
  );
}

function LabTestingBox() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);

  const statusData = [
    { "s.no": '1', category: 'Mobile', onDate: '2022-02-01', currentStatus: 'In Progress' },
    { "s.no": '2', category: 'Screen', onDate: '2022-02-02', currentStatus: 'Completed' },
    { "s.no": '3', category: 'Chipset', onDate: '2022-02-03', currentStatus: 'Pending' },
  ];

  return (
    <div className="lab-testing-box">
      <p>Description of Lab Testing</p>
      <button7 onClick={() => setButtonPopup(true)}>Request Testing</button7>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h3>A request has been sent to our team. They will contact you within 48 working hours.</h3>
      </Popup>

      <button7 onClick={() => setButtonPopup1(true)}>Status</button7>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <div>
          <h32>My Order</h32>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Order Category</th>
                <th>On Date</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {statusData.map((data, index) => (
                <tr key={index}>
                  <td>{data["s.no"]}</td>
                  <td>{data.category}</td>
                  <td>{data.onDate}</td>
                  <td>{data.currentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Popup>
    </div>
  );
}
 

function DocumentBox() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0]);
    event.preventDefault();

    // Set the URL of the file to be downloaded based on the selected option
    let fileUrl;
    if (selectedOption === "Option 1") {
      fileUrl = "https://example.com/signatory-authorization.pdf";
    } else if (selectedOption === "Option 2") {
      fileUrl = "https://example.com/oem-authorization.pdf";
    } else if (selectedOption === "Option 3") {
      fileUrl = "https://example.com/mou.pdf";
    } else if (selectedOption === "Option 4") {
      fileUrl = "https://example.com/shareholding-pattern.pdf";
    } else if (selectedOption === "Option 5") {
      fileUrl = "https://example.com/annexure.pdf";
    } else if (selectedOption === "Option 6") {
      fileUrl = "https://example.com/bom.pdf";
    } else if (selectedOption === "Option 7") {
      fileUrl = "https://example.com/non-applicability.pdf";
    } else if (selectedOption === "Option 8") {
      fileUrl = "https://example.com/proforma-seeking-exemption.pdf";
    }

    // Trigger the download of the file
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
    link.click();

    setButtonPopup(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting form with file:', selectedFile);
    console.log('Selected option:', selectedOption);
    // Code to handle uploading the file and selected option
    setButtonPopup(false);
  }

  function viewDocument() {
    // Code to open a new tab and display the file
    console.log("Viewing file...");
    const viewUrl = 'https://example.com/document.pdf';
    window.open(viewUrl, '_blank');
  }

  return (
    <div className="document-box">
      <h3>Documents</h3>
      <p>Description of Documents</p>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <form onSubmit={handleSubmit}>
          <h3>Upload a File</h3>
          <label htmlFor="file-input">
            <h94>Choose File:</h94>
          </label>
          <input id="file-input12" type="file" accept="application/pdf" onChange={handleFileChange} />
          <label>
            <h98>Select an Option:</h98>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value=''>------Select------</option>
              <option value="Option 1">Signatory Authorization</option>
              <option value="Option 2">OEM Authorization</option>
              <option value="Option 3">MOU</option>
              <option value="Option 3">Shareholding Pattern</option>
              <option value="Option 3">Annexure</option>
              <option value="Option 3">BOM</option>
              <option value="Option 3">Non Applicability</option>
              <option value="Option 3">Proforma Seeking Exemption</option>
            </select>
          </label>
          <div>
            <button8 onClick={() => setButtonPopup(false)}>Cancel</button8>
            <button8 type="submit">Upload</button8>
          </div>
        </form>
      </Popup>
       <button7 onClick={() => setButtonPopup(true)}>Upload</button7>

               {/*DOWNLOAD BUTTON POPUP SECTION */}


       <button7 onClick={() => setButtonPopup1(true)}>Download</button7>
      <Popup trigger={buttonPopup1} setTrigger={setButtonPopup1}>
        <form onSubmit={handleSubmit}>
          <h3>Download a File</h3>
          <label>
            <h98>Select a file to download:</h98>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">------ Select ------</option>
              <option value="Option 1">Signatory Authorization</option>
              <option value="Option 2">OEM Authorization</option>
              <option value="Option 3">MOU</option>
              <option value="Option 4">Shareholding Pattern</option>
              <option value="Option 5">Annexure</option>
              <option value="Option 6">BOM</option>
              <option value="Option 7">Non Applicability</option>
              <option value="Option 8">Proforma Seeking Exemption</option>
            </select>
          </label>
          <div>
            <button8 type="submit">Download</button8>
          </div>
        </form>
      </Popup>

      <button7 onClick={viewDocument}>View</button7>
    </div>
  );
}


function Thirdpage() {
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    fetch('https://example.com/video')
      .then(response => response.json())
      .then(data => {
        setVideoUrl(data.url);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="app55">
      <div className="left-section55">
        <LabTestingBox />
        <DocumentBox />
      </div>
      <div className="video-box55">
        <video controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <div className="center-section55">
        <MiddleSection/>
      </div>
      <div className="right-section55">
        <Link to="/introduction">Introduction</Link>
        <Link to="/required-document">Required Document</Link>
        <Link to="/registration-process">Registration Process</Link>
      </div> 
      <div1 class="vl"></div1>  
    </div>
  );
}

export default Thirdpage;
