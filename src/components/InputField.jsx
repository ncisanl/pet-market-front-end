const InputField = ({
  icon,
  value,
  name,
  type,
  placeholder,
  onChange,
  required,
}) => {
  return (
    <div className="input-register">
      {icon && <i className={icon}></i>}
      <input
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
