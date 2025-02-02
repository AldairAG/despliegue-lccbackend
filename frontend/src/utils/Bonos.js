import Common from "../components/js/Common"
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";


class Bonos {

    verificarDeuda(patrocinadorData, bono) {
        //console.log(patrocinadorData.deuda)
        if (!patrocinadorData.deuda || patrocinadorData.deuda == 0) return { success: false, patrocinadorData }

        if (patrocinadorData.deuda >= bono) {

            patrocinadorData.deuda -= bono
            patrocinadorData.walletTotal += bono;

            return { success: true, patrocinadorData };
        } else if (bono > patrocinadorData.deuda) {

            const diferencia = bono - patrocinadorData.deuda
            patrocinadorData.deuda = 0
            patrocinadorData.walletCom += diferencia;
            patrocinadorData.walletTotal += bono;

            return { success: true, patrocinadorData };
        }

    }

    async getReferidosDirectos(user) {
        const db = getDatabase();
        const usersRef = ref(db, 'users');
        const referidosDirectosQuery = query(usersRef, orderByChild('referredBy'), equalTo(user.userName));
        try {
            const snapshot = await get(referidosDirectosQuery);
            return snapshot.exists() ? Object.values(snapshot.val()) : [];
        } catch (error) {
            console.error("Error al obtener referidos directos:", error);
            return [];
        }
    };

    async asignacionRangoResidual(referido) {
        const userRepo = new Common()
        const rangos = [20000, 60000, 150000, 500000, 1000000, 2000000, 5000000, 15000000, 50000000];
        const limite = rangos[userData.rank] * 0.5;
        let redTotalUsuario = 0;
        let userData = await userRepo.getUserDataByName(referido)

        const getWalletAllNet = async (nivel, user) => {
            if (nivel > 6) return 0;
            const referidos = await this.getReferidosDirectos(user);
            let sumaWallets = 0;

            for (const referido of referidos) {
                sumaWallets += Number(referido.staterPack) || 0;
                sumaWallets += await getWalletAllNet(nivel + 1, referido);
            }
            return sumaWallets;
        };

        const referidosDirectos = await this.getReferidosDirectos(userData);
        for (const referido of referidosDirectos) {
            const totalRed = await getWalletAllNet(1, referido) + (Number(referido.staterPack) || 0);
            redTotalUsuario += totalRed > limite ? limite : totalRed;
        }
        if (redTotalUsuario > rangos[userData.rank]) {
            const userRepo = new Common()
            userData.rank += 1
            userRepo.editAnyUser(userData)
        }
    }

    async fastTrackBono(patrocinador) {
        let silver = 0
        let bronce = 0
        const userRepo = new Common()

        let userData = await userRepo.getUserDataByName(patrocinador)
        if(!userData){
            return
        }

        const updateUserByFirebaseKey = async (bono, concepto, isBronce) => {
            if (isBronce) {
                userData.countBonoFT.bronce += 1;
            } else {
                userData.countBonoFT.silver += 1;
            }

            const deudaResult = this.verificarDeuda(userData, bono, concepto);

            if (!deudaResult.success) {
                userData.walletCom += bono;
                userData.walletTotal += bono;
            } else {
                userData = deudaResult.patrocinadorData;
            }

            userData.bonoFastTrack += bono;

            const userRepo = new Common()
            userRepo.editAnyUser(userData).then(() => {
                userRepo.saveInHistory(userData.userName, bono, concepto, "", "", deudaResult.success)
            })
        }

        const verificarBonos = async () => {
            const referidosDirectos = await this.getReferidosDirectos(userData)

            if (!userData.countBonoFT) {
                userData.countBonoFT = { bronce: 0, silver: 0 };
            }
            for (const referido of referidosDirectos) {
                console.log(`  userNameB: ${referido.userName} sT: ${referido.staterPack}`);

                const cantidadWallet = referido.staterPack;
                if (cantidadWallet >= 500 && cantidadWallet < 2500) {
                    bronce++;
                    console.log(`  userNameB: ${referido.userName} sT: ${referido.staterPack}`);
                }
                if (cantidadWallet >= 2500) {
                    silver++;
                    console.log(`  userNameS: ${referido.userName} sT: ${referido.staterPack}`);
                }
            };

            const broncesActual = Math.floor(bronce / 3);
            const silversActual = Math.floor(silver / 3);
            console.log("ususarios bronce", bronce)
            console.log("ususarios silver", silver)
            console.log("bonos bronce dados", broncesActual)
            console.log("bonos silver dados", silversActual)


            if (broncesActual > userData.countBonoFT.bronce && bronce >= 3) {
                updateUserByFirebaseKey(100, "Bronze fast track bonus", true)
                console.log(userData.countBonoFT.bronce)
            }

            if (silversActual > userData.countBonoFT.silver && silver >= 3) {
                //updateUserByFirebaseKey(500, "Silver fast track bonus", false);
                console.log(userData.countBonoFT.silver)
            }
        }

        const getFechaConFormato = (fechaRegistroTimestamp) => {
            let fechaRegistro;

            if (!fechaRegistroTimestamp) {
                fechaRegistro = new Date();
            } else {
                const [dia, mes, año] = fechaRegistroTimestamp.split('-');
                fechaRegistro = new Date(`${año}-${mes}-${dia}`);
            }

            const diaFormateado = String(fechaRegistro.getDate()).padStart(2, '0');
            const mesFormateado = String(fechaRegistro.getMonth() + 1).padStart(2, '0');
            const añoFormateado = fechaRegistro.getFullYear();
            return new Date(`${mesFormateado}-${diaFormateado}-${añoFormateado}`);
        };

        const verificarFecha = () => {
            const fechaRegistroTimestamp = userData.admissionDate;
            const fechaRegistro = getFechaConFormato(fechaRegistroTimestamp)
            const fechaActual = getFechaConFormato()

            const diferenciaTiempo = fechaActual - fechaRegistro;
            const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

            if (diferenciaDias <= 45) {
                verificarBonos();
                console.log("si paso")
            } else {
                console.log("no paso", diferenciaDias)
                console.log("fecha registro", fechaRegistro)
                console.log("fecha hoy", fechaActual)
            }

        }

        verificarFecha()
    }

    bonoReferenciaDirecta = async (userData) => {

        const commom = new Common()
        const bono = [10, 40, 75, 125, 250]
        const st = this.determinarPaquete(userData.staterPack)
        let fa = userData.firtsAdd

        if (st < fa) {
            console.log("error al aplicar el bono st>fa")
            return userData
        }

        while (fa != st) {
            let patrocinadorData = await commom.getUserDataByName(userData.referredBy)
            if(patrocinadorData===null){
                return userData
            }

            const deudaResult = this.verificarDeuda(patrocinadorData, bono[fa], "direct referral bonus")

            if (!deudaResult.success) {
                patrocinadorData.walletCom += bono[fa]
                patrocinadorData.walletTotal += bono[fa];
                console.log("no deuda")
            } else {
                patrocinadorData = deudaResult.patrocinadorData
                console.log("deuda")
            }
            /*console.log(bono[fa])
            console.log(patrocinadorData)*/
            patrocinadorData.bonoRefDirect += bono[fa]

            await commom.editAnyUser(patrocinadorData).then(() => {
                commom.saveInHistory(patrocinadorData.userName, bono[fa], "direct referral bonus", userData.userName, "", deudaResult.success)
            })
            fa++
            console.log(fa)
        }
        //console.log("salio del ciclo")

        userData.firtsAdd = st
        return userData
    }

    determinarPaquete = (valor) => {
        switch (true) {
            case (valor >= 100 && valor <= 499):
                return 1;
            case (valor >= 500 && valor <= 2499):
                return 2;
            case (valor >= 2500 && valor <= 4999):
                return 3;
            case (valor >= 5000 && valor <= 9999):
                return 4;
            case (valor >= 10000):
                return 5;
            default:
                return 0;
        }
    }

}

export default Bonos