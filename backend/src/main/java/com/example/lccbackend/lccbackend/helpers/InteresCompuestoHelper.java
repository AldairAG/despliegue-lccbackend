package com.example.lccbackend.lccbackend.helpers;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.lccbackend.lccbackend.constant.PeticionTipos;
import com.example.lccbackend.lccbackend.model.DTO.ICDTO;
import com.example.lccbackend.lccbackend.model.entities.InteresCompuesto;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.services.InteresCompuesto.InteresCompuestoService;
import com.example.lccbackend.lccbackend.services.user.UserService;
import com.example.lccbackend.lccbackend.services.wallet.WalletService;

import org.springframework.stereotype.Component;

@Component
public class InteresCompuestoHelper {

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private InteresCompuestoService service;

    public void asignarInteresCompuesto() {
        procesarInteres("com", service.findDataForIcCom());
        procesarInteres("div", service.findDataForIcDiv());
    }

    private void procesarInteres(String tipo, Iterable<ICDTO> wallets) {
        wallets.forEach(wallet -> {
            try {
                calcularInteresCompuesto(wallet, tipo);
            } catch (Exception e) {
                System.out.println(e);
            }
        });
    }

    private void calcularInteresCompuesto(ICDTO wallet, String tipo) {
        Wallet newWallet = walletService.findWalletByUsername(wallet.getUsername());
        System.out.println(wallet.getUsername());

        if ("com".equals(tipo)) {
            int interes = (int) (wallet.getWallet() / 100) * 100;
            newWallet.setStaterpack(wallet.getStaterpack() + interes);
            newWallet.setWallet_com(wallet.getWallet() - interes);

            walletService.updateWallet(newWallet.getUsuario().getUsername(), newWallet);
            userService.saveHistorial(wallet.getUsername(), PeticionTipos.INTERES_COMPUESTO, (float) interes, "com",
                    null, null, null,false);
        } else if ("div".equals(tipo)) {
            procesarDividendo(wallet, newWallet);
        }
    }

    private void procesarDividendo(ICDTO wallet, Wallet newWallet) {
        InteresCompuesto ic = service.findById(wallet.getIc_id());

        if (!validarFinInteresCompuesto(newWallet, ic)) {
            Float walletAmount = wallet.getWallet();
            newWallet.setStaterpack(wallet.getStaterpack() + walletAmount);
            newWallet.setWallet_div(walletAmount - walletAmount);
            ic.setAcumulado(ic.getAcumulado() + walletAmount);

            System.out.println(
                    "div interes: " + walletAmount + " st: " + wallet.getStaterpack() + " acum: " + ic.getAcumulado());

            service.updateInteresCompuesto(ic);
            walletService.updateWallet(newWallet.getUsuario().getUsername(), newWallet);

            userService.saveHistorial(newWallet.getUsuario().getUsername(), PeticionTipos.INTERES_COMPUESTO,
                    -walletAmount, "div", null, null, null,false);
        }
    }

    private boolean validarFinInteresCompuesto(Wallet wallet, InteresCompuesto ic) {
        System.out.println(ic.getFecha_fin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        System.out.println(LocalDate.now());

        if (ic.getFecha_fin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().equals(LocalDate.now())) {
            Float acumulado = ic.getAcumulado();

            wallet.setStaterpack(wallet.getStaterpack() - acumulado);
            wallet.setWallet_div(wallet.getWallet_div() + acumulado);

            wallet.getInteresCompuesto();

            ic.setActivo(false);
            ic.setAcumulado(0);
            ic.setFecha_fin(null);
            service.updateInteresCompuesto(ic);

            walletService.updateWallet(wallet.getUsuario().getUsername(), wallet);
            userService.saveHistorial(wallet.getUsuario().getUsername(), PeticionTipos.INTERES_COMPUESTO, acumulado,
                    null, null, null, null,false);

            System.out.println("interes devuelto: " + acumulado + " st: " + wallet.getStaterpack() + " acum: "
                    + ic.getAcumulado());

            return true;
        }
        return false;
    }

    private List<InteresCompuesto> modificarInteresDiv(List<InteresCompuesto> list) {
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i).getTipo().equals("div")) {

                list.get(i).setActivo(false);
                list.get(i).setAcumulado(0);
                list.get(i).setFecha_fin(null);

                list.set(i, list.get(i));

                break;
            }
        }
        return list;
    }

}
