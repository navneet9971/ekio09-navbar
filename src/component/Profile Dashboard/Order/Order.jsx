import React, { useState, useEffect } from "react";
import "./Order.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const ordersPerPage = 6;

  useEffect(() => {
    // Fetch orders from APIs and update the 'orders' state
    fetchOrders();
  }, []);

  // Function to fetch orders from APIs
  const fetchOrders = () => {
    // Dummy data for example orders
    const exampleOrders = [
        {
            id: 1,
            clientName: "John Doe",
            date: "2023-07-06",
          },
          {
            id: 2,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 3,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 4,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 5,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 6,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 7,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 8,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 9,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 10,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 11,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 12,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 13,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 14,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 15,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 16,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
          {
            id: 17,
            clientName: "Jane Smith",
            date: "2023-07-07",
          },
      // ... more example orders ...
    ];

    setOrders(exampleOrders);
  };

  // Function to handle the click event on the '+' sign
  const handleToggleOrders = (orderIndex) => {
    if (expandedOrder === orderIndex) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderIndex);
    }
  };

  // Function to handle the click event on page numbers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle the click event on the 'Next' button
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle the click event on the 'Previous' button
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Logic to calculate the current page orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Logic to calculate the total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="home-profile-container">
      {currentOrders.map((order, index) => (
        <div key={order.id} className="order-container">
          <div className="order-header">
            <span className="order-title">Order {order.id}</span>
            <span className="order-date">{order.date}</span>
            <button
              className="toggle-button"
              onClick={() => handleToggleOrders(index)}
            >
              {expandedOrder === index ? "-" : "+"}
            </button>
          </div>
          {expandedOrder === index && (
            <div className="expanded-section">
              <div className="order-details">
                <div className="order-data">{`Date: ${order.date}`}</div>
                <div className="order-data">{`Name: ${order.clientName}`}</div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="pagination">
        {currentPage > 1 && (
          <button className="previous-button" onClick={handlePreviousPage}>
            Previous
          </button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              className={currentPage === pageNumber ? "active page" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        )}
        {currentPage < totalPages && (
          <button className="next-button" onClick={handleNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Order;
