import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

class WelcomeEmail {
    constructor(email,code) {
        this.code = code
        this.email=email
    }

    sendEmail = () => {
        emailjs.send("service_033kgeg", "template_20tw3vi", {
            code: this.code,
            from_name:this.email,
        },{
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
};

export default WelcomeEmail;