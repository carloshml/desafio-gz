package com.gz.desafio_gz.controller;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    @GetMapping(value = "/listarPaginado/{inicio}/{qtd}")
    public ResponseEntity<List<UserTrade>> listarProcessosPaginado(@PathVariable(value = "inicio") int inicio,
            @PathVariable(value = "qtd") int qtd) {

        PageRequest pageRequest = PageRequest.of(
                inicio,
                qtd,
                Sort.Direction.DESC,
                "data");

        var processos = UserTradeService.findAllPaginado(pageRequest);
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarQtdTotal")
    public ResponseEntity<Long> listarQtdTotal() {
        return ResponseEntity.ok(UserTradeService.listarQtdTotal());
    }

}
