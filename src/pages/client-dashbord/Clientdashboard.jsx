import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Clientdashboard.css";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("start");
  const history = useHistory();

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    history.push(path);
  };

  return (
    <div className="dashboard-client34">
      <h1>Welcome, !</h1>
      <div className="dashboard-clientbox34">
        <ul>
          <Link
            to="/navbar/firstpage"
            className={activeTab === "start" ? "active" : ""}
            onClick={() => handleTabClick("start", "/navbar/firstpage")}
          >
            <st>Start Application</st>
          </Link>

          <Link
            to="/navbar/review"
            className={activeTab === "review" ? "active" : ""}
            onClick={() => handleTabClick("review", "/navbar/review")}
          >
            <re>Review Application</re>
          </Link>

          <Link
            to="/navbar/myaccount"
            className={activeTab === "account" ? "active" : ""}
            onClick={() => handleTabClick("account", "/navbar/myaccount")}
          >
            <my>My Account</my>
          </Link>

          <Link
            to="/navbar/check"
            className={activeTab === "checklist" ? "active" : ""}
            onClick={() => handleTabClick("checklist", "/navbar/check")}
          >
            <chec>Checklist of Compliance</chec>
          </Link>

          <Link
            to="/navbar/add"
            className={activeTab === "add-users" ? "active" : ""}
            onClick={() => handleTabClick("add-users", "/navbar/add")}
          >
           <adus>Add Users</adus>
          </Link>

          <Link
            to="/navbar/download"
            className={activeTab === "download" ? "active" : ""}
            onClick={() => handleTabClick("download", "/navbar/download")}
          >
           <do>Download Forms</do>
          </Link>

          <Link
            to="/navbar/view"
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => handleTabClick("reports", "/navbar/view")}
          >
            <vi>View Reports</vi>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;
