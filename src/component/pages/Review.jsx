import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Table.css";

function Download() {
  const [data, setData] = useState([
    { id: 1, complianceType: "TEC", applicationName: "Telecom Products", date: "2022-03-14" },
    { id: 2, complianceType: "BIS", applicationName: "Battery12", date: "2022-03-15" },
    { id: 3, complianceType: "BEE", applicationName: "Mobile Phone", date: "2022-03-16" },
    { id: 4, complianceType: "WPC", applicationName: "Wireless - Radioactive", date: "2022-03-17" },
    { id: 5, complianceType: "TEC", applicationName: "Telecom Products", date: "2022-03-18" },
    { id: 6, complianceType: "BIS", applicationName: "Battery12", date: "2022-03-19" },
    { id: 7, complianceType: "BEE", applicationName: "Mobile Phone", date: "2022-03-20" },
    { id: 8, complianceType: "WPC", applicationName: "Wireless - Radioactive", date: "2022-03-21" },
    { id: 9, complianceType: "TEC", applicationName: "Telecom Products", date: "2022-03-22" },
    { id: 10, complianceType: "BEE", applicationName: "Mobile Phone", date: "2022-03-23" },
  ]);


  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const handleActionChange = (index, event) => {
    const newData = [...data];
    newData[index].action = event.target.value;
    setData(newData);

    
    if (event.target.value === "edit") {
      history.push(`/navbar/edit/${data[index].id}`);
    }
  };


  return (
    <div className="table-container">
      <h5>Download Forms & Upload</h5>

      <div className="search-bar">
      <i className="fas fa-search"></i>
        <input
          type="option"
          placeholder="Search Compliance Type"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>

      <table>
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
  );
}

export default Download;
