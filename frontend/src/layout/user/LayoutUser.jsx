import React, { useState } from "react";
import {
    Home, Dividendos, Red, MyRed, Ecomerce, Support, UserPerfil, Retiros, Tools, PagarFacturas,
    TransferenciasInternas, DeudaDetails, Packs
} from "../../pages/user/index.js";
import { Route, Switch } from 'react-router-dom';
import Sidebar from "../../components/Sidebar/Sidebar.jsx"
import Aviso from '../../components/Aviso/Aviso.jsx';
import Header from "../../components/header/Header.jsx";
import Anuncio from '../../components/Anuncio/Anuncio.jsx'
import { ROUTES_USER } from "../../constants/routes.js";
import "./LayoutUser.css"


const LayoutUser = () => {
    const [miniBarraLateral, setMiniBarraLateral] = useState(true);

    const toggleMenu = () => {
        setMiniBarraLateral(!miniBarraLateral)
    };
    const closeSiderBar = () => {
        setMiniBarraLateral(true)
    };

    return (
        <div className="layout">
            {/* <Anuncio /> */}
            <div className={miniBarraLateral ? "containDash" : "containDash"}>
                <div className={miniBarraLateral ? "sidebar" : "sidebar2"}>
                    <Sidebar max={miniBarraLateral} toggleMenu={closeSiderBar} />
                </div>
                <div className="cabeza"><Header toggleMenu={toggleMenu} /></div>
                <div className="container">
                    <Aviso />
                    <div className="contentSeccion">
                        <Switch>
                            <Route path={ROUTES_USER.HOME} component={Home} />
                            <Route path={ROUTES_USER.PACKS} component={Packs} />
                            <Route path={ROUTES_USER.BENEFITS} component={Dividendos} />
                            <Route path={ROUTES_USER.MY_NET_GEN} component={Red} />
                            <Route path={ROUTES_USER.MY_NET} component={MyRed} />
                            <Route path={ROUTES_USER.WITHDRAWALS} component={Retiros} />
                            <Route path={ROUTES_USER.INTERNAL_TRANSFERS} component={TransferenciasInternas} />
                            <Route path={ROUTES_USER.BILL_PAYMENT} component={PagarFacturas} />
                            <Route path={ROUTES_USER.ECOMERCE} component={Ecomerce} />
                            <Route path={ROUTES_USER.CORPORATIVE_CREDIT} component={DeudaDetails} />
                            <Route path={ROUTES_USER.SUPPORT} component={Support} />
                            <Route path={ROUTES_USER.PROFILE} component={UserPerfil} />
                            <Route path={ROUTES_USER.TOOLS} component={Tools} />
                        </Switch>
                    </div>
                </div>
                <div className='footer'><p>© 2024 Legal Capital Corp.</p></div>
            </div>
        </div>
    )

}
export default LayoutUser;