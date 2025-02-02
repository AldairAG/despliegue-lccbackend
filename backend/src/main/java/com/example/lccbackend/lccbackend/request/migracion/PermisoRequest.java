package com.example.lccbackend.lccbackend.request.migracion;

public class PermisoRequest {
    private String username;
    private String permisoName;
    private Boolean activo;
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPermisoName() {
        return permisoName;
    }
    public void setPermisoName(String permisoName) {
        this.permisoName = permisoName;
    }
    public Boolean getActivo() {
        return activo;
    }
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }


    
}
