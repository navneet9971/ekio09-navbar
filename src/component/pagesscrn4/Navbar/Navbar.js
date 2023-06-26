import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { FaBars, FaPowerOff } from "react-icons/fa";
import $ from "jquery";
import axiosInstance from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import know from "../../assets/login-page-icons/1.png";
import NavbarNotification from "../../Notification/NavbarNotification";
import Popup from "../../popup/Popup";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notificationIcon, setNotificationIcon] =useState(false);
  const history = useHistory(); // initialize useHistory hook
  const { pathname } = useLocation();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleIconClick = (event) => {
    event.preventDefault(); // Prevent default navigation behavior
    setNotificationIcon(true);
  };

  function animation() {
    var tabsNewAnim = $("#navbarSupportedContent");
    var activeItemNewAnim = tabsNewAnim.find(".active ");
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop?.top + "px",
      left: itemPosNewAnimLeft?.left + "px",
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
        top: itemPosNewAnimTop?.top + "px",
        left: itemPosNewAnimLeft?.left + "px",
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    history.push('/');
  }
  // const isStartApplicationActive =
  // pathname === "/navbar/firstpage" ||
  // pathname === "/navbar/secondpage" ||
  // pathname.includes("navbar/compliance");

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className={`navbar-nav ml-auto ${open ? "active" : ""}`}>
          {/* <div className="hori-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div> */}

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

          {/* <li
            className={
              isStartApplicationActive ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/firstpage"
              // onClick={handleToggle}
            >
              Start New Project
            </NavLink>
          </li> */}

          {/* <li
            className={
              pathname === "/navbar/review" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/review"
              // onClick={handleToggle}
            >
             Track Application
            </NavLink>
          </li> */}

       {/*   <li
            className={
              pathname === "/navbar/myaccount" ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/myaccount"
              // onClick={handleToggle}
            >
             My Account
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
             Add Users
            </NavLink>
          </li> */}

          <li 
          className={
            pathname === "/navbar/firstcompliance" ? "active nav-item" : "nav-item"
          }>
            <NavLink
            className="nav-know"
            to="/navbar/firstcompliance"
            >
             <img src={know} alt ="" style={{width: "35px"}} />
             <h3 style={{fontSize: "12px", fontWeight:"100"}}> Know Your Compliance</h3>
            </NavLink>
          </li>

          <li>
          <NavLink className="nav-bell" to="" onClick={handleIconClick}>
        <FontAwesomeIcon icon={faBell} size="2x" style={{ color: "green" }} className="animated-bell shake" 
        />
        <h3 style={{ fontSize: "12px", fontWeight: "100" , textDecoration: "none" }}>Notification</h3>
      </NavLink>
    </li>

        </ul>
      </div>
      
      <button className="nav-btn" onClick={handleToggle}>
        <FaBars />
      </button>
      <button className="button99" onClick={handleLogout}>
        <span className="span99"><FaPowerOff /></span>
      </button>
      {open && <div className="nav-layer" onClick={handleToggle} />}

      <Popup trigger = {notificationIcon} setTrigger = {setNotificationIcon}>
        < NavbarNotification />
         </Popup>
    </nav>
  );
};

export default Navbar;
