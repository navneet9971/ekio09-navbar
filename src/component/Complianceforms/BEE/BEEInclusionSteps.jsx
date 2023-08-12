import React, {useState, useEffect} from "react";
import Message from "../../popup/Message";
import axiosInstance from "../../../interceptors/axios";
// import { ReactComponent as Thum1png } from "../../assets/bis-track-icons/regi.svg";
import { ReactComponent as Thum2png } from "../../assets/bis-track-icons/testi.svg";
import { ReactComponent as Thum3png } from "../../assets/bis-track-icons/doc.svg";
import { ReactComponent as Thum4png } from "../../assets/bis-track-icons/appi.svg";
import { ReactComponent as Thum5png } from "../../assets/bis-track-icons/apro.svg";
// import { ReactComponent as Thum6png } from "../../assets/bis-track-icons/certi.svg";
import { ReactComponent as Wrong } from "../../assets/trckpg-rb/wrong.svg";
import { ReactComponent as Right } from "../../assets/trckpg-rb/right.svg";


function BEEInclusionSteps () {


    const [docStep, setdocStep] = useState({});
    localStorage.setItem("bisdocStep", JSON.stringify(docStep));

    // const [buttonPopup3, setButtonPopup3] = useState(false);
    const [buttonPopup4, setButtonPopup4] = useState(false);
    const [buttonPopup5, setButtonPopup5] = useState(false);
    const [buttonPopup6, setButtonPopup6] = useState(false);
    const [buttonPopup7, setButtonPopup7] = useState(false);
    // const [buttonPopup8, setButtonPopup8] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const biscompliance_id = localStorage.getItem("biscompliance_id");
            const bisapplication_id = localStorage.getItem("bisapplication_id");
            const bisrequest_for = localStorage.getItem("bisrequest_for");
    
            const response = await axiosInstance.get(
              `application/status/?compliance=${biscompliance_id}&application=${bisapplication_id}&request_for=${bisrequest_for}`
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


return (
<div>
        <h2 className="steps-count">Steps To Be Completed</h2>  
        <div className="tecon"> 
         {/* <Message trigger={buttonPopup3} setTrigger={setButtonPopup3}>
        <h2 className="pop-msg">    Message :- 
         {docStep["1"] && docStep["1"][1]}</h2>
         <h2 className="pop-msg">  Start Date :- 
         {docStep["1"] && docStep["1"][2].slice(0,10)}</h2>
         </Message>
      
        <Thum1png className="mainsvg2" />
        {docStep["1"] && docStep["1"][0] === "Completed" ? (
        <Right className="mainsvg3" onClick={() => setButtonPopup3(true)} />
      ) : (
        <Wrong className="mainsvg3" onClick={() => setButtonPopup3(true)}/>
      )} */}
      {/* <h3 className="setp-bis">BIS Portal Registration</h3> */}
      
      
      
      <Message trigger={buttonPopup4} setTrigger={setButtonPopup4}>
      <h2 className="pop-msg">    Message :- 
         {docStep["2"] && docStep["2"][1]}</h2>
         <h2 className="pop-msg">  Start Date :-
         {docStep["2"] && docStep["2"][2].slice(0,10)}</h2>
         </Message>
      
        <Thum2png className="mainsvg2" />
        {docStep["2"] && docStep["2"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup4(true)}/>
        )}
        {/* <h3 className="setp-bis">Sample Testing</h3> */}
      
      
      <Message trigger={buttonPopup5} setTrigger={setButtonPopup5}>
      <h2 className="pop-msg">    Message :- 
         {docStep["3"] && docStep["3"][1]}</h2>
         <h2 className="pop-msg">  Start Date :-
         {docStep["3"] && docStep["3"][2].slice(0,10)}</h2>
         </Message>
      
        <Thum3png className="mainsvg2" />
        {docStep["3"] && docStep["3"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup5(true)}/>
        )}
        {/* <h3 className="setp-bis">Documentation</h3> */}
      
      
      <Message trigger={buttonPopup6} setTrigger={setButtonPopup6}>
      <h2 className="pop-msg">    Message :- 
         {docStep["4"] && docStep["4"][1]}</h2>
         <h2 className="pop-msg">  Start Date :-
         {docStep["4"] && docStep["4"][2].slice(0,10)}</h2>
         </Message>
      
        <Thum4png className="mainsvg2" />
        {docStep["4"] && docStep["4"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup6(true)}/>
        )}
        {/* <h3 className="setp-bis">Filing Application</h3> */}
      
      <Message trigger={buttonPopup7} setTrigger={setButtonPopup7}>
      <h2 className="pop-msg">    Message :- 
         {docStep["5"] && docStep["5"][1]}</h2>
         <h2 className="pop-msg">  Start Date :-
         {docStep["5"] && docStep["5"][2].slice(0,10)}</h2>
         </Message>
      
        <Thum5png className="mainsvg2" />
        {docStep["5"] && docStep["5"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup7(true)}/>
        )}
        {/* <h3 className="setp-bis">Approval</h3> */}
      
      {/* <Message trigger={buttonPopup8} setTrigger={setButtonPopup8}>
      <h2 className="pop-msg">    Message :- 
         {docStep["6"] && docStep["6"][1]}</h2>
         <h2 className="pop-msg">  Start Date :-
         {docStep["6"] && docStep["6"][2].slice(0,10)}</h2>
         </Message>
      
        <Thum6png className="mainsvg2" />
        {docStep["6"] && docStep["6"][0] === "Completed" ? (
          <Right className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
        ) : (
          <Wrong className="mainsvg3" onClick={() => setButtonPopup8(true)}/>
        )} */}
        {/* <h3 className="setp-bis">Issuance of Certificate</h3> */}
      
      </div>
      </div>
    );
};

export default BEEInclusionSteps ;
