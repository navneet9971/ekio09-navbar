import React, {useState, useEffect} from "react";
import Select from 'react-select';
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";

function BISDownloadDeoc ({onClose}) {
  const [isLoading, setIsLoading] = useState(false); 


    useEffect(() => {
        axiosInstance
          .get(`compliance-form/?compliance=BIS`)
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
        setIsLoading(true); // Start loading animation
  
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
              a.download = `${selectedOptions[index].label}`;
              document.body.appendChild(a);
              a.click();
              a.remove();
            });
            Swal.fire({
                icon: "success",
                title: "Download Success",
                text: "Your documents have been downloaded successfully",
                confirmButtonText: "OK",
              });
              setIsLoading(false); // Stop loading animation
              onClose(); // Close the popup after download is complete
            })
          .catch(error => {
            console.error('There was an error downloading the file:', error);

            Swal.fire({
              icon: "error",
              title: "Download Failed",
              text: "Sorry, there was an error downloading your documents",
              confirmButtonText: "OK",
            });
            setIsLoading(false); // Stop loading animation
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
    <>
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

      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
      </>

  );
};

export default BISDownloadDeoc;