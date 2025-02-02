package com.example.lccbackend.lccbackend.services.Email;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.lccbackend.lccbackend.constant.EMAIL_CREDENCIALES;
import com.example.lccbackend.lccbackend.constant.EMAIL_TEMPLATES;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {
    private final List<Map<String, Object>> listaDeReintentos = new ArrayList<>();

    private String sendEmail(Map<String, String> templateParams, String template) {
        RestTemplate restTemplate = new RestTemplate();

        // Construir el cuerpo de la solicitud
        Map<String, Object> payload = new HashMap<>();
        payload.put("service_id", EMAIL_CREDENCIALES.SERVICE_ID);
        payload.put("template_id", template);
        payload.put("user_id", EMAIL_CREDENCIALES.USER_ID);
        payload.put("accessToken", EMAIL_CREDENCIALES.ACCESS_TOKEN);
        payload.put("template_params", templateParams);

        // Configurar los encabezados
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    EMAIL_CREDENCIALES.EMAILJS_URL,
                    HttpMethod.POST,
                    request,
                    String.class);

            return response.getBody();
        } catch (Exception e) {
            System.err.println("Error al enviar el email: " + e.getMessage());

            // Guardar en la lista de reintentos si falla
            Map<String, Object> intentoFallido = new HashMap<>();
            intentoFallido.put("templateParams", templateParams);
            intentoFallido.put("template", template);
            listaDeReintentos.add(intentoFallido);

            return null;
        }
    }

    public void reintentarEnviosFallidos() {
        System.out.println("Reintentando envíos fallidos...");
        Iterator<Map<String, Object>> iterator = listaDeReintentos.iterator();

        while (iterator.hasNext()) {
            Map<String, Object> emailFallido = iterator.next();
            Map<String, String> templateParams = (Map<String, String>) emailFallido.get("templateParams");
            String template = (String) emailFallido.get("template");
            System.out.println(templateParams.get("email"));

            String resultado = sendEmail(templateParams, template);
            if (resultado != null) {
                iterator.remove(); // Si se envió correctamente, eliminar de la lista
                System.out.println("Email enviado correctamente tras reintento.");
            } else {
                System.out.println("Reintento fallido. Se mantiene en la lista.");
            }
        }
    }

    public void sendEmailWelcome(String username,String password,String email) {
        // Variables de la plantilla
        Map<String, String> templateParams = new HashMap<>();
        templateParams.put("username", username);
        templateParams.put("password", password);
        templateParams.put("destinatario", email);

        sendEmail(templateParams, EMAIL_TEMPLATES.BIENVENIDA);
    }

    public void sendEmailVerificacion(String code,String email) {
        // Variables de la plantilla
        Map<String, String> templateParams = new HashMap<>();
        templateParams.put("code", code);
        templateParams.put("from_name", email);
        //templateParams.put("email", email);

        sendEmail(templateParams, EMAIL_TEMPLATES.VERIFICACION);
    }

    public void sendEmailSupport(String motivo,String mensaje,String username) {
        // Variables de la plantilla
        Map<String, String> templateParams = new HashMap<>();
        templateParams.put("username", username);
        templateParams.put("mensaje", mensaje);
        templateParams.put("motivo", motivo);

        sendEmail(templateParams, EMAIL_TEMPLATES.SUPPORT);
    }

    public void sendEmailRetiro(Float monto,String email) {
        // Variables de la plantilla
        Map<String, String> templateParams = new HashMap<>();
        templateParams.put("monto", monto.toString());
        templateParams.put("destinatario", email);

        sendEmail(templateParams, EMAIL_TEMPLATES.RETIRO);
    }

    public void sendEmailRecovery(String code,String email) {
        // Variables de la plantilla
        Map<String, String> templateParams = new HashMap<>();
        templateParams.put("code", code);
        templateParams.put("destinatario", email);

        sendEmail(templateParams, EMAIL_TEMPLATES.RECOVERY);
    }







}
