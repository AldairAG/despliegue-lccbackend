import img0 from "../Assets/Images/Logos/Logo_1pq.png"
import img1 from "../Assets/Images/Logos/rangos/rank-1.png"
import img2 from "../Assets/Images/Logos/rangos/Rank-2.png"
import img3 from "../Assets/Images/Logos/rangos/Rank-3.png"
import img4 from "../Assets/Images/Logos/rangos/Rank-4.png"
import img5 from "../Assets/Images/Logos/rangos/Rank-5.png"
import img6 from "../Assets/Images/Logos/rangos/Rank-6.png"
import img7 from "../Assets/Images/Logos/rangos/Rank-7.png"
import img8 from "../Assets/Images/Logos/rangos/Rank-8.png"
import img9 from "../Assets/Images/Logos/rangos/Rank-9.png"

export const calcularRango = (numero) => {
    switch (numero) {
        case 1:
            return { rango: "Zafiro Ejecutivo", imgRank: img1 }
        case 2:
            return { rango: "Ruby Ejecutivo", imgRank: img2 }
        case 3:
            return { rango: "Esmeralda Ejecutivo", imgRank: img3 }
        case 4:
            return { rango: 'Ejecutivo Diamante', imgRank: img4 }
        case 5:
            return { rango: "Diamante Azul", imgRank: img5 }
        case 6:
            return { rango: "Diamante Negro", imgRank: img6 }
        case 7:
            return { rango: "Diamante Royal", imgRank: img7 }
        case 8:
            return { rango: "Diamante Corona", imgRank: img8 }
        case 9:
            return { rango: "Presidente Royal", imgRank: img9 }
        default:
            return { rango: "No Rank", imgRank: img0 }
    }
}

export const calcularPaquete = (num) => {
    switch (true) {
        case num > 99 && num < 500:
            return "BUILDER";
        case num > 499 && num < 2500:
            return "BRONZE";
        case num > 2499 && num < 5000:
            return "SILVER";
        case num > 4999 && num < 10000:
            return "GOLD";
        case num >= 10000:
            return "PLATINUM";
        default:
            return "No pack";
    }
}