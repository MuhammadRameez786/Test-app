import React from "react";
import Style from "../components/Button/Button.module.css"


const Button2 = ({ btnName, handleClick, icon, classStyle }) => {
    const handleButtonClick = () => {
        if (handleClick) {
            window.open(handleClick, '_blank'); // Open the URL in a new tab or window
        }
    };

    return (
        <div className={Style.box}>
            <button
                className={`${Style.button} ${classStyle}`}
                onClick={handleButtonClick}
            >
                {icon} {btnName}
            </button>
        </div>
    );
};

export default Button2;