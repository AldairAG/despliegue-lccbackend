package com.example.lccbackend.lccbackend.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.lccbackend.lccbackend.model.DTO.BonoIgualacionDTO;
import com.example.lccbackend.lccbackend.model.DTO.BonoMensualidad;
import com.example.lccbackend.lccbackend.model.DTO.DividendoDiarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.PagoMensualidadDTO;
import com.example.lccbackend.lccbackend.model.DTO.RangoResDTO;
import com.example.lccbackend.lccbackend.model.DTO.StpDTO;
import com.example.lccbackend.lccbackend.model.entities.Wallet;

public interface WalletRepository extends CrudRepository<Wallet, Long> {
    Wallet findByUsuario_Username(String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.StpDTO (w.staterpack,b.ref_direct,b.update_st) FROM Wallet w JOIN w.usuario u JOIN w.bonos b  WHERE u.username = :username")
    StpDTO findDataForSTP(@Param("username") String username);

    @Query("SELECT w.fecha_ingreso FROM Wallet w JOIN w.usuario u WHERE u.username = :username")
    Date getDateByUsername(@Param("username") String username);

    @Query("SELECT w.staterpack FROM Wallet w JOIN w.usuario u WHERE u.username = :username")
    Float findStaterPackByUsername(@Param("username") String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.RangoResDTO(w.rango,u.username) FROM Wallet w JOIN w.usuario u WHERE w.rango > 0")
    List<RangoResDTO> findRangosForBono();

    @Query("SELECT u.username FROM Wallet w JOIN w.usuario u WHERE w.referido = :username")
    List<String> findReferidosByUsername(@Param("username") String username);

    List<Wallet> findAll();

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.DividendoDiarioDTO(u.username,w.staterpack,w.wallet_div,b.dividendo_diario,w.ganancia_total) FROM Wallet w JOIN w.usuario u JOIN w.bonos b WHERE w.staterpack > 0")
    List<DividendoDiarioDTO> findDataForDividendoDiario();

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.BonoIgualacionDTO(u.username,w.wallet_com,w.ganancia_total,b.matching) FROM Wallet w JOIN w.bonos b JOIN w.usuario u ")
    List<BonoIgualacionDTO> findDataForBonoIgualacion();

    @Query("SELECT b.dividendo_diario FROM Wallet w JOIN w.usuario u JOIN w.bonos b WHERE u.username = :username")
    Float findDividendoDiarioByUsername(@Param("username") String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.PagoMensualidadDTO(w.wallet_div, w.mensualidad, w.referido,u.username) FROM Wallet w JOIN w.usuario u WHERE w.mensualidad <= CURRENT_DATE")
    List<PagoMensualidadDTO> findDataForPagoMensualidad();

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.BonoMensualidad(w.referido,b.membresia_mensual,w.ganancia_total,w.wallet_com) FROM Wallet w JOIN w.bonos b JOIN w.usuario u where u.username = :username")
    BonoMensualidad findDataForBonoMensualidadByUsername(@Param("username") String username);

    @Query("SELECT w.nip FROM Wallet w JOIN w.usuario u WHERE u.username = :username")
    Optional<String> findNipByUsername(@Param("username") String username);

    @Modifying
    @Query("UPDATE Wallet w SET w.wallet_com = :walletCom WHERE w.wallet_id = :id")
    Float updateWalletCom(@Param("id") Long id, @Param("walletCom") Float walletCom);

    @Modifying
    @Query("UPDATE Wallet w SET w.wallet_com = w.wallet_com + :monto WHERE w.wallet_id = :id")
    int addToWalletCom(@Param("id") Long id, @Param("monto") Float monto);

    @Modifying
    @Query("UPDATE Wallet w SET w.wallet_address = :usdtWallet WHERE w.usuario.username = :username")
    void updateWalletByUser(@Param("username") String username,@Param("usdtWallet") String usdtWallet);

    @Modifying
    @Query("UPDATE Wallet w SET w.nip = :newNip WHERE w.wallet_id = :id")
    void updateNipByUser(@Param("id") Long id,@Param("newNip") String newNip);

}
