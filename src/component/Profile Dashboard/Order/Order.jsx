import React, { useState, useEffect } from "react";
import "./Order.css";
import { Link } from 'react-router-dom';
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  // Function to handle the click download pdf 
  const handleOrderPDF = () => {
    const doc = new jsPDF();
    let y = 20;
  
    orders.forEach((order) => {
      doc.text(`Order ${order.id}`, 20, y);
      doc.text(`Date: ${order.date}`, 20, y + 10);
      doc.text(`Name: ${order.clientName}`, 20, y + 20);
      y += 40;
    });
  
    doc.save("order_report.pdf");
  };
  
  

  // Logic to calculate the current page orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Logic to calculate the total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="home-profile-container">
        <h1 style={{ fontSize: "20px"}}>Order</h1>
      {currentOrders.map((order, index) => (
        <div key={order.id} className="order-container">
          <div className="order-header">
            <span className="order-title">Order {order.id}</span>
            <span className="order-date">{order.date}</span>
            <Link
              className="toggle-button"
              onClick={() => handleToggleOrders(index)}
            >
              {expandedOrder === index ? "-" : "+"}
            </Link>
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
      <button className="order-reot" onClick={handleOrderPDF}>
  <FiDownload />Download Report
</button>
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

export default Order;
