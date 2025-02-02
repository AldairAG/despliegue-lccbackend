import { useState } from "react";

const InputData=(props)=>{
    const handleChange = (event) => {
        props.setValue(event.target.value);
    };
    
    return (
        <>
            <p className="nameA">{props.titulo}</p>
            <input type="text" className="valor" value={props.value} onChange={handleChange}/>
        </>
    );
}
export default InputData
