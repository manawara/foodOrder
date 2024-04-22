import React from "react";
import "./input.scss";

const Input = ({ label, id, props }) => {
    return (
        <div className="input">
            <label htmlFor={id}>{label}</label>
            <input id={id} name={id} {...props} />
        </div>
    );
};

export default Input;
