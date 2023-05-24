import React, {useState ,useEffect} from "react";
import "../component/pagesscrn4/client-dashbord/Clientdashboard.css";
import axiosInstance from "../interceptors/axios";
import  Steps1  from "../component/assets/main-page-svg/1.png";
import  Steps2 from "../component/assets/main-page-svg/2.png";
import  Steps3 from "../component/assets/main-page-svg/3.png";
import  Steps4 from "../component/assets/main-page-svg/4.png";
import  Steps5 from "../component/assets/main-page-svg/5.png";
import  Steps6 from "../component/assets/main-page-svg/6.png";
import  Steps7 from "../component/assets/main-page-svg/7.png";
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

      <div className="imges-svg">
      <img className="mainsvg1" src={Steps1} alt="Step 1" />
      <img className="mainsvg1" src={Steps2} alt="Step 2" />
      <img className="mainsvg1" src={Steps3} alt="Step 3" />
      <img className="mainsvg1" src={Steps4} alt="Step 4" />
      <img className="mainsvg1" src={Steps5} alt="Step 5" />
      <img className="mainsvg1" src={Steps6} alt="Step 6" />
      <img className="mainsvg1" src={Steps7} alt="Step 7" />
      </div>
        {/* <div className="button-container">
          <button onClick={handleContinue} className="continue-button">
            Continue
          </button>
        </div> */}
      </div>
  );
};

export default MainPage;
