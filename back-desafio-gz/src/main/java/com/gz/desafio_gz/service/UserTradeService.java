package com.gz.desafio_gz.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gz.desafio_gz.Util;
import com.gz.desafio_gz.dto.SomatorioResponse;
import com.gz.desafio_gz.entity.UserTrade;
import com.gz.desafio_gz.repository.UserTradeRepository;

@Service
public class UserTradeService {

    private Util util = new Util();
    UserTradeRepository userTradeRepositoryRepository;
    InstrumentQuoteService instrumentQuoteService;

    public UserTradeService(UserTradeRepository utr, InstrumentQuoteService iqr) {
        userTradeRepositoryRepository = utr;
        instrumentQuoteService = iqr;
    }

    public UserTrade getById(Long id) {
        var intrumQuote = userTradeRepositoryRepository.findById(id);
        return intrumQuote.get();
    }

    public List<UserTrade> listarPorInstrumenteeData(String instrument, String date, int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize,
                Sort.Direction.ASC,
                "instrument");
        if (instrument.equals("todas")) {
            instrument = "%";
        }
        Page<UserTrade> userTradesPage = userTradeRepositoryRepository.listarPorInstrumenteeData(instrument,
                util.stringToLocalDate(date),
                pageRequest);
        return userTradesPage.getContent();
    }

    public Long listarPorInstrumenteeDataTotal(String instrument, String date) {
        if (instrument.equals("todas")) {
            instrument = "%";
        }
        return userTradeRepositoryRepository.listarPorInstrumenteeDataTotal(instrument, util.stringToLocalDate(date));

    }

    public List<String> listarAcoesNegociadas() {
        return userTradeRepositoryRepository.listarAcoesNegociadas().get();
    }

    public List<SomatorioResponse> somatorioIntrumentDate(String instrument, String date) {
        if (instrument.equals("todas")) {
            instrument = "%";
        }
        var sumResponse = userTradeRepositoryRepository.somatorioIntrumentDate(instrument,
                util.stringToLocalDate(date));
        var result = instrumentQuoteService.getHashPorInstrumenteeData(instrument, date);
        List<SomatorioResponse> somatorios = new ArrayList<>();
        for (Object[] obj : sumResponse) {
            somatorios.add(new SomatorioResponse().calcularValores(obj, result.get("" + obj[0])));
        }
        return somatorios;
    }

    public List<SomatorioResponse> somatorioIntrumentDateInicialDataFinal(String instrument, String dataInicial,
            String dataFinal) {
        if (instrument.equals("todas")) {
            instrument = "%";
        }
        var sumResponse = userTradeRepositoryRepository.somatorioIntrumentDateInicialDataFinal(instrument,
                util.stringToLocalDate(dataInicial),
                util.stringToLocalDate(dataFinal));
        var result = instrumentQuoteService.getHashPorInstrumenteeData(instrument, dataFinal);
        List<SomatorioResponse> somatorios = new ArrayList<>();
        for (Object[] obj : sumResponse) {
            somatorios.add(new SomatorioResponse().calcularValores(obj, result.get("" + obj[0])));
        }
        return somatorios;
    }

    public List<UserTrade> listarPorInstrumenteDateInicialDataFinal(String instrument, String dataInicial,
            String dataFinal,
            int page,
            int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize,
                Sort.Direction.ASC,
                "instrument");
        if (instrument.equals("todas")) {
            instrument = "%";
        }
        Page<UserTrade> userTradesPage = userTradeRepositoryRepository.listarPorInstrumenteeDateInicialDataFinal(
                instrument,
                util.stringToLocalDate(dataInicial),
                util.stringToLocalDate(dataFinal),
                pageRequest);
        return userTradesPage.getContent();
    }
}
