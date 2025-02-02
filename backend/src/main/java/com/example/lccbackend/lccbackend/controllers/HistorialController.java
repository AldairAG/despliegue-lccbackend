package com.example.lccbackend.lccbackend.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.model.entities.Historial;
import com.example.lccbackend.lccbackend.model.entities.Usuario;
import com.example.lccbackend.lccbackend.request.migracion.HistorialDTO;
import com.example.lccbackend.lccbackend.services.historial.HistorialService;
import com.example.lccbackend.lccbackend.services.user.UserService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
   
@RestController
@CrossOrigin(origins = "http://vps-4676674-x.dattaweb.com")
@RequestMapping("/lcc/hist")
public class HistorialController {
    @Autowired
    HistorialService service;
    @Autowired
    UserService userService;

    @GetMapping("/getByTipo/{tipo}/{username}")
    public ResponseEntity<List<Historial>> getHistorialByTipo(@PathVariable String tipo,
            @PathVariable String username) {
        try {

            List<Historial> listHistorial = service.findByTipo(tipo, username);
            if (listHistorial.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(listHistorial);

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/saveFB")
    public ResponseEntity<?> saveHistorialFB(@RequestBody List<HistorialDTO> listTransaccion) {
        try {
            listTransaccion.forEach(transaccion -> {
                Optional<Usuario> o = userService.findByUsername(transaccion.getUsername());
                if (o.isPresent()) {
                    Usuario user = o.get();

                    Historial newHist = new Historial();
                    newHist.setBeneficiario(transaccion.getBeneficiario());
                    newHist.setEmisor(transaccion.getEmisor());
                    newHist.setEstado(transaccion.getEstado());
                    newHist.setFecha(convertToDate(transaccion.getFecha()));
                    newHist.setHora(transaccion.getHora());
                    newHist.setMonto(transaccion.getMonto());
                    newHist.setTipo(transaccion.getTipo());
                    newHist.setUsuario(user);

                    user.addHistorico(newHist);
                    userService.save(user);
                }
            });
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    public static Date convertToDate(String inputDate) {
        try {
            String inputFormat = "dd/MM/yyyy";  // Formato original
            String outputFormat = "yyyy-MM-dd"; // Formato deseado
            // Parsear la fecha usando el formato de entrada
            SimpleDateFormat inputFormatter = new SimpleDateFormat(inputFormat);
            Date parsedDate = inputFormatter.parse(inputDate);

            // Formatear la fecha al formato de salida
            SimpleDateFormat outputFormatter = new SimpleDateFormat(outputFormat);
            String formattedDateStr = outputFormatter.format(parsedDate);

            // Convertir la fecha formateada a un objeto Date
            return outputFormatter.parse(formattedDateStr);

        } catch (ParseException e) {
            System.err.println("Error al convertir la fecha: " + e.getMessage());
            return null;
        }
    }

    @GetMapping("/getByAbono/{username}")
    public ResponseEntity<List<Historial>> getHistorialByAbono(@PathVariable String username) {
        try {
            List<Historial> listHistorial = service.findByAbono(username);
            if (listHistorial.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(listHistorial);

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }



    
}
