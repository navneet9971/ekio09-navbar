import React, {useState ,useEffect} from "react";
import "../component/pagesscrn4/client-dashbord/Clientdashboard.css";
import axiosInstance from "../interceptors/axios";
import { ReactComponent as Steps1 } from "../component/assets/main-page-svg/1.svg";
import { ReactComponent as Steps2 } from "../component/assets/main-page-svg/2.svg";
import { ReactComponent as Steps3 } from "../component/assets/main-page-svg/3.svg";
import { ReactComponent as Steps4 } from "../component/assets/main-page-svg/4.svg";
import { ReactComponent as Steps5 } from "../component/assets/main-page-svg/5.svg";
import { ReactComponent as Steps6 } from "../component/assets/main-page-svg/6.svg";
import { ReactComponent as Steps7 } from "../component/assets/main-page-svg/7.svg";
// import { useHistory } from "react-router-dom";

const MainPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  // const history = useHistory();

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
      });
  }, []); // run only once on mount

  // const handleContinue = () => {
  //   history.push("/navbar/firstpage");
  // };

  return (
    <div className="welcome">
      <div className="nav-box">Welcome {first_name} {last_name}</div>

  <Steps1 className="mainsvg1"/>
  <Steps2 className="mainsvg1"/>
  <Steps3 className="mainsvg1"/>
  <Steps4 className="mainsvg1"/>
  <Steps5 className="mainsvg1"/>
  <Steps6 className="mainsvg1"/>
  <Steps7 className="mainsvg1"/>

        {/* <div className="button-container">
          <button onClick={handleContinue} className="continue-button">
            Continue
          </button>
        </div> */}
      </div>
  );
};

export default MainPage;
