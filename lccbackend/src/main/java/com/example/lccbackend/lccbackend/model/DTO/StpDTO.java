package com.example.lccbackend.lccbackend.model.DTO;

public class StpDTO {
    private Float staterpack;
    private Float refDirect;
    private int updateSt;

    public StpDTO(Float staterpack, Float refDirect, int updateSt) {
        this.staterpack = staterpack;
        this.refDirect = refDirect;
        this.updateSt = updateSt;
    }

    public Float getStaterpack() {
        return staterpack;
    }
    public void setStaterpack(Float staterpack) {
        this.staterpack = staterpack;
    }
    public Float getRefDirect() {
        return refDirect;
    }
    public void setRefDirect(Float refDirect) {
        this.refDirect = refDirect;
    }
    public int getUpdateSt() {
        return updateSt;
    }
    public void setUpdateSt(int updateSt) {
        this.updateSt = updateSt;
    }

    
}
