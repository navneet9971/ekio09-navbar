import React, { useState, useEffect } from "react";
import axiosInstance from "../../interceptors/axios";

function NavbarNotification() {
  const [productName, setProductName] = useState("");
  const [notifiData, setNotifiData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    if (showTable) {
      axiosInstance
        .get(`notifications/?product=${productName}`)
        .then((response) => {
          const notificationData = response.data;
          setNotifiData(notificationData);
          console.log(notificationData);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [showTable, productName]);

  const handleGoButtonClick = () => {
    if (!productName) {
      alert("Please fill the Product Name");
      return;
    }
    setShowTable(true);
  };

  const handleBackButtonClick = () => {
    setShowTable(false);
    setProductName("");
  };

  return (
    <div>
      {showTable ? (
        <div>
          <button
            style={{
              padding: "4px 7px",
              fontSize: "14px",
              color: "#fff",
              background: "#082a71",
              borderRadius: "7px",
            }}
            onClick={handleBackButtonClick}
          >
            Back
          </button>
          <h3 style={{textAlign: "center"}}>Notification</h3>
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Category</th>
                <th>Content</th>
                <th>External Link/Filepath</th>
                <th>Status</th>
                <th className="Notifi">Date</th>
              </tr>
            </thead>
            <tbody>
              {notifiData.length > 0 ? (
                notifiData.map((data, index) => (
                  <tr key={index}>
                    <td style={{ cursor: "default" }}>{index + 1}</td>
                    <td style={{ cursor: "default" }}>{data.category}</td>
                    <td style={{ cursor: "default" }}>{data.content}</td>
                    <td>
                      <a
                        href={data.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#55B600", fontWeight: "bold" }}
                      >
                        Download Document
                      </a>
                    </td>
                    <td style={{ cursor: "default" }}>{data.status}</td>
                    <td style={{ cursor: "default" }}>{data.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No notifications found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "12px" }}>
          <input
            style={{
              padding: "10px 6px",
              borderRadius: "7px",
              fontSize: "15px",
              border: "3px solid #082a71",
            }}
            type="text"
            placeholder="Enter Name of Product"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <button
            style={{
              padding: "10px 12px",
              fontSize: "15px",
              fontWeight: "600",
              color: "#fff",
              background: "#082a71",
              borderRadius: "7px",
            }}
            onClick={handleGoButtonClick}
          >
            Go
          </button>
        </div>
      )}
    </div>
  );
}

export default NavbarNotification;
