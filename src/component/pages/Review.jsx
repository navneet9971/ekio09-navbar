import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../pagesscrn4/popup/Popup";
import { PDFDownloadLink} from "@react-pdf/renderer";
import "./Table.css";
import axiosInstance from "../../interceptors/axios";

function Review() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [startDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const history = useHistory();
   const [pdf] = useState(null);
  // const viewerRef = useRef(null);

  useEffect(() => {
    axiosInstance.get(`application/compliance/`)  
        .then(response => {
          setData(response.data.data);
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
  
  const handleClick = (id, projectCode, complianceType) => {
    const selectedItem = data.find((item) => item.id === id);
    const selectedStatus =
      selectedItem.status === "on-going" ? "on-going" : "completed";
    if (selectedItem.complianceType === "BIS") {
      history.push(
        `/navbar/${
          selectedStatus === "on-going"
            ? "ComplianceTypePage"
            : "Completedcompliancetype"
        }/${selectedItem.complianceType}?name=${selectedItem.complianceType}&projectCode=${
          selectedItem.projectCode
        }`
      );
    } else if (selectedItem.complianceType === "TEC") {
      history.push(
        `/navbar/${
          selectedStatus === "on-going" ? "TECOngoing" : "TECcompleted"
        }/${selectedItem.complianceType}?name=${selectedItem.complianceType}&projectCode=${
          selectedItem.projectCode
        }`
      );
    }
  };

  
  const handleFilterStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setFilterStatus(selectedStatus);
  
    if (selectedStatus === "all") {
      history.push("/navbar");
    } else {
      history.push(`/navbar/${selectedStatus}`);
    }
  };
  
  <select value={filterStatus} onChange={handleFilterStatusChange}>
    <option value="all">All</option>
    <option value="on-going">On-going</option>
    <option value="completed">Completed</option>
  </select>
  

  const handleFilterDateChange = (event) => {
    const selectedDate = event.target.value;
    const hasMatch = data.some((item) => item.startDate === selectedDate);
    setFilterDate(hasMatch ? selectedDate : "");
    setShowPopup(!hasMatch);
  };  

  const filteredData = data
  .filter((item) =>
    item.complianceType.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .filter((item) => (filterDate ? item.startDate === filterDate : true))
  .filter((item) =>
  !filterStatus || item.status === filterStatus
)
  .map((item) => {
    const endDate =
      startDate && item.startDate
        ? new Date(startDate).getTime() + 45 * 24 * 60 * 60 * 1000 <=
          new Date(item.startDate).getTime()
          ? new Date(startDate).getTime() + 45 * 24 * 60 * 60 * 1000
          : item.startDate
        : "";
    return {
      ...item,
      endDate: endDate ? `${Math.ceil((endDate - new Date().getTime()) / (24 * 60 * 60 * 1000))} days left` : ""
    };
  })


  //PDF FILE DOWNLOAD HANDLE 

 /* const handleDownload = () => {
    const pdfContent = viewerRef.current?.pdfInstance;
    if (pdfContent) {
      pdfContent.getDataUrl({ format: "pdf" }, (url) => {
        setPdf(url);
      });
    }
  }; */
  

  return (
    <div className="table">
      <h5>Track Applications</h5>

      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input
          type="option"
          placeholder="Search Compliance Type"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <input
          type="date"
          placeholder="Enter Date"
          value={filterDate}
          onChange={handleFilterDateChange}
        />
      </div>

      {showPopup && (
        <Popup trigger={showPopup} setTrigger={setShowPopup}>
          <h3>Choose date not Found!</h3>
        </Popup>
      )}

<div className="download-button">
  <PDFDownloadLink
    document={<iframe title="Document Preview" src={pdf} style={{ width: "100%", height: "100%" }} />}
    fileName="table.pdf"
  >
    <button className="revbtn">Download PDF</button>
  </PDFDownloadLink>
</div>

  
<div className="table-wrapper">
      <table className="Review">
        <thead>
          <tr>
            <th className="header">S.NO</th>
            <th className="header">Compliance Type</th>
            <th className="header">Application Name</th>
            <th className="header">Start Date</th>
            <th className="header">Estimated End Date</th>
            <th className="header">Actual End Date</th>
            <th className="header">Project Code</th>
            <th className="header">
  Status{" "}
  <select
  className="dropon"
    value={filterStatus}
    onChange={(event) => setFilterStatus(event.target.value)}
  >
    <option value="">All</option>
    <option value="on-going">On-going</option>
    <option value="completed">Completed</option>
  </select>
</th>
          </tr>
        </thead>

        <tbody>
  {filteredData.map((item, index) => (
    <tr key={item.unique.id}>
      <td>{index + 1}</td>
      <td
  className="clickable"
  onClick={() => handleClick(item.id)}
>
  {item.compliance_name}
</td>
      <td>{item.application_name}</td>
      <td>{item.startdate}</td>
      <td>
        {item.endDate
          ? `${Math.ceil(
              (new Date(item.endDate).getTime() -
                new Date().getTime()) /
                (24 * 60 * 60 * 1000)
            )} days left`
          : "30 days Left"}
      </td>
      <td>{item.actualdate}</td>
      <td>{item.projectCode}</td>
      <td>{item.status}</td>
     
    </tr>
  ))}
</tbody>

      </table>
      </div>
    </div>
    
  );
}

export default Review;
