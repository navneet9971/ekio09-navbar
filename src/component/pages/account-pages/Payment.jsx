import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Payment() {
const [data] = useState([
{ id: 1, entryDetails: "Telecom Products", date: "2022-03-14", debit: "250" },
{ id: 2, entryDetails: "Battery12", date: "2022-03-15", debit: "250" },
{ id: 3, entryDetails: "Mobile Phone", date: "2022-03-16", debit: "250" },
]);

const [filterDate, setFilterDate] = useState("");

const handleFilterDateChange = (event) => {
setFilterDate(event.target.value);
};

const handleDownload = () => {
// create a new instance of jsPDF
const doc = new jsPDF();

// set the table headers and rows using the data array
const headers = ["S.NO", "Entry Details", "Date", "Debit/Credit"];
const rows = data.map((item, index) => [  index + 1,  item.entryDetails,  item.date,  item.debit,]);

// add the table to the PDF document
doc.autoTable({
  head: [headers],
  body: rows,
});

// download the PDF file
doc.save("payment_history.pdf");
};

return (
<div className="table-container">
<h5>Payment History</h5>
<div className="search-bar">
    <input
    className="date2"
      type="date"
      value={filterDate}
      onChange={handleFilterDateChange}
    />
  </div>

  <div className="table-buttons">
    <button>Balance in Wallet</button>
    <button onClick={handleDownload}>Download</button>
  </div>

  <table>
    <thead>
      <tr>
        <th className="header">S.NO</th>
        <th className="header">Entry Details</th>
        <th className="header">Date</th>
        <th className="header">Debit/Credit</th>
      </tr>
    </thead>

    <tbody>
      {data
        .filter((item) => (filterDate ? item.date === filterDate : true))
        .map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.entryDetails}</td>
            <td>{item.date}</td>
            <td>{item.debit}</td>
          </tr>
        ))}
    </tbody>
  </table>
</div>
);
}

export default Payment;