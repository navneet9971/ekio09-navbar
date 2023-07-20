import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../interceptors/axios";
import Popup from "../../popup/Popup";
import ClientDataUpdate from "./ClientsUpdate/ClientDataUpdate";

function ManageClients() {
  const [clientTableList, setClientTableList] = useState([]);
  const tableRef = useRef(null);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionButton, setActionButton] = useState("");
  const clientPerPage = 8;

  useEffect(() => {
    axiosInstance
      .get("profile/clients/")
      .then((response) => {
        const clientList = response.data.data;
        setClientTableList(clientList);
        // localStorage.setItem("clientList", JSON.stringify(clientList));
        // console.log(clientList);
      })
      .catch((error) => {
        console.error("Error retrieving client list:", error);
      });
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastOrder = currentPage * clientPerPage;
  const indexOfFirstOrder = indexOfLastOrder - clientPerPage;
  const currentClientList = clientTableList.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(clientTableList.length / clientPerPage);


  const handleEditButtonClick = (clientId) => {
    setActionButton(!actionButton);
    setSelectedClientId(clientId);
    localStorage.setItem("storeClientID", clientId); // USe this Store is ClientDataUpdate Page
  }


  return (
    <div className="home-profile-container">
      <h2 style={{margin: "0", fontSize: "20px"}}>Clients List</h2>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Logo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentClientList.map((client, index) => (
            <tr key={index + 1}>
              <td style={{ cursor: "default" }}>{indexOfFirstOrder + index + 1}</td>
              <td>{client.name}</td>
              <td>
                {client.logo ? (
                  <img
                    style={{ width: "2.5rem" }}
                    className="client-logo"
                    src={client.logo}
                    alt=""
                  />
                ) : (
                  "No Logo"
                )}
              </td>
              <td>
                {/* Pass the client ID to the handleEditButtonClick function */}
                <button onClick={() => handleEditButtonClick(client.id)}>Edit</button>
                {/* Popup component to show the ClientDataUpdate component */}
                <Popup trigger={actionButton} setTrigger={setActionButton}>
                  {/* Pass the selected client ID to the ClientDataUpdate component */}
                  <ClientDataUpdate clientId={selectedClientId} />
                </Popup>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Page ROW CODE HERE AND CHENGE PAGES NEXT AND PERVIOUS BUTTON */}

      <div className="pagination">
        {currentPage > 1 && (
          <span className="previous-button" onClick={handlePreviousPage}>
            Previous
          </span>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <span
              key={pageNumber}
              className={`page ${currentPage === pageNumber ? "number" : ""}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          )
        )}

        {currentPage < totalPages && (
          <span className="next-button" onClick={handleNextPage}>
            Next
          </span>
        )}
      </div>
    </div>
  );
}

export default ManageClients;
