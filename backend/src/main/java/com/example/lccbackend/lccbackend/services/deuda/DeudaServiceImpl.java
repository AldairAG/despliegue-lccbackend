package com.example.lccbackend.lccbackend.services.deuda;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public Boolean existDeuda(Deuda deudaObj, Float bono,Long id) {

        Float newDeuda=0f;
        Float newBono=0f;
        Float deuda=deudaObj.getDeuda();

        if (deuda > bono) {
            newDeuda=deuda-bono;
            repository.updateDeuda(deudaObj.getDeuda_id(), newDeuda);
            return true;
        }
        if (deuda < bono) {
            newBono=bono-deuda;
            repository.updateDeuda(deudaObj.getDeuda_id(), newDeuda);
            walletRepository.addToWalletCom(id, newBono);
            return true;
        }
        if(deuda==bono){
            deuda=0f;
            repository.updateDeuda(deudaObj.getDeuda_id(), newDeuda);
            return true;
        }

        walletRepository.addToWalletCom(id, bono);
        return false;
    }

    @Override
    public void updateDeuda(Long id,Float newDeuda) {
        repository.updateDeuda(id, newDeuda);
    }

}
