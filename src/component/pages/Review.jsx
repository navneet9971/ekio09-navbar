import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../pagesscrn4/popup/Popup";
import "./Table.css";

function Review() {
  const [data] = useState([
    { id: 1, complianceType: "TEC", applicationName: "Telecom Products", startDate: "2023-03-25", projectCode:101, status: "on-going" },
    { id: 2, complianceType: "BIS", applicationName: "Battery12", startDate: "2023-03-28", projectCode:102, status: "completed" }, 
    { id: 3, complianceType: "TEC", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:103,status: "on-going"  },
    { id: 4, complianceType: "BIS", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:104,status: "completed"  },
    { id: 5, complianceType: "WPS", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:105,status: "completed"  },
    { id: 6, complianceType: "TEC", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:106,status: "on-going"  },
    { id: 7, complianceType: "BIS", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:107,status: "completed"  },
    { id: 8, complianceType: "WPS", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:108,status: "on-going"  },
    { id: 9, complianceType: "BIS", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:109,status: "completed"  },
    { id: 10, complianceType: "TEC", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:110,status: "completed"  },
    { id: 11, complianceType: "BIS", applicationName: "Telecom Products", startDate: "2022-03-18", projectCode:111,status: "on-going"  },

  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [startDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const history = useHistory();

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
        }/complianceType=${selectedItem.complianceType}&projectCode=${
          selectedItem.projectCode
        }`
      );
    } else if (selectedItem.complianceType === "TEC") {
      history.push(
        `/navbar/${
          selectedStatus === "on-going" ? "TECOngoing" : "TECcompleted"
        }/complianceType=${selectedItem.complianceType}&projectCode=${
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
  
<div className="table-wrapper">
      <table className="Review">
        <thead>
          <tr>
            <th className="header">S.NO</th>
            <th className="header">Compliance Type</th>
            <th className="header">Application Name</th>
            <th className="header">Start Date</th>
            <th className="header">End Date</th>
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
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td
  className="clickable"
  onClick={() => handleClick(item.id)}
>
  {item.complianceType}
</td>
      <td>{item.applicationName}</td>
      <td>{item.startDate}</td>
      <td>
        {item.endDate
          ? `${Math.ceil(
              (new Date(item.endDate).getTime() -
                new Date().getTime()) /
                (24 * 60 * 60 * 1000)
            )} days left`
          : ""}
      </td>
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
