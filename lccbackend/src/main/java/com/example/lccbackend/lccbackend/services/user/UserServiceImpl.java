package com.example.lccbackend.lccbackend.services.user;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.lccbackend.lccbackend.helpers.objects.Referido;
import com.example.lccbackend.lccbackend.model.DTO.DestinatarioDTO;
import com.example.lccbackend.lccbackend.model.DTO.GenealogiaDTO;
import com.example.lccbackend.lccbackend.model.DTO.MyNetDTO;
import com.example.lccbackend.lccbackend.model.DTO.TiDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserDTO;
import com.example.lccbackend.lccbackend.model.DTO.UserListDTO;
import com.example.lccbackend.lccbackend.model.entities.Bonos;
import com.example.lccbackend.lccbackend.model.entities.Deuda;
import com.example.lccbackend.lccbackend.model.entities.Historial;
import com.example.lccbackend.lccbackend.model.entities.Usuario;
import com.example.lccbackend.lccbackend.model.entities.Wallet;
import com.example.lccbackend.lccbackend.repositories.UserRepository;
import com.example.lccbackend.lccbackend.repositories.WalletRepository;
import com.example.lccbackend.lccbackend.request.UserUpdateRequest;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repository;
    @Autowired
    private WalletRepository walletRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UserListDTO> findAll() {
        return repository.getAllaUserListDTOs();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Usuario save(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Usuario> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    @Transactional
    public void remove(Long id) {
        repository.deleteById(id);
    }

    @Override
    @Transactional
    public Usuario patchAdmin(Usuario newUser, Usuario usuario) {

        // Validación y asignación para campos básicos del usuario
        if (newUser.getNombres() != null)
            usuario.setNombres(newUser.getNombres());
        if (newUser.getApellidos() != null)
            usuario.setApellidos(newUser.getApellidos());
        if (newUser.getUsername() != null)
            usuario.setUsername(newUser.getUsername());
        if (newUser.getEmail() != null)
            usuario.setEmail(newUser.getEmail());
        if (newUser.getPassword() != null)
            usuario.setPassword(newUser.getPassword());
        if (newUser.getTelefono() != null)
            usuario.setTelefono(newUser.getTelefono());

        // Validación y asignación para los campos de la wallet
        if (newUser.getWallet() != null) {
            Wallet currentWallet = usuario.getWallet();
            Wallet newWallet = newUser.getWallet();

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
            }
        }

        return repository.save(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Referido> findReferidos(String username) {
        return repository.getReferidos(username);
    }

    @Transactional(readOnly = true)
    @Override
    public List<MyNetDTO> findReferidosMyNet(String username) {
        return repository.getReferidosForMyNet(username);
    }

    @Transactional(readOnly = true)
    @Override
    public List<GenealogiaDTO> findReferidosGenealoia(String username) {
        return repository.getReferidosForGenealogia(username);
    }

    @Transactional
    @Override
    public Usuario updateByUser(Usuario newUser, Usuario usuario) {

        // Validación y asignación para campos básicos del usuario
        if (newUser.getNombres() != null)
            usuario.setNombres(newUser.getNombres());
        if (newUser.getApellidos() != null)
            usuario.setApellidos(newUser.getApellidos());
        if (newUser.getTelefono() != null)
            usuario.setTelefono(newUser.getTelefono());

        // Validación y asignación para los campos de la wallet
        if (newUser.getWallet() != null) {
            Wallet currentWallet = usuario.getWallet();
            Wallet newWallet = newUser.getWallet();

            if (newWallet.getNip() != null)
                currentWallet.setNip(newWallet.getNip());
            if (newWallet.getWallet_address() != null)
                currentWallet.setWallet_address(newWallet.getWallet_address());
        }

        return repository.save(usuario);
    }

    @Override
    @Transactional
    public Usuario putUpdate(Usuario usuario) {
        return repository.save(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDTO getForLogin(String username) {
        return repository.getUserForLogin(username);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DestinatarioDTO> getDestinatarioData(String username) {
        return repository.findDestinatarioData(username);
    }

    @Override
    @Transactional(readOnly = true)
    public TiDTO getWalletForTransfer(String username) {
        return repository.findWalletForTransfer(username);
    }

    @Override
    public List<String> findAllusernamesList() {
        return repository.findAllUsernameList();
    }

    @Override
    @Transactional
    public void saveHistorial(String username, String tipo, Float monto, String wallet, String estado, String emisor,
            String beneficiario, Boolean abono) {
        try {
            Optional<Usuario> o = repository.findByUsername(username);
            if (o.isPresent()) {
                Usuario user = o.get();

                Historial historial = new Historial();
                historial.setMonto(monto);
                historial.setTipo(tipo);
                historial.setEmisor(emisor);
                historial.setEstado(estado);
                historial.setBeneficiario(beneficiario);
                historial.setWallet(wallet);
                historial.setAbono(abono);

                user.addHistorico(historial);
                repository.save(user);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Override
    @Transactional
    public void updateUserByUsuario(UserUpdateRequest userUpdateRequest) {
        repository.updateUsuarioByUser(userUpdateRequest.getUsername(),
                userUpdateRequest.getNombres(), userUpdateRequest.getApellidos(),
                userUpdateRequest.getTelefono(), userUpdateRequest.getLada());
                
        if (!userUpdateRequest.getUsdtWallet().isEmpty())
            walletRepository.updateWalletByUser(userUpdateRequest.getUsername(), userUpdateRequest.getUsdtWallet());
    }

}
