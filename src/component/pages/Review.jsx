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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const history = useHistory();
  const idel = localStorage.getItem('ide');
  
  useEffect(() => {
    axiosInstance.get(`application/compliance/`)
      .then(response => {
        const tableData = response.data.data;
        setTableData(tableData);
      })
      .catch(error => {
        console.log(error);
      });
  }, [idel]);

  const handleClick = (id) => {
    localStorage.setItem('ide', id);
    const selectedItem = tableData.find((data) => data.id === id);
    const selectedStatus = selectedItem['status'] === "Ongoing" ? "Ongoing" : "completed";

    if (selectedItem.compliance_name === "BIS") {
      history.push(`/navbar/${selectedStatus === "Ongoing" ? "BISoongoing" : "BIScompleted"}/id=${id}`);
    } else if (selectedItem.compliance_name === "TEC") {
      history.push(`/navbar/${selectedStatus === "Ongoing" ? "TECOngoing" : "TECcompleted"}/id=${id}`);
    }
  };

  function handleFilterStatusChange(event) {
    const selectedStatus = event.target.value;
    setSelectedStatus(selectedStatus);
  }

  const handletableDownload = () => {
    const doc = new jsPDF('landscape');
    const headers = ["S.NO", "Project Code", "Compliance Type", "Product Name", "Model Number", "Associated Number/Family Model", "Start Date", "Estimated Completion Date", "Status", "Actual End Date"];
    const rows = tableData.map((data, index) => [  index + 1,  data.uniqueid,  data.compliance_name,  data.application_name, data.fields['Model_number'], data.fields['Associate_models'],  formatDate(data.startdate), data.estimated_date, data.status, data.end_date]);
    const columnWidth = [3, 25, 25, 30, 25, 40, 25, 35, 20, 35];
    const rowHeight = 6;

    doc.autoTable({
      head: [headers],
      body: rows,
      columnWidth: columnWidth,
      rowHeight: rowHeight,
      styles: { cellPadding: 2, valign: 'middle', halign: 'center' }
    });

    doc.save("Track Application History.pdf");
  };

  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  let placeholderText = 'Search';

  if (selectedOption === 'compliance') {
    placeholderText = 'Search Compliance Type';
  } else if (selectedOption === 'product') {
    placeholderText = 'Search Product Name';
  } else if (selectedOption === 'model') {
    placeholderText = 'Search Model Number';
  } else if (selectedOption === 'family') {
    placeholderText = 'Search Associated No/Family Model';
  } else if (selectedOption === 'project') {
    placeholderText = 'Search Project Code';
  }

  return (
    <div className="table">
      <h5>Application Progress & Reports</h5>
      
      <div className="search-bar">
      <i className="fas fa-search"></i>
      <select  className="search-drop" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        <option value="compliance">Compliance Type</option>
        <option value="product">Product Name</option>
        <option value="model">Model Number</option>
        <option value="family">Associated No/Family Model</option>
        <option value="project">Project Code</option>
      </select>
      <input
        type="search-text"
        placeholder={placeholderText}
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
    </div>
  
              {showPopup && (
                <Popup trigger={showPopup} setTrigger={setShowPopup}>
                  <h3>Choose date not Found!</h3>
                </Popup>
              )}
        
              <div className="tablerepot-btn">
                <div className="btn-wrapper">
                  <button className="revbtn" onClick={handletableDownload}>
                    Download Table Data
                  </button>
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
                          value={selectedStatus}
                          onChange={handleFilterStatusChange}
                        >
                          <option value="All">All</option>
                          <option value="Ongoing">Ongoing</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </th>
                      <th className="header">Actual End Date</th>
                    </tr>
                  </thead>
        
              
                  <tbody>
  {tableData
    .filter((data) => {
      if (
        (selectedStatus === 'Ongoing' && data.status !== 'Ongoing') ||
        (selectedStatus === 'Completed' && data.status !== 'Completed')
      ) {
        return false; // Skip this row
      }

      let displayData = tableData;

      if (selectedOption === "") {
        return true; // Show all rows
      } else if (selectedOption === 'compliance') {
        displayData = data.compliance_name;
      } else if (selectedOption === 'product') {
        displayData = data.application_name;
      } else if (selectedOption === 'model') {
        displayData = data.fields['Model_number'];
      } else if (selectedOption === 'family') {
        displayData = data.fields['Associate_models'];
      } else if (selectedOption === 'project') {
        displayData = data.uniqueid;
      }

      if (searchQuery) {
        return (
          displayData &&
          displayData.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      return true;
    })
    .map((data, index) => (
      <tr key={data.id}>
        <td>{index + 1}</td>
        <td className="clickable1" onClick={() => handleClick(data.id)}>
          {data.uniqueid}
        </td>
        <td className="clickable" onClick={() => handleClick(data.id)}>
          {data.compliance_name}
        </td>
        <td>{data.application_name}</td>
        <td>{data.fields['Model_number']}</td>
        <td>{data.fields['Associate_models']}</td>
        <td>{formatDate(data.startdate)}</td>
        <td>{data.estimated_date}</td>
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
        
