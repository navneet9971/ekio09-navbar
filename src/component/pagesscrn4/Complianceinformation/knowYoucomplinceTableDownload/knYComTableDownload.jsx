import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactLoading from "react-loading";
import pdflogo from "../../../assets/icons/eikomp_logo.png";

function KnYCompTableDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData = JSON.parse(localStorage.getItem("TableData"));

    if (storedData) {
      // Assuming that storedData is an array of objects with the following structure:
      // { ProductNameStore, complianceNameStore, ApplicationEndDate, StoreDetails }
      // You can set the data to the state here if needed.
      setTableData(storedData);
    } else {
      // Handle the case where the data is not found in localStorage
      console.log("Data not found in localStorage");
    }
  }, []);

  const handleDownload = () => {
    setIsLoading(true);
  
    if (!tableData) {
      setIsLoading(false);
      alert("TableData is not available.");
      return;
    }
  
    const doc = new jsPDF();
    const logoImg = new Image();
    logoImg.src = pdflogo;
  
    logoImg.onload = function () {
      doc.addImage(logoImg, "PNG", 10, 4, 50, 30);
      doc.text(`Product Name: ${tableData[0].ProductNameStore}`, 10, 50);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 70);
  
      const columns = ["Compliance Name", "Description", "End Date"];
      const rows = tableData.map((item) => [
        item.complianceNameStore,
        item.StoreDetails,
        item.ApplicationEndDate,
      ]);
  
      // Define column styles for alignment and styling
      const columnStyles = {
        0: { cellWidth: 40,  align: "left", fillColor: "#f2f2f2" },   // Compliance Name
        1: { cellWidth: 80,  align: "left", fillColor: "#f2f2f2" },   // Description (Wider)
        2: { cellWidth: 30,  align: "center", fillColor: "#f2f2f2" }, // End Date
      };
  
      // Define row styles for alternating row colors
      const rowStyles = {
        0: { rowWidth: 60, fillColor: "#fff" }, // Even rows
        1: { rowWidth: 60, fillColor: "#f2f2f2" }, // Odd rows
      };
  
      // Reduce font size to fit content within cells
      const fontSize = 10;
  
      doc.autoTable({
        head: [columns],
        body: rows,
        startY: 75,
        columnStyles: columnStyles,
        alternateRowStyles: rowStyles,
        fontSize: fontSize,
      });
  
      // Check if the table content exceeds the page width
      const pageWidth = doc.internal.pageSize.getWidth();
      const tableWidth = doc.tableWidth;
      if (tableWidth > pageWidth) {
        // Add a new page and continue the table on the next page
        doc.addPage();
        doc.autoTable({
          head: [columns],
          body: rows,
          startY: 20, // Start the new table on the next page
          columnStyles: columnStyles,
          alternateRowStyles: rowStyles,
          fontSize: fontSize,
        });
      }
  
      doc.save("Download Compliance Plan");
      setIsLoading(false);
    };
  
    logoImg.onerror = function () {
      setIsLoading(false);
      alert("Error loading the logo image.");
    };
  };


  return (
    <>
      <button
        style={{
          backgroundColor: "#082a71",
          color: "#fff",
          border: "none",
          borderRadius: "34px",
          padding: "10px 20px",
          fontSize: "13px",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onClick={handleDownload}
      >
       Download Compliance Plan
      </button>
      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </>
  );
}

export default KnYCompTableDownload;
