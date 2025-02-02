import appFirebase from "../../firebase-config";
import { getDatabase, ref, get, set } from "firebase/database";
import Common from "../js/Common";

class QrData{
    constructor(request){
        this.request=request
        this.common=new Common()
    }

    setRequest = async () => {
        const user = this.common.getCurrentUser();
        
        if (!user) {
          alert("No hay usuario actualmente autenticado.");
          return;
        }
      
        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);
      
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const currentUserData = Object.values(userData).find(userData => userData.email === user.email);
      
          if (currentUserData) {
            currentUserData.request = this.request;
            
            try {
              await set(ref(db, `users/${currentUserData.firebaseKey}`), currentUserData);
            } catch (error) {
            }
          } else {
          }
        } else {
        }
      }
    

}

export default QrData;



