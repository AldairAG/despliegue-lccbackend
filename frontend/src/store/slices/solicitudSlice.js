import { createSlice } from '@reduxjs/toolkit'

const destinatario = {
    username: '',
    nombres: '',
    apellidos: '',
    email: '',
}

const newPeticionModel = {
    monto: '',
    tipo: '',
    code: ''
}

const initialState = {
    newPeticion: newPeticionModel,
    pagosList: [],
    retirosList: [],
    destinatario: destinatario,
}

export const solicitudSlice = createSlice({
    name: 'peticion',
    initialState,
    reducers: {
        fillNewPeticion: (state, { payload }) => {
            state.newPeticion = ({
                ...state.newPeticion,
                [payload.name]: payload.value
            })
        },
        savePagosList: (state, { payload }) => {
            state.pagosList = payload
        },
        saveRetirosList: (state, { payload }) => {
            state.retirosList = payload
        },
        fillDestinatario:(state,{payload})=>{
            state.destinatario=payload
        }
    }
})

export const {
    fillNewPeticion,
    savePagosList,
    saveRetirosList,
    fillDestinatario,
} = solicitudSlice.actions
export default solicitudSlice.reducer;