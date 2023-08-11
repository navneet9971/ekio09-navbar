import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2 library

function LabTestTableDataBIS() {
  const [filterValue, setFilterValue] = useState("All"); // State to store the selected filter value

  // Sample data for the table (you can replace this with your actual data)
  const tableData = [
    { id: 1, RequestQuote: "Request Quote", compliance: "BIS", budget: "$1000", testingConsultant: "Consultant -Navneet Kumar" },
    { id: 2, RequestQuote: "Request Quote", compliance: "BIS", budget: "$800", testingConsultant: "Consultant - Kritgya Kumar" },
    { id: 3, RequestQuote: "Request Quote", compliance: "BIS", budget: "$1200", testingConsultant: "Mansi Testing Lab" },
    // Add more data as needed
  ];

  // Function to handle the filter change
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Function to show the Swal popup
  const showPopup = (RequestQuote) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Request Quote mail was sent successfully. Somebody will connect with you shortly.",
    });
  };

  // Filter the data based on the selected option
  const filteredData = filterValue === "All"
    ? tableData
    : filterValue === "Testing"
      ? tableData.filter((item) => item.testingConsultant.includes("Testing"))
      : tableData.filter((item) => item.testingConsultant.includes("Consultant"));

  return (
    <>
      <h1 style={{ color: "black", padding: "1rem" }}>Welcome to List of Products</h1>
      <table className="Review">
        <thead>
          <tr>
            <th className="header" style={{ cursor: "default" }}>S.no</th>
            <th className="header" style={{ cursor: "default" }}>Compliance</th>
            <th className="header" style={{ cursor: "default" }}>Budget</th>
            <th className="header" style={{ cursor: "default" }}>
              <select
                id="filter"
                value={filterValue}
                onChange={handleFilterChange}
                style={{
                  width: "8rem",
                  backgroundColor: "#082A71",
                  color: "#fff",
                }}
              >
                <option value="All">All</option>
                <option value="Testing">Testing</option>
                <option value="Consultant">Consultant</option>
              </select>
            </th>
            <th className="header" style={{ cursor: "default" }}>Request Quote</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.compliance}</td>
              <td>{item.budget}</td>
              <td>{item.testingConsultant}</td>
              <td>
                {/* Make the 'RequestQuote' column data clickable */}
                <button
                  onClick={() => showPopup(item.RequestQuote)}
                  style={{ border: "none", background: "none", cursor: "pointer", color: "#55b700" }}
                >
                  {item.RequestQuote}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LabTestTableDataBIS;
