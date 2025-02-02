package com.example.lccbackend.lccbackend.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.model.entities.Permiso;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.request.NewPermisoRequest;
import com.example.lccbackend.lccbackend.request.migracion.PermisoRequest;
import com.example.lccbackend.lccbackend.services.permiso.PermisoService;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;

@RestController
@RequestMapping("/lcc/permiso")
public class PermisoController {
    @Autowired
    private PermisoService service;

    @Autowired
    private WalletService walletService;

    @PostMapping
    public ResponseEntity<Permiso> updatePermiso(@RequestBody NewPermisoRequest newPermiso) {
        try {
            Optional<Wallet> wallet = walletService.findById(newPermiso.getWalletId());
            if (wallet.isPresent()) {
                if (newPermiso.getPermiso_id() != null) {
                    Optional<Permiso> o = service.update(newPermiso.getPermiso_id());
                    if (o.isPresent()) {
                        System.out.println("permiso actualizado");
                        return ResponseEntity.status(HttpStatus.OK).body(o.get());
                    }
                }

                Permiso permiso = new Permiso();
                permiso.setActivo(newPermiso.isActivo());
                permiso.setPermisoName(newPermiso.getPermisoName());
                permiso.setWallet(wallet.get());
                service.save(permiso);

                return ResponseEntity.status(HttpStatus.OK).body(permiso);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/altaPermisos")
    public ResponseEntity<List<Permiso>> altaPermisos(@RequestBody List<PermisoRequest> requestList) {
        try {
            requestList.forEach(request -> {
                Wallet wallet = walletService.findWalletByUsername(request.getUsername());

                Permiso permiso=new Permiso();

                permiso.setActivo(request.getActivo());
                permiso.setPermisoName(request.getPermisoName());
                permiso.setWallet(wallet);

                service.save(permiso);
            });

            return ResponseEntity.status(HttpStatus.OK).build();

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
