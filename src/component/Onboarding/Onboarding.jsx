import React, { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

function Onboarding() {
  useEffect(() => {
    if (localStorage.getItem("first_time") === "true") {
      const intro = introJs();
      intro.setOptions({
        steps: [
          {
            intro: "Welcome to the Platform!",
          },
          //   {
          //     element: ".option-box",
          //     intro: "This is your Compliance Dashboard.",
          //   },
          {
            element: ".first",
            intro: "These are some options you can explore.",
          },
          {
            element: ".second",
            intro: "These are some options you can explore.",
          },
          {
            element: ".third",
            intro: "These are some options you can explore.",
          },
          {
            element: ".four",
            intro: "These are some options you can explore.",
          },
          {
            element: ".five",
            intro: "These are some options you can explore.",
          },
        ],
        showBullets: false,
        showStepNumbers: false,
        exitOnOverlayClick: false,
        keyboardNavigation: true,
      });
      intro.start();
    }
  }, []);

  return <div></div>;
}

export default Onboarding;
