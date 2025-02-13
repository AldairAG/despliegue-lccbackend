package com.example.lccbackend.lccbackend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.model.ecomerceEntities.Orden;
import com.example.lccbackend.lccbackend.services.ecomerceService.EcomerceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/lcc/ec")
public class OrdenController {
    @Autowired
    EcomerceService service;

    @GetMapping("/getOrdenes")
    public ResponseEntity<List<Orden>> getOrdenes() {
        try {
            List<Orden> list = service.findAllOrdenes();
            if (list.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(list);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/getOrdenesById/{id}")
    public ResponseEntity<Orden> getOrdenesById(@PathVariable Long id) {
        try {
            Optional<Orden> orden = service.findOrdenById(id);
            if (!orden.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.OK).body(orden.get());
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/saveOrden")
    public ResponseEntity<Orden> saveOrden(@RequestBody Orden newOrden) {
        try {
            Orden orden = service.crearOrden(newOrden);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orden);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PatchMapping("/editOrden")
    public ResponseEntity<Optional<Orden>> editOrden(@RequestBody Orden newOrden) {
        try {
            Optional<Orden> orden = service.editOrden(newOrden.getId(), newOrden);
            if (!orden.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(orden);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
