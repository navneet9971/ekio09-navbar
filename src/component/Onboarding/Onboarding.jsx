import React, { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css"; // Import intro.js CSS

function Onboarding() {
  useEffect(() => {
    if (localStorage.getItem("first_time") === "true") {
      const intro = introJs();
      intro.setOptions({
        steps: [
          {
            intro: "Welcome to the Platform!",
          },
          {
            element: ".first",
            intro: "Get to know the compliance applicable on your product and the process to get the certificate for that compliance.",
          },
          {
            element: ".second",
            intro: "Start a new project with Eikomp respective to your product",
          },
          {
            element: ".third",
            intro: "Track the status of your applications from this page.",
          },
          {
            element: ".four",
            intro: "Helps in understanding each and every step of the portal.",
          },
          {
            element: ".five",
            intro: "Shows you the overall stats of the filed applications",
          },
        ],
        showBullets: false,
        showStepNumbers: false,
        exitOnOverlayClick: false,
        keyboardNavigation: true,
      });
      intro.start();

      // Set "first_time" to "false" to prevent onboarding from showing again
      localStorage.setItem("first_time", "false");
    }
  }, []);

  return (
    <div>
    </div>
  );
}

export default Onboarding;
