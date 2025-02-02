import "./MyRed.css"
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";

import { calcularRango } from "../../../helpers/cardUserHelper";

const MyRed = () => {
    const { userLogged, getMyNet } = useUser()
    const [arrayOfFlay, setArrayOfFlay] = useState([false, false, false, false, false, false, false])
    const [usuariosLista, setUsuariosLista] = useState([]);
   
    // getMyNet(userLogged.userName)

    const handleClick = (level) => {
        setArrayOfFlay(prevState => {
            const newState = [...prevState];
            newState[level] = !newState[level];
            return newState;
        });
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getMyNet(userLogged.username); // Llamada a la función asíncrona
            setUsuariosLista(data); // Actualiza el estado con la respuesta
          } catch (error) {
            console.error("Error al obtener los datos:", error); // Manejo de errores
          }
        };
      
        fetchData();
      }, []);

    
    const generador = (usuarios, sponsorMain, nivelMeta) => {
        let usersInLevel = []
        let sumaTotal = 0

        const explorarNivel = (sponsor, nivelActual, nivelRequerido) => {

            if (nivelActual > nivelRequerido) {
                return
            }
            const filteredUsers = usuarios.filter(user => user.referido == sponsor);

            for (let user of filteredUsers) {
                if (nivelActual === nivelRequerido) {
                    usersInLevel.push(user)
                    sumaTotal += Number(user.staterpack)
                }
                explorarNivel(user.username, nivelActual + 1, nivelRequerido)
            }

        };
        explorarNivel(sponsorMain, 1, nivelMeta)
        return { usersInLevel, sumaTotal }
    }



    const mostrarResultados = () => {
        const items = [];

        for (let i = 0; i < 7; i++) {

            let { usersInLevel, sumaTotal } = generador(usuariosLista, userLogged.username, i + 1)
            items.push(
                <div className="nivelCard" onClick={() => handleClick(i + 1)} key={i}>
                    <div className="nivelCard0-1">
                        <div className="nivelCard1">
                            <div className="nivelCard-2"><span>{i + 1}</span></div>
                            <div className="nivelCard-3">
                                <span className="sp1">Nivel {i + 1}</span>
                                <span className="sp2">{usersInLevel ? usersInLevel.length : 0} Users</span>
                            </div>
                        </div>
                        <div className="nivelCard2">
                            <span className="sp2"> Capital:</span>
                            <span className="sp1">{(isNaN(sumaTotal) || sumaTotal == null ? 0 : sumaTotal).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</span>
                        </div>
                        <button
                            className="btnDesTab"
                            type="button"
                            aria-controls="radix-:r4:"
                            aria-expanded="false"
                            data-state="closed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="m6 9 6 6 6-6"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="nivelCard0-2">
                        {arrayOfFlay[i + 1] && (
                            <div className="containTable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                User
                                            </th>
                                            <th>
                                                Name
                                            </th>
                                            <th>
                                                registration date
                                            </th>
                                            <th>
                                                Sponsor
                                            </th>
                                            <th>
                                                Capital
                                            </th>
                                            <th>
                                                Rank
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersInLevel && usersInLevel.length > 0 ? (
                                            usersInLevel.map((item) => (
                                                <tr key={item.userName}>
                                                    <td className="p-4 align-middle">{item.username}</td>
                                                    <td className="p-4 align-middle">{item.nombres?.trim() || item.apellidos?.trim() ? `${item.nombres ?? ""} ${item.apellidos ?? ""}`.trim(): '" "'}</td>
                                                    <td className="p-4 align-middle">{item.fecha_ingreso}</td>
                                                    <td className="p-4 align-middle">{item.referido}</td>
                                                    <td className="p-4 align-middle">{item.staterpack.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}</td>
                                                    <td className="p-4 align-middle">{calcularRango(item.rango).rango}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="p-4 align-middle">No users in this level</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
        return items;
    };

    return (
        <section className="seccionMyRed">
            <div className="divTitulo">
                <h2>My net</h2>
            </div>
            <div className="nivel">
                {mostrarResultados()}
            </div>
        </section>
    )
}
export default MyRed