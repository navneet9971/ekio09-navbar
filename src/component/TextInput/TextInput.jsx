import React from "react";
export default function TextInput(props) {
//   const allElements = () => {
//     <>
//       <label className="st8012">
//         Company Name:
//         <input
//           className="st805"
//           type="text"
//           value={applicantCompanyName}
//           onChange={(event) => setApplicantCompanyName(event.target.value)}
//           required
//         />
//       </label>
//       <label className="st8012">
//         Company Address:
//         <input
//           className="st805"
//           type="text"
//           value={applicantCompanyAddress}
//           onChange={(event) => setApplicantCompanyAddress(event.target.value)}
//           required
//         />
//       </label>
//       <label className="st8012">
//         Director Name:
//         <input
//           className="st805"
//           type="text"
//           value={applicantDirectorName}
//           onChange={(event) => setApplicantDirectorName(event.target.value)}
//           required
//         />
//       </label>
//       <label className="st8012">
//         Contact Number:
//         <input
//           className="st805"
//           type="number"
//           value={applicantContactNumber}
//           onChange={(event) => setApplicantContactNumber(event.target.value)}
//           required
//         />
//       </label>
//       <label className="st8012">
//         Email ID:
//         <input
//           className="st805"
//           type="text"
//           value={applicantEmailID}
//           onChange={(event) => setApplicantEmailID(event.target.value)}
//           required
//         />
//       </label>
//       <label className="st8012">
//         Authorised Signatory Name:
//         <input
//           className="st805"
//           type="text"
//           value={applicantAuthorisedSignatoryName}
//           onChange={(event) =>
//             setApplicantAuthorisedSignatoryName(event.target.value)
//           }
//           required
//         />
//       </label>
//       <label className="st8012">
//         Authorised Signatory Designation:
//         <input
//           className="st805"
//           type="text"
//           value={applicantAuthorisedSignatoryDesignation}
//           onChange={(event) =>
//             setApplicantAuthorisedSignatoryDesignation(event.target.value)
//           }
//           required
//         />
//       </label>
//       <label className="st8012">
//         Contact Number:
//         <input
//           className="st805"
//           type="number"
//           value={applicantContactNumber1}
//           onChange={(event) => setApplicantContactNumber1(event.target.value)}
//           required
//         />
//       </label>
//       <label className="st8012">
//         Email ID:
//         <input
//           className="st805"
//           type="text"
//           value={applicantEmailID1}
//           onChange={(event) => setApplicantEmailID1(event.target.value)}
//           required
//         />
//       </label>
//       <label className="st8012">
//         Name of manufacturing factory:
//         <input
//           className="st805"
//           type="text"
//           value={applicantNameofmanufacturingfactory}
//           onChange={(event) =>
//             setApplicantNameofmanufacturingfactory(event.target.value)
//           }
//           required
//         />
//       </label>
//       <label className="st8012">
//         Address of factory:
//         <input
//           className="st805"
//           type="text"
//           value={applicantAddressoffactory}
//           onChange={(event) => setApplicantAddressoffactory(event.target.value)}
//           required
//         />
//       </label>
//     </>;
//   };

  return (
    <>
      <label className={props.labelClass}>
        {/* Indian OEM/Foreign Manufacture: */}
        {props.labelText}
        <input
          className={props.inputClass}
          type="text"
          name={props.name}
          value={props.inputTextValue}
          onChange={props.onChange}
          required={props.required?props.required:true}
        />
      </label>
    </>
  );
};
