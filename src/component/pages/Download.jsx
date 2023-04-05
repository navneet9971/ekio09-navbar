import React, { useState } from "react";
import Popup from "../pagesscrn4/popup/Popup";
import "./Table.css";

function Download() {
  const [data] = useState([
    {
      id: 1,
      complianceType: "TEC",
      date: "2022-03-14",
    },
    {
      id: 2,
      complianceType: "BIS",
      date: "2022-03-15",
    },
    {
      id: 3,
      complianceType: "BEE",
      date: "2022-03-15",
    },
    {
      id: 4,
      complianceType: "WPC",
      date: "2022-03-15",
    },
    {
      id: 5,
      complianceType: "TEC",
      date: "2022-03-15",
    },
    {
      id: 6,
      complianceType: "BEE",
      date: "2022-03-15",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [setSelectedOption] = useState('');
  const [filterDate, setFilterDate] = useState("");
  const [showPopup, setShowPopup] = useState(false);
 

  const handleFilterDateChange = (event) => {
    const selectedDate = event.target.value;
    setFilterDate(selectedDate);

    const hasMatch = data.some((item) => item.date === selectedDate);
    setFilterDate(hasMatch ? selectedDate : "");
    setShowPopup(!hasMatch);
  };


  const handleDownloadForm = (index, event) => {
    const link = document.createElement("a");
    link.href = `https://example.com/${data[index].applicationName}.pdf`;
    link.download = `${data[index].applicationName}.pdf`;
    link.click();
  };

  function handleOptionChange(event) {
    setSelectedOption(event.target.value);
  }

  return (
    <div className="table">
      <h5>Download Forms & Upload</h5>

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
        <table classNamee="Review">
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
                item.complianceType
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .filter((item) => (filterDate ? item.date === filterDate : true))
              .map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.complianceType}</td>
                  <td>{item.applicationName}</td>
                  <td>{item.date}</td>
                  <td>
                    <button
                      className={`action-button`}
                      onClick={(event) => handleDownloadForm(index, event)}
                    >
                      Download
                    </button>

                    <select className="form" onChange={handleOptionChange}>
                      <option value="">Select an option</option>
                      <option value="Signatory Authorization">Option 1</option>
                      <option value="option2">OEM Authorization</option>
                      <option value="option3">MOU</option>
                      <option value="option4">Shareholding Pattern</option>
                      <option value="option5">Annexure 1</option>
                      <option value="option6">BOM</option>
                      <option value="option7">Non Applicability Proforma</option>
                      <option value="option8">Proforma seeking Exemption</option>
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

export default Download;