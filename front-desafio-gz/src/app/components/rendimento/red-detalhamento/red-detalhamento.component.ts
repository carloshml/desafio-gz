import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { Pager, PaginacaoService } from '../../pagination/paginacao.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RendimentosTotaisComponent } from '../rendimentos-totais/rendimentos-totais.component';
import { CommonModule } from '@angular/common';
import { UserTrade } from '../../../entity/user-trade';
import { UserTradeService } from '../../../services/user-trade-service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstrumentQuoteService } from '../../../services/instrument-quote';
import { UserTradeTotal } from '../../../entity/user-trade-total';
import { InstrumentQuote } from '../../../entity/instrument-quote';

@Component({
  selector: 'app-red-detalhamento',
  standalone: true,
  imports: [PaginationComponent, CommonModule, MatProgressBarModule, RendimentosTotaisComponent],
  providers: [UserTradeService, InstrumentQuoteService, provideNativeDateAdapter()],
  templateUrl: './red-detalhamento.component.html',
  styleUrl: './red-detalhamento.component.scss'
})
export class RedDetalhamentoComponent {

  @Input() form: FormGroup;
  @Input() showdataInicial = false;
  procurando: boolean = false;
  acoes: UserTrade[] = [];
  totais: UserTradeTotal[] = [];
  mapaDados?: Map<any, any>;
  acaoNoDia: InstrumentQuote[] = [];

  // atributos para a paginacao
  pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  totalElementos = 0;
  valorMaximoLinhasGrid = 100000;

  constructor(private userTradeService: UserTradeService,
    private instrumentQuoteService: InstrumentQuoteService,
    formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.form = formBuilder.group({
      dataInicial: new FormControl(),
      dataFinal: new FormControl(new Date(), Validators.required),
      acao: new FormControl(Validators.required),
    });
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

}
