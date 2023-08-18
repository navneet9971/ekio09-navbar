import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaAngleRight, FaPowerOff } from "react-icons/fa";
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
    <>
      <div style={{ marginRight: "10px", width: "200px" }}>
        <img src={eikomplogo} alt="" style={{ marginLeft: "91px", width: "53%" }} />
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>

        {/* Sidebar */}
        <div style={{ backgroundColor: "lightblue", width: "300px", height: "100%" }}>
          <SidebarItem icon={<FaAngleRight />} text="Dashboard" onClick={() => handleSidebarItemClick("Analytics")} />
          <hr style={{ margin: "8px 0" }} />
          <SidebarItem icon={<FaAngleRight />} text="User" onClick={handleUserClick} />
          {showProfileSubmenu && <SubmenuItem text="Profile" onClick={handleProfileClick} />}
          <hr style={{ margin: "8px 0" }} />
          <SidebarItem icon={<FaAngleRight />} text="Manage Clients" onClick={handleManageClick} />
          {showMangeSubmenu && (
            <>
              <SubmenuItem text="Know Your Compliance" onClick={() => handleSidebarItemClick("Know Your Compliance")} />
              <SubmenuItem text="Start Your Project" onClick={() => handleSidebarItemClick("Start Your Project")} />
              <SubmenuItem text="Application Progress and Report" onClick={() => handleSidebarItemClick("Application Progress and Report")} />
              <SubmenuItem text="Labs and Logistics" onClick={() => handleSidebarItemClick("Labs and Logistics")} />
            </>
          )}
        </div>

        {/* User Profile Header */}
        <div style={{ backgroundColor: "#355EB5", height: "200px", flex: "1", borderRadius: "5px", position: "relative", top: "-85px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", gap: "40px" }}>
            <div><Disposebtn /></div>
            <div style={{ marginRight: "10px" }}><LabNotification /></div>
            <div><button className="logout_btn" onClick={handleLogout}><span className="span-logout--btn"><FaPowerOff /></span></button></div>
          </div>

          {activeContent === "HomeProfilePreviousData" && <HomeProfilePreviousData />}
          {activeContent === "HomeProfile" && <HomeProfile />}

          {activeContent === "Analytics" && (
            <div className="home-profile-container">
              <LabAnalytics /> <Order />
            </div>
          )}

          <div className="home-profile-container">
            {activeContent === "Know Your Compliance" && <KnowYourCompliance />}
            {activeContent === "Start Your Project" && <StartNewProject />}
            {activeContent === "Application Progress and Report" && <ApplicationTrack />}
            {activeContent === "Labs and Logistics" && <ManageClients />}
          </div>
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

const SubmenuItem = ({ text, onClick }) => (
  <div style={{ paddingLeft: '20px', cursor: "pointer" }} onClick={onClick}>
    {text}
  </div>
);

export default ProfilePage;
