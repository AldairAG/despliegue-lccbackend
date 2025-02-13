import { useState } from "react"
import "./Cart.css"
import QR from "../QR/QR";
import { useEcomerce } from "../../hooks/useEcomerce";
import { useUser } from "../../hooks/useUser";

const Cart = () => {
    const [visible, setVisible] = useState(false)
    const [opcion, setOpcion] = useState(1)
    const { carrito, deleteProduct } = useEcomerce()
    const { userLogged } = useUser()

    const openClose = () => {
        setVisible(!visible)
    }


    const eliminarProducto = async (name) => {
        deleteProduct(name)
    }

    return (
        <section className="Cart-ec">
            <button className="cartbtn" onClick={openClose}><i class="bi bi-cart-fill"></i></button>
            {visible && (
                <section className="cart-modal-ec">
                    <div className="overlay-ec">
                    </div>
                    <div className="contenido-cart">
                        <div className="sec0-ecc"><button onClick={openClose}><i class="bi bi-x"></i></button></div>
                        <div className="sec1-ecc"><p>Shopping cart</p></div>
                        <div className="sec2-ecc">
                            {carrito.products && carrito.products.length > 0 ? (
                                carrito.products.map((item, index) => (
                                    <div className="s21-ecc">
                                        <div className="item-ecc">
                                            <p>{item.name}</p>
                                            <span>{item.precio} USDT x {item.cantidad}</span>
                                        </div>
                                        <button onClick={() => eliminarProducto(item.name)}><i class="bi bi-x"></i></button>
                                    </div>
                                ))) : (
                                <p>You have no added products</p>
                            )}
                        </div>
                        <div className="sec3-ecc"><p>Subtotal: </p><p>{carrito.total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p></div>
                        <div className="sec4-ecc"><p>Shipping: </p><p>{carrito.envio.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p></div>
                        <div className="sec5-ecc"><p>Total: </p><p>{(carrito.total + carrito.envio).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p></div>
                        <div className="sec6-ecc">
                            <select className="payment-select" value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                                <option value={1}>Dividend Wallet: {userLogged.wallet.wallet_div.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                                <option value={2}>Commission Wallet: {userLogged.wallet.wallet_com.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                                <option value={3}>Ecommerce wallet: {userLogged.wallet.wallet_ec || "0".toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                                <option value={4}>Direct payment</option>
                            </select>
                        </div>
                        <div className="sec7-ecc">
                            <QR opc={opcion}/>
                        </div>
                    </div>
                </section>
            )}
        </section>
    )
}
export default Cart