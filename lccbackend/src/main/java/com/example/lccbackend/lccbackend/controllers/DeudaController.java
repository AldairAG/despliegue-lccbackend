package com.example.lccbackend.lccbackend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.model.entities.Deuda;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.request.DeudaRequest;
import com.example.lccbackend.lccbackend.services.deuda.DeudaService;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/lcc/deuda")
public class DeudaController {
    @Autowired
    private DeudaService service;
    @Autowired
    private WalletService walletService;

    @PostMapping
    public ResponseEntity<Deuda> save(@RequestBody DeudaRequest newDeuda) {
        try {
            Optional<Wallet> wallet = walletService.findById(newDeuda.getId());
            if (wallet.isPresent()) {

                Deuda deuda = new Deuda();
                deuda.setWallet_deuda(newDeuda.getWalletDeuda());
                deuda.setDeuda(newDeuda.getDeuda());
                deuda.setWallet(wallet.get());

                return ResponseEntity.status(HttpStatus.OK).body(service.save(deuda));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody DeudaRequest newDeuda) {
        try {
            Optional<Deuda> deuda = service.getDeudaByWalletId(id);
            if (deuda.isPresent()) {
                Deuda deudaEdit=service.editar(newDeuda, deuda.get());
                return ResponseEntity.status(HttpStatus.OK).body(deudaEdit);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }

    }
}
