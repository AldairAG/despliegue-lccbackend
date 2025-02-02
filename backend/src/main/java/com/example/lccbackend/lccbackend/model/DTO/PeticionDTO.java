package com.example.lccbackend.lccbackend.model.DTO;

public class PeticionDTO {
    private Long peticion_id;
    private Float monto;
    private String tipo;
    private String code;
    private String email;
    private String username;

    public PeticionDTO(Long peticion_id, Float monto, String tipo, String code, String email, String username) {
        this.peticion_id = peticion_id;
        this.monto = monto;
        this.tipo = tipo;
        this.code = code;
        this.email = email;
        this.username = username;
    }
    public Long getPeticion_id() {
        return peticion_id;
    }
    public void setPeticion_id(Long peticion_id) {
        this.peticion_id = peticion_id;
    }
    public Float getMonto() {
        return monto;
    }
    public void setMonto(Float monto) {
        this.monto = monto;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    
}
