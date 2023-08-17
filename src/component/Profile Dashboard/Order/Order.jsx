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
  const ordersPerPage = 7;

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
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 2,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 3,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 4,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 5,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 6,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 7,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 8,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 9,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 10,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 11,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 12,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 13,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 14,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 15,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 16,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
          },
          {
            id: 17,
            clientName: "Jane Smith",
            date: "2023-07-07",
            Product: "LG",
            InvoiceValue : "22338",
            ComplianceType: "TEC",
            ClientName: "Hero"
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

    const allOrders = orders.map((order) => {
      return [
        order.id,
        order.date,
        order.clientName
      ];
    });

    doc.autoTable({
      head: [['ID', 'Date', 'Client Name']],
      body: allOrders,
    });

    doc.save("Order Data.pdf");
  };

  // Logic to calculate the current page orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Logic to calculate the total number of pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);
 return (
  <>
  <h1 style={{ fontSize: "20px"}}>Order</h1>
    <div className="home-profile-container">
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
            <div className="order-data-row">
              <div className="order-data">{`Date: ${order.date}`}</div>
              <div className="order-data">{`Name: ${order.clientName}`}</div>
            </div>
            <div className="order-data-row">
              <div className="order-data">{`Product: ${order.Product}`}</div>
              <div className="order-data">{`Invoice Value: ${order.InvoiceValue}`}</div>
            </div>
            <div className="order-data-row">
              <div className="order-data">{`Compliance Type: ${order.ComplianceType}`}</div>
            </div>
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
    </>
  );
}

export default Order;
