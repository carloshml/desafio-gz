import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { InstrumentQuoteService } from '../../services/instrument-quote';
import { UserTradeService } from '../../services/user-trade-service';
import { RedDetalhamentoComponent } from './red-detalhamento/red-detalhamento.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RedGraficosComponent } from './red-graficos/red-graficos.component';
import { UserTradeTotal } from '../../entity/user-trade-total';
import { InstrumentQuote } from '../../entity/instrument-quote';

enum TipoOperacao {
  C = 'compra',
  V = 'venda'
}


@Component({
  selector: 'app-rendimento',
  standalone: true,
  imports: [MatIconModule, MatCheckboxModule, MatTabsModule, CommonModule, RedGraficosComponent, RedDetalhamentoComponent, ReactiveFormsModule, RouterModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [UserTradeService, InstrumentQuoteService, provideNativeDateAdapter()],
  templateUrl: './rendimento.component.html',
  styleUrl: './rendimento.component.scss'
})
export class RendimentoComponent implements OnInit {

  procurando: boolean = false;
  listaAcoes: string[] = [];
  form: FormGroup;
  showdataInicial = false;
  totais: UserTradeTotal[] = [];
  mapaDados?: Map<any, any>;
  selectedIndex: number = 1;
  @ViewChild('appRendDetalhamento') appRendDetalhamento!: RedDetalhamentoComponent;
  @ViewChild('appRendChart') appRendChart!: RedGraficosComponent;

  constructor(private userTradeService: UserTradeService,
    private instrumentQuoteService: InstrumentQuoteService,
    formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
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

    await this.calcularTotais();
    this.appRendDetalhamento.atualizar();
    this.appRendChart.setChartData(this.totais);
  }

  async calcularTotais(): Promise<void> {
    const acaoNoDia: InstrumentQuote[] = await this.listarPorInstrumenteeData();
    const somatorios = await this.buscarSomatorios();
    console.log('acaoNoDia :::: ', acaoNoDia);
    console.log('this.somatorios :::: ', JSON.parse(JSON.stringify(somatorios)));
    this.mapaDados = new Map();
    for (const dado of acaoNoDia) {
      this.mapaDados.set(dado.simbol, dado);
    }
    this.totais = somatorios;
    console.log('  :::: ', this.totais);

  }

  async listarPorInstrumenteeData(): Promise<InstrumentQuote[]> {
    return await this.instrumentQuoteService.listarPorInstrumenteeData(
      this.form.get('acao')?.value,
      this.form.get('dataFinal')?.value.toLocaleDateString('pt-BR').split('/').reverse().join('-'),
    );
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

  atualizarGraficos() {
    if (this.selectedIndex == 1) {
      this.appRendChart.setChartData(this.totais);
    }
  }

}

