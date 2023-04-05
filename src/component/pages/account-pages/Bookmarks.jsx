import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Popup from "../../pagesscrn4/popup/Popup";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../Table.css";


function Bookmark() {
  const [data, setData] = useState([
    { id: 1, bookmarkItem: "TEC", type: "Telecom Products", date: "2022-03-14", action: "", },
    { id: 2, bookmarkItem: "BIS", type: "Battery12", date: "2022-03-15", action: "",  },
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

  const handleDownload = () => {
    // create a new instance of jsPDF
    const doc = new jsPDF();
    
    // set the table headers and rows using the data array
    const headers = ["S.NO", "Bookmark Item", "Date"];
    const rows = data.map((item, index) => [  index + 1,  item.entryDetails,  item.date ]);
    
    // add the table to the PDF document
    doc.autoTable({
      head: [headers],
      body: rows,
    });
    
    // download the PDF file
    doc.save("payment_history.pdf");
    };

  return (
    <div className="table">
      <h5>BookMark</h5>

      <div className="search-bar">
        <input
          type="option"
          placeholder="Search Bookmark Item"
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
            <th className="header">Bookmark Item</th>
            <th className="header">Type</th>
            <th className="header">Date</th>
            <th className="header">Action</th>
          </tr>
        </thead>

        <tbody>
      {data
        .filter((item) =>
          item.bookmarkItem.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((item) => (filterDate ? item.date === filterDate : true))
        .map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.bookmarkItem}</td>
            <td>
              <select
                className={`action-select`}
                value={item.type || ""}
                onChange={(event) => handleActionChange(index, event)}
              >
                <option value="">Select Action</option>
                <option
                  value="pdf"
                  onClick={() => {
                    handleDownload();
                    // Redirect to edit page
                    window.location.href = `/navbar/bookmarkItem/${item.id}`;
                  }}
                >
                  PDF
                </option>
                <option value="download">Video</option>
                <option value="into">Into Graphic</option>
              </select>
            </td>


            <td>{item.date}</td>
            <td>
              <select
                className={`action-select`}
                value={item.action || ""}
                onChange={(event) => handleActionChange(index, event)}
              >
                <option value="">Select Action</option>
                <option
                  value="view"
                  onClick={() => alert(`Bookmark type: ${item.type}`)}
                >View
                </option>
                <option value="share">Share</option>
                <option value="unbook">Unbook</option>
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

export default Bookmark;
