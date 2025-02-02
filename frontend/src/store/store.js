import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import solicitudReducer from './slices/solicitudSlice'

// Recuperar estado inicial del localStorage
const persistedState = localStorage.getItem("userState")
    ? JSON.parse(localStorage.getItem("userState"))
    : undefined;

export const store = configureStore({
    reducer: {
        user: userReducer,
        solicitud: solicitudReducer
    },
    preloadedState: {
        user: persistedState,
    },
})

// Suscripción para guardar cambios en localStorage
store.subscribe(() => {
    const userState = store.getState().user;
    localStorage.setItem("userState", JSON.stringify(userState));
  });