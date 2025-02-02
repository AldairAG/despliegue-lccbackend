import Common from "../components/js/Common"

class ManejoDeuda {

    async verificarDeuda(userData, monto,concepto,emisor) {
        if (userData.deuda.monto == 0) {
            return false
        }
        if (userData.deuda.monto > monto) {
            const userRepo = new Common()
            userData.deuda.monto -= monto
            await userRepo.editAnyUser(userData)
            await userRepo.saveInHistory(userData.userName,descuento,concepto,emisor)
            return true
        }
        if (monto > userData.deuda.monto) {
            const userRepo = new Common()
            const descuento = monto - deuda
            userData.deuda.monto -= descuento
            await userRepo.editAnyUser(userData)
            awaituserRepo.saveInHistory(userData.userName,descuento,concepto,emisor)
            return true
        }
    }
}
