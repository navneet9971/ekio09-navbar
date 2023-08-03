import React, { useState, useEffect } from "react";
import Popup from "../../popup/Popup";
import { useHistory } from "react-router-dom";
import "jspdf-autotable";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";
import ReactLoading from "react-loading";
// import TECModfiEditBtnPage from "./TECModifiEditbtnPage";

function TECtableModification() {
  const [tableData, setTableData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [ editpopup, setEditpopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const history = useHistory();
  const modificationTecData = localStorage.getItem("tecmodificationData");

  useEffect(() => {
    axiosInstance
      .get("application/compliance/", {
        params: {
          status: "completed",
          compliance: "TEC",
        },
      })
      .then((response) => {
        const tableData = response.data.data;
        setTableData(tableData);
        console.log(tableData);

        localStorage.setItem("projectcode", tableData.uniqueid);
        console.log(localStorage.getItem("projectcode"));

        tableData.forEach((data) => {
          localStorage.setItem("userEdit_ide", data.id);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const handleEditClick = async (id, uniqueid) => {
    localStorage.setItem("userEdit_ide", id);
    localStorage.setItem("projectcode", uniqueid);
    try {
      const response = await axiosInstance.get(
        `application/compliance/${id}`
      );
      const tecmodificationData = response.data.data["fields"];
    //   console.log(tecmodificationData);
    localStorage.setItem("tecmodificationData", JSON.stringify(tecmodificationData));
      console.log(id);
    } catch (error) {
      console.error(error);
    }
    setEditpopup(true);
  };


  //START INPUT BOXES OF MODIFICATION ---------------------------

  const [tecformData, setTecformData] = useState({
    Hardware_number: "",
    Software_number: "",
    Associate_models:"",
    status : "Modification",
  })

  useEffect(() => {
    if (modificationTecData) {
      const parsedData = JSON.parse(modificationTecData);
      setTecformData(parsedData);
    }
  }, [modificationTecData]);

//   console.log(tecformData); //TecForm Data consolelog here and checkout
  
const handleSubmittecauto = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

    const modificationTecformData = {
        Hardware_number: tecformData.Hardware_number,
        Software_number: tecformData.Software_number,
        Associate_models: tecformData.Associate_models,
        status: "Modification",
        compliance: localStorage.getItem("compliance_id"),
      request_for: "certification",
      application: localStorage.getItem("applicationId"),
    };
    console.log(modificationTecformData);

    axiosInstance
    .put(`/application/compliance/${localStorage.getItem("userEdit_ide")}/`, modificationTecformData, {
     headers: {
        "Content-Type" : "multipart/form-data"
     },
    })
    .then((response) => {
        const data = response.data;
        console.log(data);
        Swal.fire({
          title: "Success",
          text:
            'Form submitted successfully. Please head over to the "Track Application" Page to upload documents and review progress ',
          icon: "success",
        }).then(() => {
          history.push('/navbar/review');
        setIsLoading(false); // Stop loading animation
        })
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to submit form",
          icon: "error",
        });
        setIsLoading(false); // Stop loading animation
      });
  };



const handleChange = (e) => {
    setTecformData({ ...tecformData, [e.target.name]: e.target.value });
  };


//Download Documents Code here------------------------
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

  const manufacturingDetailsUrl =
  "https://eikomp-backend-media.s3.amazonaws.com/media/compliance/form/Manufacturing_Details.docx";

  const handleDownload = (event) => {
    event.preventDefault();
    setIsLoading(true); // Start loading animation

   
    axiosInstance
      .get(manufacturingDetailsUrl, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(url);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Manufacturing_Details.docx");
        document.body.appendChild(link);
        link.click();
        link.remove();

        Swal.fire({
          icon: "success",
          title: "Download Success",
          text: "Your document has been downloaded successfully",
          confirmButtonText: "OK",
        });
        setIsLoading(false); // stop loading animation
      })
      .catch((error) => {
        console.error("There was an error downloading the file:", error);

        Swal.fire({
          icon: "error",
          title: "Download Failed",
          text: "Sorry, there was an error downloading your document",
          confirmButtonText: "OK",
        });
        setIsLoading(false); // stop loading animation
      });
  };



return (
    <div className="tble-reviewbg">
        {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
      <div className="table">
        <h5>Application Progress & Reports</h5>

        {showPopup && (
          <Popup trigger={showPopup} setTrigger={setShowPopup}>
            <h3>Choose date not Found!</h3>
          </Popup>
        )}

        <div className="table-wrapper">
          <table className="Review">
            <thead>
              <tr>
                <th className="header" style={{ cursor: "default" }}>
                  Project Code
                </th>
                <th className="header" style={{ cursor: "default" }}>
                  Product Name{" "}
                </th>
                <th className="header" style={{ cursor: "default" }}>
                  Model Number
                </th>
                <th
                  className="header"
                  style={{ cursor: "pointer" }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((data, index) => (
                <tr key={data.id}>
                  <td>{data.uniqueid}</td>
                  <td>{data.application_name}</td>
                  <td>{data.fields["Model_number"]}</td>
                  <td
                    style={{ color: "blue", fontWeight: "600", cursor: "pointer" }}
                    onClick={() => handleEditClick(data.id, data.uniqueid)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          <Popup trigger = {editpopup} setTrigger = {setEditpopup}>
<div>
      <form onSubmit={handleSubmittecauto}>
       <div>
<label className="st8012">
  Hardware Number
  <input
    className="st805"
    type="text"
    name="Hardware_number"
    value={tecformData.Hardware_number}
    onChange={handleChange}
  />
</label>

<label className="st8012">
  Software Number
  <input
    className="st805"
    type="text"
    name="Software_number"
    value={tecformData.Software_number}
    onChange={handleChange}
  />
</label>

<label className="st8012">
  Associate Model
  <input
    className="st805"
    type="text"
    name="Associate_models"
    value={tecformData.Associate_models}
    onChange={handleChange}
  />
</label>
</div>

<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
 
  <button className="reportbtn" style={{ margin: "10px", padding: "9px 14px" }} onClick={handleDownload}>
    Download Manufacturing Details
  </button>

  <button className="btn808" type="submit" style={{ marginRight: "10px" }}>
    Submit
  </button>

  <button className="reportbtn" style={{ margin: "10px", padding: "9px 14px" }} onClick={handleDownload}>
    Interface Addition/Deletion
  </button>
</div>

</form>


 
  

</div>
            {/* <TECModfiEditBtnPage /> */}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default TECtableModification;
