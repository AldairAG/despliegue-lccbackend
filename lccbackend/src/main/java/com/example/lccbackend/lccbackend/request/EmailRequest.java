package com.example.lccbackend.lccbackend.request;

import java.util.Map;

public class EmailRequest {
    private String template;
    private Map<String, String> bodyParams;

    // Getters y Setters
    public String getTemplate() { return template; }
    public void setTemplate(String template) { this.template = template; }

    public Map<String, String> getBodyParams() { return bodyParams; }
    public void setBodyParams(Map<String, String> bodyParams) { this.bodyParams = bodyParams; }
}

