package com.example.lccbackend.lccbackend.services.wallet;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.example.lccbackend.lccbackend.model.DTO.BonoIgualacionDTO;
import com.example.lccbackend.lccbackend.model.DTO.BonoMensualidad;
import com.example.lccbackend.lccbackend.model.DTO.DividendoDiarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.PagoMensualidadDTO;
import com.example.lccbackend.lccbackend.model.DTO.RangoResDTO;
import com.example.lccbackend.lccbackend.model.DTO.StpDTO;
import com.example.lccbackend.lccbackend.model.entities.Wallet;

public interface WalletService {

    Optional<Wallet> findById(Long id);

    Wallet findWalletByUsername(String username);

    Wallet updateWallet(String username,Wallet wallet);

    StpDTO getForSTP(String username);

    Date findDateByUsername(String username);

    List<RangoResDTO> findRangosForBono();

    Float findStaterPackByUsername(String username);

    List<String> findReferidosByUsername(String username);

    List<Wallet> findAll();

    List<DividendoDiarioDTO> findDatForDividendoDiario();

    List<BonoIgualacionDTO> findDataForBonoIgualacion();

    Float findDividendoDiarioByUsername(String username);

    BonoMensualidad findDataForBonoMensualidad(String username);

    List<PagoMensualidadDTO> findDataForPagoMensualidad();

    Optional<String> findNipByUsername(String username);

    void updateWalletCom(Long id,Float newWallet_Com);

    void updateNip(Long id,Long idUser,String newNip);
}
