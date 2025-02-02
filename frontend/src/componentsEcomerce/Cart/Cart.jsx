import { useState, useEffect } from "react"
import { getDatabase, ref, onValue } from 'firebase/database';
import "./Cart.css"
import CartModel from "../../model/CartModel";
import QR from "../QR/QR";
const Cart = ({ userData }) => {
    const [productos, setProductos] = useState([])
    const [visible, setVisible] = useState(false)
    const [opcion, setOpcion] = useState(1)

    const [visibleDP, setVisibleDP] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [envio, SetEnvio] = useState(0)

    const openClose = () => {
        setVisible(!visible)
        fetchCarrito()
    }

    const fetchCarrito = () => {
        try {
            const db = getDatabase();
            const userRef = ref(db, 'carritos/' + userData.firebaseKey + "/productos");
            const unsubscribe = onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setProductos(data);
                } else {
                    setProductos([])
                }
            });
            return () => unsubscribe();
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const sumCantidad = productos.reduce((acc, producto) => acc + producto.cantidad, 0);
        const sumPrecio = productos.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

        setSubtotal(sumPrecio)
        if (sumCantidad < 4) {
            SetEnvio("8.00")
            setTotal(sumPrecio + 8)
        } else {
            setTotal(sumPrecio)
            SetEnvio(0.00)
        }
    }, [productos]);

    const eliminarProducto = async (index) => {
        const cart = new CartModel(userData.firebaseKey)
        cart.getFromDatabase().then(products => {
            console.log(products)
            const prodcutosActuales = products.productos
            if (index >= 0 && index < prodcutosActuales.length) {
                const nuevosProductos = prodcutosActuales.filter((_, i) => i !== index);
                cart.eliminarProducto(nuevosProductos)
            } else {
                console.error('Índice no válido');
            }
        })
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
                            {productos && productos.length > 0 ? (
                                productos.map((item, index) => (
                                    <div className="s21-ecc">
                                        <div className="item-ecc">
                                            <p>{item.nombre}</p>
                                            <span>{item.precio} USDT x {item.cantidad}</span>
                                        </div>
                                        <button onClick={() => eliminarProducto(index)}><i class="bi bi-x"></i></button>
                                    </div>
                                ))) : (
                                <p>You have no added products</p>
                            )}
                        </div>
                        <div className="sec3-ecc"><p>Subtotal: </p><p>{subtotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p></div>
                        <div className="sec4-ecc"><p>Shipping: </p><p>{envio} USDT</p></div>
                        <div className="sec5-ecc"><p>Total: </p><p>{total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p></div>
                        <div className="sec6-ecc">
                            <select className="payment-select" value={opcion} onChange={(e) => setOpcion(e.target.value)}>
                                <option value={1}>Dividend Wallet: {userData.walletDiv.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                                <option value={2}>Commission Wallet: {userData.walletCom.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                                <option value={3}>Ecommerce wallet: {userData.walletEc || "0".toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</option>
                                {/* <option value={4}>Direct payment</option> */}
                            </select>
                        </div>
                        <div className="sec7-ecc"><QR opc={opcion} total={total} productos={productos} keyF={userData.firebaseKey} /></div>
                    </div>
                </section>
            )}
        </section>
    )
}
export default Cart