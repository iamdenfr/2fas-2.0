import React from "react";
import "./input.css";

const Input = (props) => {
    return (
        <input onChange={props.onChange} type={props.type} value={props.value} placeholder={props.placeholder} />
    )
};

export default Input;
