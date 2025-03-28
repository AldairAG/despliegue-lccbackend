package com.example.lccbackend.lccbackend.helpers;

import com.example.lccbackend.lccbackend.constant.Permisos;
import com.example.lccbackend.lccbackend.constant.PeticionTipos;
import com.example.lccbackend.lccbackend.model.DTO.BonoIgualacionDTO;
import com.example.lccbackend.lccbackend.model.DTO.DeudaResponse;
import com.example.lccbackend.lccbackend.model.DTO.DividendoDiarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.MyNetDTO;
import com.example.lccbackend.lccbackend.model.DTO.RangoResDTO;
import com.example.lccbackend.lccbackend.model.entities.Deuda;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.services.deuda.DeudaService;
import com.example.lccbackend.lccbackend.services.permiso.PermisoService;
import com.example.lccbackend.lccbackend.services.user.UserService;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BonosHelper {
    @Autowired
    UserService service;

    @Autowired
    WalletService walletService;

    @Autowired
    PermisoService permisoService;

    @Autowired
    DeudaService deudaService;

    private Float multiplicadorasDeBono[] = { 0.1f, .05f, .02f, .01f, .01f, .005f, .005f };
    private int capitalNecesario[] = { 20000, 60000, 150000, 500000, 1000000, 2000000, 5000000, 15000000, 50000000 };
    private int bonoRD[] = { 10, 40, 75, 125, 250 };
    private Float[] porcentajes = { .1f, .05f, .02f, .01f, .01f, .005f, .005f };

    // REFERENCIA DIRECTA
    private int determinarPaquete(Float valor) {
        if (valor >= 100 && valor <= 499)
            return 1;
        if (valor >= 500 && valor <= 2499)
            return 2;
        if (valor >= 2500 && valor <= 4999)
            return 3;
        if (valor >= 5000 && valor <= 9999)
            return 4;
        if (valor >= 10000)
            return 5;

        return 0;
    }

    public void bonoReferecniaDirecta(Wallet walletUserRef, String username) {
        Wallet walletPatrocinador = walletService.findWalletByUsername(username);

        if (walletPatrocinador == null)
            return;

        Float acumunlado = 0f;
        int st = determinarPaquete(walletUserRef.getStaterpack());
        int stUpdate = walletUserRef.getBonos().getUpdate_st();

        if (st < stUpdate)
            return;

        while (stUpdate != st) {
            Deuda deuda = deudaService.getDeudaByWalletId(walletPatrocinador.getDeuda().getDeuda_id()).get();
            DeudaResponse deudaResponse = deudaService.existDeuda(deuda, (float) bonoRD[stUpdate],
                    walletPatrocinador.getWallet_id());

            acumunlado += deudaResponse.getExcedente();
            // guardar en historial//
            service.saveHistorial(username, PeticionTipos.BONO_REFERENCIA_DIRECTA, (float) bonoRD[stUpdate], null, null,
                    walletUserRef.getUsuario().getUsername(), null, deudaResponse.getAbono());

            stUpdate++;
        }

        walletPatrocinador.setWallet_com(walletPatrocinador.getWallet_com() + acumunlado);
        walletPatrocinador.setGanancia_total(walletPatrocinador.getGanancia_total() + acumunlado);
        walletPatrocinador.getBonos().setRef_direct(walletPatrocinador.getBonos().getRef_direct() + acumunlado);
        walletService.updateWallet(username, walletPatrocinador);

        // actualizar stupdate
        walletUserRef.getBonos().setUpdate_st(stUpdate);
        walletService.updateWallet(walletUserRef.getUsuario().getUsername(), walletUserRef);
    }

    // FASTTRACK
    public boolean aplicaBonoFastrack(String fechaRegistroPatrocinador) {
        String fechaStr = fechaRegistroPatrocinador;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Cambiar el formato

        // Parsear la fecha de entrada
        LocalDate fechaIngresada = LocalDate.parse(fechaStr, formatter);

        // Obtener la fecha actual
        LocalDate fechaActual = LocalDate.now();

        // Calcular la diferencia en días
        long diasDiferencia = ChronoUnit.DAYS.between(fechaIngresada, fechaActual);

        // Verificar si pasaron más de 45 días
        if (diasDiferencia > 45) {
            System.out.println("Han pasado más de 45 días.");
            return false;
        } else {
            System.out.println("Aún no han pasado 45 días.");
            return true;
        }
    }

    public void bonoFasttrack(String username) {
        AtomicInteger silver = new AtomicInteger(0);
        AtomicInteger bronce = new AtomicInteger(0);
        Wallet wallet = walletService.findWalletByUsername(username);

        if (wallet == null)
            return;

        findReferidos(1, username, bronce, silver);

        int broncesActual = bronce.get() / 3;
        int silversActual = silver.get() / 3;

        System.out.println(broncesActual);
        System.out.println(bronce.get());

        if (broncesActual > bronce.get() && bronce.get() >= 3) {
            asignarBonoFT(wallet, 100f, PeticionTipos.BONO_FAST_TRACK_BRONCE, broncesActual);
        }

        if (silversActual > silver.get() && silver.get() >= 3) {
            asignarBonoFT(wallet, 500f, PeticionTipos.BONO_FAST_TRACK_SILVER, silversActual);
        }
    }

    private void findReferidos(int nivel, String username, AtomicInteger bronce, AtomicInteger silver) {
        if (nivel > 7)
            return;

        List<MyNetDTO> referidosList = service.findReferidosMyNet(username);

        if (referidosList.isEmpty())
            return;

        for (MyNetDTO referido : referidosList) {
            Float cantidadWallet = referido.getStaterpack();

            if (cantidadWallet >= 500 && cantidadWallet < 2500) {
                bronce.incrementAndGet(); // Incrementa de forma atómica
                System.out.println(cantidadWallet);
                System.out.println(bronce.get());
            }

            if (cantidadWallet >= 2500) {
                silver.incrementAndGet(); // Incrementa de forma atómica
            }

            findReferidos(nivel + 1, referido.getUsername(), bronce, silver);
        }
    }

    private void asignarBonoFT(Wallet wallet, Float bono, String tipo, int nuevoContador) {

        if (tipo.equals("bronce")) {
            wallet.getBonos().setContador_ft_bronce(nuevoContador);
        }
        if (tipo.equals("silver")) {
            wallet.getBonos().setContador_ft_silver(nuevoContador);
        }
        DeudaResponse deudaResponse = deudaService.existDeuda(wallet.getDeuda(), bono, wallet.getWallet_id());

        service.saveHistorial(wallet.getUsuario().getUsername(), PeticionTipos.BONO_FAST_TRACK, 500f, tipo,
                null, null, null, deudaResponse.getAbono());

        wallet.setWallet_com(wallet.getWallet_com() + deudaResponse.getExcedente());
        wallet.getBonos().setFast_track(wallet.getBonos().getFast_track() + bono);
        walletService.updateWallet(wallet.getUsuario().getUsername(), wallet);
    }

    // RANGO RESIDUAL
    private int calcularBonoRangoResidual(int rango) {
        switch (rango) {
            case 1:
                return 200;
            case 2:
                return 600;
            case 3:
                return 1500;
            case 4:
                return 5000;
            case 5:
                return 10000;
            case 6:
                return 20000;
            case 7:
                return 40000;
            case 8:
                return 100000;
            case 9:
                return 250000;
            default:
                return 0;
        }
    }

    public void bonoRangoResidual() {
        List<RangoResDTO> usersList = walletService.findRangosForBono();

        for (RangoResDTO usuario : usersList) {
            Wallet wallet = walletService.findWalletByUsername(usuario.getUsername());
            int bono = calcularBonoRangoResidual(usuario.getRango());

            DeudaResponse deudaResponse = deudaService.existDeuda(wallet.getDeuda(), (float) bono,
                    wallet.getWallet_id());

            wallet.setWallet_com(wallet.getWallet_com() + deudaResponse.getExcedente());
            wallet.setGanancia_total(wallet.getGanancia_total() + bono);
            wallet.getBonos().setRango_res(wallet.getBonos().getRango_res() + bono);

            System.out.println(usuario.getUsername() + " bono: " + bono);
            walletService.updateWallet(usuario.getUsername(), wallet);

            // guardar en historial
            service.saveHistorial(usuario.getUsername(), PeticionTipos.BONO_RANGO_RESIDUAL, (float) bono, null,
                    null, null, null, deudaResponse.getAbono());
        }
    }

    public void asignarBonoRangoResidual(String username) {
        // posible optimizacion obteniedno solo lo necesario con DTO
        Wallet wallet = walletService.findWalletByUsername(username);

        if (wallet == null)
            return;

        Float limite = (float) (capitalNecesario[wallet.getRango()] / 2);
        Float capitalTeam = 0f;

        List<String> referidosList = walletService.findReferidosByUsername(username);

        if (referidosList.size() < 3)
            return;

        capitalTeam = referidosList.stream().map(referido -> {
            Float capitalLine = getTeamCapitalOfLine(1, referido);
            Float staterpack = walletService.findStaterPackByUsername(referido);
            Float capitalTeamLocal = 0f;
            capitalLine += staterpack;
            if (capitalLine > limite) {
                System.out.println("Capital por linea:" + capitalLine + " Capital team: " + capitalTeamLocal);
                return capitalTeamLocal = +limite;
            } else {
                System.out.println("Capital por linea:" + capitalLine + " Capital team: " + capitalTeamLocal);
                return capitalTeamLocal = +capitalLine;
            }
        }).reduce(0f, Float::sum);

        System.out.println(capitalTeam);
        if (capitalTeam > capitalNecesario[wallet.getRango()]) {
            wallet.setRango(wallet.getRango() + 1);
            walletService.updateWallet(username, wallet);
        }

    }

    private Float getTeamCapitalOfLine(int nivel, String username) {
        if (nivel > 6)
            return 0f;

        List<String> referidosList = walletService.findReferidosByUsername(username);

        return referidosList.stream().map(referido -> {
            Float staterpack = walletService.findStaterPackByUsername(referido);
            Float lineCapital = getTeamCapitalOfLine(nivel + 1, referido);
            System.out.println(referido + " lineCap: " + lineCapital + " st: " + staterpack);

            return lineCapital + staterpack;
        }).reduce(0f, Float::sum);
    }

    // DIVIDENDO DIARIO
    private Float calcularDividendoDiario(Float monto) {
        Float porcentaje = 0f;

        if (monto >= 100 && monto <= 499) {
            porcentaje = 0.0017F;// 5%
        } else if (monto >= 500 && monto <= 2499) {
            porcentaje = 0.0017F;// 5%
        } else if (monto >= 2500 && monto <= 4999) {
            porcentaje = 0.0021F;// 6%
        } else if (monto >= 5000 && monto <= 9999) {
            porcentaje = 0.0021F;// 6%
        } else {
            porcentaje = 0.0025F;// 7%
        }

        return porcentaje;
    }

    public void dividendoDiario() {
        try {
            List<DividendoDiarioDTO> list = walletService.findDatForDividendoDiario();

            list.forEach(user -> {

                Optional<Boolean> permiso = permisoService.findActivoByPermisoName(Permisos.RECIBIR_MATCHING,
                        user.getUsername());
                if (permiso.isPresent() && !permiso.get()) {
                    return;
                }

                Wallet wallet = walletService.findWalletByUsername(user.getUsername());
                Float dividendo = calcularDividendoDiario(user.getStaterpack());
                Float bono = dividendo * user.getStaterpack();

                wallet.getBonos().setDividendo_diario(bono);
                wallet.setWallet_div(wallet.getWallet_div() + bono);
                wallet.setGanancia_total(wallet.getGanancia_total() + bono);

                walletService.updateWallet(user.getUsername(), wallet);

                System.out.println("name: " + user.getUsername());
                System.out.println("ganado: " + wallet.getBonos().getDividendo_diario());

                service.saveHistorial(user.getUsername(), PeticionTipos.DIVIDENDO_DIARIO, bono, null, null, null, null,
                        false);
            });
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // BONO DE IGUALACION//optimizable quitando el dto y cambiando por username
    public void bonoIgualacion() { 
        try {
            List<BonoIgualacionDTO> DTOs = walletService.findDataForBonoIgualacion();

            service.findAllusernamesList().forEach(username -> {
                System.out.println("/////////////////");
                System.out.println(username);

                Wallet wallet = walletService.findWalletByUsername(username);

                Float sumaTotal = calcularBonoIgualacion(username, 1, wallet);
                System.out.println("suma total:" + sumaTotal);

                BonoIgualacionDTO dto = DTOs.stream().filter(d -> d.getUsername().equals(username)).findFirst().get();

                DeudaResponse deudaResponse = deudaService.existDeuda(wallet.getDeuda(), (float) sumaTotal,
                        wallet.getWallet_id());
                
                if(deudaResponse.getAbono()){
                    service.saveHistorial(wallet.getUsuario().getUsername(), PeticionTipos.BONO_MATCHING, deudaResponse.getExcedente(),
                                null, null,null, null, false);
                }

                wallet.setWallet_com(wallet.getWallet_com() + deudaResponse.getExcedente());

                wallet.getBonos().setMatching(dto.getMatching() + sumaTotal);
                wallet.setGanancia_total(dto.getGanancia_total() + sumaTotal);
                walletService.updateWallet(username, wallet);
            });
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    private Float calcularBonoIgualacion(String username, int nivel, Wallet wallet) {
        if (nivel > 7) {
            return 0f;
        }

        // Porcentajes por nivel
        Float porcentaje = porcentajes[nivel - 1];

        // Calcular el bono acumulado para los referidos
        return walletService.findReferidosByUsername(username).stream()
                .map(referido -> {
                    Float bono = walletService.findDividendoDiarioByUsername(referido) * porcentaje;
                    Float bonoSiguiente = calcularBonoIgualacion(referido, nivel + 1, wallet);

                    System.out.println(referido + " LV." + nivel + " bono: " + bono);

                    if (bono != 0) {

                        service.saveHistorial(wallet.getUsuario().getUsername(), PeticionTipos.BONO_MATCHING, bono,
                                null, null,
                                referido + " LV." + nivel, null, false);
                    }

                    return bono + bonoSiguiente;
                }).reduce(0f, Float::sum);
    }

    // COBRO DE MENSUALIDAD
    private Date nuevaFecha() {
        LocalDate fechaActual = LocalDate.now(); // Obtiene la fecha actual
        LocalDate nuevaFechaPago = fechaActual.plusMonths(1); // Suma un mes

        return Date.from(nuevaFechaPago.atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    public void cobroMensualidad() {
        try {
            walletService.findDataForPagoMensualidad().forEach(user -> {
                System.out.println(user.getUsername());
                if (user.getWallet_div() >= 25) {
                    System.out.println("pago");
                    Wallet wallet = walletService.findWalletByUsername(user.getUsername());

                    wallet.setWallet_div(user.getWallet_div() - 25);
                    wallet.setMensualidad(nuevaFecha());
                    walletService.updateWallet(user.getUsername(), wallet);

                    service.saveHistorial(user.getUsername(), PeticionTipos.PAGO_MANTENIMIENTO, (float) -25, null, null,
                            null, null, false);

                    bonoMensualidad(user.getReferido(), 1, user.getUsername());
                }
            });
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // BONO DE MENSUALIDAD
    private void bonoMensualidad(String username, int nivel, String propietario) {
        if (nivel > 7) {
            return;
        }
        System.out.println(username);
        Wallet wallet = walletService.findWalletByUsername(username);

        if (wallet == null)
            return;

        Float bono = 25 * multiplicadorasDeBono[nivel - 1];

        DeudaResponse deudaResponse = deudaService.existDeuda(wallet.getDeuda(), (float) bono, wallet.getWallet_id());

        wallet.setWallet_com(wallet.getWallet_com() + deudaResponse.getExcedente());
        wallet.getBonos().setMembresia_mensual(wallet.getBonos().getMembresia_mensual() + bono);
        wallet.setGanancia_total(wallet.getGanancia_total() + bono);

        walletService.updateWallet(username, wallet);
        System.out.println(username + " bono: " + bono);

        service.saveHistorial(username, PeticionTipos.BONO_PAGO_MANTENIMIENTO, bono, null, propietario + " LV." + nivel,
                null, null, deudaResponse.getAbono());
        bonoMensualidad(wallet.getReferido(), nivel + 1, propietario);

    }

}
