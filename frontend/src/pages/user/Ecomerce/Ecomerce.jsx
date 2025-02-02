import "./Ecomerce.css"
import Retiros from "../../../componentsEcomerce/Retiros/Retiros"
import Wallet from "../../../componentsEcomerce/Wallet/Wallet"
import Ordenes from "../../../componentsEcomerce/Ordenes/Ordenes"
import CardProduct from "../../../componentsEcomerce/CardProduct/CardProduct"
import Cart from "../../../componentsEcomerce/Cart/Cart"
import img1 from "../../../Assets/Images/productos/producto1.png"
import img2 from "../../../Assets/Images/productos/producto2.png"
import img3 from "../../../Assets/Images/productos/producto3.png"
import img4 from "../../../Assets/Images/productos/producto4.png"
import img5 from "../../../Assets/Images/productos/producto5.png"
import img6 from "../../../Assets/Images/productos/producto6.png"
import img7 from "../../../Assets/Images/productos/producto7.png"
import img8 from "../../../Assets/Images/productos/producto8.png"
import { useState, useEffect } from "react"
import Common from "../../../components/js/Common"

const Ecomerce = () => {
    const [userData, setUserData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userRepo = new Common()
    const products = {
        GoldMilk: {
            nombre: "Gold milk",
            desc: "Spice up your day",
            precio: "35.00",
            benefits: {
                b1: "Antioxidant",
                b2: "Anti-inflammatory",
                b3: "Anti carcinogenic",
                b4: "Regulates metabolism"
            }
        },
        Alkavit: {
            nombre: "Alkavit",
            desc: "Alkaline balance",
            precio: "35.00",
            benefits: {
                b1: "Antioxidant",
                b2: "Strengthens the immune system",
                b3: "Balances the digestive system",
                b4: "Control digestive problems"
            }
        },
        Vita100: {
            nombre: "Vita 100",
            desc: "The energy you need",
            precio: "35.00",
            benefits: {
                b1: "Greater concentration",
                b2: "Physical and mental resistance",
                b3: "Cardio-protection",
                b4: "Energy"
            }
        },
        CleanFiber: {
            nombre: "Clean fiber",
            desc: "Incomparable balance",
            precio: "35.00",
            benefits: {
                b1: "Diuretic",
                b2: "Laxative",
                b3: "Weight control",
                b4: "Combat chronic constipation"
            }
        },
        Kino: {
            nombre: "Kino",
            desc: "Great taste",
            precio: "35.00",
            benefits: {
                b1: "Glucose regulator",
                b2: "Diuretic",
                b3: "Cardio-protection",
                b4: "Energy"
            }
        },
        LemonClean: {
            nombre: "Lemon clean",
            desc: "Lemon punch",
            precio: "35.00",
            benefits: {
                b1: "Weight control",
                b2: "Detoxifier",
                b3: "Anti-constipation",
                b4: "Anticancer"
            }
        },
        FruitRelax: {
            nombre: "Fruit relax",
            desc: "Just relax!",
            precio: "35.00",
            benefits: {
                b1: "Antidepressant",
                b2: "Prevents ADHD",
                b3: "Anti-stress",
                b4: "Prevents insomnia"
            }
        },
        Actigenol: {
            nombre: "Actigenol",
            desc: "Renew yourself every day",
            precio: "35.00",
            benefits: {
                b1: "Anti-aging",
                b2: "Activates the immune system",
                b3: "Strengthens joints",
                b4: "Antioxidant"
            }
        }
    };


    useEffect(() => {
        fetchUserData()
    }, []);

    const fetchUserData = () => {
        userRepo.fetchUserData().then(user => {
            if (user) {
                setUserData(user)
                setIsLoading(false)
            }
        })
    }

    return (
        isLoading ? (
            <div className="spinner" ></div>
        ) : (
            <section className="Ecomerce">
                <header>
                    <p><i class="bi bi-shop"></i> <span>E-comerce</span></p>
                    <Cart userData={userData} />
                </header>
                <div className="discover">
                    <p>Discover our exclusive products!</p>
                    <br />
                    <span>Don't miss the opportunity to purchase these incredible products</span>
                </div>

                <section className="Shopping">
                    <p className="titulos">Shopping</p>
                    <div className="productos">
                        <CardProduct img={img1} firebaseKey={userData.firebaseKey} product={products.GoldMilk} />
                        <CardProduct img={img2} firebaseKey={userData.firebaseKey} product={products.Alkavit} />
                        <CardProduct img={img3} firebaseKey={userData.firebaseKey} product={products.Vita100} />
                        <CardProduct img={img4} firebaseKey={userData.firebaseKey} product={products.CleanFiber} />
                        <CardProduct img={img5} firebaseKey={userData.firebaseKey} product={products.Kino} />
                        <CardProduct img={img6} firebaseKey={userData.firebaseKey} product={products.LemonClean} />
                        <CardProduct img={img7} firebaseKey={userData.firebaseKey} product={products.FruitRelax} />
                        <CardProduct img={img8} firebaseKey={userData.firebaseKey} product={products.Actigenol} />
                    </div>
                </section>


                {/*             <div className="sec3-ec">
                <Retiros />
            </div> */}
                <div className="wallet-sec">
                    <p className="titulos">Wallet-comerce</p>
                    <div className="historial">
                        <Wallet userData={userData} />
                    </div>
                </div>
                <section className="orders">
                    <p className="titulos">Orders</p>
                    <div className="historial">
                        <Ordenes userName={userData.userName} />
                    </div>
                </section>

            </section>
        )

    )
}
export default Ecomerce