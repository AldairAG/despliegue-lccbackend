package com.example.lccbackend.lccbackend.services.wallet;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.lccbackend.lccbackend.model.DTO.BonoIgualacionDTO;
import com.example.lccbackend.lccbackend.model.DTO.BonoMensualidad;
import com.example.lccbackend.lccbackend.model.DTO.DividendoDiarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.PagoMensualidadDTO;
import com.example.lccbackend.lccbackend.model.DTO.RangoResDTO;
import com.example.lccbackend.lccbackend.model.DTO.StpDTO;
import com.example.lccbackend.lccbackend.model.entities.Bonos;
import com.example.lccbackend.lccbackend.model.entities.Deuda;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.repositories.UserRepository;
import com.example.lccbackend.lccbackend.repositories.WalletRepository;

@Service
public class WalletServiceImpl implements WalletService {
    @Autowired
    private WalletRepository repository;
    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Optional<Wallet> findById(Long id) {
        Optional<Wallet> wallet = repository.findById(id);
        return wallet;
    }

    @Override
    @Transactional(readOnly = true)
    public Wallet findWalletByUsername(String username) {
        return repository.findByUsuario_Username(username);
    }

    @Override
    @Transactional
    public Wallet updateWallet(String username, Wallet newWallet) {
        Wallet currentWallet = findWalletByUsername(username);

        if (currentWallet == null) {
            return null;
        }

        if (newWallet.getFecha_ingreso() != null)
            currentWallet.setFecha_ingreso(newWallet.getFecha_ingreso());
        if (newWallet.getGanancia_total() != null)
            currentWallet.setGanancia_total(newWallet.getGanancia_total());
        if (newWallet.getRetiro_total() != null)
            currentWallet.setRetiro_total(newWallet.getRetiro_total());
        if (newWallet.getWallet_com() != null)
            currentWallet.setWallet_com(newWallet.getWallet_com());
        if (newWallet.getWallet_div() != null)
            currentWallet.setWallet_div(newWallet.getWallet_div());
        if (newWallet.getWallet_ec() != null)
            currentWallet.setWallet_ec(newWallet.getWallet_ec());
        if (newWallet.getStaterpack() != null)
            currentWallet.setStaterpack(newWallet.getStaterpack());
        if (newWallet.getWallet_address() != null)
            currentWallet.setWallet_address(newWallet.getWallet_address());
        if (newWallet.getMensualidad() != null)
            currentWallet.setMensualidad(newWallet.getMensualidad());
        if (newWallet.getRango() != null)
            currentWallet.setRango(newWallet.getRango());
        if (newWallet.getReferido() != null)
            currentWallet.setReferido(newWallet.getReferido());

        // Validación y asignación para los campos de deuda
        if (newWallet.getDeuda() != null) {
            Deuda currentDeuda = currentWallet.getDeuda();
            Deuda newDeuda = newWallet.getDeuda();

            if (newDeuda.getDeuda() != null)
                currentDeuda.setDeuda(newDeuda.getDeuda());
            if (newDeuda.getWallet_deuda() != null)
                currentDeuda.setWallet_deuda(newDeuda.getWallet_deuda());
        }

        // Validación y asignación para los campos de bonos
        if (newWallet.getBonos() != null) {
            Bonos currentBonos = currentWallet.getBonos();
            Bonos newBonos = newWallet.getBonos();

            if (newBonos.getFast_track() != null)
                currentBonos.setFast_track(newBonos.getFast_track());
            if (newBonos.getMatching() != null)
                currentBonos.setMatching(newBonos.getMatching());
            if (newBonos.getMembresia_mensual() != null)
                currentBonos.setMembresia_mensual(newBonos.getMembresia_mensual());
            if (newBonos.getRango_res() != null)
                currentBonos.setRango_res(newBonos.getRango_res());
            if (newBonos.getRef_direct() != null)
                currentBonos.setRef_direct(newBonos.getRef_direct());
            if (newBonos.getDividendo_diario() != null)
                currentBonos.setDividendo_diario(newBonos.getDividendo_diario());
        }

        return repository.save(currentWallet);
    }

    @Override
    @Transactional
    public StpDTO getForSTP(String username) {
        return repository.findDataForSTP(username);
    }

    @Override
    @Transactional(readOnly = true)
    public Date findDateByUsername(String username) {
        return repository.getDateByUsername(username);
    }

    @Override
    public List<RangoResDTO> findRangosForBono() {
        return repository.findRangosForBono();
    }

    @Override
    public Float findStaterPackByUsername(String username) {
        return repository.findStaterPackByUsername(username);
    }

    @Override
    public List<String> findReferidosByUsername(String username) {
        return repository.findReferidosByUsername(username);
    }

    @Override
    public List<Wallet> findAll() {
        return repository.findAll();
    }

    @Override
    public List<DividendoDiarioDTO> findDatForDividendoDiario() {
        return repository.findDataForDividendoDiario();
    }

    @Override
    public List<BonoIgualacionDTO> findDataForBonoIgualacion() {
        return repository.findDataForBonoIgualacion();
    }

    @Override
    public Float findDividendoDiarioByUsername(String username) {
        return repository.findDividendoDiarioByUsername(username);
    }

    @Override
    public BonoMensualidad findDataForBonoMensualidad(String username) {
        return repository.findDataForBonoMensualidadByUsername(username);
    }

    @Override
    public List<PagoMensualidadDTO> findDataForPagoMensualidad() {
        return repository.findDataForPagoMensualidad();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<String> findNipByUsername(String username) {
        return repository.findNipByUsername(username);
    }

    @Override
    @Transactional
    public void updateWalletCom(Long id, Float newWallet_Com) {
        repository.updateWalletCom(id, newWallet_Com);
    }

    @Override
    @Transactional
    public void updateNip(Long id,Long idUser, String newNip) {
        try {
            repository.updateNipByUser(id, newNip);
            userRepository.updateTSVByUser(idUser,true);
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
