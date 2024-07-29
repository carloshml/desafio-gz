import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, throwError } from "rxjs";



@Injectable()
export class UserTradeService {


    API = `http://localhost:8080/userTrade`;

    constructor(public http: HttpClient) {
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
    listarPorInstrumenteeData(acao: string, data: string, page: number, qtd: number) {
        return lastValueFrom(

            this.http
                .get<any>(`${this.API}/listarPorInstrumenteeData?acao=${acao}&data=${data}&page=${page}&qtd=${qtd}`)
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
                .get<any>(`${this.API}/listarPorInstrumenteeDataTotal?acao=${acao}&data=${data}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    somatorioIntrumentDate(acao: any, data: any): any {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/somatorioIntrumentDate?acao=${acao}&data=${data}`)
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
                .get<any>(`${this.API}/somatorioIntrumentDateInicialDataFinal?acao=${acao}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

    /**
   * @param acao 
   * @param dataInicial  yyyy-mm-dd
   * @param dataFinal  yyyy-mm-dd 
   */
    listarPorInstrumenteDateInicialDataFinal(acao: string, dataInicial: string, dataFinal: string, page: number, qtd: number): any {
        return lastValueFrom(
            this.http
                .get<any>(`${this.API}/listarPorInstrumenteDateInicialDataFinal?acao=${acao}&dataInicial=${dataInicial}&dataFinal=${dataFinal}&page=${page}&qtd=${qtd}`)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

}

