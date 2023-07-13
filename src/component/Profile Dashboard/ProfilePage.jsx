import React, { useState } from "react";
import { FaBell, FaAngleRight } from "react-icons/fa";
import eikomplogo from "../assets/icons/eikomp_logo.png";
import HomeProfile from "./HomeProfile/HomeProfile";
import Order from "./Order/Order";
import LabAnalytics from "./LabAnalytics/LabAnalytics";

function ProfilePage() {
  const [activeContent, setActiveContent] = useState("HomeProfile");

  const handleSidebarItemClick = (content) => {
    setActiveContent(content);
  };

  return (
    <>
      {/* Image */}
      <div style={{ marginRight: "10px", width: "200px" }}>
        <img src={eikomplogo} alt="" style={{ marginLeft: "91px", width: "53%" }} />
      </div>
      {/* Container */}
      <div style={{ display: "flex", marginTop: "20px" }}>
        {/* Sidebar */}
        <div style={{ backgroundColor: "lightblue", width: "300px", height: "100%" }}>
          <SidebarItem icon={<FaAngleRight />} text="Profile" onClick={() => handleSidebarItemClick("HomeProfile")} />
          <hr style={{ margin: "8px 0" }} />
          <SidebarItem icon={<FaAngleRight />} text="Manage Clients" onClick={() => handleSidebarItemClick("ManageClients")} />
          <hr style={{ margin: "8px 0" }} />
          <SidebarItem icon={<FaAngleRight />} text="Analytics" onClick={() => handleSidebarItemClick("Analytics")} />
          <hr style={{ margin: "8px 0" }} />
          <SidebarItem icon={<FaAngleRight />} text="Orders" onClick={() => handleSidebarItemClick("Order")} />
        </div>

        {/* User Profile Header */}
        <div
          style={{
            backgroundColor: "#355EB5",
            height: "200px",
            flex: "1",
            borderRadius: "5px",
            position: "relative",
            top: "-85px",
          }}
        >
          {/* User Profile Navigation */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            {/* Bell Icon */}
            <div style={{ marginRight: "10px" }}>
              <FaBell
                size={30}
                style={{ cursor: "pointer", color: "gold" }}
                onClick={() => {
                  // Handle bell icon click event
                }}
              />
            </div>
            {/* User Profile Icon */}
            <div>
              <img
                src="path_to_user_profile_icon.png"
                alt="User Profile"
                style={{
                  height: "30px",
                  width: "30px",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* Render the content based on activeContent state */}
          {activeContent === "HomeProfile" && <HomeProfile />}
          {activeContent === "Order" && <Order />}

      
          {activeContent === "Analytics" && 
          <div className="home-profile-container">
          <LabAnalytics /> </div>}



        </div>
      </div>
    </>
  );
}

function SidebarItem({ icon, text, onClick }) {
  return (
    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={onClick}>
      <div style={{ marginRight: "10px" }}>{icon}</div>
      <div>{text}</div>
    </div>
  );
}

export default ProfilePage;
