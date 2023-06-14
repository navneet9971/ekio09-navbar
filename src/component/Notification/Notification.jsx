import React, { useState, useEffect } from "react";
import axiosInstance from "../../interceptors/axios";

function Notification() {
  const productName = localStorage.getItem("product");
  const [notifiData, setNotifiData] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`notifications/?product=${productName}`)
      .then((response) => {
        const notificationData = response.data;
        setNotifiData(notificationData);
        console.log(notificationData); // Fix here: Pass `notificationData` instead of `setNotifiData`
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName]); // Include productName in the dependency array
  
  return (
    <div>
      <h3 className="notif">Notification</h3>
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
                <td style={{ cursor: "default"}}>{data.status}</td>
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
  );
}

export default Notification;
