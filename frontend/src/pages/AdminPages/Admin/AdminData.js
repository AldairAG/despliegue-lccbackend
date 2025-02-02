import appFirebase from "../../../firebase-config.js";
import { getDatabase, ref, get, set, query, orderByChild, equalTo } from "firebase/database";
import Common from "../../../components/js/Common.js";
import PeticionModel from "../../../model/PeticionModel.js"
import Orden from "../../../model/OrdenModel.js";
import Bonos from "../../../utils/Bonos.js";

class AdminData {
  constructor(setUserModels) {
    this.setUserModels = setUserModels
  }

  fetchData = async () => {
    const db = getDatabase();
    const conceptos = [
      "Paquete de inicio",
      "Mantenimiento",
      "Pago directo de ecomerce",
      "Bill payment by transfer"
    ];

    let filteredPeticiones = [];

    for (const concepto of conceptos) {
      const dbRef = query(ref(db, "peticiones/"), orderByChild("concepto"), equalTo(concepto));
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const peticiones = snapshot.val();
        filteredPeticiones = [
          ...filteredPeticiones,
          ...Object.values(peticiones)
        ];
      }
    }

    return filteredPeticiones.reverse();
  };

  aprobarStaterPack = async (peticion) => {
    const userRepo = new Common()

    const db = getDatabase(appFirebase);
    const bonos = new Bonos()

    const dbRef = ref(db, "users/" + peticion.owner);
    const snapshot = await get(dbRef);

    if (peticion.concepto == "Bill payment by transfer") {
      peticion.monto = peticion.monto * 2
    }

    try {
      if (snapshot.exists()) {

        let userData = snapshot.val();
        userData.staterPack = Number(userData.staterPack)+peticion.monto;

        userData = await bonos.bonoReferenciaDirecta(userData)
        bonos.fastTrackBono(userData.referredBy)
        userRepo.saveInHistory(userData.userName, peticion.monto, "Payment for starter package", "", "", false)
        userRepo.editAnyUser(userData)
      }
    } catch (error) {

    }
  }
  aprobarMantenimiento = async (peticion) => {
    const peticionModel = new PeticionModel()
    const db = getDatabase(appFirebase);

    const dbRef = ref(db, "users/" + peticion.owner);
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      userData.validity = this.obtenerFechaVencimiento();
      set(dbRef, userData).then(() => {
        peticionModel.borrar(peticion.firebaseKey)
        this.fetchData()
      })
    }
  }
  aprobarPagoEcomerce = async (peticion) => {
    const peticionModel = new PeticionModel()
    const db = getDatabase(appFirebase);

    const dbRef = ref(db, "users/" + peticion.owner);
    const snapshot = await get(dbRef);
    try {
      const userData = snapshot.val();
      const ordenModel = new Orden('Pending', peticion.monto, '', peticion.productos, userData.userName)
      ordenModel.creaOrden()
      peticionModel.borrar(peticion.firebaseKey)
      this.fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  aprobar = async (peticion) => {
    if (peticion.concepto == 'Paquete de inicio' || peticion.concepto == "Bill payment by transfer") {
      this.aprobarStaterPack(peticion)
    } else if (peticion.concepto == 'Mantenimiento') {
      await this.aprobarMantenimiento(peticion)
    } else if (peticion.concepto == 'Pago directo de ecomerce') {
      await this.aprobarPagoEcomerce(peticion)
    }
  }


  denegar = async (key) => {
    const peticionModel = new PeticionModel()
    peticionModel.borrar(key)
  }

  obtenerFechaVencimiento() {
    const currentDate = new Date();
    const next30DaysDate = new Date(currentDate);

    next30DaysDate.setDate(currentDate.getDate() + 30);

    const dia = next30DaysDate.getDate().toString().padStart(2, '0');
    const mes = (next30DaysDate.getMonth() + 1).toString().padStart(2, '0');
    const año = next30DaysDate.getFullYear().toString();

    const fechaDentroDe30Dias = `${dia}-${mes}-${año}`;

    return fechaDentroDe30Dias;
  }
}

export default AdminData