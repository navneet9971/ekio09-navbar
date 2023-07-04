import React, { useEffect } from "react";
import introJs from "intro.js";
import "./introjs.css";
import "intro.js/introjs.css";
import boardimg from "../assets/onboardingimg.png";

function Onboarding() {
  useEffect(() => {
    if (localStorage.getItem("first_time") === "true") {
      const intro = introJs();
      intro.setOptions({
        steps: [
          {
            intro:  `
    <img className= "onboarding-welcome" src="${boardimg}" alt="onboarding"  />
    <h3>Welcome to your one stop end-to-end product compliance tool. 
    </h3>
          `,
            // position: "center",
            tooltipClass: "custom-tooltip",
            highlightClass: "custom-highlight",
            overlayOpacity: 0.5,
          },
          // {
          //   element: ".one",
          //   intro:
          //     "Get to know the compliance applicable to your product and the process to get the certificate for that compliance.",
          //   tooltipClass: "custom-tooltip",
          //   highlightClass: "custom-highlight",
          // },
          {
            element: ".first",
            intro: "Start a new project with Eikomp respective to your product",
            tooltipClass: "custom-tooltip",
            highlightClass: "custom-highlight",
          },
          {
            element: ".second",
            intro: "Track the status of your applications from this page.",
            tooltipClass: "custom-tooltip",
            highlightClass: "custom-highlight",
          },
          // {
          //   element: ".four",
          //   intro: "Helps in understanding each and every step of the portal.",
          //   tooltipClass: "custom-tooltip",
          //   highlightClass: "custom-highlight",
          // },
          {
            element: ".third",
            intro: "Shows you the overall stats of the filed applications",
            tooltipClass: "custom-tooltip",
            highlightClass: "custom-highlight",
          },
        ],
        showBullets: false,
        showStepNumbers: false,
        exitOnOverlayClick: false,
        keyboardNavigation: true,
        showButtons: true,
        showBackButton: false,
      });
      intro.start();

      // Set "first_time" to "false" to prevent onboarding from showing again
      localStorage.setItem("first_time", "false");
    }
  }, []);

  return <div></div>;
}

export default Onboarding;
