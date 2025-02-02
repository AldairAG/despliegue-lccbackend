import { useState, useEffect } from "react";
import "./Anuncio2.css"
const Anuncio2 = (props) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (props.val === "") {
            setVisible(false);
        } else {
            setVisible(false)
        }
    }, [props.val]);

    return (
        visible && (
            <section className="Anuncio2">
                <div className="overlay-av"></div>
                <div className="anuncio2-content">
                    
                </div>
            </section>
        )
    )
}
export default Anuncio2