package com.gz.desafio_gz.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gz.desafio_gz.entity.InstrumentQuote;
import com.gz.desafio_gz.service.InstrumentQuoteService;

@RestController
@RequestMapping("/instrumentQuote")
public class InstrumentQuoteController {

    InstrumentQuoteService instrumentQuoteService;

    public InstrumentQuoteController(InstrumentQuoteService iqs) {
        instrumentQuoteService = iqs;
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstrumentQuote> getById(@PathVariable Long id) {
        var instrument = instrumentQuoteService.getById(id);
        return ResponseEntity.ok(instrument);
    }

    @GetMapping
    public ResponseEntity<List<InstrumentQuote>> getAll() {
        var processos = instrumentQuoteService.getAll();
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarPaginado/{inicio}/{qtd}")
    public ResponseEntity<List<InstrumentQuote>> listarProcessosPaginado(@PathVariable(value = "inicio") int inicio,
            @PathVariable(value = "qtd") int qtd) {

        PageRequest pageRequest = PageRequest.of(
                inicio,
                qtd,
                Sort.Direction.DESC,
                "dataCadastro");

        var processos = instrumentQuoteService.findAllPaginado(pageRequest);
        return ResponseEntity.ok(processos);
    }

    @GetMapping(value = "/listarQtdTotal")
    public ResponseEntity<Long> listarQtdTotal() {
        return ResponseEntity.ok(instrumentQuoteService.listarQtdTotal());
    }

}
