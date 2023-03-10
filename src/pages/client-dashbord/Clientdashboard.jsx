import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Clientdashboard.css";
import dsico from './ds_Icons/4.png';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("start");
  const history = useHistory();

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    history.push(path);
  };

  return (
    <div className="dashboard-client34">
      <h11>Welcome </h11>
      <div className="dashboard-clientbox34">
        <ul>
          <Link
          
            className={activeTab === "start" ? "active" : ""}
            onClick={() => handleTabClick("start", "/navbar/firstpage")}
          ><img src={dsico} alt="start"/>
            <st>Start Application</st>
          </Link>

          <Link
            className={activeTab === "review" ? "active" : ""}
            onClick={() => handleTabClick("review", "/navbar/review")}
          >
            <re>Review Application</re>
          </Link>

          <Link
            className={activeTab === "account" ? "active" : ""}
            onClick={() => handleTabClick("account", "/navbar/myaccount")}
          >
            <my>My Account</my>
          </Link>

          <Link
            className={activeTab === "checklist" ? "active" : ""}
            onClick={() => handleTabClick("checklist", "/navbar/check")}
          >
            <chec>Checklist of Compliance</chec>
          </Link>

          <Link
            className={activeTab === "add-users" ? "active" : ""}
            onClick={() => handleTabClick("add-users", "/navbar/add")}
          >
           <adus>Add Users</adus>
          </Link>

          <Link
            className={activeTab === "download" ? "active" : ""}
            onClick={() => handleTabClick("download", "/navbar/download")}
          >
           <do>Download Forms</do>
          </Link>

          <Link
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
