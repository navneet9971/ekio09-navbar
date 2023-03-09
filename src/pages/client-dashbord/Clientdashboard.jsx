import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Clientdashboard.css";

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("start");
  const history = useHistory();

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    if (tabName === "start") {
      history.push("/navbar/firstpage");
    }
  };

  return (
    <div className="dashboard-client34">
      <h11>Welcome, !</h11>
      <div className="dashboard-clientbox34">
        <ul>
          <Link
            to="#"
            className={activeTab === "start" ? "active" : ""}
            onClick={() => handleTabClick("start")}
          >
           <st> Start Application</st>
          </Link>

          <Link
            to="/navbar/review"
            className={activeTab === "review" ? "active" : ""}
            onClick={() => handleTabClick("review", "/navbar/review")}
          >
            <re>Review Application</re>
           
          </Link>

          <Link
            to="/navbar/account"
            className={activeTab === "account" ? "active" : ""}
            onClick={() => handleTabClick("account", "/navbar/account")}
          >
            <my>My Account</my>
          </Link>

          <Link
            to="/navbar/checklist"
            className={activeTab === "checklist" ? "active" : ""}
            onClick={() =>
              handleTabClick("checklist", "/navbar/checklist")
            }
          >
            <chec>Checklist of Compliance</chec>
          </Link>

          <Link
            to="/navbar/add-users"
            className={activeTab === "add-users" ? "active" : ""}
            onClick={() =>
              handleTabClick("add-users", "/navbar/add-users")
            }
          >
      
            <addus>Add Users</addus>
          </Link>

          <Link
            to="/navbar/download"
            className={activeTab === "download" ? "active" : ""}
            onClick={() =>
              handleTabClick("download", "/navbar/download")
            }
          >
            <do>Download Forms</do>
          </Link>

          <Link
            to="/navbar/reports"
            className={activeTab === "reports" ? "active" : ""}
            onClick={() =>
              handleTabClick("reports", "/navbar/reports")
            }
          >
            <vi>View Reports</vi>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;
