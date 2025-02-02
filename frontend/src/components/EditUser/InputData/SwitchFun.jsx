import '.././EditUser.css'
import { useState, useEffect } from "react"

const SwitchFun = ({...props}) => {

    return (
        <>
            {/* <p className="nameA">{'titulo'}</p> */}
            <label className="switch">
                <input type="checkbox" {...props} />
                {/* <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> */}
                <span className="slider"></span>
            </label>
        </>
    );
};

export default SwitchFun

