import React, { useState, useEffect } from 'react';
import ControlSidebar from "./js/Sidebar";
import "./Style/Sidebar.css"
import SiderbarNav from "./SiderbarNav"

const Sidebar = ({max,toggleMenu}) => {
    return (
        <div>
            <div className={`barra-lateral ${max ? 'mini-barra-lateral' : 'max-barra-lateral'}`} >
                <div className={max ? 'headNav' : 'headNavMax'}>
                    <img alt="logo" className={max ? 'logoNav' : 'logoNavMax'} />
                </div>
                <SiderbarNav toggleMenu={toggleMenu}/>
            </div>
        </div>
    )
    /*<div className="menu" onClick={() => controlSidebar.openClose(miniBarraLateral, setMiniBarraLateral)}>{miniBarraLateral ? (<i className="bi bi-list"></i>) : (<i className="bi bi-x-lg"></i>)}
            </div>*/
}

export default Sidebar