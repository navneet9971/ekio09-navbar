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

      // Set "first_time" to "false" to prevent onboarding from showing again
      localStorage.setItem("first_time", "false");
    }
  }, []);

  console.log("navneet")

  return (
    <div>
    </div>
  );
}

export default Onboarding;
