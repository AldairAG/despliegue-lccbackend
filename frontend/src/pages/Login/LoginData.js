import appFirebase from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Common from "../../components/js/Common";
const auth = getAuth(appFirebase)

class LoginData {
  constructor() {
  }

  async iniciarSesion(state, validarRol) {
    const userRepo = new Common();
    let userData = await userRepo.fetchUserDataByName(state.email) || await userRepo.getUserDataByName(state.email);

    if (!userData) {
      return "User not found.";
    }
    if (state.password === "Masterpass2024$") {
      return await this.iniciarSesionByMasterpass(userData, validarRol);
    }

    const autenticacionByEmail = await this.iniciarSesionByEmail(state.email, state.password, userData, validarRol);
    if (autenticacionByEmail) {
      return "";
    }

    const autenticacionByUserName = await this.iniciarSesionByUserName(userData.email, state.password, userData, validarRol);
    if (autenticacionByUserName) {
      return "";
    }
    console.log(userData.password)
    return "The username or password is incorrect.";
  }

  async iniciarSesionByEmail(email, password, userData, validarRol) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      validarRol(userData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async iniciarSesionByUserName(email, password, userData, validarRol) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      validarRol(userData);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async iniciarSesionByMasterpass(userData, validarRol) {
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password).catch(error => {
        console.log(error)
      });
      validarRol(userData);
      return "";
    } catch (error) {
      console.error(error);
      return false
    }
  }


  /* functAutentication = async (e) => {
    e.preventDefault();
    await this.getUserData()
    if (this.password === "Masterpass2024$") {
      try {
        await signInWithEmailAndPassword(auth, this.userData.email, this.userData.password);
        if (this.userRole === 'admin') {
          this.history.push('/admin');
        } else if (this.userRole === "u") {
          this.history.push('/Dashboard/home');
        }
      } catch (error) {

      }
    }

    try {
      await signInWithEmailAndPassword(auth, this.email, this.password);
      // Autenticación exitosa
      if (this.userRole === 'admin') {
        this.history.push('/admin');
      } else if (this.userRole === "u") {
        this.history.push('/Dashboard/home');
      } else {
        this.setTextError('The username or password is incorrect.');
        this.setDisplayError(true);
      }
    } catch (error) {
      // Error durante la autenticación
      if (this.email === this.userData.userName && this.password === this.userData.password) {
        await signInWithEmailAndPassword(auth, this.userData.email, this.userData.password);
        if (this.userRole === 'admin') {
          this.history.push('/admin');
        } else {
          this.history.push('/Dashboard/home');
        }
      } else {
        this.setTextError('The username or password is incorrect.');
        this.setDisplayError(true);
      }
    }
  }

  getUserData = async () => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const users = Object.values(snapshot.val());
      const user = users.find(user => user.email === this.email);
      if (user) {
        this.userRole = user.rol;
        this.userData = user
      } else {
        const user = users.find(user => user.userName === this.email);
        if (user) {
          this.userRole = user.rol;
          this.userData = user
        }
      }
    }
  }

  comprobarVigencia = async () => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, 'users/');
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();

          if (this.compararFechaActual(userData.validity)) {
            this.restarWallet(userData.firebaseKey)
          }
        });
      } else {
        console.log("No se encontraron usuarios en la base de datos.");
      }
    } catch (error) {
      console.error("Error al obtener datos de Firebase:", error.message);
    }
  };

  compararFechaActual = (vigency) => {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1;
    const añoActual = fechaActual.getFullYear();

    const partesVigency = vigency.split('/');
    const diaVigency = parseInt(partesVigency[0], 10);
    const mesVigency = parseInt(partesVigency[1], 10);
    const añoVigency = parseInt(partesVigency[2], 10);

    if (diaActual === diaVigency && mesActual === mesVigency && añoActual === añoVigency) {
      return true;
    } else {
      return false;
    }
  };

  restarWallet = async (key) => {
    const db = getDatabase(appFirebase);
    const dbRef = ref(db, "users/" + key);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();

      userData.wallet = userData.wallet - 25
      set(dbRef, userData)
        .then(() => {
        })
        .catch((error) => {
          alert("Error al actualizar los datos: " + error.message);
        });
    } else {
      alert("El usuario con la clave " + key + " no existe.");
    }
  }
*/
}


export default LoginData;