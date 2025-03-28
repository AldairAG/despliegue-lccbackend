package com.example.lccbackend.lccbackend.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.helpers.BonosHelper;
import com.example.lccbackend.lccbackend.helpers.InteresCompuestoHelper;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/lcc/bonos")
public class BonoController {
    @Autowired
    BonosHelper bonosService;
    
    @Autowired
    InteresCompuestoHelper helper;

    @GetMapping("/brs")
    public ResponseEntity<?> ejecutarRangoRes() {
        try {
            bonosService.bonoRangoResidual();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error " + e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/cm")
    public ResponseEntity<?> ejecutaBonorMensualidad() {
        try {
            bonosService.cobroMensualidad();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error " + e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/mb")
    public ResponseEntity<?> ejecutarMatching() {
        try {
            bonosService.bonoIgualacion();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error " + e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/dd")
    public ResponseEntity<?> ejecutarDividendoDiario() {
        try {
            bonosService.dividendoDiario();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error " + e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/ic")
    public ResponseEntity<?> ejecutarInteresCompuesto() {
        try {
            helper.asignarInteresCompuesto();
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error " + e.getMessage());

            Map<String, Object> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

}
