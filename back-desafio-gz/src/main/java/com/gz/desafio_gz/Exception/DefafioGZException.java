package com.gz.desafio_gz.Exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;

public class DefafioGZException extends RuntimeException {

	private String titulo;
	private String detail;
	private HttpStatusCode statusCode;

	public DefafioGZException(String t, String d, HttpStatusCode sc) {
		this.titulo = t;
		this.detail = d;
		this.statusCode = sc;
	}

	public ProblemDetail toProblemDetail() {
		var pb = ProblemDetail.forStatus(this.statusCode);
		pb.setTitle(this.titulo);
		pb.setDetail(this.detail);
		return pb;
	}

}
