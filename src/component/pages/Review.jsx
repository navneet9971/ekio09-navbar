import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../pagesscrn4/popup/Popup";
import "./Table.css";

function Review() {
  const [data] = useState([
    { id: 1, complianceType: "TEC", applicationName: "Telecom Products", startDate: "2023-03-25", status: "on-going" },
    { id: 2, complianceType: "BIS", applicationName: "Battery12", startDate: "2023-03-28", status: "completed" }, 
 { id: 3, complianceType: "BEE", applicationName: "Mobile Phone", startDate: "2022-03-16", status: "completed"  },
 { id: 4, complianceType: "WPC", applicationName: "Wireless - Radioactive", startDate: "2022-03-17", status: "completed" },
 { id: 5, complianceType: "TEC", applicationName: "Telecom Products", startDate: "2022-03-18",status: "on-going"  },
 { id: 6, complianceType: "BIS", applicationName: "Battery12", startDate: "2022-03-19", status: "completed" },
 { id: 7, complianceType: "BEE", applicationName: "Mobile Phone", startDate: "2022-03-20",status: "on-going"  },
 { id: 8, complianceType: "WPC", applicationName: "Wireless - Radioactive", startDate: "2022-03-21",status: "completed"  },
 { id: 9, complianceType: "TEC", applicationName: "Telecom Products", startDate: "2022-03-22",status: "on-going"  },
 { id: 10, complianceType: "BEE", applicationName: "Mobile Phone", startDate: "2022-03-23",  status: "completed"  },

  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [startDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const history = useHistory();

  const handleClick = (id) => {
      history.push(`/navbar/edit/${id}`);
    }

  <select
  value={filterStatus}
  onChange={(event) => setFilterStatus(event.target.value)}
>
  <option value="">All</option>
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
      className="clickablee"
      onClick={(event) => handleClick(index, event)}>
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
