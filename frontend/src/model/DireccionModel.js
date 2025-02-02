import appFirebase from "../firebase-config";
import { getDatabase, ref, set, get } from "firebase/database";

export default class DireccionModel {
    constructor(estadoSeleccionado, direccion, numExt, numInt, colonia, city, cp, owner) {
        this.estadoSeleccionado = estadoSeleccionado;
        this.direccion = direccion;
        this.numExt = numExt;
        this.numInt = numInt;
        this.colonia = colonia;
        this.city = city;
        this.cp = cp;
        this.owner = owner;
    }

    async saveDireccion() {
        const db = getDatabase(appFirebase);
        const newRef = ref(db, `direcciones/${this.owner}`);
        const data = {
            estadoSeleccionado: this.estadoSeleccionado,
            direccion: this.direccion,
            numExt: this.numExt,
            numInt: this.numInt,
            colonia: this.colonia,
            city: this.city,
            cp: this.cp,
            owner: this.owner
        };
        await set(newRef, data);
    }

    async getDireccion(firebaseKey, setDireccion) {
        const db = getDatabase(appFirebase);
        const direccionRef = ref(db, `direcciones/${firebaseKey}/`);
        const snapshot = await get(direccionRef);

        if (snapshot.exists()) {
            const direccion = snapshot.val();
            setDireccion(direccion);
        } else {
            setDireccion([]);
        }
    }

    async direccionIsEmpty(firebaseKey) {
        const db = getDatabase(appFirebase);
        const direccionRef = ref(db, `direcciones/${firebaseKey}/`);
        const snapshot = await get(direccionRef);

        if (snapshot.exists()) {
            const direccion = snapshot.val();
            if (direccion.estadoSeleccionado == '' ||direccion.direccion == '' ||direccion.numExt == '' ||direccion.colonia == '' ||
                direccion.city == '' ||direccion.cp == '') {
                return false;
            }else{
                return true
            }
        } else {
            return false
        }
    }


}