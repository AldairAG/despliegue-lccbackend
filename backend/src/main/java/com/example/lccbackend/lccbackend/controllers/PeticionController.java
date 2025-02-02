package com.example.lccbackend.lccbackend.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.constant.EstadosRetiros;
import com.example.lccbackend.lccbackend.constant.Permisos;
import com.example.lccbackend.lccbackend.constant.PeticionTipos;
import com.example.lccbackend.lccbackend.model.DTO.DestinatarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.PeticionDTO;
import com.example.lccbackend.lccbackend.model.entities.Peticion;
import com.example.lccbackend.lccbackend.model.entities.Usuario;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.request.PagoFacturaRequest;
import com.example.lccbackend.lccbackend.services.Email.EmailService;
import com.example.lccbackend.lccbackend.services.permiso.PermisoService;
import com.example.lccbackend.lccbackend.services.peticion.PeticionService;
import com.example.lccbackend.lccbackend.services.user.UserService;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;
import com.example.lccbackend.lccbackend.helpers.BonosHelper;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://vps-4676674-x.dattaweb.com/")
@RequestMapping("/lcc/peticion")
public class PeticionController {
    @Autowired
    PeticionService service;

    @Autowired
    WalletService walletService;

    @Autowired
    PermisoService permisoService;

    @Autowired
    UserService userService;

    @Autowired
    BonosHelper bonosHelper;

    @Autowired
    EmailService emailService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Peticion>> getAllPeticion() {
        try {
            List<Peticion> peticionList = service.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(peticionList);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/aprobar/{id}")
    public ResponseEntity<?> aprobar(@PathVariable Long id) {
        try {
            Optional<Peticion> o = service.findById(id);
            if (o.isPresent()) {
                Peticion peticion = o.get();

                if (peticion.getTipo().equals(PeticionTipos.STARTER_PACK) ||
                        peticion.getTipo().equals(PeticionTipos.PAGO_STARTER_PACK_FACTURA)) {
                    return aprobarPagoST(peticion);
                }

                if (peticion.getTipo().equals(PeticionTipos.RETIRO_WALLET_COMISION)
                        || peticion.getTipo().equals(PeticionTipos.RETIRO_WALLET_DIVIDENDO)) {
                    return aprobarRetiro(peticion, peticion.getTipo());
                }
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            System.out.println(e);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    private ResponseEntity<?> aprobarPagoST(Peticion peticion) {

        Float newMonto = 0f;
        Wallet wallet = walletService.findWalletByUsername(peticion.getUsuario().getUsername());

        // modificar datos de wallet
        String tipo = PeticionTipos.STARTER_PACK;
        newMonto = peticion.getMonto();

        if (peticion.getTipo().equals(PeticionTipos.PAGO_STARTER_PACK_FACTURA)) {
            newMonto = peticion.getMonto() * 2;
        }

        wallet.setStaterpack(wallet.getStaterpack() + newMonto);

        walletService.updateWallet(peticion.getUsuario().getUsername(), wallet);

        // calcular bonos
        bonosHelper.bonoReferecniaDirecta(wallet, peticion.getUsuario().getWallet().getReferido());
        bonosHelper.asignarBonoRangoResidual(peticion.getUsuario().getWallet().getReferido());

        Date fechaRegistroPatrocinador = walletService
                .findDateByUsername(peticion.getUsuario().getWallet().getReferido());

        if (fechaRegistroPatrocinador != null) {
            String fecha = fechaRegistroPatrocinador.toString();
            if (bonosHelper.aplicaBonoFastrack(fecha)) {
                bonosHelper.bonoFasttrack(peticion.getUsuario().getWallet().getReferido());
            }
        }

        // guardar en historial
        userService.saveHistorial(peticion.getUsuario().getUsername(), tipo, newMonto, null, null, null, null,false);
        // Eliminar peticion
        service.delete(peticion.getPeticion_id());
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    private void aprobarPagoMantenimiento() {

    }

    private ResponseEntity<?> aprobarRetiro(Peticion peticion, String tipo) {
        saveHistorialRetiro(peticion.getUsuario().getUsername(), peticion, tipo, EstadosRetiros.APROBADA);
        service.delete(peticion.getPeticion_id());
        emailService.sendEmailRetiro(peticion.getMonto(), peticion.getUsuario().getUsername());
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    private void saveHistorialRetiro(String username, Peticion newPeticion, String tipo, String status) {
        try {
            userService.saveHistorial(username, PeticionTipos.RETIRO, -newPeticion.getMonto(), tipo,
                    status, null, null,false);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public ResponseEntity<Peticion> denegar(Long id) {
        try {
            System.out.println(service.findTipoById(id));

            if (service.findTipoById(id).equals(PeticionTipos.RETIRO_WALLET_COMISION)
                    || service.findTipoById(id).equals(PeticionTipos.RETIRO_WALLET_DIVIDENDO)) {
                Optional<Peticion> o = service.findById(id);
                if (o.isPresent()) {
                    Peticion peticion = o.get();
                    saveHistorialRetiro(peticion.getUsuario().getUsername(), peticion, peticion.getTipo(),
                            EstadosRetiros.DENEGADA);
                    service.delete(id);
                }
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }

            service.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/findByTipo/{tipo}")
    public ResponseEntity<List<Peticion>> findByTipo(@PathVariable String tipo) {
        try {
            List<Peticion> peticionList = service.findByTipo(tipo);
            if (peticionList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

            return ResponseEntity.status(HttpStatus.OK).body(peticionList);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/findByTipos")
    public ResponseEntity<List<PeticionDTO>> findByTipos(@RequestBody List<String> tipos) {
        try {
            if (tipos.isEmpty())
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

            List<PeticionDTO> peticionList = service.findByTipos(tipos);

            if (peticionList.isEmpty())
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);

            return ResponseEntity.status(HttpStatus.OK).body(peticionList);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/findByCode/{code}")
    public ResponseEntity<Peticion> getPeticionParaPagar(@PathVariable String code) {
        try {
            Optional<Peticion> o = service.findPeticionByCode(code);
            if (o.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(o.get());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/findUserByPeticionId/{id}")
    public ResponseEntity<DestinatarioDTO> getDestinatarioByID(@PathVariable Long id) {
        try {
            String username = service.findUsernameById(id);
            Optional<DestinatarioDTO> o = userService.getDestinatarioData(username);
            if (o.isPresent()) {
                return ResponseEntity.ok().body(o.get());
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/pagarFactura/{id}")
    public ResponseEntity<?> pagarFactura(@PathVariable Long id, @RequestBody PagoFacturaRequest request) {
        try {
            Float nuevoSaldo = 0f;

            Optional<Usuario> o = userService.findByUsername(request.getUsernameBenefactor());
            if (!o.isPresent())
                return ResponseEntity.notFound().build();

            Usuario user = o.get();
            Wallet newWallet = user.getWallet();

            if (request.getWallet().equals("div")) {
                Optional<Boolean> permiso = permisoService.findActivoByPermisoName(Permisos.FACTURAR_DIV,
                        user.getUsername());
                if (permiso.isPresent() && !permiso.get())
                    return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();

                nuevoSaldo = newWallet.getWallet_div() - request.getMonto();
                newWallet.setWallet_div(nuevoSaldo);
            }

            if (request.getWallet().equals("com")) {
                nuevoSaldo = newWallet.getWallet_com() - request.getMonto();
                newWallet.setWallet_com(nuevoSaldo);
            }

            if (request.getWallet().equals("deuda")) {
                nuevoSaldo = newWallet.getDeuda().getWallet_deuda() - request.getMonto();
                newWallet.getDeuda().setWallet_deuda(nuevoSaldo);
            }

            walletService.updateWallet(user.getUsername(), newWallet);

            Optional<Usuario> oB = userService.findByUsername(request.getUsernameBeneficiario());
            if (oB.isPresent()) {
                Usuario beneficiario = o.get();

                Peticion peticion = new Peticion();
                peticion.setMonto(request.getMonto());
                peticion.setTipo(PeticionTipos.PAGO_STARTER_PACK_FACTURA);

                beneficiario.addPeticion(peticion);
                userService.putUpdate(beneficiario);
            }

            // agregar elimibar peticion
            service.delete(id);

            // guardar historial
            userService.saveHistorial(o.get().getUsername(), PeticionTipos.PAGO_FACTURA, -request.getMonto(),
                    request.getWallet(), null,
                    o.get().getUsername(), oB.get().getUsername(),false);
            userService.saveHistorial(oB.get().getUsername(), PeticionTipos.PAGO_FACTURA, request.getMonto(), null,
                    null, o.get().getUsername(), oB.get().getUsername(),false);

            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            return denegar(id);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/retiroPen/{username}")
    public ResponseEntity<Peticion> existRetiroPendiente(@PathVariable String username) {
        try {
            Optional<Peticion> o = service.existRetiroPendiente(username);
            System.out.println(username);
            if (o.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(o.get());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
