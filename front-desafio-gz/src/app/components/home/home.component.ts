import { Component, OnInit } from '@angular/core';
import { UserTradeService } from '../../services/user-trade-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PaginationComponent } from '../pagination/pagination.component';
import { Pager, PaginacaoService } from '../pagination/paginacao.service';
import { UserTrade } from '../../entity/user-trade';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, CommonModule, PaginationComponent, RouterModule, MatProgressBarModule],
  providers: [UserTradeService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  procurando: boolean = false;
  acoes: UserTrade[] = [];

  // atributos para a paginacao
  pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  totalElementos = 0;
  valorMaximoLinhasGrid = 5;

  constructor(private userTradeService: UserTradeService) { }


  async ngOnInit(): Promise<void> {
    this.procurando = true;
    try {
      this.totalElementos = await this.userTradeService.listarPorInstrumenteeDataTotal('VVAR3F', '2020-04-16', 1, 5);
      console.log('totalElementos :::: ', this.totalElementos);
      this.setPageofClientes(1);
    } catch (error) {

    }
    this.procurando = false;

  }

  async setPageofClientes(page: any) {
    this.procurando = true;
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.paginacaoServico.getPager(this.totalElementos, page, this.valorMaximoLinhasGrid);
    try {
      this.acoes = await this.userTradeService.listarPorInstrumenteeData('VVAR3F', '2020-04-16',(this.pager.currentPage - 1), this.valorMaximoLinhasGrid);
      console.log('acoes :::: ', this.acoes);
    } catch (error) {
      console.error('error ::: ', error);
    }
    this.procurando = false;
  }

}
