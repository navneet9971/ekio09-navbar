import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import $ from "jquery";
import axiosInstance from 'axios';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory(); // initialize useHistory hook
  const { pathname } = useLocation();

  const handleToggle = () => {
    setOpen(!open);
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
  const isStartApplicationActive =
  pathname === "/navbar/firstpage" ||
  pathname === "/navbar/secondpage" ||
  pathname.includes("navbar/compliance");

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
              isStartApplicationActive ? "active nav-item" : "nav-item"
            }>
            <NavLink
              className="nav-link"
              to="/navbar/firstpage"
              // onClick={handleToggle}
            >
              Start New Project
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
             Track Application
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
          </li>

        </ul>
      </div>
      
      <button className="nav-btn" onClick={handleToggle}>
        <FaBars />
      </button>
      <button99 onClick={handleLogout}>
        <span99>Logout</span99>
      </button99>
      {open && <div className="nav-layer" onClick={handleToggle} />}
    </nav>
  );
};

export default Navbar;
