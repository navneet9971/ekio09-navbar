import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/global.css";
import axiosInstance from "../../interceptors/axios";
import Popup from "../popup/Popup";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";
import ForgetPassword from "./Forgetpassword";
import loginimage from "../assets/login-page.png";
import img1 from "../assets/login-page-icons/1.png";
import img2 from "../assets/login-page-icons/2.png";
import img3 from "../assets/login-page-icons/3.png";
import img4 from "../assets/login-page-icons/4.png";
import img5 from "../assets/login-page-icons/5.png";
import img6 from "../assets/login-page-icons/6.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import NavbarNotification from "../Notification/NavbarNotification";

function Login() {
  const history = useHistory();
  const [linkPopup, setLinkPopup] = useState(false);
  // const [notificationIcon, setNotificationIcon] =useState(false);
  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });
  const [formData, updateFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  // const handleNotificationClick = () => {
  //   setNotificationIcon(true);
  // };

  const SIDE_SLIDE = [
    {
      thumb: <img src={img1} alt="" />,
      title: "Know Your Compliance",
      route: "/navbar/firstcompliance"
    },
    {
      thumb: <img src={img2} alt="" />,
      title: "Application Progress and Tracking",
    },
    {
      thumb: <img src={img3} alt="" />,
      title: "Analytics",
    },
    // {
    //   thumb: (
    //     <FontAwesomeIcon
    //       icon={faBell}
    //       size="2x"
    //       style={{ color: "green" }}
    //       className="animated-bell shake"
    //       onClick={handleNotificationClick} // Update this line
    //     />
    //   ),
    //   title: "Notification",
    // },
    {
      thumb: <img src={img4} alt="" />,
      title: "Lab Testing",
    },
    {
      thumb: <img src={img5} alt="" />,
      title: "Advisory Services",
    },
    {
      thumb: <img src={img6} alt="" />,
      title: "Logistic",
    },
  ];

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`login`, {
        username: formData.username,
        password: formData.password,
      })
      .then(async (res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        localStorage.setItem("user_id", res.data.profile.id);
        localStorage.setItem("first_time", res.data.profile.first_time);

        if (res.data.profile.first_time === true) {
          axiosInstance
            .patch(`user/${res.data.profile.id}/`, { first_time: false })
            .then((patchRes) => {
              console.log(patchRes);
            })
            .catch((patchError) => {
              console.error(patchError);
            });
        }

        history.push("/navbar/clientdashboard");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Please try again later",
          text: "Incorrect username or password. Please try again.",
        });
      });
  };

  const signUpButton = () => {
    history.push("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-box">
      <div className="login">
        <div className="form">
          <div className="top-sec">
            <img
              src={require(`../assets/icons/eikomp_logo.png`)}
              className="eikomp_logo"
              width={230}
              height={150}
              alt="logo"
            />

            <h3
              style={{
                padding: 0,
                fontSize: "25px",
                marginTop: "15px",
                color: "#082A71",
              }}
            >
              WELCOME
            </h3>
          </div>
          <div className="input-box">
            <input
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="input-box">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
            />
            <span
              className="login-showpass"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer", margin: "1px" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <span
            onClick={() => setLinkPopup(true)}
            style={{
              cursor: "pointer",
              margin: "5px 140px 0px 0px",
              fontWeight: "400",
              fontSize: "17px",
              color: "#19ABFE",
            }}
          >
            Forgot Password?
          </span>
          <Popup trigger={linkPopup} setTrigger={setLinkPopup}>
            <ForgetPassword />
          </Popup>

          <button className="button1" onClick={handleSubmit}>
            Login
          </button>

          <button
            className="sign-upbtn"
            onClick={signUpButton}
            style={{ cursor: "pointer" }}
          >
            GET STARTED FOR FREE!
          </button>
        </div>
      </div>
      <img src={loginimage} alt="" className="login-img" />

      <div className="container-line">
        <div className="line"></div>
        </div>

        <div className="side-bar" style={{ }}>
  <h2 style={{ fontSize: "20px", margin: "33px -30px" }}>FEATURED APPS</h2>
  {SIDE_SLIDE.map((item, index) => (
    <div to={item.route} key={index} className={item.className} style={{ display: "flex", alignItems: "center",  marginBottom: "18px" }}>
      {item.thumb}
      <p style={{ marginLeft: "15px" }}>{item.title}</p>
    </div>
  ))}
</div>

{/* <Popup trigger = {notificationIcon} setTrigger = {setNotificationIcon}>
        < NavbarNotification />
         </Popup> */}

    </div>
  );
}

export default Login;
