import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import $ from "jquery";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory(); // initialize useHistory hook
  const { pathname } = useLocation();

  const handleToggle = () => {
    setOpen(!open);
  };

  function animation() {
    var tabsNewAnim = $("#navbarSupportedContent");
    var activeItemNewAnim = tabsNewAnim.find(".active");
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $("#navbarSupportedContent ul li").removeClass("active");
      $(this).addClass("active");
      var activeWidthNewAnimHeight = $(this).innerHeight();
      var activeWidthNewAnimWidth = $(this).innerWidth();
      var itemPosNewAnimTop = $(this).position();
      var itemPosNewAnimLeft = $(this).position();
      $(".hori-selector").css({
        top: itemPosNewAnimTop.top + "px",
        left: itemPosNewAnimLeft.left + "px",
        height: activeWidthNewAnimHeight + "px",
        width: activeWidthNewAnimWidth + "px",
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on("resize", function () {
      setTimeout(function () {
        animation();
      }, 500);
    });
  }, []);
  useEffect(() => {
    animation();
  }, [pathname]);

  function handleLogout() {
    // perform any necessary actions for logging out the user
    history.push("/#"); // redirect to login page after logout
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className={`navbar-nav ml-auto ${open ? "active" : ""}`}>
          <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>

          <li
            className={pathname === "/navbar/clientdashboard" ? "active" : ""}>
            <NavLink
              to="/navbar/clientdashboard"
              className="nav-link"
              // onClick={handleToggle}
            >
              Home
            </NavLink>
          </li>

          <li
            className={
              pathname === "/navbar/firstpage" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/firstpage"
              // onClick={handleToggle}
            >
              <i className="far fa-address-book"></i>Start New Application
            </NavLink>
          </li>

          <li
            className={
              pathname === "/navbar/review" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/review"
              // onClick={handleToggle}
            >
              <i className="far fa-clone"></i>Review Application
            </NavLink>
          </li>

          <li
            className={
              pathname === "/navbar/myaccount" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/myaccount"
              // onClick={handleToggle}
            >
              <i className="far fa-clone"></i>My Account
            </NavLink>
          </li>

          <li
            className={
              pathname === "/navbar/check" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/check"
              // onClick={handleToggle}
            >
              <i className="far fa-clone"></i>Checklist of Compliance
            </NavLink>
          </li>

          <li
            className={
              pathname === "/navbar/add" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/add"
              // onClick={handleToggle}
            >
              <i className="far fa-clone"></i>Add Users
            </NavLink>
          </li>

          <li
            className={
              pathname === "/navbar/download" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/download"
              // onClick={handleToggle}
            >
              <i className="far fa-clone"></i>Download Form
            </NavLink>
          </li>

          <li
            className={
              pathname === "/navbar/view" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/view"
              // onClick={handleToggle}
            >
              <i className="far fa-clone"></i>View Reports
            </NavLink>
          </li>
        </ul>

      </div>
      <button99 onClick={handleLogout}>
        <span99>Logout</span99>
      </button99>
      <button className="nav-btn" onClick={handleToggle}>
        <FaBars />
      </button>
      {open && <div className="nav-layer" onClick={handleToggle} />}
    </nav>
  );
};

export default Navbar;
