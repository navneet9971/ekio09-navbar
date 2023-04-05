import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../pagesscrn4/popup/Popup";
import "./Table.css";

function View() {
  const [data, setData] = useState([
    { id: 1, complianceType: "TEC", applicationName: "Telecom Products", date: "2022-03-14", action: "", },
    { id: 2, complianceType: "BIS", applicationName: "Battery12", date: "2022-03-15", action: "",  },
    { id: 3, complianceType: "BEE", applicationName: "Mobile Phone", date: "2022-03-16", action: "",  },
    { id: 4, complianceType: "WPC", applicationName: "Wireless - Radioactive", date: "2022-03-17", action: "",  },
    { id: 5, complianceType: "TEC", applicationName: "Telecom Products", date: "2022-03-18", action: "",  },
    { id: 6, complianceType: "BIS", applicationName: "Battery12", date: "2022-03-19", action: "",  },
    { id: 7, complianceType: "BEE", applicationName: "Mobile Phone", date: "2022-03-20", action: "",  },
    { id: 8, complianceType: "WPC", applicationName: "Wireless - Radioactive", date: "2022-03-21", action: "",  },
    { id: 9, complianceType: "TEC", applicationName: "Telecom Products", date: "2022-03-22", action: "",  },
    { id: 10, complianceType: "BEE", applicationName: "Mobile Phone", date: "2022-03-23", action: "",  },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const history = useHistory();

  const handleActionChange = (index, event) => {
    const newData = [...data];
    newData[index].action = event.target.value;
    setData(newData);

    if (event.target.value === "edit") {
      history.push(`/navbar/edit/${data[index].id}`);
    }
  };

  const handleFilterDateChange = (event) => {
    const selectedDate = event.target.value;
    setFilterDate(selectedDate);

    const hasMatch = data.some((item) => item.date === selectedDate);
    setFilterDate(hasMatch ? selectedDate : "");
    setShowPopup(!hasMatch);
  };

  return (
    <div className="table">
      <h5>View Reports</h5>

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
            <th className="header">Date</th>
            <th className="header">Action</th>
          </tr>
        </thead>

        <tbody>
          {data
            .filter((item) =>
              item.complianceType.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .filter((item) => (filterDate ? item.date === filterDate : true))
            .map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.complianceType}</td>
                <td>{item.applicationName}</td>
                <td>{item.date}</td>
                <td>
                  <select
                    className={`action-select`}
                    value={item.action || ""}
                    onChange={(event) => handleActionChange(index, event)}
                  >
                    <option value="">Select Action</option>
                    <option
                      value="edit"
                      onClick={() => {
                        // Redirect to edit page
                        window.location.href = `/navbar/edit/${item.id}`;
                      }}
                    >
                      Edit
                    </option>
                    <option value="download">Download</option>
                    <option value="view">View</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default View;