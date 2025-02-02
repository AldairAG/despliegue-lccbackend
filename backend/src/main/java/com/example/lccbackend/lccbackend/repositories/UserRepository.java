package com.example.lccbackend.lccbackend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.lccbackend.lccbackend.helpers.objects.Referido;
import com.example.lccbackend.lccbackend.model.DTO.DestinatarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.GenealogiaDTO;
import com.example.lccbackend.lccbackend.model.DTO.MyNetDTO;
import com.example.lccbackend.lccbackend.model.DTO.TiDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserListDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserDTO;
import com.example.lccbackend.lccbackend.model.entities.Usuario;

public interface UserRepository extends CrudRepository<Usuario, Long> {
    Optional<Usuario> findByUsername(String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.UserListDTO(u.id, u.username, u.email) FROM Usuario u ORDER BY u.id_user ASC")
    List<UserListDTO> getAllaUserListDTOs();    

    @Query("SELECT new com.example.lccbackend.lccbackend.helpers.objects.Referido (u.username, w.staterpack) FROM Usuario u JOIN u.wallet w WHERE w.referido = :username")
    List<Referido> getReferidos(@Param("username") String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.GenealogiaDTO (u.username, w.referido) FROM Usuario u JOIN u.wallet w WHERE w.referido = :username")
    List<GenealogiaDTO> getReferidosForGenealogia(@Param("username") String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.MyNetDTO (u.username,u.nombres,u.apellidos, w.staterpack,w.fecha_ingreso,w.rango,w.referido) FROM Usuario u JOIN u.wallet w WHERE w.referido = :username")
    List<MyNetDTO> getReferidosForMyNet(@Param("username") String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.UserDTO (u.id_user,u.username,u.email,u.rol,u.nombres,u.apellidos,u.telefono,u.wallet,u.twoStepVeref) FROM Usuario u WHERE u.username = :username")
    UserDTO getUserForLogin(@Param("username") String username);

    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.DestinatarioDTO (u.username,u.nombres,u.apellidos,u.email) FROM Usuario u WHERE u.username = :username")
    Optional<DestinatarioDTO> findDestinatarioData(@Param("username") String username);
    
    @Query("SELECT new com.example.lccbackend.lccbackend.model.DTO.TiDTO (w.wallet_div,w.wallet_com)FROM Usuario u JOIN u.wallet w WHERE u.username = :username")
    TiDTO findWalletForTransfer(@Param("username") String username);

    @Query("SELECT u.username FROM Usuario u")
    List<String> findAllUsernameList();

    @Modifying
    @Query("UPDATE Usuario u SET u.nombres= :nombres,u.apellidos=:apellidos,u.telefono=:telefono,u.lada=:lada WHERE u.username = :username")
    void updateUsuarioByUser(@Param("username") String username, @Param("nombres") String nombres,@Param("apellidos") String apellidos,@Param("telefono") String telefono,@Param("lada") String lada);

    @Modifying
    @Query("UPDATE Usuario u SET u.twoStepVeref = :newTwoStepVeref WHERE u.id_user = :id")
    void updateTSVByUser(@Param("id") Long id,@Param("newTwoStepVeref") Boolean newTwoStepVeref);

    
}
