import React, { useState } from "react";
import "../Table.css";

function Notifaction() {
  const [data] = useState([
    { id: 1, notifaction: "TEC", date: "2022-03-14", action: "", },
    { id: 2, notifaction: "BIS", date: "2022-03-15", action: "",  },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const handleFilterDateChange = (event) => {
    const selectedDate = event.target.value;
    setFilterDate(selectedDate);

    const hasMatch = data.some((item) => item.date === selectedDate);
    setFilterDate(hasMatch ? selectedDate : "");
  };

  return (
    <div className="table">
      <h5>Notifaction</h5>

      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input
          type="option"
          placeholder="Search Notifaction"
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

      <div className="table-wrapper">
      <table className="Review">
        <thead>
          <tr>
            <th className="header">S.NO</th>
            <th className="header">Notifaction Name</th>
            <th className="header">Date</th>
            <th className="header">Linked Notifaction</th>
          </tr>
        </thead>

        <tbody>
  {data
    .filter((item) =>
      item.notifaction.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => (filterDate ? item.date === filterDate : true))
    .map((item, index) => (
      <tr key={item.id}>
        <td>{index + 1}</td>
        <td>{item.notifaction}</td>
        <td>{item.date}</td>
                  <td>{item.linked}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Notifaction;
