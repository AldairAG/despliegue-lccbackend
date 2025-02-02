package com.example.lccbackend.lccbackend.model.DTO;

public class DestinatarioDTO {
    private String username;
    private String nombres;
    private String apellidos;
    private String email;

    public DestinatarioDTO(String username, String nombres, String apellidos, String email) {
        this.username = username;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
