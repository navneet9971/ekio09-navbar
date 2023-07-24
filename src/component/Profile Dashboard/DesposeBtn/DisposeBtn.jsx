import React from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";


function Disposebtn() {
 
  const ProductName = localStorage.getItem("productName");
//   const user_id = localStorage.getItem("user_id");
   const userEmail = localStorage.getItem("cortEmail")  //Change by the Lab Name after get the apis

   console.log(userEmail);
   console.log(ProductName);

  const handleSubmit = async () => {
    // Simulating success or failure
    const isSuccess = true; // Change this based on your logic
  
    if (isSuccess) {
      // Send email using emailjs
      const templateParams = {
        // to_email: ["EikompRequestQuote@gmail.com"], // Update with the email addresses
        subject: "DisPose Product By Lab",
        to_name: `${userEmail}`,
        lab: `${ProductName}`,
        message: `Product Names: ${ProductName} 
        \nLab Name: ${ProductName}
        \nLab Email: ${userEmail}
        \nContact Number: ${userEmail}`,
  };
  
      emailjs.init("eU82OG6sIG2dymHkz"); // Replace "YOUR_PUBLIC_KEY" with your actual Public Key
  
      try {
        const response = await emailjs.send(
          "service_n5zb14o",
          "template_ds3xye8",
          templateParams
        );
        console.log("Email sent successfully!", response);
        Swal.fire("Success!", "Submission was successful.", "success");
      } catch (error) {
        console.error("Error sending email:", error);
        Swal.fire("Error!", "Submission failed.", "error");
      }
    } else {
      Swal.fire("Error!", "Submission failed.", "error");
    }

    // Perform any other action with the data
  };
  

  return (
    <>
      <button
        style={{
          backgroundColor: "#082a71",
          color: "#fff",
          border: "none",
          borderRadius: "34px",
          padding: "10px 20px",
          fontSize: "13px",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        //   marginTop: "20px",
        }}
        onClick={handleSubmit}
      >
        Dispose
      </button>
    </>
  );
}

export default Disposebtn;
