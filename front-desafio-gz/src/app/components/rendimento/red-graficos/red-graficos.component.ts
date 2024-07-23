import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatButton } from '@angular/material/button';
import { UserTradeTotal } from '../../../entity/user-trade-total';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-red-graficos',
  standalone: true,
  imports: [MatButton, BaseChartDirective, CommonModule, MatProgressBarModule],
  templateUrl: './red-graficos.component.html',
  styleUrl: './red-graficos.component.scss'
})
export class RedGraficosComponent implements AfterViewInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;
  @Input() totais: UserTradeTotal[] = [];
  public barChartOptions1: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 1,
      },
    },
    plugins: {
      legend: {
        display: true,
      }
    },
  };

  public barChartOptions2: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 1,
      },
    },
    plugins: {
      legend: {
        display: true,
      }
    },
  };

  public barChartOptions3: ChartConfiguration<'bar'>['options'] = {
    scales: {
      x: {},
      y: {
        min: 1,
      },
    },
    plugins: {
      legend: {
        display: true,
      }
    },
  };


  public barChartType = 'bar' as const;

  public dados1: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008'],
    datasets: [
      { data: [65, 59, 80, 81], label: 'Series A' },
      { data: [28, 48, 40, 19], label: 'Series B' },
    ],
  };
  dados2: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008'],
    datasets: [
      { data: [65, 59, 80, 81], label: 'Series A' },
      { data: [28, 48, 40, 19], label: 'Series B' },
    ],
  };

  dados3: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008'],
    datasets: [
      { data: [65, 59, 80, 81], label: 'Series A' },
      { data: [28, 48, 40, 19], label: 'Series B' },
    ],
  };

  showChart: boolean = false;

  constructor() { }

  ngAfterViewInit(): void {
  }

  setChartData(totais: UserTradeTotal[]) {
    console.log('Atualizou graficos');
    this.showChart = false;
    const labels = totais.filter(e => e.instrument).map(e => { return e.instrument });
    this.totais = totais;
    console.log(' labels', labels);
    console.log(' totais', this.totais);
    this.criarGrafico1(labels);
    this.criarGrafico2(labels);
    this.criarGrafico3(labels);
    console.log(' this.dados3 ', this.dados3);
    this.showChart = true;
  }

  criarGrafico1(labels: string[]) {
    const totalValorCompra = this.totais.filter(e => e.tipoOperacao === 'Valor De Compra').map(e => { return e.valorTotal; })
    const totalValorVendaMercado = this.totais.filter(e => e.tipoOperacao === 'Venda Mercado').map(e => { return e.valorTotal; })
    this.dados1.labels = labels;
    this.dados1.datasets = [
      { data: totalValorCompra, label: 'Valor De Compra' },
      { data: totalValorVendaMercado, label: 'Venda Mercado' },
    ];
    this.barChartOptions1 = {
      scales: {
        x: {},
        y: { min: this.menorValor(totalValorCompra, totalValorVendaMercado) - 4 },
      },
      plugins: { legend: { display: true, } },
    };
  }

  criarGrafico2(labels: string[]) {
    const precoMedio = this.totais.filter(e => e.tipoOperacao === 'Preço Medio Compra').map(e => { return e.valorTotal; });
    const precoMercado = this.totais.filter(e => e.tipoOperacao === 'Preço Mercado').map(e => { return e.valorTotal; });
    this.dados2.labels = labels;
    this.dados2.datasets = [
      { data: precoMedio, label: 'Preço Medio Compra' },
      { data: precoMercado, label: 'Preço Mercado' },
    ];
    this.barChartOptions2 = {
      scales: {
        x: {},
        y: { min: this.menorValor(precoMedio, precoMercado) - 4 },
      },
      plugins: { legend: { display: true, } },
    };
  }

  criarGrafico3(labels: string[]) {
    const rendimentos = this.totais.filter(e => e.tipoOperacao === 'Rendimento').map(e => { return e.valorTotal; });
    this.dados3.labels = labels;
    this.dados3.datasets = [
      { data: rendimentos, label: 'Rendimento' }
    ];

    this.barChartOptions3 = {
      scales: {
        x: {},
        y: { min: (rendimentos.reduce((min, dado) => { return dado < min ? dado : min; }, Number.MAX_VALUE) - 4) },
      },
      plugins: { legend: { display: true, } },
    };
  }

  menorValor(array1: number[], array2: number[]) {
    const menorValorCompra = array1.reduce((min, dado) => { return dado < min ? dado : min; }, Number.MAX_VALUE);
    const menorValorVenda = array2.reduce((min, dado) => { return dado < min ? dado : min; }, Number.MAX_VALUE);
    return menorValorCompra > menorValorVenda ? menorValorVenda : menorValorCompra;
  }


  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }






}