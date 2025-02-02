import appFirebase from "../firebase-config";
import { getDatabase, ref, set, remove, push, get, query, orderByChild, equalTo } from "firebase/database";
import Common from "../components/js/Common"
export default class Orden {
    constructor(concepto, monto, wallet) {
        this.monto = monto
        this.concepto = concepto
        this.wallet = wallet
    }

    async save() {
        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const db = getDatabase(appFirebase);
            const newDocRef = push(ref(db, 'peticiones/'));
            const peticion = {
                userName: user.userName,
                concepto: this.concepto,
                monto: this.monto,
                email: user.email,
                firebaseKey: newDocRef.key,
                owner: user.firebaseKey,
                wallet: this.wallet || ""
            }
            await set(newDocRef, peticion)
        } catch (error) {
            console.error("Error al agregar la orden: ", error);
        }
    }

    async saveFactura(peticion) {
        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const db = getDatabase(appFirebase);
            const newDocRef = push(ref(db, 'peticiones/'));
            peticion.firebaseKey= newDocRef.key

            await set(newDocRef, peticion)
        } catch (error) {
            console.error("Error al agregar la orden: ", error);
        }
    }

    async saveProducts(list) {
        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const db = getDatabase(appFirebase);
            const newDocRef = push(ref(db, 'peticiones/'));
            const peticion = {
                userName: user.userName,
                concepto: this.concepto,
                monto: this.monto,
                email: user.email,
                firebaseKey: newDocRef.key,
                owner: user.firebaseKey,
                productos: list || []
            }
            await set(newDocRef, peticion)
        } catch (error) {
            console.error("Error al agregar la orden: ", error);
        }
    }

    async saveRetiro() {

        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const db = getDatabase(appFirebase);
            const newDocRef = push(ref(db, 'peticiones/'));
            const peticion = {
                userName: user.userName,
                concepto: this.concepto,
                monto: this.monto,
                email: user.email,
                firebaseKey: newDocRef.key,
                owner: user.firebaseKey,
                usdtAddress: user.usdtAddress,
                wallet: this.wallet || "",
                estado: 1,
                hora: extractDB.obtenerHora(),
                fecha: extractDB.obtenerFecha()
            }
            await set(newDocRef, peticion)
        } catch (error) {
            console.error("Error al agregar la orden: ", error);
        }
    }

    async borrar(firebaseKey) {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `peticiones/${firebaseKey}`);
            await remove(newRef);
            console.log('datos borrados correctamente')
        } catch (error) {
            console.error('Error al realizar el cobro:', error);
        }
    }

    getFactura = async (code) => {
        const db = getDatabase(appFirebase);
        const dbRef = query(ref(db, "peticiones/"), orderByChild("code"), equalTo(code));

        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const peticion = Object.values(snapshot.val())[0];  // Devuelve el objeto directamente
            if (peticion) {
                return peticion;
            } else {
                throw new Error("Invoice not found");
            }
        } else {
            return null;
        }
    };


}