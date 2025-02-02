import React from "react";
import "./PhoneInput.css";

const PhoneInput = ({ti, selectProps, inputProps}) => {

    return (
        <div className={"PhoneInput"}>
            <p className="textoM2">{ti}</p>
            <div className="phoneInputContainer">
                <select
                    className="ladaSelect"
                    {...selectProps}
                >
                    <option value="+52">+52 (MX)</option>
                    <option value="+1">+1 (US)</option>
                </select>
                <input
                    className="phoneNumberInput"
                    {...inputProps}
                />
            </div>
        </div>
    );
};

export default PhoneInput;

