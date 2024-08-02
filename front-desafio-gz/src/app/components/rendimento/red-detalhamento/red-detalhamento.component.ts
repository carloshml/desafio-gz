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
  @Input() totais: UserTradeTotal[] = [];
  mapaDados?: Map<any, any>;

  procurando: boolean = false;
  acoes: UserTrade[] = [];



  // atributos para a paginacao
  pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  totalElementos = 0;
  valorMaximoLinhasGrid = 5;

  constructor(private userTradeService: UserTradeService,
    private instrumentQuoteService: InstrumentQuoteService,
    formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      dataInicial: new FormControl(),
      dataFinal: new FormControl(new Date(), Validators.required),
      acao: new FormControl(Validators.required),
    });
  }

  async atualizar() {
    try {
      this.pager = new Pager();
      this.totalElementos = await this.buscarTotalElementos();
      this.setPage(1);
      console.log('totalElementos :::: ', this.totalElementos);
    } catch (error) {
      console.error('error :::: ', error);
    }
  }
  async buscarTotalElementos(): Promise<number> {
    if (this.form.get('dataInicial')?.value) {
      return await this.userTradeService.listarPorInstrumenteDateInicialDataFinalTotal(
        this.form.get('acao')?.value,
        this.form.get('dataInicial')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
        this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-')
      );
    }
    return await this.userTradeService.listarPorInstrumenteeDataTotal(
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
}
