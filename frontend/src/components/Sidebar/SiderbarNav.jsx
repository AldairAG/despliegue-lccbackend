import { getAuth, signOut } from "firebase/auth"
import appFirebase from "../../firebase-config";
import { useUser } from "../../hooks/useUser";
import { useHistory } from 'react-router-dom';
import { ROUTES_USER } from '../../constants/routes'

const auth = getAuth(appFirebase)
const opciones = [
    {
        ruta: ROUTES_USER.HOME,
        icono: "bi bi-house",
        titulo: "Home"
    },
    {
        ruta: ROUTES_USER.PACKS,
        icono: "bi bi-boxes",
        titulo: "Starter packs"
    },
    {
        ruta: ROUTES_USER.MY_NET,
        icono: "bi bi-people",
        titulo: "My net"
    },
    {
        ruta: ROUTES_USER.MY_NET_GEN,
        icono: "bi bi-diagram-3",
        titulo: "Genealogy"
    },
    {
        ruta: ROUTES_USER.BENEFITS,
        icono: "bi bi-graph-up-arrow",
        titulo: "benefits"
    },
    {
        ruta: ROUTES_USER.WITHDRAWALS,
        icono: "bi bi-person-vcard",
        titulo: "withdrawals"
    },
    {
        ruta: ROUTES_USER.INTERNAL_TRANSFERS,
        icono: "bi bi-cash-coin",
        titulo: "Internal transfers"
    },
    {
        ruta: ROUTES_USER.BILL_PAYMENT,
        icono: "bi bi-receipt",
        titulo: "Bill Payment"
    },
    {
        ruta: ROUTES_USER.ECOMERCE,
        icono: "bi bi-bag",
        titulo: "E-comerce"
    },
    {
        ruta: ROUTES_USER.TOOLS,
        icono: "bi bi-archive",
        titulo: "Tools"
    },
    {
        ruta: ROUTES_USER.SUPPORT,
        icono: "bi bi-exclamation-octagon",
        titulo: "Support"
    },
    {
        ruta: ROUTES_USER.PROFILE,
        icono: "bi bi-person-gear",
        titulo: "Edit profile"
    },
    {
        ruta: null,
        icono: "bi bi-box-arrow-right",
        titulo: "Logout"
    },


]
const SiderNav = ({ toggleMenu }) => {
    const { userLogged,logOut } = useUser();

    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault()
        logOut()
    };

    const cambiarRuta = (e, ruta) => {
        e.preventDefault()
        if (!ruta) handleLogout(e)
        else history.push(ruta);

        toggleMenu()
    }

    const opcionDeuda = () => {
        const permisos = userLogged?.wallet?.permisos||[]
        const permiso = permisos.find(item => item.permisoName == 'deuda')
        
        if (permiso && permiso.activo != false) {
            return (
                <>
                    <li>
                        <div className="opcionBoton2" onClick={(e) => cambiarRuta(e, ROUTES_USER.CORPORATIVE_CREDIT)}>
                            <i className={"bi bi-credit-card-2-front"}></i>
                            <span>{"Corporate credit"}</span>
                        </div>
                    </li>

                </>
            )
        }
    }

    return (
        <nav class="navegacion">
            <ul>
                <h4>Main menu</h4>
                <hr />
                {opciones.map((item, index) => (
                    <li>
                        <div className="opcionBoton2" onClick={(e) => cambiarRuta(e, item.ruta)}>
                            <i className={item.icono}></i>
                            <span>{item.titulo}</span>
                        </div>
                    </li>
                ))}
                {opcionDeuda()}
            </ul>
        </nav>
    )
}

export default SiderNav