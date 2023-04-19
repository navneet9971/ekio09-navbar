import React, {useState ,useEffect} from "react";
import "../component/pagesscrn4/client-dashbord/Clientdashboard.css";
import axiosInstance from "../interceptors/axios";

import { useHistory } from "react-router-dom";

const MainPage = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const history = useHistory();

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

  const handleSkip = () => {
    history.push("/navbar/firstpage");
  };

  const handleContinue = () => {
    history.push("/navbar/review");
  };

  return (
    <div className="welcome">
      <div className="nav-box">Welcome {first_name} {last_name}</div>
      <div className="welcome-note">
        <p className="welcome-lines">
          Eikomp helps enterprises, in adopting a strategic approach to compliance,
          to drastically crunch market-access timelines. Our global market access 
          platform helps clients with one-stop solutions to navigate the complexities 
          of global regulatory compliance.
        </p>
        <p className="btn-title">
        Enter the world of hassle-free compliances 
        </p>
        <div className="button-container">
          <button onClick={handleSkip} className="skip-button">
            Skip
          </button>
          <button onClick={handleContinue} className="continue-button">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
