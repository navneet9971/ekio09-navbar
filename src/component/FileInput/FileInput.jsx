export default function FileInput(props) {
  return (
    <label className={props.labelClass}>
      {props.labelText}
      <input
        classname={props.inputClass}
        type="file"
        accept=".pdf"
        name={props.name}
        onChange={props.onChange}
        required={props.required ? props.required : true}
      />
    </label>
  );
}
