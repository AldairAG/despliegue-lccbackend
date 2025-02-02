import React, { useState, useEffect } from 'react';
import Aviso from '../../../components/Aviso/Aviso';
import "./Packs.css"
import Pack from "../../../components/Pack/Pack";
import QrComponent from "../../../components/QrComponent/QrComponent"
import SelectorPago from "../../../components/QrComponent/SelectorPago";
import { useRef } from 'react';


const Packs = () => {
    const selectorRef = useRef()

    const openClose = (op) => {
        selectorRef.current.show(op)
    };

    return (
        <section className='contenido Packs'>
            {/* <QrComponent visible={visible} openClose={openClose} op={selectedOp}/> */}
            <SelectorPago ref={selectorRef}/>
            <div className="titulos sec0-pa">
                <i className="bi bi-boxes"></i>
                <span>Starter packs</span>
            </div>
            <div className="sec1-pa centrado"><Pack porcent={5} op={1} openClose={() => openClose(1)} /></div>
            <div className="sec2-pa centrado"><Pack porcent={6} op={2} openClose={() => openClose(2)} /></div>
            <div className="sec3-pa centrado"><Pack porcent={7} op={3} openClose={() => openClose(3)} /></div>
            <div className="sec4-pa centrado"><Pack porcent={8} op={4} openClose={() => openClose(4)} /></div>
            <div className="sec5-pa centrado"><Pack porcent={9} op={5} openClose={() => openClose(5)} /></div>
        </section>
    )
}

export default Packs