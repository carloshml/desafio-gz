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
export class HomeComponent {


}
