import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { ReactComponent as Thumb3 } from "../../component/assets/myaccount-icons/3.svg";
import { ReactComponent as Thumb4 } from "../../component/assets/myaccount-icons/4.svg";
import { ReactComponent as Thumb5 } from "../../component/assets/myaccount-icons/5.svg";
import { ReactComponent as Thumb6 } from "../../component/assets/myaccount-icons/6.svg";
import { ReactComponent as Thumb7 } from "../../component/assets/myaccount-icons/7.svg";
import { ReactComponent as Thumb8 } from "../../component/assets/myaccount-icons/8.svg";
import { ReactComponent as Thumb9 } from "../../component/assets/myaccount-icons/9.svg";


const ClientDashboard = () => {
  

  const WELCOME_OPTIONS = [
    {
      title: "Package",
      thumb: <Thumb3 />,
      route: "/navbar/package",
    },
    {
      title: "Payment History",
      thumb: <Thumb4 />,
      route: "/navbar/payment",
    },
    {
      title: "Track",
      thumb: <Thumb5 />,
      route: "/navbar/track",
    },
    {
      title: "Reports",
      thumb: <Thumb6 />,
      route: "/navbar/view",
    },
    {
      title: "Notification",
      thumb: <Thumb7 />,
      route: "/navbar/notifaction",
    },
    {
      title: "Bookmarks",
      thumb: <Thumb8 />,
      route: "/navbar/bookmarks",
    },
    {
      title: "Edit Profile",
      thumb: <Thumb9 />,
      route: "/navbar/edit-profile",
    },
    {/*{
      title: "Transaction",
      thumb: <Thumb1 />,
      route: "/navbar/transaction",
    },
    {
      title: "Application",
      thumb: <Thumb2 />,
      route: "/navbar/review",
    }, */},
  ];


  return (
    <div className="welcome">
      <div className="nav-box">My Account</div>
      <div className="welcome-options">
        <Row>
          {WELCOME_OPTIONS.map((item, index) => (
            <Col xs={12} md={12} lg={8} key={index}>
              <Link to={item.route} className="option-box">
                {item.thumb}
                <img src={item.thumb} alt="" />
                <h4>{item.title}</h4>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ClientDashboard;
