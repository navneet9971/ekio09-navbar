import FileInput from "../FileInput/FileInput";
import TextInput from "../TextInput/TextInput";

export default function FormSection({ heading, items, input }) {
  return (
    <>
    <h802>{heading}</h802>
      {items.map(({ key, label, name }) => (
        <>
          {input === "text" ? (
            <TextInput
              labelClass="st8012"
              labelText={label}
              inputClass="st805"
              name={name}
            />
          ) : (
            <FileInput
              labelClass="st8012"
              labelText={label}
              inputClass="st805"
            />
          )}
        </>
      ))}
    </>
  );
}
