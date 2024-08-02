package com.gz.desafio_gz.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gz.desafio_gz.dto.SomatorioResponse;
import com.gz.desafio_gz.entity.UserTrade;
import com.gz.desafio_gz.service.UserTradeService;

@RestController
@RequestMapping("/userTrade")
public class UserTradeController {

    UserTradeService userTradeService;

    public UserTradeController(UserTradeService uts) {
        userTradeService = uts;
    }

    @GetMapping("/listarPorInstrumenteeData")
    public ResponseEntity<List<UserTrade>> listarPorInstrumenteeData(
            @RequestParam String acao,
            @RequestParam String data,
            @RequestParam int page,
            @RequestParam int qtd) {
        List<UserTrade> userTrades = userTradeService.listarPorInstrumenteeData(acao, data, page, qtd);
        return ResponseEntity.ok(userTrades);
    }

    @GetMapping(value = "/listarPorInstrumenteeDataTotal")
    public ResponseEntity<Long> listarPorInstrumenteeDataTotal(
            @RequestParam String acao,
            @RequestParam String data) {
        var userTradeResp = userTradeService.listarPorInstrumenteeDataTotal(acao, data);
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/listarAcoesNegociadas")
    public ResponseEntity<List<String>> listarAcoesNegociadas() {
        var userTradeResp = userTradeService.listarAcoesNegociadas();
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/somatorioIntrumentDate")
    public ResponseEntity<List<SomatorioResponse>> somatorioIntrumentDate(
            @RequestParam String acao,
            @RequestParam String data) {
        var userTradeResp = userTradeService.somatorioIntrumentDate(acao, data);
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/somatorioIntrumentDateInicialDataFinal")
    public ResponseEntity<List<SomatorioResponse>> somatorioIntrumentDateInicialDataFinal(
            @RequestParam String acao,
            @RequestParam String dataInicial,
            @RequestParam String dataFinal) {
        var userTradeResp = userTradeService.somatorioIntrumentDateInicialDataFinal(acao, dataInicial, dataFinal);
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/listarPorInstrumenteDateInicialDataFinal")
    public ResponseEntity<List<UserTrade>> listarPorInstrumenteDateInicialDataFinal(
            @RequestParam String acao,
            @RequestParam String dataInicial,
            @RequestParam String dataFinal,
            @RequestParam int page,
            @RequestParam int qtd) {
        var userTradeResp = userTradeService.listarPorInstrumenteDateInicialDataFinal(acao, dataInicial, dataFinal,
                page, qtd);
        return ResponseEntity.ok(userTradeResp);
    }

    @GetMapping(value = "/listarPorInstrumenteDateInicialDataFinalTotal")
    public ResponseEntity<Long> listarPorInstrumenteDateInicialDataFinalTotal(
            @RequestParam String acao,
            @RequestParam String dataInicial,
            @RequestParam String dataFinal ) {
        var userTradeResp = userTradeService.listarPorInstrumenteDateInicialDataFinalTotal(acao, dataInicial, dataFinal);
        return ResponseEntity.ok(userTradeResp);
    }

    

}
