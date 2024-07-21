package com.gz.desafio_gz.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gz.desafio_gz.Util;
import com.gz.desafio_gz.entity.InstrumentQuote;
import com.gz.desafio_gz.repository.InstrumentQuoteRepository;

@Service
public class InstrumentQuoteService {

    private Util util = new Util();

    InstrumentQuoteRepository instrumentQuoteRepository;

    public InstrumentQuoteService(InstrumentQuoteRepository iqr) {
        instrumentQuoteRepository = iqr;
    }

    public InstrumentQuote getById(Long id) {
        var intrumQuote = instrumentQuoteRepository.findById(id);
        return intrumQuote.get();
    }

    public List<InstrumentQuote> getAll() {
        return instrumentQuoteRepository.findAll();
    }

    public List<InstrumentQuote> findAllPaginado(PageRequest pageRequest) {
        Page<InstrumentQuote> pagerProcessos = instrumentQuoteRepository.findAll(pageRequest);
        return pagerProcessos.getContent();
    }

    public Long listarQtdTotal() {
        return instrumentQuoteRepository.listarQtdTotal();
    }

    public List<InstrumentQuote> listarPorInstrumenteeData(String simbol, String data) {
        if (simbol.equals("todas")) {
            simbol = "%";
        }
        return instrumentQuoteRepository.listarPorInstrumenteeDataTotal(simbol, util.stringToLocalDate(data));
    }

}
