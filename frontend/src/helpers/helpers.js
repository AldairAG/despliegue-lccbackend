import { PETICION_TIPOS } from "../constants/tiposPeticion"

export const formatearTipoPeticionAdmin=(tipo)=>{
    if(PETICION_TIPOS.STARTER_PACK==tipo)
        return 'pago por starter pack'
    
    if(PETICION_TIPOS.PAGO_FACTURA==tipo)
        return 'pago de factura'
    
    if(PETICION_TIPOS.PAGO_STARTER_PACK_FACTURA==tipo)
        return 'pago por starter pack de factura'
    
    if(PETICION_TIPOS.BONO_PAGO_MANTENIMIENTO==tipo)
        return 'Mantenimiento '
}

