import React, {  useEffect } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import Thumb1png from "../../assets/images/2.png";
import Thumb2png from "../../assets/images/4.png";
// import Thumb3png from "../../assets/images/use.png";
import Thumb4png from "../../assets/images/lab.png";
import Thumb5png from "../../assets/images/dash.png";
import { ReactComponent as Mapbg } from "../../assets/client-map.svg";
import axiosInstance from "../../../interceptors/axios";
import Onboarding from "../../Onboarding/Onboarding";
import MainChatbot from "../../Chatbot/MainChatbot";

const ClientDashboard = () => {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");


  useEffect(() => {
    axiosInstance
      .get(`user/${localStorage.getItem("user_id")}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
      .then((res) => {
        // setFirstName(res.data.first_name);
        // setLastName(res.data.last_name);
        // Send the firstTime value in the PATCH request
        localStorage.setItem("cortEmail", res.data.email)  //USe for CortButton Page
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const WELCOME_OPTIONS = [
    {
      thumb: <img src={Thumb1png} alt= "" className="first" />,
      title: "Start New Project",
      route: "/navbar/firstpage",
    },
    {
      thumb: <img src={Thumb2png} alt ="" className="second" />,
      title: "Application Progress & Reporting",
      route: "/navbar/review",
    },
    // {
    //   thumb: <img src={Thumb3png} alt ="" className="four" />,
    //   title: "How To use Platform",
    //   route: "/navbar/mainpage",
    // },
    {
      thumb: <img src={Thumb5png} alt ="" className="third" />,
      title: "Analytics",
      route: "/navbar/dashboard",
    },
    // {
    //   thumb: <img src={Thumb4png} alt="" className="four" style={{ width: "63px", cursor: "default" }} />,
    //   title: "Lab Testing (Coming Soon)",
    //   // route: "/navbar/firstcompliance",
    //   onClick: (event) => {
    //     event.preventDefault(); // Prevent the default behavior of the link
    //   }
    // }
    
    
  ];

  return (
    <div className="welcome">
      <div className="bg-clientdash">
        <div className="nav-box">
          <Mapbg className="name-bg" />
        </div>
        {/* <div className="upper-name">
          Welcome, {firstName} {lastName}
        </div> */}
        <div className="bg-clientdash">
          <div className="dash-titlebg">Your Compliance Dashboard</div>

          <Row gutter={[0, 16]}>
  {WELCOME_OPTIONS.map((item, index) => (
    <Col xs={24} sm={15} md={6} key={index}>
      <Link to={item.route} className="option-box">
        {item.thumb}
        <h4 style={{ color: "black", fontWeight: "100" }}>{item.title}</h4>
      </Link>
    </Col>
  ))}
  <Col xs={24} sm={15} md={6}>
    <Link to="#" className="option-box1">
      <img
        src={Thumb4png}
        alt=""
        className="four"
        style={{ width: "63px", cursor: "not-allowed" }}
      />
      <h4 style={{ color: "black", fontWeight: "100" }}>Lab Testing (Coming Soon)</h4>
    </Link>
  </Col>
</Row>

        </div>
      </div>
      <Onboarding />
      <MainChatbot />
    </div>
  );
};

export default ClientDashboard;
