package com.example.lccbackend.lccbackend.services.deuda;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lccbackend.lccbackend.model.DTO.DeudaResponse;
import com.example.lccbackend.lccbackend.model.entities.Deuda;
import com.example.lccbackend.lccbackend.repositories.DeudaRepository;
import com.example.lccbackend.lccbackend.repositories.WalletRepository;
import com.example.lccbackend.lccbackend.request.DeudaRequest;

import jakarta.transaction.Transactional;

@Service
public class DeudaServiceImpl implements DeudaService {

    @Autowired
    private DeudaRepository repository;

    @Autowired
    private WalletRepository walletRepository;

    @Override
    public Deuda save(Deuda deuda) {
        return repository.save(deuda);
    }

    @Override
    @Transactional
    public Deuda editar(DeudaRequest newDeuda, Deuda deuda) {
        deuda.setDeuda(newDeuda.getDeuda());
        deuda.setWallet_deuda(newDeuda.getWalletDeuda());
        return repository.save(deuda);
    }

    @Override
    public Optional<Deuda> getDeudaByWalletId(Long id) {
        return repository.findByWalletId(id);
    }

    @Override
    @Transactional
    public DeudaResponse existDeuda(Deuda deudaObj, Float bono, Long id) {

        Float deuda = deudaObj.getDeuda();

        // Si no hay deuda, no hay nada que pagar
        if (deuda == 0) {
            return new DeudaResponse(false, bono);
        }

        Float newDeuda = Math.max(0, deuda - bono); // Si el bono es mayor, la deuda se salda a 0
        Float bonoRestante = Math.max(0, bono - deuda); // Si la deuda es menor, sobra un bono

        repository.updateDeuda(deudaObj.getDeuda_id(), newDeuda);

        return new DeudaResponse(true, bonoRestante);
    }

    @Override
    @Transactional
    public void updateDeuda(Long id, Float newDeuda) {
        repository.updateDeuda(id, newDeuda);
    }

}
