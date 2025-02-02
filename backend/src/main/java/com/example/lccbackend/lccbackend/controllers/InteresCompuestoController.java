package com.example.lccbackend.lccbackend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.model.entities.InteresCompuesto;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.request.IcRequest;
import com.example.lccbackend.lccbackend.services.InteresCompuesto.InteresCompuestoService;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://vps-4676674-x.dattaweb.com")
@RequestMapping("/lcc/user")
public class InteresCompuestoController {
    @Autowired
    InteresCompuestoService service;
    @Autowired
    WalletService walletService;

    @PostMapping("/ic/save")
    public ResponseEntity<?> postMethodName(@RequestBody IcRequest request) {
        try {
            if (request.getId()==null) {
                InteresCompuesto ic = new InteresCompuesto();
                ic.setActivo(request.getActivo());
                ic.setAcumulado(0f);
                ic.setFecha_fin(request.getFecha_fin());
                ic.setTipo(request.getTipo());

                // Asignar la Wallet correspondiente
                Optional<Wallet> walletOptional = walletService.findById(request.getWallet_id());
                if (walletOptional.isPresent()) {
                    ic.setWallet(walletOptional.get());
                    walletOptional.get().getInteresCompuesto().add(ic);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Wallet no encontrada");
                }

                service.updateInteresCompuesto(ic);
                return ResponseEntity.status(HttpStatus.OK).body(null);
            }

            Optional<InteresCompuesto> o = service.findIcById(request.getId());
            if (o.isPresent()) {
                InteresCompuesto ic = o.get();
                ic.setActivo(request.getActivo());
                service.updateInteresCompuesto(ic);
                return ResponseEntity.status(HttpStatus.OK).body(null);
            } 

            return ResponseEntity.status(400).body(null);

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(400).body(null);
        }
    }

}
