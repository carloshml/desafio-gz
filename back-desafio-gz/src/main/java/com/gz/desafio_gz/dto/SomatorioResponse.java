package com.gz.desafio_gz.dto;

import java.math.BigDecimal;

public class SomatorioResponse {
    private String instrument;
    private BigDecimal valorTotalCompra;
    private BigDecimal valorTotalVenda;
    private Long quantidadeCompra;
    private Long quantidadeVenda;

    public String getInstrument() {
        return instrument;
    }

    public void setInstrument(String instrument) {
        this.instrument = instrument;
    }

    public BigDecimal getValorTotalCompra() {
        return valorTotalCompra;
    }

    public void setValorTotalCompra(BigDecimal valorTotalCompra) {
        this.valorTotalCompra = valorTotalCompra;
    }

    public BigDecimal getValorTotalVenda() {
        return valorTotalVenda;
    }

    public void setValorTotalVenda(BigDecimal valorTotalVenda) {
        this.valorTotalVenda = valorTotalVenda;
    }

    public Long getQuantidadeVenda() {
        return quantidadeVenda;
    }

    public void setQuantidadeVenda(Long quantidadeVenda) {
        this.quantidadeVenda = quantidadeVenda;
    }

    public Long getQuantidadeCompra() {
        return quantidadeCompra;
    }

    public void setQuantidadeCompra(Long quantidadeCompra) {
        this.quantidadeCompra = quantidadeCompra;
    }

}
