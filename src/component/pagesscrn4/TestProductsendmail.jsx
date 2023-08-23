import React, { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

function EmailSender() {
  const [isLoading, setIsLoading] = useState(false);
  // Initialize EmailJS with your Public Key
  emailjs.init("1elynlSijk0-17Jlq"); // Replace with your actual Public Key

  const userEmail = localStorage.getItem("cortEmail");

  // Corrected the syntax for the sendMail function
  function sendMail() {
    setIsLoading(true); // Set loading to true when sending email

    const templateParams = {
      // Customize these parameters with your email configuration
      subject: "Selected Products",
      to_name: `Vishal`,
      message: `${userEmail} has requested - Please pick the samples for testing.`,
    };

    emailjs
      .send("service_5b3z2cy", "template_j8bhgnv", templateParams)
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          setIsLoading(false); // Set loading to false on success
          Swal.fire("Success!", "Submission was successful.", "success");
        },
        (error) => {
          console.error("Error sending email:", error);
          setIsLoading(false); // Set loading to false on error
          Swal.fire("Error!", "Submission failed.", "error");
        }
      );
  }

  // CSS styles for the button and hover effect
  const buttonStyles = {
    display: "flex",
    justifyContent: "flex-end",
    background: "#082a71",
    color: "#fff",
    borderRadius: "2rem",
    padding: "0.5rem 0.5rem",
    cursor: "pointer",
    transition: "background 0.3s", // Add a smooth transition for hover effect
  };

  const buttonHoverStyles = {
    backgroundColor: "#0062cc",
  };

  return (
    <div>
      <button
        style={{
          ...buttonStyles,
          ":hover": buttonHoverStyles, // Apply the hover effect
        }}
        onClick={sendMail}
      >
        Send Email
      </button>
      {isLoading && (
        <div className="loading-overlay">
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
    </div>
  );
}

export default EmailSender;
