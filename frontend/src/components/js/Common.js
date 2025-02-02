import appFirebase from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, get, set, push, orderByChild, query, equalTo,child } from "firebase/database";
import DepositoModel from "../../model/DepositoModel";

class Common {
    isNullOrEmpty(value) {
        return value === null || value === undefined || value === '' || value === ' ';
    }
    getCurrentUser = () => {
        const auth = getAuth();
        return auth.currentUser
    };
    getUserDataR = async () => {
        const db = getDatabase(appFirebase);
        const currentUserEmail = this.getCurrentUser().email;
        const dbRef = query(ref(db, "users/"), orderByChild("email"), equalTo(currentUserEmail));
        if (!currentUserEmail) return
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const users = Object.values(snapshot.val());
            if (users.length > 0) {
                return users[0]; // Devuelve el primer (y único) usuario que coincide
            } else {
                alert("No se encontró el usuario");
            }
        } else {
            alert("No se encontraron datos en la base de datos");
        }
    };

    fetchUserData = async () => {
        try {
            const db = getDatabase(appFirebase);
            const currentUserEmail = this.getCurrentUser().email;
            const dbRef = query(ref(db, "users/"), orderByChild("email"), equalTo(currentUserEmail));

            return get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const users = Object.values(snapshot.val());
                    if (users.length > 0) {
                        return users[0];  // Retorna el usuario si lo encuentra
                    } else {
                        throw new Error("No se encontró el usuario");
                    }
                } else {
                    throw new Error("No se encontraron datos en la base de datos");
                }
            }).catch((error) => {
                console.error("Error obteniendo los datos:", error);
                throw error;  // Maneja y propaga el error
            });
        } catch (error) {
            console.log(error)
        }
    };

    fetchUserDataByName = async (email) => {
        const db = getDatabase(appFirebase);
        const dbRef = query(ref(db, "users/"), orderByChild("email"), equalTo(email));

        return get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                const users = Object.values(snapshot.val());
                if (users.length > 0) {
                    return users[0];  // Retorna el usuario si lo encuentra
                } else {
                    throw new Error("No se encontró el usuario");
                }
            } else {
                return null
            }
        }).catch((error) => {
            console.error("Error obteniendo los datos:", error);
            throw error;  // Maneja y propaga el error
        });
    };

    fetchHistoryByConcept = async (concepto, userName) => {
        try {
            const db = getDatabase(appFirebase);
            const dbRef = query(ref(db, "history/"), orderByChild("concepto"), equalTo(concepto));
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const history = Object.values(snapshot.val()); // Tomamos el primer usuario encontrado.
                const filterHistory = Object.entries(history).filter(([key, value]) =>
                    value.userName = userName
                )
                return filterHistory.map(([key, value]) => ({ id: key, ...value }));
            } else {
                console.log("No se encontró un usuario con ese nombre.");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return null;
        }
    }

    fetchHistorialRetirosInternos = async (userName) => {
        try {
            const db = getDatabase(appFirebase);
            const dbRef = query(ref(db, "history/"), orderByChild("concepto"), equalTo('Internal transfer'));
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const history = Object.values(snapshot.val()); // Tomamos el primer usuario encontrado.
                const filterHistory = Object.entries(history).filter(([key, value]) =>
                    value.userName === userName || value.emisor === userName
                )
                return filterHistory.map(([key, value]) => ({ id: key, ...value }));
            } else {
                console.log("No se encontró un usuario con ese nombre.");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return null;
        }
    }

    getUserDataByName = async (userName) => {
        try {
            const db = getDatabase(appFirebase);
            const dbRef = query(ref(db, "users/"), orderByChild("userName"), equalTo(userName));
            const snapshot = await get(dbRef);

            if (snapshot.exists()) {
                const user = Object.values(snapshot.val())[0]; // Tomamos el primer usuario encontrado.
                return user;
            } else {
                console.log("No se encontró un usuario con ese nombre.");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return null;
        }
    };

    editAnyUser = async (userData) => {
        try {
            const db = getDatabase(appFirebase);
            const userRef = ref(db, `users/${userData.firebaseKey}`);
            await set(userRef, userData);
        } catch (error) {
            console.error("Error", error);
        }
    };

    saveInHistory = async (userName, cantidad, concepto, emisor, state, abono) => {
        const depositoModel = new DepositoModel()
        depositoModel.setDefaultValues()

        const db = getDatabase(appFirebase);
        const newDocRef = push(ref(db, 'history/'));

        depositoModel.userName = userName
        depositoModel.cantidad = cantidad
        depositoModel.concepto = concepto
        depositoModel.firebaseKey = newDocRef.key;
        depositoModel.hora = this.obtenerHora()
        depositoModel.date = this.obtenerFecha()
        depositoModel.emisor = emisor
        depositoModel.state = state | 0
        depositoModel.abono = abono
        try {
            await set(newDocRef, depositoModel);
        } catch (error) {
            console.log(error)
        }
    }

    saveHistory = async (historyModel) => {
        const db = getDatabase(appFirebase);
        const newKey = push(child(ref(db), 'history')).key;

        historyModel.firebaseKey = newKey;

        try {
            await set(ref(db, `history/${newKey}`), historyModel);
        } catch (error) {
            console.error("Error saving history:", error);
        }
    };


    obtenerFecha() {
        const currentDate = new Date();
        const options = { timeZone: 'America/New_York', day: '2-digit', month: '2-digit', year: 'numeric' };
        return currentDate.toLocaleString('es-US', options);
    }

    obtenerHora() {
        const currentDate = new Date();
        const options = { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' };
        return currentDate.toLocaleString('es-US', options);
    }

    determinarPaquete = (num) => {
        switch (true) {
            case num > 99 && num < 500:
                return "BUILDER";
            case num > 499 && num < 2500:
                return "BRONZE";
            case num > 2499 && num < 5000:
                return "SILVER";
            case num > 4999 && num < 10000:
                return "GOLD";
            case num >= 10000:
                return "PLATINUM";
            default:
                return "No pack";
        }
    }

    obtenerFechaHoraActual() {
        const now = new Date();

        // Configurar el desplazamiento de la zona horaria de Miami (EST o EDT depende de la época del año)
        const offsetMiami = -5; // Hora estándar (EST) UTC-5
        const miamiTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (offsetMiami * 3600000));

        // Obtener partes de la hora
        const hours = miamiTime.getHours();
        const minutes = miamiTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Determinar si es AM o PM
        const formattedHours = hours % 12 || 12; // Convertir a formato 12 horas
        const formattedMinutes = minutes.toString().padStart(2, '0'); // Asegurar 2 dígitos en minutos

        // Formatear y asignar los valores
        const date = miamiTime.toLocaleDateString('en-US'); // Formato MM/DD/YYYY
        const hora = `${formattedHours}:${formattedMinutes} ${ampm}`;

        return { date: date, hora: hora }
    }
}

export default Common