import React, {useState ,useEffect} from "react";
import "../component/pagesscrn4/client-dashbord/Clientdashboard.css";
import axiosInstance from "../interceptors/axios";

import { useNavigate } from "react-router-dom";

const MainPage2 = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();

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
    navigate("/navbar/firstpage");
  };

  return (
    <div className="welcome">
      <div className="nav-box">Welcome {first_name} {last_name}</div>
      <div className="welcome-note">
        <p className="welcome-lines">         
           You can easily track the status of your application by going to the Track Application Page.
           Click the Application you want to track and see the details. 
        </p>
        <div className="button-container">
          <button onClick={handleSkip} className="skip-button">
            START
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage2;
