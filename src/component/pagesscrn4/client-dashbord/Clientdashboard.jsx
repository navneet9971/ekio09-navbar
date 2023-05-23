import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ReactComponent as Thumb1 } from "../../assets/images/welcome/2.svg";
import { ReactComponent as Thumb2 } from "../../assets/images/welcome/4.svg";
import { ReactComponent as Thumb3 } from "../../assets/images/welcome/use.svg";
import { ReactComponent as Thumb4 } from "../../assets/images/welcome/know.svg";
import { ReactComponent as Mapbg } from "../../assets/client-map.svg";
import axiosInstance from "../../../interceptors/axios";

const ClientDashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`user/${localStorage.getItem('user_id')}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
          accept: 'application/json',
        }
      })
      .then((res) => {
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const WELCOME_OPTIONS = [
    {
      thumb: <Thumb4 />,
      // title: "Know Your Compliance",
      route: "/navbar/firstcompliance",
    },
    {
      thumb: <Thumb1 />,
      // title: "Start New Project",
      route: "/navbar/firstpage",
    },
    {
      thumb: <Thumb2 />,
      // title: "Application Progress & Reporting",
      route: "/navbar/review",
    },
    {
      thumb: <Thumb3 />,
      // title: "How To use Platform",
      route: "/navbar/mainpage",
    },
    // Uncomment the following option if needed
    // {
    //   thumb: <img src={Thumb5png} alt="" />,
    //   title: "Add users",
    //   route: "/navbar/add",
    // },
  ];

  return (
    <div className="welcome">
      <div className="bg-clientdash">
        <div className="nav-box">
          <Mapbg className="name-bg" />
        </div>
        <div className="upper-name">
          Welcome, {firstName} {lastName}
        </div>
        <div className="dash-titlebg">Your Compliance Dashboard</div>
        <div className="welcome-options">
          <Row>
            {WELCOME_OPTIONS.map((item, index) => (
              <Col xs={12} md={12} lg={8} key={index}>
                <Link to={item.route} className="option-box">
                  {item.thumb}
                  <h4>{item.title}</h4>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
