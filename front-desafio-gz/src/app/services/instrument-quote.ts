import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, lastValueFrom, Observable, of, throwError } from "rxjs";



@Injectable()
export class InstrumentQuoteService {
  


    API = `http://localhost:8080/instrumentQuote`;

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
    listarPorInstrumenteeData(acao: string, data: string,) {
        return lastValueFrom(

            this.http
                .get<any>(`${this.API}/listarPorInstrumenteeData/${acao}/${data} `)
                .pipe(
                    catchError(e => throwError(() => this.handleErrorRequisicao(e)))
                )
        );
    }

}

