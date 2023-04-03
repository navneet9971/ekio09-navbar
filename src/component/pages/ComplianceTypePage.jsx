import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import "./stepper.css";

function Stepper() {
const location = useLocation();
const searchParams = new URLSearchParams(location.search);
const name = searchParams.get("name");
const projectCode = searchParams.get("projectCode");
const steps = ["Form Sumbitted", "LabTesting", "Sample Completed", "End"];
const [currentStep, updateCurrentStep] = useState(1);
const [current, setCurrentStep] = useState(1);
const [complete, setComplete] = useState(false);

return (
<div className="welcome">
<h1>Compliance Type: {name}</h1>
<h2>Application Number: {projectCode}</h2>

<div className="App">
    <div className="stepWrapper">
      {steps?.map((step, i) => (
          <div
          key={i}
          className={`stepBlock ${currentStep === i + 1 && "active"} ${
            (i + 1 < currentStep || complete) && "complete"
          } `}
        >
          
          <div className="circleWrapper" onClick={() => updateCurrentStep(i + 1)}>
            <div className="circle">{i + 1 < current || complete ? <TiTick size={24} /> : i + 1}
           </div>
          </div>
          <span122>{step}</span122>
        </div>
      ))}
    </div>
    {!complete && (
        <button120
          className="btn"
          onClick={() => {
            current === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {current === steps.length ? "Finish" : "Next"}
        </button120>
      )}
</div>
</div>
);
}

export default Stepper;