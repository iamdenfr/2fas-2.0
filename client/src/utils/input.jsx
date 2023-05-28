import React from "react";
import "./input.css";

const Input = (props) => {
  const handleInputChange = (e) => {
    const value = e.target.value;
    props.onChange(value);
  };

  return (
    <input
      onChange={handleInputChange}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
    />
  );
};

export default Input;
