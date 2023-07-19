import React, { useEffect, useState } from "react";
import Select from "react-select";
import axiosInstance from "../../../interceptors/axios";
import Swal from "sweetalert2";

function TECDownloadDoc({ onClose }) {
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
    Shareholding_Pattern:
      "https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Shareholding_Pattern.docx",
    Manufacturing_details:
      "https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Manufacturing_Details.docx",
    CDFCCL_Format:
      "https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/CDF-CCL_Format.docx",
    Annex_1_Signatory_authorization:
      "https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annex_1_Signatory_authorization.docx",
    Annexure_2_OEM_authorized_to_AIR:
      "https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annexure_2_OEM_authorized_to_AIR.docx",
    Annexure_3_MOU:
      "https://eikomp-backend-media.s3.ap-south-1.amazonaws.com/media/compliance/form/Annexure_3_MOU.docx",
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
    console.error(
      "There is no data stored in localStorage with the key 'myKey'"
    );
  }

  const handleDownload = (event) => {
    event.preventDefault();

    const urls = selectedOptions.map((option) => docDownload[option.value]);

    const downloadPromises = urls.map((url) => fetch(url));
    Promise.all(downloadPromises)
      .then((responses) =>
        Promise.all(responses.map((response) => response.blob()))
      )
      .then((blobs) => {
        blobs.forEach((blob, index) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
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
      .catch((error) => {
        console.error("There was an error downloading the file:", error);

        Swal.fire({
          icon: "error",
          title: "Download Failed",
          text: "Sorry, there was an error downloading your documents",
          confirmButtonText: "OK",
        });
      });
  };

  const options1 = [
    { value: "Shareholding_Pattern", label: "Shareholding Pattern" },
    { value: "Manufacturing_details", label: "Manufacturing Details" },
    { value: "CDFCCL_Format", label: "CDF/CCL Format" },
    {
      value: "Annex_1_Signatory_authorization",
      label: "Annex 1 Signatory authorization",
    },
    {
      value: "Annexure_2_OEM_authorized_to_AIR",
      label: "Annexure 2 OEM authorized to AIR",
    },
    { value: "Annexure_3_MOU", label: "Annexure 3 MOU" },
  ];

  return (
    <div className="download">
      <div>
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
          <button className="btn809" type="submit" onClick={handleDownload}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
}

export default TECDownloadDoc;
