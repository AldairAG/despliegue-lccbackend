package com.example.lccbackend.lccbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/lcc/wallet")
@CrossOrigin(origins = "*")
public class WalletController {
    @Autowired
    private WalletService service;
    
    @PatchMapping("/{username}")
    public ResponseEntity<Wallet> putMethodName(@PathVariable String username, @RequestBody Wallet update) {
        try {
            Wallet wallet =service.updateWallet(username, update);
            return ResponseEntity.status(HttpStatus.CREATED).body(wallet);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
