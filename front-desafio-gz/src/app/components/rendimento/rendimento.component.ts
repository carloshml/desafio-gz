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


enum TipoOperacao {
  compra = 'C',
  venda = 'V',
}

@Component({
  selector: 'app-rendimento',
  standalone: true,
  imports: [MatIconModule, CommonModule, PaginationComponent, ReactiveFormsModule, RouterModule, MatProgressBarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [UserTradeService, provideNativeDateAdapter()],
  templateUrl: './rendimento.component.html',
  styleUrl: './rendimento.component.scss'
})
export class RendimentoComponent implements OnInit {

  procurando: boolean = false;
  acoes: UserTrade[] = [];
  listaAcoes: string[] = [];
  form: FormGroup;

  // atributos para a paginacao
  pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  totalElementos = 0;
  valorMaximoLinhasGrid = 5;

  constructor(private userTradeService: UserTradeService, formBuilder: FormBuilder, private _snackBar: MatSnackBar,) {
    this.form = formBuilder.group({
      date: new FormControl(Validators.required),
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
      this.totalElementos = await this.userTradeService.listarPorInstrumenteeDataTotal('VVAR3F', '2020-04-16', 1, 5);
      console.log('totalElementos :::: ', this.totalElementos);
      this.setPageofClientes(1);
    } catch (error) {
      console.log('error :::: ', error);
    }
  }

  async setPageofClientes(page: any) {
    this.procurando = true;
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
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

