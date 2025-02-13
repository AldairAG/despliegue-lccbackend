import { useRef, useState } from "react"
import "./CardProduct.css"
import MensajeAlerta from "../../components/AlertMsg/MensajeAlerta"
import { useEcomerce } from "../../hooks/useEcomerce"

const CardProduct = ({product}) => {
    const {carrito,addToCart}=useEcomerce()
    const [visible, setVisible] = useState(false)
    const [cantidad, setCantidad] = useState(1)
    const alertRef=useRef()

    const openClose = () => {
        setVisible(!visible)
    }

    const handleAddCart = () => {
        const producto={
            name:product.nombre,
            precio:Number(product.precio),
            cantidad:cantidad
        }

        addToCart(producto)
        alertRef.current.showAlert("Product added to cart",true)
    }

    return (
        <section>
            <MensajeAlerta ref={alertRef} />
            {visible && (
                <div className="detalles">
                    <div className="ov"></div>
                    <div className="content-ec">
                        <div className="sec4-pec"><button onClick={openClose}><i class="bi bi-x"></i></button></div>
                        <div className="sec5-pec"><img src={product.img} alt="producto" /></div>
                        <div className="sec6-pec">
                            <p className="p1-pec">{product.nombre}</p>
                            <p>{product.desc}</p>
                            <p className="p2-pec">Benefits</p>
                            <ul className="beneficios">
                                <li>{product.benefits.b1}</li>
                                <li>{product.benefits.b2}</li>
                                <li>{product.benefits.b3}</li>
                                <li>{product.benefits.b4}</li>
                            </ul>
                            <p className="p3-pec">quantity:</p>
                            <input type="Number" value={cantidad} onChange={(e) => setCantidad(Math.abs(Number(e.target.value)))} placeholder={1} />
                            <button onClick={handleAddCart}>Add to cart</button>
                        </div>
                    </div>
                </div>
            )}
            <section className={visible ? "CardProduct2" : "CardProduct"}>
                <div className="sec0-pec"><img src={product.img} alt="producto" /></div>
                <div className="sec1-pec"><p>{product.nombre}</p></div>
                <div className="sec2-pec"><p>{product.desc}</p></div>
                <div className="sec3-pec">
                    <p>{product.precio} USDT</p>
                    <button onClick={openClose}>Buy now</button>
                </div>
            </section>
        </section>
    )
}
export default CardProduct