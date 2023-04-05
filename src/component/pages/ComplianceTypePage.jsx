import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import "./stepper.css";

function Stepper() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name");
  const projectCode = searchParams.get("projectCode");
  const steps = ["Form Submitted", "Lab Testing", "Sample Completed", "End"];
  const [currentStep, updateCurrentStep] = useState(1);
  const [current, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  
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
          {steps?.map((step, i) => (
            <div
              key={i}
              className={`stepBlock ${currentStep === i + 1 && "active"} ${
                (i + 1 < currentStep || complete) && "complete"
              } `}
            >
              <div
                className="circleWrapper"
                onClick={() => updateCurrentStep(i + 1)}
              >
                <div className="circle">
                  {i + 1 < current || complete ? (
                    <TiTick size={24} />
                  ) : (
                    i + 1
                  )}
                </div>
              </div>
              <h4 className="ste">{step}</h4>
            </div>
          ))}
        </div>
        
          <div>
          {!complete && (
    <div class="row">
      <div className="col">
        <div>
          <div className="circle12">
            {current >= 2 ? <TiTick size={24} /> : null}
          </div>
          <h3 className="tc">Signatory Authorization</h3>
          <div className="circle12">
            {current >= 2 ? <TiTick size={24} /> : null}
          </div>
          <h3 className="wp">OEM Authorization</h3>
        </div>
      </div>
      

           <div className="col">
        <div>
          <div className="circle12">
          {current >= 2 ? <TiTick size={24} /> : null}
          </div>
          <h3 className="be">MOU</h3>
          <div className="circle12">
          {current >= 2 ? <TiTick size={24} /> : null}
          </div>
          <h3 className="bi">Shareholding Pattern</h3>
        </div>
    </div>


  <div className="col">
    <div className="circle12">
    {current >= 2 ? <TiTick size={24} /> : null}
    </div>
    <h3 className="ep">Annexure 1</h3>
    <div className="circle12">
    {current >= 2 ? <TiTick size={24} /> : null}
    </div>
    <h3 className="legal">BOM</h3>
    </div>
    <div className="col">
    <div className="circle12">
    {current >= 2 ? <TiTick size={24} /> : null}
    </div>
    <h3 className="isi">Non Applicability Proforma</h3>
    <div className="circle12">
    {current >= 2 ? <TiTick size={24} /> : null}
    </div>
    <h3 className="management">Proforma Seeking Exemption</h3>
    </div>
    </div>
    )}
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



