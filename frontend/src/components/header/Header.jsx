import { useState } from 'react';
import "./Header.css"
import LogoutButton from '../LogoutButton/LogoutButton';

const Header = ({toggleMenu}) => {
    const [miniBarraLateral, setMiniBarraLateral] = useState(true);

    const handleClick = (event) => {
        event.preventDefault();
        toggleMenu()
        setMiniBarraLateral(!miniBarraLateral)
    };

    return (
        <section className='headerSec'>
            <div className="sech1">
                <button className="btnMenu" type='button' onClick={(e) => handleClick(e)}>
                    <i class="bi bi-list"></i>
                </button>
            </div>

            <div className="sech2"></div>
            <div className="sech3"></div>
            <div className="sech4"><LogoutButton /></div>

        </section>

    )
    //<i className={miniBarraLateral ? "bi bi-arrow-bar-right" : "bi bi-arrow-bar-left"}/>
}

export default Header