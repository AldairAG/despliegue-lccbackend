package com.example.lccbackend.lccbackend.model.DTO;

public class DeudaResponse {
    private Boolean abono;
    private Float excedente;
    
    public DeudaResponse(Boolean abono, Float excedente) {
        this.abono = abono;
        this.excedente = excedente;
    }
    
    public Boolean getAbono() {
        return abono;
    }
    public Float getExcedente() {
        return excedente;
    }

    

}
