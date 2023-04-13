import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import "./stepper.css";
import Thum1png from "../../component/assets/track-icon/Icons01.png";
import Thum2png from "../../component/assets/track-icon/Icons02.png";
import Thum3png from "../../component/assets/track-icon/Icons03.png";
import Thum4png from "../../component/assets/track-icon/Icons04.png";
import Thum5png from "../../component/assets/track-icon/Icons05.png";
import file1png from "../../component/assets/pdficon/Green01.png";
import file2png from "../../component/assets/pdficon/Green02.png";
import file3png from "../../component/assets/pdficon/Green03.png";
import file4png from "../../component/assets/pdficon/Green04.png";
import file5png from "../../component/assets/pdficon/Red01.png";
import file6png from "../../component/assets/pdficon/Red02.png";
import file7png from "../../component/assets/pdficon/Red03.png";
import file8png from "../../component/assets/pdficon/Red04.png";

function Stepper() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const projectCode = searchParams.get("projectCode");
  const steps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Document pending with authorities", "Final report generated"];
  const [currentStep] = useState(1);
  const [current, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [setClickedColor] = useState(false);
  const [ setActiveArrows] = useState([false, false, false, false, false]);
  const [showTooltip, setShowTooltip] = useState(false); // declare showTooltip state
  const [setClickedNext] = useState(false); // add state variable for tracking button click
  const newSteps = ["Application Submitted", "Sample sent for testing", "Test report generated", "Documents pending with authorities", "Final report generated"];

  const handleUpdateCurrentStep = (step) => {
    setCurrentStep(step);
    setClickedNext(true);
    setClickedColor(true);
    setActiveArrows((prev) =>
      prev.map((_, i) => {
        if (i === step - 1) {
          return !prev[i];
        }
        return prev[i];
      })
    );
  };


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
    <div className="first-container22">
      <h1 className="ongo">On Going Application:-</h1>
      <h1 className="type">Compliance Type: {name}</h1>
      <h1 className="appli">Application Number: {projectCode}</h1>
              
      <div className="stepWrapper">
  {newSteps.map((step, i) => (
    <div
      key={i}
      className={`stepBlock ${currentStep === i + 1 && "active"} ${
        (i + 1 < currentStep || complete) && "complete"
      } `}
    >
      <h4 className="ste">{step}</h4>
      <div className="circle23"></div> 
      <div className="line"></div> 
      <div className="rightWrapper" onClick={() => handleUpdateCurrentStep(i + 1)}>
  <div
    className={`arrow-right ${ " " } ${
      i === 0 ? "arrow1" : ""
    } ${i === 1 ? "arrow2" : ""} ${i === 2 ? "arrow3" : ""} ${
      i === 3 ? "arrow4" : ""
    } ${i === 4 ? "arrow5" : ""}`}
    onMouseOver={() => setShowTooltip(true)}
    onMouseOut={() => setShowTooltip(false)}
  >
    {i === 0 && <img src={Thum1png} alt="" className="trck1" />}
    {i === 1 && <img src={Thum2png} alt="" className="trck1" />}
    {i === 2 && <img src={Thum3png} alt="" className="trck1" />}
    {i === 3 && <img src={Thum4png} alt="" className="trck1" />}
    {i === 4 && <img src={Thum5png} alt="" className="trck1" />}
  </div>
  {showTooltip && (
    <div className="tooltip">
      <p>Date: 12/04/2023</p>
      <p>Time left: 3 days</p>
    </div>
  )}
</div>

    </div>
  ))}
</div>

        
<div>
  <div className="row">
    <div className="col">
     
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null}
      </div>
      <div>  
        <img src={file1png} alt="" className="pdfico1" />
      </div>
      <h3 className="tc">Signatory Authorization</h3>
      
      <div className="col">
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null}
      </div>
      <div>  
        <img src={file2png} alt="" className="pdfico1" />
      </div>
      <h3 className="wp">OEM Authorization</h3> 
    </div>
    </div>

    
    <div className="col">
    
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null}
      </div>
      <div>  
        <img src={file3png} alt="" className="pdfico1" />
      </div>
      <h3 className="be">MOU</h3>
      
      <div className="col">
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null}   
      </div>
      <div>  
        <img src={file4png} alt="" className="pdfico1" />
      </div>
      <h3 className="bi">Shareholding Pattern</h3>
    </div>
    </div>


    <div className="col">
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null} 
      </div>
      <div>  
        <img src={file5png} alt="" className="pdfico1" />
      </div>
      <h3 className="ep">Annexure 1</h3>
      
      <div className="col">
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null}
      </div>
      <div>  
        <img src={file6png} alt="" className="pdfico1" />
      </div>
      <h3 className="legal">BOM</h3>
    </div>
    </div>

    <div className="col">
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null}
      </div>
      <div>  
        <img src={file7png} alt="" className="pdfico1" />
      </div>
      <h3 className="isi">Non Applicability Proforma</h3>
      
      <div className="col">
      <div className="circle12">
        {current >= 2 ? <TiTick size={24} /> : null}
      </div>
      <div>  
        <img src={file8png} alt="" className="pdfico1" />
      </div>
      <h3 className="management">Proforma Seeking Exemption</h3>
    </div>
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



