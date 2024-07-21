package com.gz.desafio_gz.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.gz.desafio_gz.Util;
import com.gz.desafio_gz.entity.UserTrade;
import com.gz.desafio_gz.repository.UserTradeRepository;

@Service
public class UserTradeService {

    private Util util = new Util();
    UserTradeRepository userTradeRepositoryRepository;

    public UserTradeService(UserTradeRepository iqr) {
        userTradeRepositoryRepository = iqr;
    }

    public UserTrade getById(Long id) {
        var intrumQuote = userTradeRepositoryRepository.findById(id);
        return intrumQuote.get();
    }

    public List<UserTrade> getAll() {
        return userTradeRepositoryRepository.findAll();
    }

    public List<UserTrade> findAllPaginado(int page, int qtd) {
        PageRequest pageRequest = PageRequest.of(
                page,
                qtd,
                Sort.Direction.DESC,
                "data");
        Page<UserTrade> pagerProcessos = userTradeRepositoryRepository.findAll(pageRequest);
        return pagerProcessos.getContent();
    }

    public Long listarQtdTotal() {
        return userTradeRepositoryRepository.listarQtdTotal();
    }

    public List<UserTrade> listarPorInstrumenteeData(String instrument, String date, int page, int pageSize) {
        PageRequest pageRequest = PageRequest.of(page, pageSize);
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
}
