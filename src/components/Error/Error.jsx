import React from "react";

const ErrorMessage = ({ title, message }) => {
    return (
        <div>
            <div>{title}</div>
            <div>{message}</div>
        </div>
    );
};

export default ErrorMessage;
