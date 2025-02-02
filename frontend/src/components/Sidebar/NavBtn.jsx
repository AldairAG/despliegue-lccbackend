import React from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./Style/Sidebar.css"

const NavBtn = (props) => {
    if (!props.lk || props.lk.trim() === "") {
        return (
            <div className="opcionBoton2">
                <i className={props.ic}></i>
                <span>{props.sp}</span>
            </div>
        );
    }

    return (
        <Link to={props.lk}>
            <i className={props.ic}></i>
            <span>{props.sp}</span>
        </Link>
    );
};


export default NavBtn