import "./InputField.css";

const InputField = ({ type, value, onChange, placeholder }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="inputField"
      />
    );
  };
  
  export default InputField;