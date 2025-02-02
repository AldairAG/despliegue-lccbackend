package com.example.lccbackend.lccbackend.model.DTO;

public class GenealogiaDTO {
    private String username="";
    private String referido="";

    public GenealogiaDTO(String username, String referido) {
        this.username = username;
        this.referido = referido;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getReferido() {
        return referido;
    }

    public void setReferido(String referido) {
        this.referido = referido;
    }

    
    
    
}
