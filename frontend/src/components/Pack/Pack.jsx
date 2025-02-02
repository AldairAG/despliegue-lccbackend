import "./Pack.css"
import sombra from "../../Assets/Images/Baners_jpg/sombra.png"
import img1 from "../../Assets/Images/Logos/packs/builder.png"
import img2 from "../../Assets/Images/Logos/packs/bronze.png"
import img3 from "../../Assets/Images/Logos/packs/plata.png"
import img4 from "../../Assets/Images/Logos/packs/gold.png"
import img5 from "../../Assets/Images/Logos/packs/platinum.png"

const Pack = ({ porcent, op,openClose }) => {
    const images = [null, img1, img2, img3, img4, img5];
    const img = images[op] || null;

    return (
        <section class="CardPacks">
            <div className="imgPack">
                <img src={img} className="img1" alt="imgpack" />
                <img src={sombra} className="img2" alt="sombra" />
            </div>
            <div className="porcentaje">
                <p>Profit up to {porcent + "%"} monthly</p>
                <button onClick={openClose} className="boton1"><span class="button_top">Buy</span></button>
            </div>
        </section>
    )
}

export default Pack