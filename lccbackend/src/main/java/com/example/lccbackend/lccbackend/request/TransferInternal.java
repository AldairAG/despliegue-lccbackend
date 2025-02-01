package com.example.lccbackend.lccbackend.request;

public class TransferInternal {
    private String emisor;
    private String destinatario;
    private Float monto;
    private String tipo;

    public TransferInternal(String emisor, String destinatario, Float monto, String tipo) {
        this.emisor = emisor;
        this.destinatario = destinatario;
        this.monto = monto;
        this.tipo = tipo;
    }

    public String getEmisor() {
        return emisor;
    }

    public void setEmisor(String emisor) {
        this.emisor = emisor;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
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

}
