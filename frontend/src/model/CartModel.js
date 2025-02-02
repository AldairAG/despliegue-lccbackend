import appFirebase from "../firebase-config";
import { getDatabase, ref, set, remove, get } from "firebase/database";
import Common from "../components/js/Common"
import OrdenModel from "./OrdenModel"
import AlertMsjError from "../components/AlertMsg/AlertMsgError"
import { Return } from "three/examples/jsm/nodes/Nodes.js";
export default class CartModel {
    constructor(owner) {
        this.owner = owner;
    }

    async getFromDatabase() {
        try {
            const db = getDatabase(appFirebase);
            const dbRef = ref(db, `carritos/${this.owner}`);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                return null
            }
        } catch (error) {
            console.error('Error getting data from Firebase', error);
            return null
        }
    }

    async crearCarrito(producto) {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `carritos/${this.owner}`);
            const carrito = await this.getFromDatabase();
            let data;
            if (carrito) {
                data = {
                    owner: this.owner,
                    productos: Array.isArray(carrito.productos) ? carrito.productos : []
                };
            } else {
                data = {
                    owner: this.owner,
                    productos: []
                };
            }
            data.productos.push(producto);
            await set(newRef, data);
            console.log('Producto agregado correctamente:', producto);
            return true; // Indica que la operación fue exitosa
        } catch (error) {
            console.error('Error al guardar los datos:', error);
            return false; // Indica que la operación falló
        }
    }

    async limpiarCarrito(firebaseKey) {
        try {
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `carritos/${firebaseKey}/productos`);
            await remove(newRef);
        } catch (error) {
            console.error('Error al realizar el cobro:', error);
        }
    }

    async eliminarProducto(productosNuevos) {
        const db = getDatabase(appFirebase);
        const newRef = ref(db, `carritos/${this.owner}/productos`);
        await this.limpiarCarrito(this.owner)
        await set(newRef, productosNuevos);
    }

    async realizarCobro(wallet, total) {
        try {
            const extractDB = new Common();
            const user = await extractDB.getUserDataR();
            const cart = await this.getFromDatabase();
            const db = getDatabase(appFirebase);
            const newRef = ref(db, `users/${user.firebaseKey}`);

            if (wallet == 1) {
                if (user.walletDiv < total) {
                    throw new Error('Insufficient funds in Wallet');
                } else {
                    user.walletDiv = user.walletDiv - total;
                }
            } else if(wallet==2){
                if (user.walletCom < total) {
                    throw new Error('Insufficient funds in Wallet');
                } else {
                    user.walletCom = user.walletCom - total;
                }
            }else if(wallet==3){
                if (user.walletEc < total) {
                    throw new Error('Insufficient funds in Wallet');
                } else {
                    user.walletEc = user.walletEc - total;
                }
            }else if(wallet==4){
                
            }
            await set(newRef, user);
            extractDB.saveInHistory(user.userName, -total, "Buy in marketplace", "");
            const ordenData = new OrdenModel("Pending", total, "", cart.productos, user.userName);
            ordenData.creaOrden();
            await this.limpiarCarrito(user.firebaseKey)
            this.asignarBono(user.userName, user.referredBy, 1, total, extractDB.editAnyUser, extractDB.saveInHistory)
            return null;
        } catch (error) {
            console.error('Error al realizar el cobro:', error);
            return error.message;
        }
    }

    async asignarBono(user, userRef, nivel, total, saveUser, saveHistory) {
        const porcentaje = [.1, .05, .02, .01, .01, .005, .005]
        if (nivel > 7) {
            return
        }
        const db = getDatabase(appFirebase);
        const usersRef = ref(db, 'users');

        try {
            const snapshot = await get(usersRef);
            if (snapshot.exists()) {
                const users = snapshot.val();
                const patrocinador = Object.values(users).find(user => user.userName === userRef);

                if (patrocinador) {
                    const bono = total * porcentaje[nivel - 1]
                    let currentWallet = patrocinador.walletEc || 0;
                    currentWallet = currentWallet + bono
                    patrocinador.walletEc = parseFloat((currentWallet + bono).toFixed(2));
                    saveUser(patrocinador)
                    saveHistory(patrocinador.userName, bono, "Purchase commission", user+" (Level "+nivel+")")
                    this.asignarBono(user, patrocinador.referredBy, nivel + 1, total, saveUser, saveHistory)

                }
            }
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    }



}