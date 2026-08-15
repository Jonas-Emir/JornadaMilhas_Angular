import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
  constructor(private http: HttpClient) {}

  getVoos(): Observable<Voo[]> {
    return this.http.get<any[]>('assets/data/voos.json').pipe(
      map(voos => voos.map(v => ({
        ...v,
        dataIda: new Date(v.dataIda),
        dataVolta: v.dataVolta ? new Date(v.dataVolta) : undefined
      })))
    );
  }

  getVoosFiltrados(origem?: string, destino?: string): Observable<Voo[]> {
    return this.getVoos().pipe(
      map(voos => {
        let list = voos;
        if (origem) {
          const origNormalized = origem.trim().toLowerCase();
          list = list.filter(v => v.origem.toLowerCase().includes(origNormalized));
        }
        if (destino) {
          const destNormalized = destino.trim().toLowerCase();
          list = list.filter(v => v.destino.toLowerCase().includes(destNormalized));
        }
        return list;
      })
    );
  }

  getDepoimentos(): Observable<any[]> {
    return this.http.get<any[]>('assets/data/depoimentos.json');
  }

  getSimulacoes(): Simulacao[] {
    try {
      const raw = sessionStorage.getItem('simulacoes');
      if (raw) {
        // We also want to map date fields in simulations back to Date instances
        const parsed = JSON.parse(raw);
        return parsed.map((sim: any) => ({
          ...sim,
          dataSimulacao: new Date(sim.dataSimulacao),
          voo: {
            ...sim.voo,
            dataIda: new Date(sim.voo.dataIda),
            dataVolta: sim.voo.dataVolta ? new Date(sim.voo.dataVolta) : undefined
          }
        }));
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
