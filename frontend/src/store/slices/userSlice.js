import { createSlice } from '@reduxjs/toolkit'
import { changeState } from '../../utils/helpers'

const userSelect = {
    id: 0,
    email: '',
    username: '',
    apellidos_user: '',
    nombre_user: '',
    password: '',
    rol: '',
    wallet: {
        fecha_ingreso: "",
        ganancia_total: 0,
        mensualidad: "",
        rango: 0,
        referido: "",
        retiro_total: 0,
        wallet_address: "",
        wallet_com: 0,
        wallet_div: 0,
        wallet_ec: 0,
        staterpack: 0,
        deuda: {
            deuda: 0,
            wallet_deuda: 0
        },
        interesCompuesto: [],
        permisos:[],
        bonos: {
            fast_track: 0,
            matching: 0,
            membresia_mensual: 0,
            rango_res: 0,
            ref_direct: 0,
            update_st: 0
        },
    }
}

const cardUserModel = {
    rango: '',
    referidosDirectos: 0,
    referidosTotal: 0,
    teamCapital: 0,
    imgRango: ''
}

const initialState = {
    usersList: [],
    userSelect: userSelect,
    userLogged: userSelect,
    userSelectOrignial: userSelect,
    cardUser: cardUserModel,
    loginRequest: { credencial: '', password: '' },
    registerRequest: { email: '', password: '', username: '', referido: '' },
    loading: true,
    logged: false,
    myNet: [],
    myNetGen: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loadingUsers: (state, { payload }) => {
            state.usersList = payload
        },
        loadingSelectUser: (state, { payload }) => {
            const updatedUser = { ...state.userSelect, ...payload };
            state.userSelect = updatedUser;
            state.userSelectOrignial = updatedUser;
        },
        handleChange: (state, { payload }) => {

            switch (payload.nodo) {
                case null:
                    state.userSelect = changeState(state.userSelect, payload.name, payload.value)
                    break;
                case 'wallet':
                    state.userSelect.wallet = changeState(state.userSelect.wallet, payload.name, payload.value)
                    break;
                case 'bonos':
                    state.userSelect.wallet.bonos = changeState(state.userSelect.wallet.bonos, payload.name, payload.value)
                    break;
                case 'deuda':
                    state.userSelect.wallet.deuda = changeState(state.userSelect.wallet.deuda, payload.name, payload.value)
                    break;
                case 'login':
                    state.loginRequest = changeState(state.loginRequest, payload.name, payload.value)
                    break;
                case 'register':
                    state.registerRequest = changeState(state.registerRequest, payload.name, payload.value)
                case 'userLog':
                    state.userLogged = changeState(state.userLogged, payload.name, payload.value)
                case 'log':
                    state.logged = payload
                case 'myNet':
                    state.myNet = payload
                case 'myNetGen':
                    state.myNetGen = payload
                case 'permisos':
                    state.userLogged ||= {};
                    state.userLogged.wallet ||= {};
                    state.userLogged.wallet.permisos = payload?.value || [];
                default:
                    break;
            }
        },
        loadingLoggedUser: (state, { payload }) => {
            state.userLogged = payload
        },
        loadingCardUser: (state, { payload }) => {
            state.cardUser = payload
        },
        changeLoadingSlice: (state, { payload }) => {
            state.loading = payload
        },
        resetState:(state, { payload })=>{
            state=initialState
        },
    }
});

export const {
    loadingUsers,
    loadingSelectUser,
    userLogged,
    cardUser,
    userSelectOrignial,
    handleChange,
    loadingLoggedUser,
    loadingCardUser,
    changeLoading,
    resetState,
} = userSlice.actions
export default userSlice.reducer;