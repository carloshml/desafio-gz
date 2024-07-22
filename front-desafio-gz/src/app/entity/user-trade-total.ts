export interface UserTradeTotal {
  instrument: string;
  quantidadeCompra: number;
  quantidadeVenda: number;
  valorTotalCompra: number;
  valorTotalVenda: number;
  // para tela
  valorTotal: number;
  tipoOperacao: string;
  tipo: string;
  valorPercent: string;
  quantidade?:number;
}