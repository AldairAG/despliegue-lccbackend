package com.example.lccbackend.lccbackend.model.DTO;

import com.example.lccbackend.lccbackend.model.entities.Wallet;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String rol = "USER";
    private String nombres;
    private String apellidos;
    private String telefono;
    private Wallet wallet;
    private Boolean twoStepVeref;

    public UserDTO(Long id,String username, String email, String rol, String nombres,
    String apellidos, String telefono, 
            Wallet wallet,Boolean twoStepVeref) {
        this.username = username;
        this.id = id;
        this.email = email;
        this.rol = rol;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.telefono = telefono;
        this.wallet = wallet;
        this.twoStepVeref = twoStepVeref;
    }

    public String getUsername() {
        return username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }

    public Boolean getTwoStepVeref() {
        return twoStepVeref;
    }

    public void setTwoStepVeref(Boolean twoStepVeref) {
        this.twoStepVeref = twoStepVeref;
    }

    
}
