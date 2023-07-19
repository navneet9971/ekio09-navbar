import React, { useEffect, useState } from "react";
import axiosInstance from "../../../interceptors/axios";
import Select from 'react-select';
import Swal from "sweetalert2";


function BisIsiDownload ({onClose}) {
    
    useEffect(() => {
        axiosInstance
          .get(`compliance-form/?compliance=BIS-ISI`)
          .then((response) => {
            const downloadData = response.data;
            console.log(downloadData);
            localStorage.setItem("myKey", JSON.stringify(downloadData));
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

      
      const [selectedOptions, setSelectedOptions] = useState([]);
  

      //LINK CHANGE TEC FORMS TO BIS FORMS---------------------------------------------------------------------------
      const docDownload = {
        Raw_Material: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Raw_material_list.xlsx',
        Equipment: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Equipment_list.xlsx',
        Machinery: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Machinery_list.xlsx',
        Process_Flow_Chart_Sample: 'https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Process_flow_chart_NEW_QC.pdf', 
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
      
              onClose(); // Close the popup after download is complete
            })
          .catch(error => {
            console.error('There was an error downloading the file:', error);
          });
      };
    
    const options1 = [
      { value: 'Raw_Material', label: 'Raw Material'},
      { value: 'Equipment', label: 'Equipment' },
      { value: 'Machinery', label: 'Machinery' },
      { value: 'Process_Flow_Chart_Sample', label: 'Process Flow Chart Sample'},
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
      </>

    );
};

export default BisIsiDownload;