import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import Thumb1png  from "../../assets/images/2.png";
import Thumb2png  from "../../assets/images/4.png";
import Thumb3png  from "../../assets/images/use.png";
import Thumb4png from "../../assets/images/know.png";
import Thumb5png from "../../assets/images/dash.png";
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
      thumb: <img src={Thumb4png} alt="" />,
      // title: "Know Your Compliance",
      route: "/navbar/firstcompliance",
    },
    {
      thumb: <img src={Thumb1png} alt="" />,
      // title: "Start New Project",
      route: "/navbar/firstpage",
    },
    {
      thumb: <img src={Thumb2png} alt="" />,
      // title: "Application Progress & Reporting",
      route: "/navbar/review",
    },
    {
      thumb: <img src={Thumb3png} alt="" />,
      // title: "How To use Platform",
      route: "/navbar/mainpage",
    },
    // Uncomment the following option if needed
    {
      thumb: <img src={Thumb5png} alt="" />,
      // title: "Add users",
      route: "/navbar/dashboard",
    },
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
        <div className="bg-clientdash">
        <div className="dash-titlebg">Your Compliance Dashboard</div>
     
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
