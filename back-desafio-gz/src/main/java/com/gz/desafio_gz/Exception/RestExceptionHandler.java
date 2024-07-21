package com.gz.desafio_gz.Exception;

import java.time.format.DateTimeParseException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class RestExceptionHandler {

	@ExceptionHandler(DefafioGZException.class)
	public ProblemDetail handleFintechException(DefafioGZException e) {
		return e.toProblemDetail();
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ProblemDetail handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		var fieldErrors = e.getFieldErrors().stream().map(f -> new InvalidParam(f.getField(), f.getDefaultMessage()))
				.toList();
		var pb = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
		pb.setTitle("Parametro não foi validado");
		pb.setProperty("invalid-params", fieldErrors);
		return pb;
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ProblemDetail handleConstraintViolationException(ConstraintViolationException e) {
		var fieldErrors = e.getConstraintViolations().stream().map(f -> new InvalidParam(f.getPropertyPath().toString(), f.getMessage()))
				.toList();
		var pb = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
		pb.setTitle("Parametro não foi validado");
		pb.setProperty("invalidParams", fieldErrors);
		return pb;
	}

	@ExceptionHandler(DateTimeParseException.class)
	public ProblemDetail handleDateTimeParseException(DateTimeParseException e) {
		 
		var pb = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
		pb.setTitle("Parametro não foi validado");
		pb.setProperty("invalid-params",  new InvalidParam("mensagem", e.getMessage()));
		return pb;
	}

	

	private record InvalidParam(String name, String reason) {
	}

}
