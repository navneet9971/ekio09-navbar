import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import "./LabNotification.css";

function LabNotification() {
  const [open, setOpen] = useState(false);

  const handleBellIconClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <FaBell
        size={30}
        style={{ cursor: "pointer", color: "gold" }}
        onClick={handleBellIconClick}
      />

      {open && (
        <div className={open ? "Lab_notification active" : "Lab_notification"}>
          <h2>Notification</h2>
          <p>Here is some data to display.</p>
        </div>
      )}
    </div>
  );
}

export default LabNotification;
