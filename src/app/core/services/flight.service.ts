import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Voo {
  id: number;
  origem: string;
  destino: string;
  preco: number;
  imagem: string;
  dataIda: Date;
  dataVolta?: Date;
  classe: string;
  ciaAerea: string;
  duracao: string;
  bagagem: string;
}

export interface Simulacao {
  id: string;
  voo: Voo;
  dataSimulacao: Date;
  adultos: number;
  criancas: number;
  bebes: number;
  categoria: string;
  precoTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private voos: Voo[] = [
    {
      id: 1,
      origem: 'São Paulo',
      destino: 'Veneza',
      preco: 500,
      imagem: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-09-10'),
      dataVolta: new Date('2026-09-24'),
      classe: 'Econômica',
      ciaAerea: 'Jornada Airways',
      duracao: '12h 30min',
      bagagem: 'Mochila + Bagagem de mão inclusas'
    },
    {
      id: 2,
      origem: 'São Paulo',
      destino: 'Paris',
      preco: 1200,
      imagem: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-10-05'),
      dataVolta: new Date('2026-10-18'),
      classe: 'Econômica',
      ciaAerea: 'Air France',
      duracao: '11h 15min',
      bagagem: 'Mochila + Bagagem de mão inclusas'
    },
    {
      id: 3,
      origem: 'Rio de Janeiro',
      destino: 'Orlando',
      preco: 1500,
      imagem: 'https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-11-12'),
      dataVolta: new Date('2026-11-26'),
      classe: 'Econômica',
      ciaAerea: 'American Airlines',
      duracao: '8h 45min',
      bagagem: 'Mochila + Bagagem de mão + Bagagem despachada'
    },
    {
      id: 4,
      origem: 'São Paulo',
      destino: 'Tóquio',
      preco: 3200,
      imagem: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-12-01'),
      dataVolta: new Date('2026-12-15'),
      classe: 'Econômica',
      ciaAerea: 'Japan Airlines',
      duracao: '24h 10min (1 parada)',
      bagagem: 'Mochila + Bagagem de mão + 2 Bagagens despachadas'
    },
    {
      id: 5,
      origem: 'São Paulo',
      destino: 'Roma',
      preco: 1400,
      imagem: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-09-15'),
      dataVolta: new Date('2026-09-30'),
      classe: 'Econômica',
      ciaAerea: 'ITA Airways',
      duracao: '11h 50min',
      bagagem: 'Mochila + Bagagem de mão inclusas'
    },
    {
      id: 6,
      origem: 'Belo Horizonte',
      destino: 'Rio de Janeiro',
      preco: 350,
      imagem: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-08-25'),
      dataVolta: new Date('2026-09-01'),
      classe: 'Econômica',
      ciaAerea: 'Azul',
      duracao: '1h 05min',
      bagagem: 'Apenas item de cabine (mochila)'
    },
    {
      id: 7,
      origem: 'Recife',
      destino: 'Fernando de Noronha',
      preco: 800,
      imagem: 'https://images.unsplash.com/photo-1595841696660-330074bef0ec?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-09-08'),
      dataVolta: new Date('2026-09-15'),
      classe: 'Econômica',
      ciaAerea: 'GOL',
      duracao: '1h 20min',
      bagagem: 'Mochila + Bagagem de mão inclusas'
    },
    {
      id: 8,
      origem: 'São Paulo',
      destino: 'Buenos Aires',
      preco: 600,
      imagem: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-09-20'),
      dataVolta: new Date('2026-09-27'),
      classe: 'Econômica',
      ciaAerea: 'Latam',
      duracao: '3h 10min',
      bagagem: 'Mochila + Bagagem de mão inclusas'
    },
    {
      id: 9,
      origem: 'São Paulo',
      destino: 'Nova York',
      preco: 1800,
      imagem: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop',
      dataIda: new Date('2026-10-10'),
      dataVolta: new Date('2026-10-24'),
      classe: 'Econômica',
      ciaAerea: 'United Airlines',
      duracao: '9h 30min',
      bagagem: 'Mochila + Bagagem de mão + Bagagem despachada'
    }
  ];

  getVoos(): Observable<Voo[]> {
    return of(this.voos);
  }

  getVoosFiltrados(origem?: string, destino?: string): Observable<Voo[]> {
    let list = this.voos;
    if (origem) {
      const origNormalized = origem.trim().toLowerCase();
      list = list.filter(v => v.origem.toLowerCase().includes(origNormalized));
    }
    if (destino) {
      const destNormalized = destino.trim().toLowerCase();
      list = list.filter(v => v.destino.toLowerCase().includes(destNormalized));
    }
    return of(list);
  }

  getSimulacoes(): Simulacao[] {
    try {
      const raw = sessionStorage.getItem('simulacoes');
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Erro ao ler simulacoes do sessionStorage', e);
    }
    return [];
  }

  salvarSimulacao(simulacao: Omit<Simulacao, 'id' | 'dataSimulacao'>): void {
    const simulacoes = this.getSimulacoes();
    const nova: Simulacao = {
      ...simulacao,
      id: Math.random().toString(36).substring(2, 9),
      dataSimulacao: new Date()
    };
    simulacoes.unshift(nova);
    sessionStorage.setItem('simulacoes', JSON.stringify(simulacoes));
  }

  limparSimulacoes(): void {
    sessionStorage.removeItem('simulacoes');
  }
}
