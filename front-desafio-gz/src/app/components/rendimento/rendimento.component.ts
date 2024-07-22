import { Component, OnInit } from '@angular/core';
import { UserTradeService } from '../../services/user-trade-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PaginationComponent } from '../pagination/pagination.component';
import { Pager, PaginacaoService } from '../pagination/paginacao.service';
import { UserTrade } from '../../entity/user-trade';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstrumentQuoteService } from '../../services/instrument-quote';
import { UserTradeTotal } from '../../entity/user-trade-total';
import { InstrumentQuote } from '../../entity/instrument-quote';
import { RendimentosTotaisComponent } from './rendimentos-totais/rendimentos-totais.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

enum TipoOperacao {
  C = 'compra',
  V = 'venda'
}

class DadoTabela {
  transacoes: UserTrade[] = [];
  transacoesTotais: any[] = [];
};

@Component({
  selector: 'app-rendimento',
  standalone: true,
  imports: [MatIconModule, MatCheckboxModule, RendimentosTotaisComponent, CommonModule, PaginationComponent, ReactiveFormsModule, RouterModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [UserTradeService, InstrumentQuoteService, provideNativeDateAdapter()],
  templateUrl: './rendimento.component.html',
  styleUrl: './rendimento.component.scss'
})
export class RendimentoComponent implements OnInit {

  procurando: boolean = false;
  acoes: UserTrade[] = [];
  listaAcoes: string[] = [];
  form: FormGroup;
  acaoNoDia: InstrumentQuote[] = [];
  dadosTabela: DadoTabela[] = [];
  mapaDados?: Map<any, any>;
  totais: UserTradeTotal[] = [];



  // atributos para a paginacao
  pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  totalElementos = 0;
  valorMaximoLinhasGrid = 100000;
  showdataInicial = false;
  somatoriosPeriodo: any;


  constructor(private userTradeService: UserTradeService,
    private instrumentQuoteService: InstrumentQuoteService,
    formBuilder: FormBuilder, private _snackBar: MatSnackBar,) {
    this.form = formBuilder.group({
      dataInicial: new FormControl(),
      dataFinal: new FormControl(new Date(), Validators.required),
      acao: new FormControl(Validators.required),
    });
    this.form.get('dataInicial')?.disable();
  }

  async ngOnInit(): Promise<void> {
    this.procurando = true;
    try {
      this.listaAcoes = await this.userTradeService.listarAcoesNegociadas();
      this.form.get('acao')?.setValue(this.listaAcoes[0]);
    } catch (error) {
      console.log('error :::: ', error);
    }
    this.procurando = false;
  }

  selecionarAcao(acao: string) {
    this.form.get('acao')?.setValue(acao);
  }

  validateForm(formGroup: FormGroup): string {
    const errorMessages: string[] = [];
    if (formGroup.controls['acao'].errors) {
      errorMessages.push('Ação não selecionada');
    }

    if (this.showdataInicial) {
      if (!formGroup.controls['dataInicial'].value) {
        errorMessages.push('Data Inicial não informada');
      }

      if (formGroup.controls['dataInicial'].value > formGroup.controls['dataFinal'].value) {
        errorMessages.push('Data Inicial deve ser menor que   data final ');
      }

    }



    if (formGroup.controls['dataFinal'].errors) {
      errorMessages.push('Data Final não informada');
    }

    return errorMessages.join(',');
  }

  async atualizar() {
    const validacao = this.validateForm(this.form);
    if (validacao) {
      this._snackBar.open(validacao);
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 5000);
      return;
    }
    try {
      await this.calcularTotais();
      this.pager = new Pager();
      this.totalElementos = await this.userTradeService.listarPorInstrumenteeDataTotal(
        this.form.get('acao')?.value,
        this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
      );
      this.setPage(1);
      console.log('totalElementos :::: ', this.totalElementos);
    } catch (error) {
      console.error('error :::: ', error);
    }
  }
  async calcularTotais() {
    this.acaoNoDia = await this.listarPorInstrumenteeData();
    const somatorios = await this.buscarSomatorios();
    console.log('acaoNoDia :::: ', this.acaoNoDia);
    console.log('this.somatorios :::: ', JSON.parse(JSON.stringify(somatorios)));
    this.mapaDados = new Map();
    for (const dado of this.acaoNoDia) {
      this.mapaDados.set(dado.simbol, dado);
    }
    this.totais = [];
    somatorios
      .forEach((som: UserTradeTotal) => {
        const instrument = som.instrument;
        som.tipoOperacao = 'Valor De Compra';
        som.valorTotal = som.valorTotalCompra;
        const quantidade = som.quantidadeCompra - som.quantidadeVenda;
        som.quantidade = quantidade;
        this.totais.push(JSON.parse(JSON.stringify(som)));
        som.quantidade = undefined;
        som.instrument = '';
        som.tipoOperacao = '';
        let precoMedio = JSON.parse(JSON.stringify(som));
        precoMedio.tipoOperacao = `Preço Medio Compra`;
        precoMedio.valorTotal = som.valorTotalCompra / som.quantidadeCompra;
        this.totais.push(JSON.parse(JSON.stringify(precoMedio)));
        if (this.mapaDados?.get(instrument)?.price) {
          let precoMercado = JSON.parse(JSON.stringify(som));
          precoMercado.tipoOperacao = `Preço Mercado`;
          precoMercado.valorTotal = this.mapaDados?.get(instrument)?.price;
          this.totais.push(precoMercado);
          let vendaMercado = JSON.parse(JSON.stringify(som));
          vendaMercado.tipoOperacao = `Venda Mercado`;
          vendaMercado.valorTotal = quantidade * this.mapaDados?.get(instrument)?.price;
          this.totais.push(vendaMercado);
          let rendimentoMonetario = JSON.parse(JSON.stringify(som));
          rendimentoMonetario.tipoOperacao = 'Rendimento';
          rendimentoMonetario.tipo = 'R';
          rendimentoMonetario.valorTotal = vendaMercado.valorTotal - som.valorTotalCompra;
          this.totais.push(JSON.parse(JSON.stringify(rendimentoMonetario)));
          som.tipo = 'P';
          som.valorTotal = (rendimentoMonetario.valorTotal && som.valorTotalCompra) ? rendimentoMonetario.valorTotal / (som.valorTotalCompra / 100) : 0;
          som.tipoOperacao = '';
          som.valorPercent = isNaN(som.valorTotal) ? '0' : '' + som.valorTotal.toFixed(2) + '%';
          this.totais.push(JSON.parse(JSON.stringify(som)));
        }
      });
  }
  async buscarSomatorios() {
    if (this.form.get('dataInicial')?.value) {
      return await this.userTradeService.somatorioIntrumentDateInicialDataFinal(
        this.form.get('acao')?.value,
        this.form.get('dataInicial')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
        this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
      );
    }
    return await this.userTradeService.somatorioIntrumentDate(
      this.form.get('acao')?.value,
      this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
    );
  }

  async listarPorInstrumenteeData(): Promise<InstrumentQuote[]> {
    return await this.instrumentQuoteService.listarPorInstrumenteeData(
      this.form.get('acao')?.value,
      this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
    );
  }

  async setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    console.log('errorsetPage:::: ', page);
    this.procurando = true;
    this.pager = this.paginacaoServico.getPager(this.totalElementos, page, this.valorMaximoLinhasGrid);
    try {
      this.acoes = await this.buscarAcoes();
      console.log('acoes :::: ', this.acoes);
    } catch (error) {
      console.error('error ::: ', error);
    }
    this.procurando = false;
  }
  async buscarAcoes(): Promise<UserTrade[]> {
    if (this.form.get('dataInicial')?.value) {
      return await this.userTradeService.listarPorInstrumenteDateInicialDataFinal(
        this.form.get('acao')?.value,
        this.form.get('dataInicial')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
        this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
        (this.pager.currentPage - 1),
        this.valorMaximoLinhasGrid
      );
    }
    return await this.userTradeService.listarPorInstrumenteeData(
      this.form.get('acao')?.value,
      this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
      (this.pager.currentPage - 1),
      this.valorMaximoLinhasGrid);
  }

  habilitardataFinal() {
    if (this.form.get('dataInicial')?.disabled) {
      this.form.get('dataInicial')?.enable()
      this.showdataInicial = true;
    } else {
      this.form.get('dataInicial')?.setValue(undefined);
      this.form.get('dataInicial')?.disable();
      this.showdataInicial = false;
    }
  }

}

