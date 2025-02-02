export const getDifferences = (original, actualizable) => {
    const differences = {};

    for (const key in original) {
        if (original.hasOwnProperty(key)) {
            const value1 = original[key];
            const value2 = actualizable[key];

            if (typeof value1 === 'object' && value1 !== null && value2 !== null) {
                // Comparar objetos anidados recursivamente
                const nestedDiff = getDifferences(value1, value2);
                if (Object.keys(nestedDiff).length > 0) {
                    differences[key] = nestedDiff;
                }
            } else if (value1 !== value2) {
                // Si son valores primitivos y diferentes
                differences[key] = value2;
            }
        }
    }

    return differences;
}

export const changeState = (state, path, value) => {
    state = {
        ...state,
        [path]: value
    }
    return state
}

export const generarOpciones = (op) => {
    switch (op) {
        case 1:
            return [0, 100, 200, 300, 400]
        case 2:
            return [0, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600,
                1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400
            ]
        case 3:
            return [0, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500,
                3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700,
                4800, 4900
            ]
        case 4:
            return [5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000,
                6100, 6200, 6300, 6400, 6500, 6600, 6700, 6800, 6900, 7000, 7100, 7200,
                7300, 7400, 7500, 7600, 7700, 7800, 7900, 8000, 8100, 8200, 8300, 8400,
                8500, 8600, 8700, 8800, 8900, 9000, 9100, 9200, 9300, 9400, 9500, 9600,
                9700, 9800, 9900,
            ]
        default:
            return [0]
    }
}

export const changeStateLocal = (setState, name, value) => {
    setState(prev => ({
        ...prev,
        [name]: value
    }))
}

export const getFechaHora = () => {
    const ahora = new Date();

    // Obtener día, mes y año
    const dia = ahora.getDate().toString().padStart(2, '0');
    const mes = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11
    const año = ahora.getFullYear();

    // Formatear la fecha
    const fecha = `${dia}/${mes}/${año}`;

    // Obtener horas y minutos
    let horas = ahora.getHours();
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'pm' : 'am';

    // Convertir a formato 12 horas
    horas = horas % 12 || 12;

    // Formatear la hora
    const hora = `${horas}:${minutos} ${ampm}`;

    return { fecha, hora };
}