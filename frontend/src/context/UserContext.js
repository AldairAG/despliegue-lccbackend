import React, { createContext, useContext, useState,useEffect } from 'react';
import appFirebase from "../firebase-config";
import { getDatabase, ref, orderByChild, query, equalTo, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth()

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
    }, []);
    
    const getData = () => {
        const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                const db = getDatabase(appFirebase);
                const dbRef = query(ref(db, "users/"), orderByChild("email"), equalTo(auth.currentUser.email));

                const unsubscribeData = onValue(dbRef, (snapshot) => {
                    const ObjectKeys = snapshot.val()
                    const user = Object.values(ObjectKeys)[0];
                    setUser(user);
                    setLoading(false);
                });

                // Limpieza de suscripción a Realtime Database
                return () => unsubscribeData();
            } else {
                if (auth.currentUser)
                setUser(null);
                setLoading(false);
            }
        });

        // Limpieza de suscripción a Firebase Auth
        return () => unsubscribeAuth();
    }


    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ userData, loading, logout }}>
            {!loading && children}
        </UserContext.Provider>
    );
};

// Crear el hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};

