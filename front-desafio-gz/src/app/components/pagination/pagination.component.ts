import { Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { Pager, PaginacaoService } from './paginacao.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Output() paginationEmmiter = new EventEmitter<number>();
  @Input('pager') pager: Pager = new Pager();
  paginacaoServico = new PaginacaoService();
  valorMaximoLinhasGrid = 3;
  totalElementos = 0;

  constructor() {
  }

  setPageofClientes(page: number) {
    this.paginationEmmiter.emit(page);
  }

}
