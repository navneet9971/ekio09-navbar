import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./stepper.css";
import { ReactComponent as Thum1png } from ".././assets/bis-track-icons/application.svg";
import { ReactComponent as Thum2png } from ".././assets/bis-track-icons/testing.svg";
import { ReactComponent as Thum3png } from ".././assets/bis-track-icons/approval.svg";
import { ReactComponent as Thum4png } from ".././assets/bis-track-icons/documentation.svg";
import { ReactComponent as Thum5png } from ".././assets/bis-track-icons/certificate.svg";
import { ReactComponent as Wrong } from ".././assets/trckpg-rb/wrong.svg";
import { ReactComponent as Right } from ".././assets/trckpg-rb/right.svg";
import file1png from "../../component/assets/pdficon/Green01.png";
import file2png from "../../component/assets/pdficon/Green02.png";
import file3png from "../../component/assets/pdficon/Green03.png";
import file4png from "../../component/assets/pdficon/Green04.png";
import file5png from "../../component/assets/pdficon/Red01.png";
import file6png from "../../component/assets/pdficon/Red02.png";


function Stepper() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const projectCode = queryParams.get("projectCode");
  const steps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Document pending with authorities", "Final report generated"];
 // const [currentStep] = useState(1);
  const [current, setCurrentStep] = useState(1);
  const [ setComplete] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  //const [setClickedColor] = useState(false);
 // const [ setActiveArrows] = useState([false, false, false, false, false]);
 // const [showTooltip, setShowTooltip] = useState(false); // declare showTooltip state
 // const [setClickedNext] = useState(false); // add state variable for tracking button click
 // const newSteps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Documents pending with authorities", "Final report generated"];


  const calculateEndDate = () => {
    const currentDate = new Date();
    const endDate = new Date(currentDate.setDate(currentDate.getDate() + 45));
    setEndDate(endDate);
  
    const intervalId = setInterval(() => {
      const remainingTime = endDate.getTime() - new Date().getTime();
      if (remainingTime >= 0) {
        const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        setEndDate({
          days: remainingDays,
          hours: remainingHours,
          minutes: remainingMinutes,
          seconds: remainingSeconds,
        });
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };
  

  return (
    <div className="ongoing-applications">
      <h1 className="ongo">BIS On Going Application:-</h1>
      <h1 className="type">Compliance Type: {name}</h1>
      <h1 className="appli">Application Number: {projectCode}</h1>
              
      <div className="tecon">
  <Thum1png className="mainsvg2"/>   
  <Right  className="mainsvg3"/>
  <p className="dt1">Date: 12/04/2023</p>
  <Thum2png className="mainsvg2"/>
  <Right  className="mainsvg3"/>
  <p className="dt2">Date: 12/04/2023</p>
  <Thum3png className="mainsvg2"/>
  <Right className="mainsvg3"/>
  <p className="dt3">Date: 12/04/2023</p>
  <Thum4png className="mainsvg2"/>
  <Wrong className="mainsvg3"/>
  <p className="dt4">Date: 12/04/2023</p>
  <Thum5png className="mainsvg2"/>
  <Wrong className="mainsvg3"/>
  <p className="dt5">Date: 12/04/2023</p>
  </div>

        
  <div>
  <div className="row">
    <div className="col doc-col">
        {current >= 2 ? <Wrong size={24} className="pdfico" /> : null}
      <div>  
        <img src={file1png} alt="" className="pdfico1" />
      </div>
      <h3 className="be">Manufacture authorization letter</h3>
    </div>
    <div className="col doc-col">
     
        {current >= 2 ? <Wrong size={24} className="pdfico"/> : null}
     
      <div>  
        <img src={file2png} alt="" className="pdfico1" />
      </div>
      <h3 className="be">Manufacture nomination form
</h3> 
    </div>

    
    <div className="col doc-col">
     
        {current >= 2 ? <Right size={24} className="pdfico"/> : null}
      
      <div>  
        <img src={file3png} alt="" className="pdfico1" />
      </div>
      <h3 className="be">AIR Affidavit Brand office
</h3>
    </div>
    <div className="col doc-col">
      
        {current >= 2 ? <Right size={24} className="pdfico" /> : null}   
      
      <div>  
        <img src={file4png} alt="" className="pdfico1" />
      </div>
      <h3 className="be">AIR Afidavit Mfg branch office
</h3>
    </div>


    <div className="col doc-col">
      
        {current >= 2 ? <Wrong size={24} className="pdfico"/> : null} 
      
      <div>  
        <img src={file5png} alt="" className="pdfico1" />
      </div>
      <h3 className="be">AIR authorization letter
</h3>
    </div>
    <div className="col doc-col">
      
        {current >= 2 ? <Right size={24} className="pdfico"/> : null}
    
      <div>  
        <img src={file6png} alt="" className="pdfico1" />
      </div>
      <h3 className="be">brand authorization letter</h3>
    </div>

  </div>
</div>

    
 {startDate && endDate && (
  <div>
    <p className="stdate">Start Date: {startDate.toDateString()}</p>
    {typeof endDate === 'object' ? (
      <p className="enddate">
        End Date: {endDate.days}days {endDate.hours}h {endDate.minutes}m {endDate.seconds}s
      </p>
    ) : (
      <p>End Date: {endDate.days} days left</p>
    )}
  </div>
)}
<button
    className="btn"
    onClick={() => {
      current === steps.length
        ? setComplete(true)
        : setCurrentStep((prev) => prev + 1);
      calculateEndDate();
      setStartDate(new Date());
    }}
  >NEXT
  </button>   
      </div>
  );
}


export default Stepper;



