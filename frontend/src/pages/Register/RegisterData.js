import appFirebase from "../../firebase-config";
import { getDatabase, ref, set, push } from "firebase/database";
import UserModel from '../../model/UserModel'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Common from "../../components/js/Common.js"
import WelcomeEmail from "./WelcomeEmail"

class RegisterData {
    constructor(userName, email, password, passwordConf, referredBy, textError,
        setTextError, setMsjError, setbtnActive,msjError) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.passwordConf = passwordConf;
        this.referredBy = referredBy;
        this.textError = textError;
        this.setbtnActive = setbtnActive;
        this.setTextError = setTextError;
        this.setMsjError = setMsjError;
        this.msjError=msjError
        this.common = new Common();
        this.welcomeEmail = new WelcomeEmail(userName, email);
    }

    saveData = async () => {
        const userModel = new UserModel()
        userModel.setDefaultValues();
        const db = getDatabase(appFirebase);
        const newDocRef = push(ref(db, 'users/'));
        const fechaActual = new Date();

        // Obtener el día, mes y año
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumamos 1
        const anio = fechaActual.getFullYear();

        // Formatear la fecha en el formato "d-m-Y"
        const fechaFormateada = `${dia}-${mes}-${anio}`;

        userModel.email = this.email;
        userModel.password = this.password;
        userModel.referredBy = this.referredBy;
        userModel.userName = this.userName;
        userModel.password = this.password;
        userModel.admissionDate = fechaFormateada;
        userModel.firebaseKey = newDocRef.key;

        try {
            await set(newDocRef, userModel);
            window.location.href = '/Dashboard/home';
        } catch (error) {
            console.log(error)
        }
    }
    
    functRegister = async (e) => {
        const auth = getAuth(appFirebase)
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, this.email, this.password)
            await this.saveData();
            //await this.welcomeEmail.sendEmail(e)
        } catch (error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    this.setTextError('The email address is already in use. Please choose another.');
                    if (this.msjError) { this.setMsjError(false) }
                    this.setMsjError(true);
                    break;
                case 'auth/invalid-email':
                    this.setTextError('The email address provided is invalid.');
                    if (this.msjError) { this.setMsjError(false) }
                    this.setMsjError(true);
                    break;
                case 'auth/too-many-requests':
                    this.setTextError('Too many unsuccessful login attempts. Please try again later.');
                    this.setMsjError(true);
                    break;
                default:
                    this.setTextError('An error occurred during registration. Please try again later.');
                    this.setMsjError(true);
            }
        }
    }
}

export default RegisterData