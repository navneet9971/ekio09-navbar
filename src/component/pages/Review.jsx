import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../pagesscrn4/popup/Popup";
import "./Table.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../../interceptors/axios";

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}

function Review() {
  const [tableData, setTableData] = useState([]);
  //const [data] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 // const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  //const [startDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const history = useHistory();
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
    const selectedStatus = selectedItem["status"] === "Ongoing" ? "Ongoing" : "completed";
console.log(selectedStatus);
//console.log(selectedItem["status"])
    if (selectedItem.compliance_name === "BIS") {
      history.push(`/navbar/${selectedStatus === "Ongoing" ? "ComplianceTypePage" : "Completedcompliancetype"}/id=${id}`);
    } else if (selectedItem.compliance_name === "TEC") {
      history.push(`/navbar/${selectedStatus === "Ongoing" ? "TECOngoing" : "TECcompleted"}/id=${id}`);
    }
  };  


  function handleFilterStatusChange(event) {
    const selectedStatus = event.target.value;
    console.log(selectedStatus);
  
    if (event.target && event.target.value) {
      setFilterStatus(selectedStatus);
    }
  
    if (selectedStatus === "all") {
      history.push("/navbar");
    } else {
      history.push(`/navbar/${selectedStatus}`);
    }
  }

  //download PDF handle
  
    
  const handletableDownload = () => {
    // create a new instance of jsPDF
    const doc = new jsPDF('landscape');
    
    // set the table headers and rows using the data array
    const headers = ["S.NO", "Project Code", "Compliance Type", "Product Name", "Model Number", "Associated Number/Family Model", "Start Date", "Estimated Completion Date", "Status", "Actual End Date"];
    const rows = tableData.map((data, index) => [  index + 1,  data.uniqueid,  data.compliance_name,  data.application_name, data.model_number, data.associated_number,  formatDate(data.startdate), data.estimated_date, data.status, data.end_date]);
    
    // set custom column widths
    const columnWidth = [3, 25, 25, 30, 25, 40, 25, 35, 20, 35];
    
    // set custom row height
    const rowHeight = 6;

    // add the table to the PDF document with custom column widths and row height
doc.autoTable({
  head: [headers],
  body: rows,
  columnWidth: columnWidth,
  rowHeight: rowHeight,
  styles: { cellPadding: 2, valign: 'middle', halign: 'center' } // Center aligns the content vertically and horizontally
});
    
  // download the PDF file
    doc.save("payment_history.pdf");
  };

  
  
  
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
    </div>

    {showPopup && (
      <Popup trigger={showPopup} setTrigger={setShowPopup}>
        <h3>Choose date not Found!</h3>
      </Popup>
    )}
 
 <div className="tablerepot-btn">
 <div className="btn-wrapper">
        <button className="revbtn" onClick={handletableDownload}>Download Table Data</button>
        </div>
        </div>

    <div className="table-wrapper">
      <table className="Review">
        <thead>
          <tr>
            <th className="header">S.NO</th>
            <th className="header">Project Code</th>
            <th className="header">Compliance Type</th>
            <th className="header">Product Name </th>
            <th className="header">Model Number</th>
            <th className="header">Associated Number/Family Model</th>
            <th className="header">Start Date</th>
            <th className="header">Estimated Completion Date</th>
            <th className="header">
              Status{" "}
              <select
                className="dropon"
                defaultValue={filterStatus}
                onChange={(event) => handleFilterStatusChange(event.target.value)}
              >
                <option value="">All</option>
                <option value="on-going">On-going</option>
                <option value="completed">Completed</option>
              </select>
            </th>
            <th className="header">Actual End Date</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
                 <td
                 className="clickable"
                 onClick={() => handleClick(data.id)}>{data.uniqueid}</td>

              <td className="clickable" onClick={() => handleClick(data.id)}>
                {data.compliance_name}
              </td>
              <td>{data.application_name}</td>
              <td>{data.fields['Model_number']}</td> 
              <td>{data.fields['Associate_models']}</td>
              <td>
                {formatDate(data.startdate)}
              </td>
              <td> {data.estimated_date}</td>
                 <td>{data.status}</td>
              <td>{data.end_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


}


export default Review;
