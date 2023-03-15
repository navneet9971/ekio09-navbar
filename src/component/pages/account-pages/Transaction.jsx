import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Transaction() {
  const [daata, setData] = useState([
    { id: 1, Transactiontype: "Testing",  date: "2022-03-14", action: "", },
    { id: 2, Transactiontype: "Payment",  date: "2022-03-15", action: "",  },
    { id: 3, Transactiontype: "Compliance Test",  date: "2022-03-16", action: "",  },
    { id: 4, Transactiontype: "Lab Testing",  date: "2022-03-17", action: "",  },
    { id: 5, Transactiontype: "In Progess",  date: "2022-03-18", action: "",  },
  ]);

  const [filterDate, setFilterDate] = useState("");
  const [filterType, setFilterType] = useState("");
  const history = useHistory();

  const handleActionChange = (index, event) => {
    const newData = [...daata];
    newData[index].action = event.target.value;
    setData(newData);

    if (event.target.value === "edit") {
      history.push(`/navbar/edit/${daata[index].id}`);
    }
  };

  const handleFilterDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div className="table-container">
      <h5>View Reports</h5>

      <div className="search-bar">
  <i className="fas fa-search"></i>
  <input
    className="date"
    type="date"
    value={filterDate}
    onChange={handleFilterDateChange}
  />
  <select
    className="type-select1"
    value={filterType}
    onChange={handleFilterTypeChange}
  >
    <option value="">All Types</option>
    {Array.from(new Set(daata.map((item) => item.Transactiontype))).map(
      (type) => (
        <option key={type} value={type}>
          {type}
        </option>
      )
    )}
  </select>
</div>

      <table>
        <thead>
          <tr>
            <th className="header">S.NO</th>
            <th className="header">Transaction Type</th>
            <th className="header">Date</th>
            <th className="header">Action</th>
          </tr>
        </thead>

        <tbody>
          {daata
          .filter(
            (item) =>
              (filterDate ? item.date === filterDate : true) &&
              (filterType ? item.Transactiontype === filterType : true)
          )
            .map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.Transactiontype}</td>
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

export default Transaction;
