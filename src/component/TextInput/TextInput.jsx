import React from "react";
export default function TextInput(props) {
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
