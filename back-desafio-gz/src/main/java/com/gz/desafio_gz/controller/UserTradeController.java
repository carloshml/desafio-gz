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

    UserTradeService UserTradeService;

    public UserTradeController(UserTradeService iqs) {
        UserTradeService = iqs;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTrade> getById(@PathVariable Long id) {
        var instrument = UserTradeService.getById(id);
        return ResponseEntity.ok(instrument);
    }

    @GetMapping
    public ResponseEntity<List<UserTrade>> getAll() {
        var processos = UserTradeService.getAll();
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarPorInstrumenteeData/{acao}/{dia}/{page}/{qtd}")
    public ResponseEntity<List<UserTrade>> listarPorInstrumenteeData(
            @PathVariable(value = "acao") String acao,
            @PathVariable(value = "dia") String dia,
            @PathVariable(value = "page") int page,
            @PathVariable(value = "qtd") int qtd) {
        var processos = UserTradeService.listarPorInstrumenteeData(acao, dia, page, qtd);
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarPaginado/{page}/{qtd}")
    public ResponseEntity<List<UserTrade>> listarPaginado(@PathVariable(value = "page") int page,
            @PathVariable(value = "qtd") int qtd) {
        var processos = UserTradeService.findAllPaginado(page, qtd);
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarQtdTotal")
    public ResponseEntity<Long> listarQtdTotal() {
        return ResponseEntity.ok(UserTradeService.listarQtdTotal());
    }


    @GetMapping(value = "/listarPorInstrumenteeDataTotal/{acao}/{dia}/{page}/{qtd}")
    public ResponseEntity<Long> listarPorInstrumenteeDataTotal(
            @PathVariable(value = "acao") String acao,
            @PathVariable(value = "dia") String dia,
            @PathVariable(value = "page") int page,
            @PathVariable(value = "qtd") int qtd) {
        var processos = UserTradeService.listarPorInstrumenteeDataTotal(acao, dia);
        return ResponseEntity.ok(processos);
    }

}
