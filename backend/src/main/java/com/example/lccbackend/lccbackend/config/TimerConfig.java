package com.example.lccbackend.lccbackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.example.lccbackend.lccbackend.helpers.BonosHelper;
import com.example.lccbackend.lccbackend.helpers.InteresCompuestoHelper;
import com.example.lccbackend.lccbackend.services.Email.EmailService;

@SpringBootApplication
@EnableScheduling
public class TimerConfig {

    @Autowired
    private BonosHelper bonosService;

    @Autowired
    private InteresCompuestoHelper icService;

    @Autowired
    private EmailService emailService;

    @Scheduled(cron = "0 0 0 * * ?")
    public void bonosDeEjecucionDIaria() {
        bonosService.dividendoDiario();
        bonosService.bonoIgualacion();
        bonosService.cobroMensualidad();
        icService.asignarInteresCompuesto();

        System.out.println("/////////////////////////////");
    }

    @Scheduled(cron = "0 0 0 1 * ?")
    public void bonoRango() {
        bonosService.bonoRangoResidual();
        System.out.println("////////////////////////////");
    }

    @Scheduled(cron = "0 * * * * ?")
    public void interes() {
        emailService.reintentarEnviosFallidos();
    }
}
