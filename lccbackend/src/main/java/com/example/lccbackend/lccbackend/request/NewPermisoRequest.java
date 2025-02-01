package com.example.lccbackend.lccbackend.request;

public class NewPermisoRequest {
    private Long permiso_id;
    private String permisoName; 
    private boolean activo; 
    private Long walletId; 
    
    public String getPermisoName() {
        return permisoName;
    }
    public void setPermisoName(String permisoName) {
        this.permisoName = permisoName;
    }
    public boolean isActivo() {
        return activo;
    }
    public void setActivo(boolean activo) {
        this.activo = activo;
    }
    public Long getWalletId() {
        return walletId;
    }
    public void setWalletId(Long walletId) {
        this.walletId = walletId;
    }
    public Long getPermiso_id() {
        return permiso_id;
    }
    public void setPermiso_id(Long permiso_id) {
        this.permiso_id = permiso_id;
    }
    
}

