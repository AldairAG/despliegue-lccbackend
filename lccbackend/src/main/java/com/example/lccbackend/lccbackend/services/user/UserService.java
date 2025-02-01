package com.example.lccbackend.lccbackend.services.user;

import java.util.List;
import java.util.Optional;

import com.example.lccbackend.lccbackend.helpers.objects.Referido;
import com.example.lccbackend.lccbackend.model.DTO.DestinatarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.GenealogiaDTO;
import com.example.lccbackend.lccbackend.model.DTO.MyNetDTO;
import com.example.lccbackend.lccbackend.model.DTO.TiDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserListDTO;
import com.example.lccbackend.lccbackend.model.entities.Usuario;
import com.example.lccbackend.lccbackend.request.UserUpdateRequest;

public interface UserService {
    List<UserListDTO> findAll();

    Optional<Usuario> findById(Long id);

    Usuario save(Usuario usuario);

    Optional<Usuario> findByUsername(String username);

    void remove(Long id);

    Usuario patchAdmin(Usuario newUser, Usuario usuario);

    List<Referido> findReferidos(String username);

    List<MyNetDTO> findReferidosMyNet(String username);

    List<GenealogiaDTO> findReferidosGenealoia(String username);

    Usuario updateByUser(Usuario newUser, Usuario usuario);

    Usuario putUpdate(Usuario usuario);

    UserDTO getForLogin(String username);

    Optional<DestinatarioDTO> getDestinatarioData(String username);

    TiDTO getWalletForTransfer(String username);

    List<String> findAllusernamesList();

    void saveHistorial(String username,String tipo, Float monto,String wallet, String estado, String emisor, String beneficiario,Boolean abono);

    void updateUserByUsuario(UserUpdateRequest userUpdateRequest);

}
