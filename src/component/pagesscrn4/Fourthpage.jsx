import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Pages.css";

function MiddleSection() {
  return (
    <div className="middle-section">
      <h3>Middle Section</h3>
      <p>Description of Middle Section</p>
    </div>
  );
}


function Fourth() {
  const [videoUrl, setVideoUrl] = useState('');
  //const [isWishlisted, setIsWishlisted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch('https://example.com/video')
      .then(response => response.json())
      .then(data => {
        setVideoUrl(data.url);
      })
      .catch(error => console.error(error));
  }, []);


  const handleGoClick = () => {
    history.push('/navbar/firstpage');
  };

  return (
    <div className="app55">
      <div className="left-section55">
      </div>

      <button10 className='rdrcbtn' onClick={handleGoClick}> Start New Application </button10>


      <div className="video-box55">
        <video className='videoBox' controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <div className="center-section55">
        <MiddleSection/>
      </div>
      <div className="right-section55">
        <Link to="/introduction">Introduction</Link>
        <Link to="/required-document">Required Document</Link>
        <Link to="/registration-process">Registration Process</Link>
      </div> 
      <div1 className="vl"></div1>  
    </div>

  );
}

export default Fourth;