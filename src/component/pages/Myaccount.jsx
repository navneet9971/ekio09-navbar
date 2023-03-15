import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";


const Myaccount = () => {
  const [activeTab, setActiveTab] = useState("start");
  const history = useHistory();

  const handleTabClick = (tabName, path) => {
    setActiveTab(tabName);
    history.push(path);
  };

  return (
    <div className="dashboard-client34">
      <h11>My Account </h11>
      <div className="dashboard-clientbox34">
        <ul>
          <Link
          
            className={activeTab === "transaction" ? "active" : ""}
            onClick={() => handleTabClick("transaction", "/navbar/transaction")}
          >
            <st>Transaction</st>
          </Link>

          <Link
            className={activeTab === "application" ? "active" : ""}
            onClick={() => handleTabClick("application", "/navbar/review")}
          >
            <re>Application</re>
          </Link>

          <Link
            className={activeTab === "package" ? "active" : ""}
            onClick={() => handleTabClick("package", "/navbar/package")}
          >
            <my>Package</my>
          </Link>

          <Link
            className={activeTab === "payment" ? "active" : ""}
            onClick={() => handleTabClick("payment", "/navbar/payment")}
          >
            <chec>Payment History</chec>
          </Link>

          <Link
            className={activeTab === "track" ? "active" : ""}
            onClick={() => handleTabClick("track", "/navbar/track")}
          >
           <adus>Track</adus>
          </Link>

          <Link
            className={activeTab === "reports" ? "active" : ""}
            onClick={() => handleTabClick("reports", "/navbar/view")}
          >
           <do>Reports</do>
          </Link>

          <Link
            className={activeTab === "notification" ? "active" : ""}
            onClick={() => handleTabClick("notification", "/navbar/notification")}
          >
            <vi>Notifaction</vi>
          </Link>
          <Link
            className={activeTab === "bookmarks" ? "active" : ""}
            onClick={() => handleTabClick("bookmarks", "/navbar/bookmarks")}
          >
            <bo>Bookmarks</bo>
          </Link>
          <Link
            className={activeTab === "editprofile" ? "active" : ""}
            onClick={() => handleTabClick("editprofile", "/navbar/edit-profile")}
          >
            <ep>Edit Profile</ep>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Myaccount;
