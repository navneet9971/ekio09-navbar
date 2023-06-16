import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../interceptors/axios";

function BISPerviousData ({ onClose }) {
 
    const autofillBisData = localStorage.getItem('bisdata');
// console.log(localStorage.getItem('bisdata'))
    const history = useHistory();

    //BIS PERVIOUS DATA FETCH HERE ITS CODE ------------------------------------------
  const [bisformData, setBisformData] = useState({
    Types_of_company: "",
    Factory_name: "",
    Factory_address: "",
    Factory_contact_number: "",
    Factory_emailid: "",
    Factory_signing_person: "",
    Top_management_of_the_manufacturing_unit_name_1: "",
    Top_management_of_the_manufacturing_unit_designation_1: "",
    Top_management_of_the_manufacturing_unit_name_2: "",
    Top_management_of_the_manufacturing_unit_designation_2: "",
    Top_management_of_the_manufacturing_unit_name_3: "",
    Top_management_of_the_manufacturing_unit_designation_3: "",
    Top_management_of_the_manufacturing_unit_name_4: "",
    Top_management_of_the_manufacturing_unit_designation_4: "",
    Top_management_of_the_manufacturing_unit_name_5: "",
    Top_management_of_the_manufacturing_unit_designation_5: "",
    Who_is_signing: "",
    Technical_management_of_the_manufacturing_unit_name_1: "",
    Technical_management_of_the_manufacturing_unit_designation_1: "",
    Technical_management_of_the_manufacturing_unit_name_2: "",
    Technical_management_of_the_manufacturing_unit_designation_2: "",
    Technical_management_of_the_manufacturing_unit_name_3: "",
    Technical_management_of_the_manufacturing_unit_designation_3: "",
    Contact_person_of_the_manufacturing_unit_name_: "",
    Contact_person_of_the_manufacturing_unit_designation: "",
    Contact_person_of_the_manufacturing_unit_contact_number: "",
    Contact_person_of_the_manufacturing_unit_emailid: "",
    Brand_trademark: "",
    Brand_owned_by: "",
    Brand_registered: "",
    Brand_owner_company_name: "",
    Brand_owner_company_address: "",
    Name_of_the_AIR_company: "",
    Address_of_the_AIR_company: "",
    Top_management_of_the_AIR_company_name: "",
    Top_management_of_the_AIR_company_designation: "",
    Top_management_of_the_AIR_company_contact_number: "",
    Top_management_of_the_AIR_company_emailid: "",
    Authorized_signatory_name: "",
    Authorized_signatory_designation: "",
    Authorized_signatory_contact_number: "",
    Authorized_signatory_emailid: "",
    AIR_company_aadhar_card: "",
    AIR_company_pan_card: "",
    AIR_signing_person: "",
    AIR_company_condition: "",
  });

  const applicationId = localStorage.getItem("applicationId");

  useEffect(() => {
    if (autofillBisData) {
      const parsedData = JSON.parse(autofillBisData);
      setBisformData(parsedData);
    }
  }, [autofillBisData]);
  
  
  const handleSubmitBISauto = (event) => {
    event.preventDefault();

      const updatedBISformData = {
        Types_of_company: bisformData.Types_of_company,
        Factory_name: bisformData.Factory_name,
        Factory_address: bisformData.Factory_address,
        Factory_contact_number: bisformData.Factory_contact_number,
        Factory_emailid: bisformData.Factory_emailid,
        Factory_signing_person: bisformData.Factory_signing_person,
        Top_management_of_the_manufacturing_unit_name_1:
          bisformData.Top_management_of_the_manufacturing_unit_name_1,
        Top_management_of_the_manufacturing_unit_designation_1:
          bisformData.Top_management_of_the_manufacturing_unit_designation_1,
        Top_management_of_the_manufacturing_unit_name_2:
          bisformData.Top_management_of_the_manufacturing_unit_name_2,
        Top_management_of_the_manufacturing_unit_designation_2:
          bisformData.Top_management_of_the_manufacturing_unit_designation_2,
        Top_management_of_the_manufacturing_unit_name_3:
          bisformData.Top_management_of_the_manufacturing_unit_name_3,
        Top_management_of_the_manufacturing_unit_designation_3:
          bisformData.Top_management_of_the_manufacturing_unit_designation_3,
        Top_management_of_the_manufacturing_unit_name_4:
          bisformData.Top_management_of_the_manufacturing_unit_name_4,
        Top_management_of_the_manufacturing_unit_designation_4:
          bisformData.Top_management_of_the_manufacturing_unit_designation_4,
        Top_management_of_the_manufacturing_unit_name_5:
          bisformData.Top_management_of_the_manufacturing_unit_name_5,
        Top_management_of_the_manufacturing_unit_designation_5:
          bisformData.Top_management_of_the_manufacturing_unit_designation_5,
        Who_is_signing: bisformData.Who_is_signing,
        Technical_management_of_the_manufacturing_unit_name_1:
          bisformData.Technical_management_of_the_manufacturing_unit_name_1,
        Technical_management_of_the_manufacturing_unit_designation_1:
          bisformData.Technical_management_of_the_manufacturing_unit_designation_1,
        Technical_management_of_the_manufacturing_unit_name_2:
          bisformData.Technical_management_of_the_manufacturing_unit_name_2,
        Technical_management_of_the_manufacturing_unit_designation_2:
          bisformData.Technical_management_of_the_manufacturing_unit_designation_2,
        Technical_management_of_the_manufacturing_unit_name_3:
          bisformData.Technical_management_of_the_manufacturing_unit_name_3,
        Technical_management_of_the_manufacturing_unit_designation_3:
          bisformData.Technical_management_of_the_manufacturing_unit_designation_3,
        Contact_person_of_the_manufacturing_unit_name_:
          bisformData.Contact_person_of_the_manufacturing_unit_name_,
        Contact_person_of_the_manufacturing_unit_designation:
          bisformData.Contact_person_of_the_manufacturing_unit_designation,
        Contact_person_of_the_manufacturing_unit_contact_number:
          bisformData.Contact_person_of_the_manufacturing_unit_contact_number,
        Contact_person_of_the_manufacturing_unit_emailid:
          bisformData.Contact_person_of_the_manufacturing_unit_emailid,
        Brand_trademark: bisformData.Brand_trademark,
        Brand_owned_by: bisformData.Brand_owned_by,
        Brand_registered: bisformData.Brand_registered,
        Brand_owner_company_name: bisformData.Brand_owner_company_name,
        Brand_owner_company_address: bisformData.Brand_owner_company_address,
        Name_of_the_AIR_company: bisformData.Name_of_the_AIR_company,
        Address_of_the_AIR_company: bisformData.Address_of_the_AIR_company,
        Top_management_of_the_AIR_company_name:
          bisformData.Top_management_of_the_AIR_company_name,
        Top_management_of_the_AIR_company_designation:
          bisformData.Top_management_of_the_AIR_company_designation,
        Top_management_of_the_AIR_company_contact_number:
          bisformData.Top_management_of_the_AIR_company_contact_number,
        Top_management_of_the_AIR_company_emailid:
          bisformData.Top_management_of_the_AIR_company_emailid,
        Authorized_signatory_name: bisformData.Authorized_signatory_name,
        Authorized_signatory_designation:
          bisformData.Authorized_signatory_designation,
        Authorized_signatory_contact_number:
          bisformData.Authorized_signatory_contact_number,
        Authorized_signatory_emailid: bisformData.Authorized_signatory_emailid,
        AIR_company_aadhar_card: bisformData.AIR_company_aadhar_card,
        AIR_company_pan_card: bisformData.AIR_company_pan_card,
        AIR_signing_person: bisformData.AIR_signing_person,
        AIR_company_condition: bisformData.AIR_company_condition,
        compliance: localStorage.getItem("compliance_id"),
        request_for: "certification",
        application: applicationId,
      };
    
      setBisformData(updatedBISformData);
    

    console.log(updatedBISformData);
    axiosInstance
      .post("/application/compliance/", updatedBISformData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        Swal.fire({
          title: "Success",
          text:
            'Form submitted successfully. Please head over to the "Track Application" Page to upload documents and review progress ',
          icon: "success",
        }).then(() => {
          history.push('/navbar/review');
        })
        onClose(); // Close the popup after download is complete

        for (const [formName, formData] of Object.entries(data.data.forms)) {
          const file = new Blob([formData], { type: "text/plain" });
          const fileUrl = URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = fileUrl;
          link.download = `${formName}.txt`;
          link.click();
          URL.revokeObjectURL(fileUrl);
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error",
          text: "Failed to submit form",
          icon: "error",
        });
      });
  };

  const handleBISChange = (e) => {
    setBisformData({ ...bisformData, [e.target.name]: e.target.value });
  };



    return (

        <div style={{ height: "500px", overflow: "scroll" }}>
        <form onSubmit={handleSubmitBISauto}>
          <h1 className="h802"> Certification Process </h1>
          <label className="st8012">
            Manufacture:
            <select
              className="st804"
              name="Types_of_company"
              value={bisformData.Types_of_company}
              onChange={handleBISChange}
            >
              <option value="Foreign">Foreign</option>
              <option value="Indian">Indian</option>
            </select>
          </label>

          <label className="st8012">
            Factory Name:
            <input
              className="st805"
              type="text"
              name="Factory_name"
              value={bisformData.Factory_name}
              onChange={handleBISChange}
            />
          </label>

          <label className="st8012">
            Factory Address (complete address):
            <input
              className="st805"
              type="text"
              name="Factory_address"
              value={bisformData.Factory_address}
              onChange={handleBISChange}
            />
          </label>

          <label className="st8012">
            Contact Number:
            <input
              className="st805"
              name="Factory_contact_number"
              value={bisformData.Factory_contact_number}
              onChange={handleBISChange}
              type="tel"
              pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
              title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
              required // Make the field required to ensure a value is entered
            />
          </label>

          <label className="st8012">
            Email id:
            <input
              className="st805"
              type="text"
              name="Factory_emailid"
              value={bisformData.Factory_emailid}
              onChange={(event) => {
                const inputValue = event.target.value;
                const isValidEmail =
                  inputValue.includes("@") && inputValue.includes(".");
                handleBISChange(event); // Call the original handleChange function if needed
                const errorElement = document.getElementById(
                  "applicant-email-error4"
                );

                if (isValidEmail) {
                  errorElement.textContent = "";
                } else {
                  errorElement.textContent =
                    "Please enter a valid email address. Use @ and .xyz";
                }
              }}
            />
          </label>
          <span id="applicant-email-error4" style={{ color: "red" }}></span>

          <select
            className="bisdrop"
            name="Factory_signing_person"
            value={bisformData.Factory_signing_person}
            onChange={handleBISChange}
          >
            <option value="Contact">
              SIGNING PERSON WILL BE CONTACT PERSON
            </option>
            <option value="Top">
              SIGNING PERSON WILL BE FROM TOP MANAGEMENT{" "}
            </option>
          </select>

          {/* ----------------Prvious Top Management code Here---------------------- */}

          <h3 className="topmang">Top Management (Fill atleast Two)</h3>
          <div className="row">
            <div className="name-row">
              <div className="names">
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="1)Name"
                    name="Top_management_of_the_manufacturing_unit_name_1"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_name_1
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="2)Name"
                    name="Top_management_of_the_manufacturing_unit_name_2"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_name_2
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="3)Name"
                    name="Top_management_of_the_manufacturing_unit_name_3"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_name_3
                    }
                    onChange={handleBISChange}
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="4)Name"
                    name="Top_management_of_the_manufacturing_unit_name_4"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_name_4
                    }
                    onChange={handleBISChange}
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="5)Name"
                    name="Top_management_of_the_manufacturing_unit_name_5"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_name_5
                    }
                    onChange={handleBISChange}
                  />
                </label>
              </div>

              <div className="designations">
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="1)Designation"
                    name="Top_management_of_the_manufacturing_unit_designation_1"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_designation_1
                    }
                    onChange={handleBISChange}
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="2)Designation"
                    name="Top_management_of_the_manufacturing_unit_designation_2"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_designation_2
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="3)Designation"
                    name="Top_management_of_the_manufacturing_unit_designation_3"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_designation_3
                    }
                    onChange={handleBISChange}
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="4)Designation"
                    name="Top_management_of_the_manufacturing_unit_designation_4"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_designation_4
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="5)Designation"
                    name="Top_management_of_the_manufacturing_unit_designation_5"
                    value={
                      bisformData.Top_management_of_the_manufacturing_unit_designation_5
                    }
                    onChange={handleBISChange}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* DropDown of Which person is Signin  */} 

 {bisformData.Factory_signing_person === "Top" && (
    <div>
          {/* Render additional popup or options for signing person from top management */}
          <select className="bisdrop" name="Who_is_signing"
   value={bisformData.Who_is_signing}
   onChange={handleBISChange}>

        <option value="">Choose Signing Person from Top Management</option>
        <option value="1">Name 1</option>
        <option value="2">Name 2</option>
        <option value="3">Name 3</option>
        <option value="4">Name 4</option>
        <option value="5">Name 5</option>
      </select>
    </div>
  )}

          {/*----------Pervious Technical Management Input code Here---------------- */}

          <h3 className="techni">
            Technical Management (Fill atleast Two)
          </h3>
          <div className="row">
            <div className="name-row">
              <div className="names">
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="1)Name"
                    name="Technical_management_of_the_manufacturing_unit_name_1"
                    value={
                      bisformData.Technical_management_of_the_manufacturing_unit_name_1
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="2)Name"
                    name="Technical_management_of_the_manufacturing_unit_name_2"
                    value={
                      bisformData.Technical_management_of_the_manufacturing_unit_name_2
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="3)Name"
                    name="Technical_management_of_the_manufacturing_unit_name_3"
                    value={
                      bisformData.Technical_management_of_the_manufacturing_unit_name_3
                    }
                    onChange={handleBISChange}
                  />
                </label>
              </div>

              <div className="designations">
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="1)Designation"
                    name="Technical_management_of_the_manufacturing_unit_designation_1"
                    value={
                      bisformData.Technical_management_of_the_manufacturing_unit_designation_1
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="2)Designation"
                    name="Technical_management_of_the_manufacturing_unit_designation_2"
                    value={
                      bisformData.Technical_management_of_the_manufacturing_unit_designation_2
                    }
                    onChange={handleBISChange}
                  />
                </label>
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="3)Designation"
                    name="Technical_management_of_the_manufacturing_unit_designation_3"
                    value={
                      bisformData.Technical_management_of_the_manufacturing_unit_designation_3
                    }
                    onChange={handleBISChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <h3 className="techni">Contact Person Details</h3>
          <div className="row">
            <div className="name-row">
              <div className="names">
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Name"
                    name="Contact_person_of_the_manufacturing_unit_name_"
                    value={
                      bisformData.Contact_person_of_the_manufacturing_unit_name_
                    }
                    onChange={handleBISChange}
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Designation"
                    name="Contact_person_of_the_manufacturing_unit_designation"
                    value={
                      bisformData.Contact_person_of_the_manufacturing_unit_designation
                    }
                    onChange={handleBISChange}
                  />
                </label>
              </div>

              <div className="designations">
                <label className="st8012">
                  <input
                    className="st805"
                    placeholder="Contact Number"
                    name="Contact_person_of_the_manufacturing_unit_contact_number"
                    value={
                      bisformData.Contact_person_of_the_manufacturing_unit_contact_number
                    }
                    onChange={handleBISChange}
                    type="tel"
                    pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                    required // Make the field required to ensure a value is entered
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Email Id"
                    name="Contact_person_of_the_manufacturing_unit_emailid"
                    value={
                      bisformData.Contact_person_of_the_manufacturing_unit_emailid
                    }
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const isValidEmail =
                        inputValue.includes("@") &&
                        inputValue.includes(".");
                      handleBISChange(event); // Call the original handleChange function if needed
                      const errorElement = document.getElementById(
                        "applicant-email-error6"
                      );

                      if (isValidEmail) {
                        errorElement.textContent = "";
                      } else {
                        errorElement.textContent =
                          "Please enter a valid email address. Use @ and .xyz";
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <span id="applicant-email-error6" style={{ color: "red" }}></span>

          <h1 className="h802">Brand</h1>

          <label className="st8012">
            Trademark:
            <input
              className="st805"
              type="text"
              name="Brand_trademark"
              value={bisformData.Brand_trademark}
              onChange={handleBISChange}
            />
          </label>

          <label className="st8012">
            Owned by self or others:
            <select
              className="st804"
              name="Brand_owned_by"
              value={bisformData.Brand_owned_by}
              onChange={handleBISChange}
            >
              <option value="self">Self</option>
              <option value="others">Others</option>
            </select>
          </label>

          <label className="st8012">
            Is the Brand Name/Trade Mark Registered?:
            <select
              className="st804"
              name="Brand_registered"
              value={bisformData.Brand_registered}
              onChange={handleBISChange}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label className="st8012">
            Brand Owner Company Name:
            <input
              className="st805"
              type="text"
              name="Brand_owner_company_name"
              value={bisformData.Brand_owner_company_name}
              onChange={handleBISChange}
            />
          </label>
          <label className="st8012">
            Brand Owner Company Address:
            <input
              className="st805"
              type="text"
              name="Brand_owner_company_address"
              value={bisformData.Brand_owner_company_address}
              onChange={handleBISChange}
            />
          </label>

          <h1 className="h802">AIR </h1>
          <label className="st8012">
            AIR company Name:
            <input
              className="st805"
              type="text"
              name="Name_of_the_AIR_company"
              value={bisformData.Name_of_the_AIR_company}
              onChange={handleBISChange}
            />
          </label>
          <label className="st8012">
            AIR company Address:
            <input
              className="st805"
              type="text"
              name="Address_of_the_AIR_company"
              value={bisformData.Address_of_the_AIR_company}
              onChange={handleBISChange}
            />
          </label>

          {/*----------------- Top Mangement Box here ------------------------- */}
          <h3 className="techni">Top management AIR </h3>
          <div className="row">
            <div className="name-row">
              <div className="names">
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Name"
                    name="Top_management_of_the_AIR_company_name"
                    value={
                      bisformData.Top_management_of_the_AIR_company_name
                    }
                    onChange={handleBISChange}
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Designation"
                    name="Top_management_of_the_AIR_company_designation"
                    value={
                      bisformData.Top_management_of_the_AIR_company_designation
                    }
                    onChange={handleBISChange}
                  />
                </label>
              </div>

              <div className="designations">
                <label className="st8012">
                  <input
                    className="st805"
                    placeholder="Contact Number"
                    name="Top_management_of_the_AIR_company_contact_number"
                    value={
                      bisformData.Top_management_of_the_AIR_company_contact_number
                    }
                    onChange={handleBISChange}
                    type="tel"
                    pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                    required // Make the field required to ensure a value is entered
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Email Id"
                    name="Top_management_of_the_AIR_company_emailid"
                    value={
                      bisformData.Top_management_of_the_AIR_company_emailid
                    }
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const isValidEmail =
                        inputValue.includes("@") &&
                        inputValue.includes(".");
                      handleBISChange(event); // Call the original handleChange function if needed
                      const errorElement = document.getElementById(
                        "applicant-email-error7"
                      );

                      if (isValidEmail) {
                        errorElement.textContent = "";
                      } else {
                        errorElement.textContent =
                          "Please enter a valid email address. Use @ and .xyz";
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <span id="applicant-email-error7" style={{ color: "red" }}></span>

          {/*----------------Pervious Name of authorized Signatory -----------------------------*/}

          <h3 className="techni">Name of authorized Signatory</h3>
          <div className="row">
            <div className="name-row">
              <div className="names">
                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Name"
                    name="Authorized_signatory_name"
                    value={bisformData.Authorized_signatory_name}
                    onChange={handleBISChange}
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Designation"
                    name="Authorized_signatory_designation"
                    value={bisformData.Authorized_signatory_designation}
                    onChange={handleBISChange}
                  />
                </label>
              </div>

              <div className="designations">
                <label className="st8012">
                  <input
                    className="st805"
                    placeholder="Contact Number"
                    name="Authorized_signatory_contact_number"
                    value={bisformData.Authorized_signatory_contact_number}
                    onChange={handleBISChange}
                    type="tel"
                    pattern="[+0-9]{1,13}" // Specify the pattern for a 10-digit number
                    title="Please enter a 10-digit number" // Displayed as an error message if the pattern doesn't match
                    required // Make the field required to ensure a value is entered
                  />
                </label>

                <label className="st8012">
                  <input
                    className="st805"
                    type="text"
                    placeholder="Email Id"
                    name="Authorized_signatory_emailid"
                    value={bisformData.Authorized_signatory_emailid}
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const isValidEmail =
                        inputValue.includes("@") &&
                        inputValue.includes(".");
                      handleBISChange(event); // Call the original handleChange function if needed
                      const errorElement = document.getElementById(
                        "applicant-email-error8"
                      );

                      if (isValidEmail) {
                        errorElement.textContent = "";
                      } else {
                        errorElement.textContent =
                          "Please enter a valid email address. Use @ and .xyz";
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
          <span id="applicant-email-error8" style={{ color: "red" }}></span>

          <label className="st8012">
            Aadhar Card:
            <input
              className="st805"
              type="text"
              name="AIR_company_aadhar_card"
              value={bisformData.AIR_company_aadhar_card}
              onChange={handleBISChange}
            />
          </label>
          <label className="st8012">
            PAN Card:
            <input
              className="st805"
              type="text"
              name="AIR_company_pan_card"
              value={bisformData.AIR_company_pan_card}
              onChange={handleBISChange}
            />
          </label>

          <select
            className="bisdrop"
            name="AIR_signing_person"
            value={bisformData.AIR_signing_person}
            onChange={handleBISChange}
          >
            <option value="Top">
              SIGNING PERSON WILL BE FROM TOP MANAGEMENT{" "}
            </option>
            <option value="contact">
              SIGNING PERSON WILL BE someone from the company{" "}
            </option>
          </select>

          <div>
            <select
              className="bisdrop"
              name="AIR_company_condition"
              value={bisformData.AIR_company_condition}
              onChange={handleBISChange}
            >
              <option value="1">
                If the AIR company is the sister company of the manufacturer
                and have office in India{" "}
              </option>
              <option value="2">
                If the AIR company is the Brandowner and have office in
                India{" "}
              </option>
              <option value="3">
                If the AIR company is the Brandowner{" "}
              </option>
            </select>
          </div>

          <button className="btn808" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
}

export default BISPerviousData;