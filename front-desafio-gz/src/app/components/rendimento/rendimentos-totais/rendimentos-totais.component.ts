import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserTradeTotal } from '../../../entity/user-trade-total';

@Component({
  selector: 'app-rendimentos-totais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rendimentos-totais.component.html',
  styleUrl: './rendimentos-totais.component.scss'
})
export class RendimentosTotaisComponent {

  @Input() totais: UserTradeTotal[] = [];

}
