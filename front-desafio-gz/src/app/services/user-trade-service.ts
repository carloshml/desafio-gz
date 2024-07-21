import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of, throwError } from "rxjs";



@Injectable()
export class UserTradeService {


    API = `http://localhost:8080/userTrade`;

    constructor(public http: HttpClient) {
    }


    listar() {
        return lastValueFrom(
            this.http
                .get<any>(this.API)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    // 2020-04-22
    listarPorDia(acao: string, dia: string, inicio: number, quantidade: number) {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/listarPorDia/${acao}/${dia}/${inicio}/${quantidade}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }


    listarQtdTotal() {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/listarQtdTotal`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    getById(id: number) {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/${id}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    listarPaginado(inicio: number, quantidade: number) {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/listarPaginado/${inicio}/${quantidade}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    private handleErrorRequisicao(e: any) {
        return e.error;
    }
}

