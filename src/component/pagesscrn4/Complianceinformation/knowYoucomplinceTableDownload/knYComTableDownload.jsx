import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactLoading from "react-loading";
import pdflogo from "../../../assets/icons/eikomp_logo.png";

function KnYCompTableDownload() {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  // const ProductNameStore = localStorage.getItem("ProductNameStore");

  useEffect(() => {
    // Fetch table data from local storage when the component mounts
    const storedData = JSON.parse(localStorage.getItem("TableData"));
    if (storedData) {
      setTableData(storedData);
    }

    // Set up a timer to refresh data every 5 seconds (for example)
    const refreshInterval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem("TableData"));
      if (storedData) {
        setTableData(storedData);
        // console.log(storedData);
      }
    }, 1000); // Refresh every 1 second

    // Clean up the interval when the component unmounts
    return () => clearInterval(refreshInterval);
  }, []);

  const handleDownload = () => {
    setIsLoading(true);

    // Create a promise to load the image
    const loadImage = new Promise((resolve, reject) => {
      const logoImg = new Image();
      logoImg.src = pdflogo;

      logoImg.onload = () => resolve(logoImg);
      logoImg.onerror = (error) => reject(error);
    });

    loadImage
      .then((logoImg) => {
        const doc = new jsPDF("landscape");

        const headers = ["Compliance Name", "Description", "Estimated Date"];

        const rows = tableData.map((data) => [
          data.complianceNameStore,
          data.StoreDetails,
          data.ApplicationEndDate,
          // data.ProductNameStore,
          // console.log(data.ProductNameStore)s
        ]);

        const columnWidth = [45, 100, 30];
        const rowHeight = 10;
        doc.text(`Product Name: ${tableData[0].ProductNameStore}`, 10, 45);
        console.log(tableData[0].ProductNameStore);
        doc.addImage(logoImg, "PNG", 10, 4, 50, 30); // Add the image to the PDF
        doc.autoTable({
          head: [headers],
          body: rows,
          columnWidth: columnWidth,
          rowHeight: rowHeight,
          startY: 50, // Adjust the starting y-position to avoid overlapping with the image
          styles: { cellPadding: 3, valign: "middle", halign: "center" },
        });

        doc.save("Download_Compliance_Plan.pdf");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading image:", error);
        setIsLoading(false);
      });
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
