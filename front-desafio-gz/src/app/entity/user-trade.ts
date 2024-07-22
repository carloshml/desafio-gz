export interface UserTrade {   
    id: number;
    data: string;
    tipoOperacao: string;
    mercado: string;
    prazo: string;
    instrument: string;
    especificacao: string;
    quantidade?: number;
    qtdDescricao?: string;
    preco?: number;
    valorTotal: number;
    // para tela 
    price?: any;
}