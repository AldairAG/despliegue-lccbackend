import emailjs from '@emailjs/browser';

class Email {
    constructor(destinatario, plantilla) {
        this.destinatario = destinatario
        this.plantilla = plantilla
    }

    sendEmailSupport = (motivo,userName,mensaje) => {
        emailjs.send("service_033kgeg", this.plantilla, {
            from_name: this.destinatario,
            Motivo: motivo,
            UserName: userName,
            Mensaje: mensaje,
            reply_to: this.destinatario,
        }, {
            publicKey: '0wCoAjcnZT2N0PVfE',
        })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );

    };


}

export default Email