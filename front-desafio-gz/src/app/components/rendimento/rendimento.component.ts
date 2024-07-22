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

enum TipoOperacao {
  C = 'compra',
  V = 'venda'
}


@Component({
  selector: 'app-rendimento',
  standalone: true,
  imports: [MatIconModule, MatCheckboxModule, CommonModule, RedDetalhamentoComponent, ReactiveFormsModule, RouterModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [UserTradeService, InstrumentQuoteService, provideNativeDateAdapter()],
  templateUrl: './rendimento.component.html',
  styleUrl: './rendimento.component.scss'
})
export class RendimentoComponent implements OnInit {

  procurando: boolean = false;
  listaAcoes: string[] = [];
  form: FormGroup;
  showdataInicial = false;

  @ViewChild('appRendDetalhamento') appRendDetalhamento!: RedDetalhamentoComponent;

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

  atualizar() {
    this.appRendDetalhamento.atualizar();
  }

}

