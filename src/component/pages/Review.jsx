import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../pagesscrn4/popup/Popup";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./Table.css";
import axiosInstance from "../../interceptors/axios";


function Review() {
  const [tableData, setTableData] = useState([]);
  //const [data] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 // const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  //const [startDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const history = useHistory();
  const [pdf] = useState("");
  const idel = localStorage.getItem('ide');
  
 

  useEffect(() => {
    axiosInstance.get(`application/compliance/`)
      .then(response => {
        const tableData = response.data.data;
       console.log(tableData);
        setTableData(tableData); // Set the fetched data to state

        // Use the id here for further processing
        const id = tableData[idel].id;
        console.log(id);


        // ...
      })
      .catch(error => {
        console.log(error);
      });
  }, [idel]);





  const handleClick = (id) => {
    localStorage.setItem('ide', id);
    console.log(id)
    const selectedItem = tableData.find((data) => data.id === id);
    const selectedStatus =
      selectedItem.status === "on-going" ? "on-going" : "completed";
    if (selectedItem.compliance_name === "BIS") {
      history.push(`/navbar/${selectedStatus === "on-going" ? "ComplianceTypePage" : "Completedcompliancetype"}/id=${id}`);
    } else if (selectedItem.compliance_name === "TEC") {
      history.push(`/navbar/${selectedStatus === "on-going" ? "TECOngoing" : "TECcompleted"}/id=${id}`);
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


 /* const handleFilterDateChange = (event) => {
    const selectedDate = event.target.value;
    const hasMatch = data.some((data) => data.startDate === selectedDate);
    setFilterDate(hasMatch ? selectedDate : "");
    setShowPopup(!hasMatch);
  }; */

  /* const filteredData = data
     .filter((data) =>
       data.compliance_name.toLowerCase().includes(searchQuery.toLowerCase())
     )
     .filter((data) => (filterDate ? data.startDate === filterDate : true))
     .filter((data) =>
       !filterStatus || data.status === filterStatus
     )
     .map((data) => {
       const endDate =
         startDate && data.startDate
           ? new Date(startDate).getTime() + 45 * 24 * 60 * 60 * 1000 <=
             new Date(data.startDate).getTime()
             ? new Date(startDate).getTime() + 45 * 24 * 60 * 60 * 1000
             : data.startDate
           : "";
       return {
         ...data,
         endDate: endDate ? `${Math.ceil((endDate - new Date().getTime()) / (24 * 60 * 60 * 1000))} days left` : ""
       };
     }) */


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
      {/*  <input
          type="date"
          placeholder="Enter Date"
          value={filterDate}
          onChange={handleFilterDateChange}
  /> */}
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
              <th className="header">Application Name </th>
              <th className="header">Start Date</th>
              <th className="header">Project Code</th>
              <th className="header">Estimated End Date</th>
              <th className="header">Actual End Date</th>
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
            {tableData.map((data, index) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td
                  className="clickable"
                  onClick={() => handleClick(data.id)}
                >
                  {data.compliance_name}
                </td>
                <td>{data.application_name}</td>
                <td>{data.startdate}</td>
                <td>{data.uniqueid}</td>
                <td>
                  {data.endDate
                    ? `${Math.ceil(
                      (new Date(data.endDate).getTime() -
                        new Date().getTime()) /
                      (24 * 60 * 60 * 1000)
                    )} days left`
                    : ""}
                </td>
                <td>{data.actualdate}</td>
                <td>{data.status}</td>
                <td className="hidden">{data.id}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>

  );
}


export default Review;
