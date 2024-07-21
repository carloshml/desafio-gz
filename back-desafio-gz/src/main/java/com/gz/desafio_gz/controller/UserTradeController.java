package com.gz.desafio_gz.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gz.desafio_gz.entity.UserTrade;
import com.gz.desafio_gz.service.UserTradeService;

@RestController
@RequestMapping("/userTrade")
public class UserTradeController {

    UserTradeService userTradeService;

    public UserTradeController(UserTradeService iqs) {
        userTradeService = iqs;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTrade> getById(@PathVariable Long id) {
        var instrument = userTradeService.getById(id);
        return ResponseEntity.ok(instrument);
    }

    @GetMapping
    public ResponseEntity<List<UserTrade>> getAll() {
        var userTradeResp = userTradeService.getAll();
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/listarPorInstrumenteeData/{acao}/{dia}/{page}/{qtd}")
    public ResponseEntity<List<UserTrade>> listarPorInstrumenteeData(
            @PathVariable(value = "acao") String acao,
            @PathVariable(value = "dia") String dia,
            @PathVariable(value = "page") int page,
            @PathVariable(value = "qtd") int qtd) {
        var userTradeResp = userTradeService.listarPorInstrumenteeData(acao, dia, page, qtd);
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/listarPaginado/{page}/{qtd}")
    public ResponseEntity<List<UserTrade>> listarPaginado(@PathVariable(value = "page") int page,
            @PathVariable(value = "qtd") int qtd) {
        var userTradeResp = userTradeService.findAllPaginado(page, qtd);
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/listarQtdTotal")
    public ResponseEntity<Long> listarQtdTotal() {
        return ResponseEntity.ok(userTradeService.listarQtdTotal());
    }

    @GetMapping(value = "/listarPorInstrumenteeDataTotal/{acao}/{dia}")
    public ResponseEntity<Long> listarPorInstrumenteeDataTotal(
            @PathVariable(value = "acao") String acao,
            @PathVariable(value = "dia") String dia) {
        var userTradeResp = userTradeService.listarPorInstrumenteeDataTotal(acao, dia);
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/listarAcoesNegociadas")
    public ResponseEntity<List<String>> listarAcoesNegociadas() {
        var userTradeResp = userTradeService.listarAcoesNegociadas();
        return ResponseEntity.ok(userTradeResp);
    }

}
