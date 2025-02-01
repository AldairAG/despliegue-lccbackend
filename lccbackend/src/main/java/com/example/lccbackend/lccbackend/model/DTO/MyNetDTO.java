package com.example.lccbackend.lccbackend.model.DTO;

import java.util.Date;

public class MyNetDTO {
    private String username="";
    private String nombres="";
    private String apellidos="";
    private Float staterpack = 0.0f;
    private Date fecha_ingreso = new Date();
    private Integer rango = 0;
    private String referido="";


    public MyNetDTO(String username, String nombres, String apellidos, Float staterpack, Date fecha_ingreso,
            Integer rango, String referido) {
        this.username = username;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.staterpack = staterpack;
        this.fecha_ingreso = fecha_ingreso;
        this.rango = rango;
        this.referido = referido;
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


    public Float getStaterpack() {
        return staterpack;
    }


    public void setStaterpack(Float staterpack) {
        this.staterpack = staterpack;
    }


    public Date getFecha_ingreso() {
        return fecha_ingreso;
    }


    public void setFecha_ingreso(Date fecha_ingreso) {
        this.fecha_ingreso = fecha_ingreso;
    }


    public Integer getRango() {
        return rango;
    }


    public void setRango(Integer rango) {
        this.rango = rango;
    }


    public String getReferido() {
        return referido;
    }


    public void setReferido(String referido) {
        this.referido = referido;
    }

    

    
}
