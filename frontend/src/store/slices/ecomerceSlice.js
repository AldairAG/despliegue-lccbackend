import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    carrito: {
        envio: 0,
        products: [],
        username: null,
        total: 0
    }
}

export const ecomerceSlice = createSlice({
    name: 'ecomerce',
    initialState,
    reducers: {
        updateCart: (state, { payload }) => {
            state.carrito = payload
        },
        vaciar: (state, { payload }) => {
            state.carrito.products = initialState
        }
    }
})

export const {
    updateCart,
    vaciar,
} = ecomerceSlice.actions
export default ecomerceSlice.reducer;