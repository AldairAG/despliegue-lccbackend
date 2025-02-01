package com.example.lccbackend.lccbackend.request;

public class DeudaRequest {
    private Long id;
    private Float walletDeuda;
    private Float deuda;
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public Float getWalletDeuda() {
        return walletDeuda;
    }
    public void setWalletDeuda(Float walletDeuda) {
        this.walletDeuda = walletDeuda;
    }
    public Float getDeuda() {
        return deuda;
    }
    public void setDeuda(Float deuda) {
        this.deuda = deuda;
    }
}
