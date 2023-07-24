import React from "react";

function LabTestTableData() {
  // Sample data for the table (you can replace this with your actual data)
  const tableData = [
    { id: 1, productName: "Product 1", compliance: "Compliant", budget: "$1000", testingConsultant: "Consultant A" },
    { id: 2, productName: "Product 2", compliance: "Non-Compliant", budget: "$800", testingConsultant: "Consultant B" },
    { id: 3, productName: "Product 3", compliance: "Compliant", budget: "$1200", testingConsultant: "Consultant C" },
    // Add more data as needed
  ];

  return (
    <>
      <h1 style={{ color: "black" }}>Welcome to Our Lab Test Page</h1>
      <table className="Review">
        <thead>
          <tr>
            <th className="header" style={{ cursor: "default" }}>S.no</th>
            <th className="header" style={{ cursor: "default" }}>Product Name</th>
            <th className="header" style={{ cursor: "default" }}>Compliance</th>
            <th className="header" style={{ cursor: "default" }}>Budget</th>
            <th className="header" style={{ cursor: "default" }}>Testing/Consultant</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productName}</td>
              <td>{item.compliance}</td>
              <td>{item.budget}</td>
              <td>{item.testingConsultant}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LabTestTableData;
