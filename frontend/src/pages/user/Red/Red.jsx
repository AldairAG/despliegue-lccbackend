 import "./Red.css"
import img1 from "../../../Assets/Images/Baners_jpg/suit.png"
import appFirebase from "../../../firebase-config";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect, useState } from "react";

import { useUser } from "../../../hooks/useUser";

const Red = (props) => {

    const { userLogged, getMyNet } = useUser()

    const [isLoading, setIsLoading] = useState(true);
    const [fetchCounter, setFetchCounter] = useState(0);
    const [referidos, setReferidos] = useState([])

    const [usuariosLista, setUsuariosLista] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         await getRefData()
    //         setFetchCounter(fetchCounter + 1);
    //     };

    //     if (fetchCounter < 2) {
    //         fetchData();
    //     } else {
    //         setIsLoading(false);
    //     }
    // }, [fetchCounter]);

    // const getRefData = async () => {
    //     const db = getDatabase(appFirebase);
    //     const dbRef = ref(db, "users/");
    //     const snapshot = await get(dbRef);

    //     if (snapshot.exists()) {
    //         const users = Object.values(snapshot.val());
    //         setReferidos(users)
    //     }
    // }

     useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getMyNet(userLogged.username); // Llamada a la función asíncrona
            setUsuariosLista(data); // Actualiza el estado con la respuesta
            console.log(data); // Imprime la lista obtenida
          } catch (error) {
            console.error("Error al obtener los datos:", error); // Manejo de errores
          }finally {
            setIsLoading(false); // Detenemos el spinner al final
        }
        };
      
        fetchData();
      }, []);

    const renderSubItems = (referido, con, userName) => {
        const items = [];
        let final=false
        if (con > 7) {
            return 
        }
        
        const filteredUsers = referido.filter(user => user.referido == userName);

        if(filteredUsers.length === 0){
            return
        }
        if(filteredUsers.length < 1){
            final=true
        }
        for (const user of filteredUsers) {
            items.push(
                <li key={user.id}>
                    <a href="#"><img src={img1} alt="user" /><span>{user.username}</span></a>
                    <ul className={final ? 'final' : ''}>
                        {renderSubItems(referido, con + 1, user.username)}
                    </ul>
                </li>
            );
        }
        return items;
    };

    return (
        <section className="seccionRed" >
            <div className="divTitulo">
                <h2>Genealogy</h2>
            </div>
            <div className="redComponent">
                {isLoading ? (
                    <div class="spinner"></div>
                ) : (
                    <div class="row">
                        <div class="tree">
                            <ul>
                                <li> <a href="#"> <img src={img1} alt="user" /><span>{userLogged.username}</span></a>
                                    <ul>
                                        {renderSubItems(usuariosLista, 1, userLogged.username)}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
                }
            </div >
        </section >
    )
    {/*                                     <ul>
                                        {userModels.map((item, index) => (
                                            <li key={index}>
                                                <a href="#"><img src={img1} alt="user" /><span>{item.userName}</span></a>
                                                <ul>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul> */}
    {/*                                         <li><a href="#"><img src="images/2.jpg" /><span>Grand Child</span></a>
                                            <ul>
                                                <li> <a href="#"><img src="images/3.jpg" /><span>Great Grand Child</span></a> </li>
                                                <li> <a href="#"><img src="images/4.jpg" /><span>Great Grand Child</span></a> </li>
                                            </ul>
                                        </li>
                                        <li> <a href="#"><img src="images/5.jpg" /><span>Grand Child</span></a>
                                            <ul>
                                                <li> <a href="#"><img src="images/6.jpg" /><span>Great Grand Child</span></a> </li>
                                                <li> <a href="#"><img src="images/7.jpg" /><span>Great Grand Child</span></a> </li>
                                                <li> <a href="#"><img src="images/8.jpg" /><span>Great Grand Child</span></a> </li>
                                            </ul>
                                        </li>
                                        <li><a href="#"><img src="images/9.jpg" /><span>Grand Child</span></a></li> */}



}

export default Red