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


enum TipoOperacao {
  compra = 'C',
  venda = 'V',
}

class DadoTabela {
  transacoes: UserTrade[] = [];
  transacoesTotais: any[] = [];
};

@Component({
  selector: 'app-rendimento',
  standalone: true,
  imports: [MatIconModule, RendimentosTotaisComponent, CommonModule, PaginationComponent, ReactiveFormsModule, RouterModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
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
  somatorios: UserTradeTotal[] = [];
  totais: UserTradeTotal[] = [];



  // atributos para a paginacao
  pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  totalElementos = 0;
  valorMaximoLinhasGrid = 100;


  constructor(private userTradeService: UserTradeService,
    private instrumentQuoteService: InstrumentQuoteService,
    formBuilder: FormBuilder, private _snackBar: MatSnackBar,) {
    this.form = formBuilder.group({
      date: new FormControl(new Date(), Validators.required),
      acao: new FormControl(Validators.required),
    });
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
    if (formGroup.controls['date'].errors) {
      errorMessages.push('Data não informada');
    }

    return errorMessages.join(',');
  }

  async atualizar() {
    const validacao = this.validateForm(this.form);
    if (validacao) {
      this._snackBar.open(validacao);
      return;
    }
    try {
      this.acaoNoDia = await this.instrumentQuoteService.listarPorInstrumenteeData(
        this.form.get('acao')?.value,
        this.form.get('date')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
      );
      this.somatorios = await this.userTradeService.somatorioIntrumentDate(
        this.form.get('acao')?.value,
        this.form.get('date')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
      );


      console.log('acaoNoDia :::: ', this.acaoNoDia);
      console.log('this.somatorios :::: ', this.somatorios);

      this.mapaDados = new Map();
      for (const dado of this.acaoNoDia) {
        this.mapaDados.set(dado.simbol, dado);
      }
      this.totais = [];
      this.somatorios
        .forEach(som => {
          const instrument = som.instrument;
          som.tipoOperacao = 'Valor De Compra';
          som.valorTotal = som.valorTotalCompra;
          this.totais.push(JSON.parse(JSON.stringify(som)));
          if (this.mapaDados?.get(instrument)?.price) {
            som.instrument = '';
            som.valorTotal = som.quantidade * this.mapaDados?.get(instrument)?.price;
            som.tipoOperacao = 'Valor De Venda Hoje';
            this.totais.push(JSON.parse(JSON.stringify(som)));
            som.valorTotal = (som.quantidade > 0) ? (som.valorTotal - som.valorTotalCompra) : 0;
            som.tipoOperacao = 'Rendimento R$';
            som.tipo = 'R';
            this.totais.push(JSON.parse(JSON.stringify(som)));
            const percent = JSON.parse(JSON.stringify(som));
            percent.valorTotal = percent.valorTotal / (percent.valorTotalCompra / 100);
            percent.tipoOperacao = 'Rendimento %';
            percent.valorPercent = '' + percent.valorTotal.toFixed(2) + '';
            percent.tipo = 'P';
            this.totais.push(JSON.parse(JSON.stringify(percent)));
          }
        });


      this.totalElementos = await this.userTradeService.listarPorInstrumenteeDataTotal(
        this.form.get('acao')?.value,
        this.form.get('date')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
      );
      this.setPage(1);
      console.log('totalElementos :::: ', this.totalElementos);
    } catch (error) {
      console.error('error :::: ', error);
    }
  }

  async setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    console.log('errorsetPage:::: ', page);
    this.procurando = true;
    this.pager = this.paginacaoServico.getPager(this.totalElementos, page, this.valorMaximoLinhasGrid);
    try {
      this.acoes = await this.userTradeService.listarPorInstrumenteeData(
        this.form.get('acao')?.value,
        this.form.get('date')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
        (this.pager.currentPage - 1),
        this.valorMaximoLinhasGrid);
      console.log('acoes :::: ', this.acoes);
    } catch (error) {
      console.error('error ::: ', error);
    }
    this.procurando = false;
  }

}

