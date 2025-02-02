import { useState } from "react";
import "./Anuncio.css"
import img1 from "../../Assets/Images/Logos/Logo_2.png"
const Anuncio = () => {
    const [visible, setVisible] = useState(true);

    const handleClick=()=>{
        setVisible(false)
    }

    return (
        visible && (
            <section className="Anuncio">
                <div className="overlay-av"></div>
                <div className="anuncio-content">
                    <div className="sec0-anu">
                        <img src={img1} alt="" />
                    </div>
                    <div className="sec1-anu">
                        <p>
                            Dear Clients <span>Legal Capital Corp LLC</span>, Our support and systems team is always on
                            Continuous improvement for your virtual office experience.
                            New tools, support, and more, adding more features and <span>elite experiences</span>,
                            We are pleased to announce <span>great Surprises and features</span>.
                        </p>
                    </div>
                    <div className="sec2-anu">
                        <p>In the next few hours you will be able to see our commitment to improve and have control of your Finances.</p>
                    </div>
                    <div className="sec3-anu">
                        <p>Atte. Legalcapital Corp LLC</p>
                        <p>support@legalcapital-corp.com</p>
                    </div>
                    <div className="sec4-anu">
                        <button onClick={handleClick}>Close</button>
                    </div>
                </div>
            </section>
        )
    )
}
export default Anuncio