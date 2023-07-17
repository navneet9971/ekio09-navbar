import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../interceptors/axios";
import { Link } from "react-router-dom";

function ManageClients() {
  const [clientTableList, setClientTableList] = useState([]);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const clientPerPage = 8;

  useEffect(() => {
    axiosInstance
      .get("profile/clients/")
      .then((response) => {
        const clientList = response.data.data;
        setClientTableList(clientList);
        console.log(clientList);
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

  return (
    <div className="home-profile-container">
      <h2 style={{margin: "0"}}>Clients List</h2>
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
              <td style={{ cursor: "default" }}>
                {indexOfFirstOrder + index + 1}
              </td>
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
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {currentPage > 1 && (
          <Link className="previous-button" onClick={handlePreviousPage}>
            Previous
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Link
              key={pageNumber}
              className={`page ${currentPage === pageNumber ? "number" : ""}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </Link>
          )
        )}

        {currentPage < totalPages && (
          <Link className="next-button" onClick={handleNextPage}>
            Next
          </Link>
        )}
      </div>
    </div>
  );
}

export default ManageClients;
