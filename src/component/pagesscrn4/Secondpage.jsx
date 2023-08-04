import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../interceptors/axios";
import Popup from "../popup/Popup";
import "./Pages.css";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import TECFreshForms from "../Complianceforms/TEC/TECfreashFroms";
import TECPerviousData from "../Complianceforms/TEC/TECPerviousdata";
import TECtableModification from "../Complianceforms/TEC/TECtableModificationpage";
import BISFreshForms from "../Complianceforms/BIS/BISfreashform";
// import BisRNumberPopup from "../Complianceforms/BIS/BisRNumberPOPUP";
import BISPerviousData from "../Complianceforms/BIS/BISPerviousData";
import BisInclusionForm from "../Complianceforms/BIS/BisInclusionDropDownPage";
import WPCFormComponent from "../Complianceforms/WPC/WPCfreashForms";
import WPCPerviousData from "../Complianceforms/WPC/WPCPerviousDataform";
import BISISIFreashForm from "../Complianceforms/BIS-ISI/BIS-ISIFreashForm";
import BISISIPerviousData from "../Complianceforms/BIS-ISI/BIS-ISIPerviousData";
import BisIsiInclusion from "../Complianceforms/BIS-ISI/BIS-ISIInclusionForm";

//Send E-mail For Cort To vishal Sir Don't Do it this compliance
const userEmail = localStorage.getItem("cortEmail");

function sendMail(complianceName) {
  const templateParams = {
    // Customize these parameters with your email configuration
    subject: "Selected Products",
    to_name: `${userEmail}`,
    message: `Compliance Names: ${complianceName}.`,
  };

  emailjs.init("ZJd0FvtghYYOebHku"); // Replace "YOUR_PUBLIC_KEY" with your actual Public Key

  emailjs.send("service_0senmcx", "template_4qkwrwj", templateParams).then(
    (response) => {
      console.log("Email sent successfully!", response);
      Swal.fire("Success!", "Submission was successful.", "success");
    },
    (error) => {
      console.error("Error sending email:", error);
      Swal.fire("Error!", "Submission failed.", "error");
    }
  );
}

//SECOND PAGE MAIN COMPONENT START HERE ----------------------------------------------------

const Secondpage = () => {
  const history = useHistory();
  const [complianceData, setComplianceData] = useState([]);
  const [applicationId, setNewApplicationId] = useState();
  //Compliance meantion here their had not provide application only send this compliance Mail on vishal sir

  localStorage.setItem("applicationId", applicationId);
  // Calls APIs HERE ---------------------------------------------------------
  useEffect(() => {
    axiosInstance
      .get(
        `/compliance/?category=${localStorage.getItem(
          "category"
        )}&product=${localStorage.getItem(
          "product"
        )}&countries=${localStorage.getItem("region")}`
      )
      .then((res) => {
        const uniqueComplianceData = [];
        res?.data?.data.forEach((compliance) => {
          // check if the compliance id already exists in the array
          if (
            !uniqueComplianceData.some(
              (item) => item.compliance.id === compliance.compliance.id
            )
          ) {
            uniqueComplianceData.push(compliance);
          }
        });
        setComplianceData(uniqueComplianceData);
        console.log(uniqueComplianceData);
      })
      .catch((err) => {
        alert("Something went wrong.");
      });

    // New form Application Create New ID APIS Call HERE
    axiosInstance
      .post(`application/form/`, {
        category: localStorage.getItem("category"),
        product: localStorage.getItem("product"),
      })
      .then((response) => {
        const id = response.data.data["id"];
        setNewApplicationId(id);
        console.log(id);
        localStorage.setItem("newApplicationId", id); // store id in localStorage
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Start TEC New Application Form const Code Here ---------------------------------
  const [buttonpopupform1tec, setButtonpopupform1tec] = useState(false);
  const [buttonautofillpopuptec, setButtonautofillpopuptec] = useState(false);
  const [buttonautofilledtec, setButtonautofilledtec] = useState(false);
  const [tecModificationpopup, settecModificationpopup] = useState(false);
  const [tecModificationPagepopup, setTecModificationPagepopup] = useState(
    false
  );
  const [tecautofillform, setTecautofillform] = useState(null);

  //TEC PERVIOUS DATA FETCH APIS -----------------
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `application/inclusive/?compliance=${localStorage.getItem(
          "compliance_name"
        )}`
      );
      const tecdata = response.data["fields"];
      console.log(response.data["fields"]);
      localStorage.setItem("tecdata", JSON.stringify(tecdata));
      // setTecformData({ ...tecformData, ...tecdata });
      const tecautofill = response.data["key"];
      setTecautofillform(tecautofill);
    } catch (error) {
      console.error(error);
    }
  };

  //TEC DYNAMIC POPUP CHOOSE OPTION YES OR NO  function handle here-------------------------
  function handletableautoform(event) {
    const value = event.target.value;

    if (tecautofillform === "Yes" && value === "Yesautofilledtec") {
      // Call the function for registering
      setButtonautofillpopuptec(true);
      console.log(autofillform);
    } else if (value === "Noform1tec") {
      // Call the function for unregistering
      setButtonpopupform1tec(true);
    }
    setButtonautofilledtec(false);
  }

  /*----------------------BIS FUNCTION CODE START HERE----------------*/

  //Start BIS New Application Form const Code Here ------------------------------------------------
  const [buttonPopup6bis, setButtonPopup6bis] = useState(false);
  const [buttonautofilledbis, setButtonautofilledbis] = useState(false);
  const [buttonautofillpopupbis, setButtonautofillpopupbis] = useState(false);
  const [buttonBisInclusionPopup, setButtonBisInclusionPopup] = useState(false);
  const [openBisInclusionForm, setOpenBisInclusionForm] = useState(false);

  //BIS Register POPUP box Filled Const Data here--------------------------------------------------
  const [autofillform, setAutofillform] = useState(null);

  //BIS PERVIOUS DATA FETCH APIS HERE--------------
  const fetchBISData = async () => {
    try {
      const response = await axiosInstance.get(
        `application/inclusive/?compliance=${localStorage.getItem(
          "compliance_name"
        )}`
      );
      const bisdata = response.data["fields"];
      console.log(bisdata);
      localStorage.setItem("bisdata", JSON.stringify(bisdata));

      // setBisformData({ ...bisformData, ...bisdata });
    } catch (error) {
      console.error(error);
    }
  };

  // open compliance video in new window
  // const handleVideoClick = (e, videoUrl) => {
  //   e.preventDefault();
  //   window.open(videoUrl, "Compliance Video", "width=800,height=600");
  // };

  const handleClick = async (complianceName, complianceId, event) => {
    localStorage.setItem("compliance_id", complianceId);
    localStorage.setItem("compliance_name", complianceName);

    try {
      // // Fetch data on button click
      await fetchData();

      // Call the API to get autofill information for the compliance
      const response = await axiosInstance.get(
        `application/inclusive/?compliance=${localStorage.getItem(
          "compliance_name"
        )}`
      );
      const autofill = response.data["key"];
      setAutofillform(autofill);

      if (complianceName === "TEC") {
        if (tecautofillform === "Yes") {
          // Call the function for registering
          settecModificationpopup(true);
          console.log(tecautofillform);
        } else if (tecautofillform === "No") {
          // Call the function for unregistering
          setButtonpopupform1tec(true);
        }
      } else if (complianceName === "BIS") {
        // Fetch BIS data
        await fetchBISData();
        if (autofill === "Yes") {
          // Call the function for registering
          // setButtonRegisterbis(true);
          setButtonBisInclusionPopup(true);
          console.log(autofill);
        } else if (autofill === "No") {
          // Call the function for unregistering
          // setButtonRegisterbis(true);
          setButtonBisInclusionPopup(true); // Change with bis popupautofill form
        }
      } else if (complianceName === "WPC") {
        // Fetch WPC DATA
        await fetchWPCData();
        if (autofill === "Yes") {
          //call the function for registering
          setButtonautofilledwpc(true);
        } else if (autofill === "No") {
          //call the function for unregistering
          setWpcPopupButton(true);
        }
      } else if (complianceName === "BIS - ISI") {
        // Fetch WPC DATA
        await fetchBisISIData();
        if (autofill === "Yes") {
          //call the function for registering
          setBisIsiPopupButton(true);
        } else if (autofill === "No") {
          //call the function for unregistering
          setBisIsiPopupButton(true);
        }
      }
      if (
        complianceName === "CCC" ||
        complianceName === "SLS" ||
        complianceName === "BSTI" ||
        complianceName === "CE" ||
        complianceName === "LMPC" ||
        complianceName === "SNI" ||
        complianceName === "PSE" ||
        complianceName === "KC Mark" ||
        complianceName === "SIRIM" ||
        complianceName === "SASO" ||
        complianceName === "BSMI" ||
        complianceName === "TISI" ||
        complianceName === "G Mark" ||
        complianceName === "ESMA" ||
        complianceName === "UL" ||
        complianceName === "FCC"
      ) {
        if (autofillform === "Yes") {
          // Call the function for registering
          // Do nothing (I assume you have the register function somewhere else)
          console.log(autofillform);
        } else if (autofillform === "No") {
          // Call the function for unregistering
          sendMail(complianceName);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //BIS DYNAMIC POPUP CHOOSE OPTION YES OR NO  function handle here-------------------------
  function handleautofilled(event) {
    const value = event.target.value;

    if (autofillform === "Yes" && value === "Yesautofilled") {
      // Call the function for registering
      setButtonautofillpopupbis(true);
      console.log(autofillform);
    } else if (value === "Noform1") {
      // Call the function for unregistering
      // setButtonRegisterbis(true);
      setButtonPopup6bis(true);
    }
    setButtonautofilledbis(false);
  }

  //handleinclusiondropdwn HERE-----------

  const handleInclusionOptionChange = (event) => {
    const value = event.target.value;

    // Perform any necessary actions based on the selected option immediately
    if (value === "inclusion") {
      setOpenBisInclusionForm(true);
    } else {
      if (autofillform === "Yes" && value === "newform") {
        setButtonautofilledbis(true); // Navigate to the new application page
      } else {
        setButtonPopup6bis(true);
      }
    }
    setButtonBisInclusionPopup(false);
  };

  //TEC MODIFICATION CODE HERE
  const handleModificationTecOptionChange = (event) => {
    // Perform any necessary actions based on the selected option immediately
    if (event.target.value === "modification") {
      history.push("/navbar/TECModification"); // Redirect to the new application page
    } else {
      if (tecautofillform === "Yes" && event.target.value === "tecnewform") {
        setButtonautofilledtec(true); // Navigate to the new application page
      } else {
        setButtonpopupform1tec(true);
      }
    }
    settecModificationpopup(false);
  };

  //WPC FORM COMPONENT STARTS HERE----------------------------------

  const [wpcPopupButton, setWpcPopupButton] = useState("");
  const [buttonautofilledwpc, setButtonautofilledwpc] = useState("");
  const [wpcperviousdataPop, setWpcperviousdataPop] = useState("");

  //WPC PERVIOUS DATA FETCH APIS HERE--------------
  const fetchWPCData = async () => {
    try {
      const response = await axiosInstance.get(
        `application/inclusive/?compliance=${localStorage.getItem(
          "compliance_name"
        )}`
      );
      const wpcdata = response.data["fields"];
      console.log(wpcdata);
      localStorage.setItem("wpcdata", JSON.stringify(wpcdata));
      // setBisformData({ ...bisformData, ...bisdata });
    } catch (error) {
      console.error(error);
    }
  };

  //WPC DYNAMIC POPUP CHOOSE OPTION YES OR NO  function handle here-------------------------
  function handletableautoformWPC(event) {
    const value = event.target.value;

    if (autofillform === "Yes" && value === "Yesautofilledwpc") {
      // Call the function for registering
      setWpcperviousdataPop(true);
      console.log(autofillform);
    } else if (value === "Noform1wpc") {
      // Call the function for unregistering
      setWpcPopupButton(true);
    }
    setButtonautofilledwpc(false);
  }

  //BIS-ISI APIS AND CONST START HERE -----------------------------------
  const [bisIsiPopupButton, setBisIsiPopupButton] = useState("");
  const [bisIsiAutofillPopup, setBisIsiAutofillPopup] = useState("");
  const [bisIsipopupFreshForm, setBisIsipopupFreshForm] = useState("");
  const [bisIsiPerviousdataPoPup, setBisIsiPerviousdataPoPup] = useState("");
  const [bisIsiInclusionFormPopup, setBisIsiInclusionFormPopup] = useState("");

  //WPC PERVIOUS DATA FETCH APIS HERE--------------
  const fetchBisISIData = async () => {
    try {
      const response = await axiosInstance.get(
        `application/inclusive/?compliance=${localStorage.getItem(
          "compliance_name"
        )}`
      );
      const bisisiData = response.data["fields"];
      console.log(bisisiData);
      localStorage.setItem("bisIsidata", JSON.stringify(bisisiData));
      // setBisformData({ ...bisformData, ...bisdata });
    } catch (error) {
      console.error(error);
    }
  };

  //BISISI First Popup Handle Here
  const handleInclusionOptionChangeBISISI = (event) => {
    const value = event.target.value;

    // Perform any necessary actions based on the selected option immediately
    if (value === "inclusionBisIsi") {
      setBisIsiInclusionFormPopup(true);
    } else {
      if (autofillform === "Yes" && value === "newformBisIsi") {
        setBisIsiAutofillPopup(true); // Navigate to the new application page
      } else {
        setBisIsipopupFreshForm(true);
      }
    }
    setBisIsiPopupButton(false);
  };

  //BISISI DYNAMIC POPUP CHOOSE OPTION YES OR NO  function handle here-------------------------
  function handleautofilledBisISI(event) {
    const value = event.target.value;

    if (autofillform === "Yes" && value === "YesautofilledBISISI") {
      // Call the function for registering
      setBisIsiPerviousdataPoPup(true);
      console.log(autofillform);
    } else if (value === "Noform1BisIsi") {
      // Call the function for unregistering
      // setButtonRegisterbis(true);
      setBisIsipopupFreshForm(true);
    }
    setBisIsiAutofillPopup(false);
  }

  //Auto close POPup after click Sumbit
  const handlePopupClose = () => {
    setButtonpopupform1tec(false);
    setButtonautofillpopuptec(false);
    setButtonautofillpopupbis(false);
    // setButtonRegisterPagebis(false);
    setButtonPopup6bis(false);
    setWpcPopupButton(false);
    setWpcPopupButton(false);
    setBisIsiPerviousdataPoPup(false);
  };

  return (
    <div className="table-bgsconpage">
      <div className="table">
        <h1 style={{ display: "none" }}>Application Number: {applicationId}</h1>
        <h1
          style={{ fontWeight: "100", padding: "0px 50px", fontSize: "26px" }}
        >
          List of Compliance
        </h1>
        <div className="table-wrapper">
          <table className="Review">
            <thead>
              <tr>
                {/*<th>S.no</th>*/}
                <th style={{ cursor: "default" }}>Compliance Name</th>
                <th style={{ cursor: "default" }}>Description</th>
                {/* <th style={{ cursor: "default" }}>Video</th> */}
              </tr>
            </thead>
            <tbody>
              {complianceData.map((compliance, index) => (
                <tr key={index}>
                  {/* <td>{compliance.id}</td> */}
                  <td
                    className="clickable"
                    onClick={(event) =>
                      handleClick(
                        compliance.compliance.product_name,
                        compliance.compliance.id,
                        event
                      )
                    }
                  >
                    {console.log(compliance)}
                    {compliance.compliance.product_name}
                  </td>
                  <td style={{ cursor: "default" }}>
                    {compliance.compliance.details}
                  </td>
                  {/* <td>
                    <a
                      href={compliance.video}
                      onClick={(e) => handleVideoClick(e, compliance.video)}
                    >
                      <div className="video-banner">
                        <div className="play-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </td> */}
                  {/* <td 
                 onClick={() => handleClick(compliance.product_name, compliance.id)}>
                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --------------TEC Modification POPUP CODE IS HERE----------------------------------  */}
        <Popup
          trigger={tecModificationpopup}
          setTrigger={settecModificationpopup}
        >
          <h3 className="reg-popup-titlte">What do you want to do today?</h3>
          <select onChange={handleModificationTecOptionChange}>
            <option value="">Choose the Option:-</option>
            <option value="modification">Modify exsisting application</option>
            <option value="tecnewform">Start a new application</option>
          </select>
        </Popup>

        {/*----------- MODIFICATIONTABLEPAGE CODE HERE ------------------------------------------ */}
        <Popup
          trigger={tecModificationPagepopup}
          setTrigger={setTecModificationPagepopup}
        >
          <div style={{ height: "500px", overflow: "scroll" }}>
            <TECtableModification />
          </div>
        </Popup>

        {/*------------------------ TEC DYNAMIC FORM DATA POPUP CODE HERE------------------------ */}
        <Popup
          trigger={buttonautofilledtec}
          setTrigger={setButtonautofilledtec}
        >
          <h3 className="reg-popup-titlte">
            We have got your company details saved with us. <br /> Do you want
            to use the saved data and save time?
          </h3>
          <div className="checkbox-container">
            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="Yesautofilledtec"
                    //checked={radioValue === 'Option 1'}
                    onChange={handletableautoform}
                    onClick={() => setButtonautofilledtec(false)}
                  />
                  YES
                </label>
              </div>
            </div>

            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="Noform1tec"
                    //checked={radioValue === 'Unregister'}
                    onChange={handletableautoform}
                    onClick={() => setButtonpopupform1tec(false)}
                  />
                  NO
                </label>
              </div>
            </div>
          </div>
        </Popup>

        {/*-------------- TEC DYNAMIC AUTO FILL FORM CODE HERE --------------------------------- */}
        <Popup
          trigger={buttonautofillpopuptec}
          setTrigger={setButtonautofillpopuptec}
        >
          <TECPerviousData onClose={handlePopupClose} />
        </Popup>

        {/*---------------TEC FORMS START NEW APPLICATION POPUP CODE HERE ----------------------*/}
        <Popup
          trigger={buttonpopupform1tec}
          setTrigger={setButtonpopupform1tec}
        >
          <div style={{ height: "500px", overflow: "scroll" }}>
            <TECFreshForms onClose={handlePopupClose} />
          </div>
        </Popup>

        {/*----------------- TEC END HERE AND START BIS FROMS CODE HERE ---------------------- */}

        {/* --------------BIS Inclusion POPUP CODE IS HERE----------------------------------  */}
        <Popup
          trigger={buttonBisInclusionPopup}
          setTrigger={setButtonBisInclusionPopup}
        >
          <h3 className="reg-popup-titlte">What do you want to do today?</h3>
          <select onChange={handleInclusionOptionChange}>
            <option value="">Choose the Option:-</option>
            <option value="inclusion">
              Include details in an existing product
            </option>
            <option value="newform">Start a new application</option>
          </select>
        </Popup>

        {/* -------------Inclusion Form Rendere code here---------------------------------------  */}
        <Popup
          trigger={openBisInclusionForm}
          setTrigger={setOpenBisInclusionForm}
        >
          <BisInclusionForm />
        </Popup>
        {/*------------------------ BIS DYNAMIC FORM DATA POPUP CODE HERE------------------------ */}
        <Popup
          trigger={buttonautofilledbis}
          setTrigger={setButtonautofilledbis}
        >
          <h3 className="reg-popup-titlte">
            We have got your company details saved with us. <br /> Do you want
            to use the saved data and save time?
          </h3>

          <div className="checkbox-container">
            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="Yesautofilled"
                    //checked={radioValue === 'Option 1'}
                    onChange={handleautofilled}
                    onClick={() => setButtonautofilledbis(false)}
                  />
                  YES
                </label>
              </div>
            </div>

            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="Noform1"
                    //checked={radioValue === 'Unregister'}
                    onChange={handleautofilled}
                    // onClick={() => setButtonRegisterbis(false)}
                  />
                  NO
                </label>
              </div>
            </div>
          </div>
        </Popup>

        {/*--------- BIS Pervious DYNAMIC FORM DATA AUTO FILL FORM CODE IS HERE -------------------- */}
        <Popup
          trigger={buttonautofillpopupbis}
          setTrigger={setButtonautofillpopupbis}
        >
          <BISPerviousData onClose={handlePopupClose} />
        </Popup>

        {/*---------------START NEW APPLICATION BIS REQUIRED DETAILS POPUP IF USER SELECTED YES PAGE CODE HERE  ----------------------*/}
        <Popup trigger={buttonPopup6bis} setTrigger={setButtonPopup6bis}>
          <BISFreshForms onClose={handlePopupClose} />
        </Popup>

        {/*------------------------ WPC DYNAMIC FORM DATA POPUP CODE HERE------------------------ */}
        <Popup
          trigger={buttonautofilledwpc}
          setTrigger={setButtonautofilledwpc}
        >
          <h3 className="reg-popup-titlte">
            We have got your company details saved with us. <br /> Do you want
            to use the saved data and save time?
          </h3>
          <div className="checkbox-container">
            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="Yesautofilledwpc"
                    //checked={radioValue === 'Option 1'}
                    onChange={handletableautoformWPC}
                    onClick={() => setWpcperviousdataPop(false)}
                  />
                  YES
                </label>
              </div>
            </div>

            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="Noform1wpc"
                    //checked={radioValue === 'Unregister'}
                    onChange={handletableautoformWPC}
                    onClick={() => setWpcperviousdataPop(false)}
                  />
                  NO
                </label>
              </div>
            </div>
          </div>
        </Popup>

        {/* -----------------------------WPC PERVIOUS DATA FORM NO 1 ----------------------- */}

        <Popup trigger={wpcperviousdataPop} setTrigger={setWpcperviousdataPop}>
          <WPCPerviousData onClose={handlePopupClose} />
        </Popup>

        {/* ------------------------WPC START NEW APPLICATION HERE------------------------------------------------------ */}

        <Popup trigger={wpcPopupButton} setTrigger={setWpcPopupButton}>
          <div style={{ height: "500px", overflow: "scroll" }}>
            <WPCFormComponent onClose={handlePopupClose} />
          </div>
        </Popup>

        {/*------------------------ BIS-ISI DYNAMIC FORM DATA POPUP CODE HERE------------------------ */}
        <Popup trigger={bisIsiPopupButton} setTrigger={setBisIsiPopupButton}>
          <h3 className="reg-popup-titlte">What do you want to do today?</h3>
          <select onChange={handleInclusionOptionChangeBISISI}>
            <option value="">Choose the Option:-</option>
            <option value="inclusionBisIsi">
              Include details in an existing product
            </option>
            <option value="newformBisIsi">Start a new application</option>
          </select>
        </Popup>

        {/*------------------------ BIS-ISI DYNAMIC FORM DATA POPUP CODE HERE------------------------ */}
        <Popup
          trigger={bisIsiAutofillPopup}
          setTrigger={setBisIsiAutofillPopup}
        >
          <h3 className="reg-popup-titlte">
            We have got your company details saved with us. <br /> Do you want
            to use the saved data and save time?
          </h3>

          <div className="checkbox-container">
            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="YesautofilledBISISI"
                    //checked={radioValue === 'Option 1'}
                    onChange={handleautofilledBisISI}
                    onClick={() => setButtonautofilledbis(false)}
                  />
                  YES
                </label>
              </div>
            </div>

            <div className="bis-register">
              <div>
                <label className="pop-opt">
                  <input
                    className="bis-register"
                    type="checkbox"
                    value="Noform1BisIsi"
                    //checked={radioValue === 'Unregister'}
                    onChange={handleautofilledBisISI}
                    // onClick={() => setButtonRegisterbis(false)}
                  />
                  NO
                </label>
              </div>
            </div>
          </div>
        </Popup>

        {/*---------------- BIS-ISI Inclusion Form Data Here------------------------------ */}

        <Popup
          trigger={bisIsiInclusionFormPopup}
          setTrigger={setBisIsiInclusionFormPopup}
        >
          <BisIsiInclusion />
        </Popup>

        {/*----------------------- BIS-ISI FreashForm Start Here--------------------------------------  */}
        <Popup
          trigger={bisIsipopupFreshForm}
          setTrigger={setBisIsipopupFreshForm}
        >
          <BISISIFreashForm />
        </Popup>

        {/*---------------------- BIS-ISI Pervious Data Form Code Here------------------------------------ */}
        <Popup
          trigger={bisIsiPerviousdataPoPup}
          setTrigger={setBisIsiPerviousdataPoPup}
        >
          <BISISIPerviousData />
        </Popup>
      </div>
    </div>
  );
};

export default Secondpage;
