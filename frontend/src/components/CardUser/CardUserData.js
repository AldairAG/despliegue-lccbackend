import appFirebase from "../../firebase-config";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import Common from "../js/Common";

class CardUserData{
    constructor(userData,setReferidos,setReferidosTotales){
        this.userData=userData
        this.setReferidos=setReferidos
        this.setReferidosTotales=setReferidosTotales
    }
    getDirectRef = async () => {
        try {
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");

            const q = query(usersRef, orderByChild("referredBy"), equalTo(this.userData.userName));

            const snapshot = await get(q);
            const directReferrals = snapshot.exists() ? Object.values(snapshot.val()) : [];

            this.setReferidos(directReferrals.length)
            return directReferrals.length

        } catch (error) {
            console.error("Error counting direct referrals:", error);
            this.setReferidos(0);
            return 0
        }
    };

    contarTotalReferidos= async (usuario, totalReferidos = 0)=> {
        try {
            const db = getDatabase(appFirebase);
            const usersRef = ref(db, "users");

            // Consulta los usuarios que tienen al usuario actual como referido
            const querySnapshot = await get(query(usersRef, orderByChild("referredBy"), equalTo(usuario)));

            // Obtiene los usuarios referidos directamente por el usuario actual
            const directReferrals = querySnapshot.exists() ? Object.values(querySnapshot.val()) : [];

            // Suma los referidos directos al total
            totalReferidos += directReferrals.length;

            // Itera sobre los referidos directos y cuenta los referidos de cada uno
            for (const referral of directReferrals) {
                totalReferidos += await this.contarTotalReferidos(referral.userName);
            }

            // Devuelve el total de referidos
            this.setReferidosTotales(totalReferidos);
        } catch (error) {
            console.error("Error counting direct referrals:", error);
            this.setReferidosTotales(0);
        }
    }

}
export default CardUserData