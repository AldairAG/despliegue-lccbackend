import React, { useState, useEffect } from 'react';
import "./MainDiv.css"
import CardUser from '../../../components/CardUser/CardUser.jsx';
import CopiLink from "../../../components/CopiLink/CopyLink.jsx"
import CardData from "../../../components/CardData/CardData.jsx"
import CardPack from '../../../components/CardPack/CardPack.jsx';
import InteresCompuesto from "../../../components/InteresCompuesto/InteresCompuesto.jsx"
import { useUser } from "../../../hooks/useUser.js";

const Home = () => {
    const { userLogged, loading, tryLogin,changeLoading } = useUser();

    useEffect(() => {
            fetchData()
    }, []);

    const fetchData = async () => {
        const storedUser = localStorage.getItem("userState");
        if (storedUser) {
            //const local=JSON.parse(storedUser)
            await tryLogin()
            changeLoading(false)
        }
    }

    return (
        <div className="seccion-main">
            {loading ? (
                <div class="spinner"></div>
            ) : (
                <section className='dashboard'>
                    <div className="sec0">|
                        <i className="bi bi-bank"></i>
                        <span>DASHBOARD</span>
                    </div>
                    <div className="item-grid sec1"><CardData dato={(userLogged?.wallet.ganancia_total || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="TOTAL EARNINGS" /></div>
                    <div className="item-grid sec2"><CardData dato={(userLogged?.wallet.retiro_total || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="TOTAL WITHDRAWALS" /></div>
                    <div className="item-grid sec3"><CardPack dato={userLogged?.wallet.staterpack || 0} /></div>
                    <div className="item-grid sec5"><CardData dato={(userLogged?.wallet.wallet_com || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="COMMISSION WALLET" /></div>
                    <div className="item-grid sec4"><CardData dato={(userLogged?.wallet.wallet_div || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="DIVIDEND WALLET" /></div>
                    <div className="item-grid sec6"><CardData dato={(userLogged?.wallet.bonos.rango_res || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="RESIDUAL RANK" /></div>
                    <div className="item-grid sec7"><CardData dato={(userLogged?.wallet.bonos.ref_direct || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="DIRECT REFERRAL BONUS" /></div>
                    <div className="item-grid sec8"><CardData dato={(userLogged?.wallet.bonos.membresia_mensual || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="RESIDUAL INCOME FEES" /></div>
                    <div className="item-grid sec9"><CardData dato={(userLogged?.wallet.bonos.matching || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="MATCHING BONUS" /></div>
                    <div className="item-grid sec10"><CardData dato={(userLogged?.wallet.bonos.fast_track || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} type={false} titulo="FASTRACK BONUS" /></div>
                    <div className='item-grid sec11'><InteresCompuesto /></div>
                    <div className="item-grid sec12"><CopiLink /></div>
                    {/* <div className="item-grid sec13"><img alt="promo" /></div> */}
                    <div className="item-grid sec14"><CardUser /></div>
                </section>
            )}
        </div>
    )
}

export default Home;