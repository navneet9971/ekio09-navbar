import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaPowerOff, FaUserAlt, FaUserCog } from "react-icons/fa";
import { RxDashboard } from 'react-icons/rx';
import axiosInstance from "../../interceptors/axios";
import eikomplogo from "../assets/icons/eikomp_logo.png";
import "./ProfilePage.css";

import HomeProfile from "./HomeProfile/HomeProfile";
import Order from "./Order/Order";
import LabAnalytics from "./LabAnalytics/LabAnalytics";
import LabNotification from "./LabNotification/LabNotification";
import HomeProfilePreviousData from "./HomeProfile/HomeProfilePreviousData";
import ManageClients from "./ManageClients/ManageClients";
import KnowYourCompliance from "../pagesscrn4/Complianceinformation/Firstcompliance";
import StartNewProject from "../pagesscrn4/Firstpage";
import ApplicationTrack from "../pages/review";
import Disposebtn from "./DesposeBtn/DisposeBtn";

function ProfilePage() {
  const [activeContent, setActiveContent] = useState("Analytics");
  const [key, setKey] = useState(null);
  const [showProfileSubmenu, setShowProfileSubmenu] = useState(false);
  const [showMangeSubmenu, setShowMangeSubmenu] = useState(false);
  const history = useHistory();

  const handleSidebarItemClick = (content) => {
    setActiveContent(content);
  };

  const handleUserClick = () => {
    setShowProfileSubmenu((prevState) => !prevState);
  };

  const handleManageClick = () => {
    setShowMangeSubmenu((prevState) => !prevState);
  };

  const handleProfileClick = () => {
    setActiveContent(key === "Yes" ? "HomeProfilePreviousData" : "HomeProfile");
    setShowProfileSubmenu(true);
  };

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    history.push("/");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      axiosInstance
        .get("profile/section/")
        .then((response) => {
          const keyData = response.data["key"];
          setKey(keyData);
          const [labPreviousdata] = response.data.data;
          if (labPreviousdata) {
            try {
              const jsonData = JSON.stringify(labPreviousdata);
              localStorage.setItem("labhomeprofile", jsonData);
            } catch (error) {
              console.error("Invalid JSON data:", error);
            }
          }
        })
        .catch((error) => {
          // Handle error
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="profile-page">
      {/* Sidebar */}
      <div className="sidebar">
        <SidebarItem
          text="Dashboard"
          onClick={() => handleSidebarItemClick("Analytics")}
          icon={<RxDashboard />}
        />
        <hr className="sidebar-hr" />
        <SidebarItem
          onClick={handleUserClick}
          text="User"
          icon={<FaUserAlt />}
        />
        {showProfileSubmenu && (
          <SubmenuItem text="Profile" onClick={handleProfileClick} />
        )}
        <hr className="sidebar-hr" />
        <SidebarItem
          text="Manage Clients"
          onClick={handleManageClick}
          icon={<FaUserCog />}
        />
        {showMangeSubmenu && (
          <>
            <SubmenuItem
              text="Know Your Compliance"
              onClick={() => handleSidebarItemClick("Know Your Compliance")}
            />
            <SubmenuItem
              text="Start Your Project"
              onClick={() => handleSidebarItemClick("Start Your Project")}
            />
            <SubmenuItem
              text="Application Progress and Report"
              onClick={() =>
                handleSidebarItemClick("Application Progress and Report")
              }
            />
            <SubmenuItem
              text="Labs and Logistics"
              onClick={() => handleSidebarItemClick("Labs and Logistics")}
            />
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <div className="lab-navbar">
          <img src={eikomplogo} alt="" className="lab-logo" />
          <div className="lab-navbar-actions">
            <Disposebtn />
            <LabNotification />
            <button className="lab-logout_btn" onClick={handleLogout}>
              <FaPowerOff />
            </button>
          </div>
        </div>

        {/* User Profile Header */}
        <div className="user-profile-header">
          {activeContent === "HomeProfilePreviousData" && (
            <HomeProfilePreviousData />
          )}
          {activeContent === "HomeProfile" && <HomeProfile />}

          {activeContent === "Analytics" && (
            <div className="home-profile-container">
              <LabAnalytics /> <Order />
            </div>
          )}

          <div className="home-profile-container">
            {activeContent === "Know Your Compliance" && <KnowYourCompliance />}
            {activeContent === "Start Your Project" && <StartNewProject />}
            {activeContent === "Application Progress and Report" && (
              <ApplicationTrack />
            )}
            {activeContent === "Labs and Logistics" && <ManageClients />}
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, onClick }) {
  return (
    <div className="sidebar-item" onClick={onClick}>
      <div className="sidebar-item-icon">{icon}</div>
      <div className="sidebar-item-text">{text}</div>
    </div>
  );
}

const SubmenuItem = ({ text, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    // Call the provided onClick function
    onClick();

    // Toggle the clicked state
    setClicked(!clicked);
  };

  return (
    <div className="submenu-item" onClick={handleClick}>
      <div className={`submenu-item-dot ${clicked ? "clicked" : ""}`} />
      {text}
    </div>
  );
};

export default ProfilePage;
