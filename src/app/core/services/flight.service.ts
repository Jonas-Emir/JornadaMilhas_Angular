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
      map(voos => voos.map(v => {
        // Parse date strings to local midnight Date objects to avoid timezone offset issues
        const idaParts = v.dataIda.split('-');
        const dataIda = new Date(Number(idaParts[0]), Number(idaParts[1]) - 1, Number(idaParts[2]));
        
        let dataVolta = undefined;
        if (v.dataVolta) {
          const voltaParts = v.dataVolta.split('-');
          dataVolta = new Date(Number(voltaParts[0]), Number(voltaParts[1]) - 1, Number(voltaParts[2]));
        }

        return {
          ...v,
          dataIda,
          dataVolta
        };
      }))
    );
  }

  getVoosFiltrados(filtros: {
    origem?: string;
    destino?: string;
    dataIda?: Date | null;
    dataVolta?: Date | null;
    categoria?: string;
    tipo?: string;
  }): Observable<Voo[]> {
    return this.getVoos().pipe(
      map(voos => {
        let list = voos;

        if (filtros.origem) {
          const origNormalized = filtros.origem.trim().toLowerCase();
          list = list.filter(v => v.origem.toLowerCase().includes(origNormalized));
        }

        if (filtros.destino) {
          const destNormalized = filtros.destino.trim().toLowerCase();
          list = list.filter(v => v.destino.toLowerCase().includes(destNormalized));
        }

        if (filtros.categoria) {
          const catNormalized = filtros.categoria.trim().toLowerCase();
          list = list.filter(v => v.classe.toLowerCase() === catNormalized);
        }

        if (filtros.dataIda) {
          const dataBusca = new Date(filtros.dataIda);
          list = list.filter(v => {
            const dataVoo = new Date(v.dataIda);
            return dataVoo.getFullYear() === dataBusca.getFullYear() &&
                   dataVoo.getMonth() === dataBusca.getMonth() &&
                   dataVoo.getDate() === dataBusca.getDate();
          });
        }

        if (filtros.tipo === 'ida-volta' && filtros.dataVolta) {
          const dataBuscaVolta = new Date(filtros.dataVolta);
          list = list.filter(v => {
            if (!v.dataVolta) return false;
            const dataVooVolta = new Date(v.dataVolta);
            return dataVooVolta.getFullYear() === dataBuscaVolta.getFullYear() &&
                   dataVooVolta.getMonth() === dataBuscaVolta.getMonth() &&
                   dataVooVolta.getDate() === dataBuscaVolta.getDate();
          });
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
