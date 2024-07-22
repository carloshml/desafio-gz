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


    private handleErrorRequisicao(e: any) {
        return e.error;
    }

    /**
    * @param acao 
    * @param data  yyyy-mm-dd
    * @param page  min = 0
    * @param quantidade
   */
    listarPorInstrumenteeData(acao: string, data: string, page: number, quantidade: number) {
        return lastValueFrom(

            this.http
                .get<any>(`${this.API}/listarPorInstrumenteeData/${acao}/${data}/${page}/${quantidade}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    /**
  * @param acao 
  * @param data  yyyy-mm-dd
  * @param page  min = 0
  * @param quantidade
 */
    listarPorInstrumenteeDataTotal(acao: string, data: string) {
        return lastValueFrom(

            this.http
                .get<any>(`${this.API}/listarPorInstrumenteeDataTotal/${acao}/${data} `)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    somatorioIntrumentDate(acao: any, data: any): any {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/somatorioIntrumentDate/${acao}/${data} `)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }


    listarAcoesNegociadas() {
        return lastValueFrom(

            this.http
                .get<any>(`${this.API}/listarAcoesNegociadas`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }


    /**
    * @param acao 
    * @param dataInicial  yyyy-mm-dd
    * @param dataFinal  yyyy-mm-dd 
    * @param page  min = 0
    * @param quantidade
    */
    somatorioIntrumentDateInicialDataFinal(acao: string, dataInicial: string, dataFinal: string): any {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/somatorioIntrumentDateInicialDataFinal/${acao}/${dataInicial}/${dataFinal}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    /**
   * @param acao 
   * @param dataInicial  yyyy-mm-dd
   *  @param dataFinal  yyyy-mm-dd 
   */
    listarPorInstrumenteDateInicialDataFinal(acao: string, dataInicial: string, dataFinal: string, page: number, quantidade: number): any {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/listarPorInstrumenteDateInicialDataFinal/${acao}/${dataInicial}/${dataFinal}/${page}/${quantidade}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

}

