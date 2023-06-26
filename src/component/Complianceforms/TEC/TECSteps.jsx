import React, { useState, useEffect } from "react";
import Message from "../../popup/Message";
import { ReactComponent as Thum1png } from "../../assets/track-icon/reg.svg";
import { ReactComponent as Thum2png } from "../../assets/track-icon/testing.svg";
import { ReactComponent as Thum3png } from "../../assets/track-icon/AIR.svg";
import { ReactComponent as Thum4png } from "../../assets/track-icon/OEM.svg";
import { ReactComponent as Thum5png } from "../../assets/track-icon/BOM.svg";
import { ReactComponent as Thum6png } from "../../assets/track-icon/payment.svg";
import { ReactComponent as Thum7png } from "../../assets/track-icon/final.svg";
import { ReactComponent as Thum8png } from "../../assets/track-icon/certif.svg";
import { ReactComponent as Wrong } from "../../assets/trckpg-rb/wrong.svg";
import { ReactComponent as Right } from "../../assets/trckpg-rb/right.svg";
import axiosInstance from "../../../interceptors/axios";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

function TECSteps() {
  const [buttonPopup3, setButtonPopup3] = useState(false);
  const [buttonPopup4, setButtonPopup4] = useState(false);
  const [buttonPopup5, setButtonPopup5] = useState(false);
  const [buttonPopup6, setButtonPopup6] = useState(false);
  const [buttonPopup7, setButtonPopup7] = useState(false);
  const [buttonPopup8, setButtonPopup8] = useState(false);
  const [buttonPopup9, setButtonPopup9] = useState(false);
  const [buttonPopup10, setButtonPopup10] = useState(false);
  const [docStep, setdocStep] = useState({});
  const [showRemainingSteps, setShowRemainingSteps] = useState(false);

  localStorage.setItem("docStep", JSON.stringify(docStep));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const compliance_id = localStorage.getItem("compliance_id");
        const application_id = localStorage.getItem("application_id");
        const request_for = localStorage.getItem("request_for");

        const response = await axiosInstance.get(
          `application/status/?compliance=${compliance_id}&application=${application_id}&request_for=${request_for}`
        );

        const stepstatus = response.data.data;
        const newDocStep = {};
        for (let i = 0; i < stepstatus.length; i++) {
          const step = stepstatus[i];
          newDocStep[step.step] = [step.status, step.message, step.start_date];
        }

        let count = 0;
        for (let i = 0; i < stepstatus.length; i++) {
          if (stepstatus[i].status === "Completed") {
            count += 1;
          }
        }
        localStorage.setItem("stepstatus", count);
        console.log(count);
        setdocStep(newDocStep);
        console.log(newDocStep);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleButtonClick = () => {
    setShowRemainingSteps(!showRemainingSteps);
  };

  return (
    <div>
      <h2 className="steps-count">Steps To Be Completed</h2>
      <div className="tecon">
        <Message trigger={buttonPopup3} setTrigger={setButtonPopup3}>
          <h2 className="pop-msg">
            Message: {docStep["1"] && docStep["1"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["1"] && docStep["1"][2].slice(0, 10)}
          </h2>
        </Message>

        <Thum1png className="mainsvg2" />
        {docStep["1"] && docStep["1"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup3(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup3(true)} />
        )}

        <Message trigger={buttonPopup4} setTrigger={setButtonPopup4}>
          <h2 className="pop-msg">
            Message: {docStep["2"] && docStep["2"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["2"] && docStep["2"][2].slice(0, 10)}
          </h2>
        </Message>

        <Thum2png className="mainsvg2" />
        {docStep["2"] && docStep["2"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup4(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup4(true)} />
        )}

        <Message trigger={buttonPopup5} setTrigger={setButtonPopup5}>
          <h2 className="pop-msg">
            Message: {docStep["3"] && docStep["3"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["3"] && docStep["3"][2].slice(0, 10)}
          </h2>
        </Message>

        <Thum3png className="mainsvg2" />
        {docStep["3"] && docStep["3"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup5(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup5(true)} />
        )}

        <Message trigger={buttonPopup6} setTrigger={setButtonPopup6}>
          <h2 className="pop-msg">
            Message: {docStep["4"] && docStep["4"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["4"] && docStep["4"][2].slice(0, 10)}
          </h2>
        </Message>

        <Thum4png className="mainsvg2" />
        {docStep["4"] && docStep["4"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup6(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup6(true)} />
        )}

        <Message trigger={buttonPopup7} setTrigger={setButtonPopup7}>
          <h2 className="pop-msg">
            Message: {docStep["5"] && docStep["5"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["5"] && docStep["5"][2].slice(0, 10)}
          </h2>
        </Message>

        <Thum5png className="mainsvg2" />
        {docStep["5"] && docStep["5"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup7(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup7(true)} />
        )}

        <Message trigger={buttonPopup8} setTrigger={setButtonPopup8}>
          <h2 className="pop-msg">
            Message: {docStep["6"] && docStep["6"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["6"] && docStep["6"][2].slice(0, 10)}
          </h2>
        </Message>

        <Thum6png className="mainsvg2" />
        {docStep["6"] && docStep["6"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup8(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup8(true)} />
        )}

        <Message trigger={buttonPopup9} setTrigger={setButtonPopup9}>
          <h2 className="pop-msg">
            Message: {docStep["7"] && docStep["7"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["7"] && docStep["7"][2].slice(0, 10)}
          </h2>
        </Message>

{showRemainingSteps && (
  <>
        <Thum7png className="mainsvg2" />
        {docStep["7"] && docStep["7"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup9(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup9(true)} />
        )}

        <Message trigger={buttonPopup10} setTrigger={setButtonPopup10}>
          <h2 className="pop-msg">
            Message: {docStep["8"] && docStep["8"][1]}
          </h2>
          <h2 className="pop-msg">
            Start Date: {docStep["8"] && docStep["8"][2].slice(0, 10)}
          </h2>
        </Message>

        <Thum8png className="mainsvg2" />
        {docStep["8"] && docStep["8"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup10(true)} />
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup10(true)} />
        )}
          </>
)}

<div>
      {showRemainingSteps ? (
        <AiFillCaretUp onClick={handleButtonClick} />
      ) : (
        <AiFillCaretDown onClick={handleButtonClick} />
      )}
    </div>
   
      </div>
    </div>
  );
}

export default TECSteps;
