import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlightService, Voo, Simulacao } from '../../core/services/flight.service';
import { DetalhesModalComponent } from '../../shared/modal/detalhes-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  voos: Voo[] = [];
  simulacoes: Simulacao[] = [];
  
  depoimentos: any[] = [
    {
      depoimento: 'A Jornada Milhas tornou minha viagem de férias inesquecível! Comprei passagens para Paris com um preço imbatível e o suporte foi excelente do início ao fim.',
      autoria: 'Mariana Faustino',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
    },
    {
      depoimento: 'Excelente experiência de voo! O atendimento personalizado e o processo de simulação de passagens funcionaram de forma clara e transparente. Recomendo muito!',
      autoria: 'Rodrigo Silva',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
    },
    {
      depoimento: 'Melhor portal de turismo. Consegui planejar minha viagem de lua de mel para Veneza economizando muito. O sistema de simulação de reserva ajudou demais no planejamento.',
      autoria: 'Carla Mendes',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
    }
  ];

  // Search parameters to pass to details dialog
  adultos: number = 1;
  criancas: number = 0;
  bebes: number = 0;
  categoria: string = 'Econômica';

  searchExecuted: boolean = false;

  constructor(
    private flightService: FlightService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarVoos();
    this.carregarSimulacoes();
  }

  carregarVoos(): void {
    this.flightService.getVoos().subscribe(res => {
      this.voos = res;
    });
  }

  carregarSimulacoes(): void {
    this.simulacoes = this.flightService.getSimulacoes();
  }

  onPesquisar(parametros: any): void {
    this.adultos = parametros.adultos || 1;
    this.criancas = parametros.criancas || 0;
    this.bebes = parametros.bebes || 0;
    this.categoria = parametros.categoria || 'Econômica';
    this.searchExecuted = true;

    this.flightService.getVoosFiltrados(parametros.origem, parametros.destino).subscribe(res => {
      this.voos = res;
    });
  }

  abrirDetalhes(voo: Voo): void {
    const dialogRef = this.dialog.open(DetalhesModalComponent, {
      width: '500px',
      data: {
        voo,
        adultos: this.adultos,
        criancas: this.criancas,
        bebes: this.bebes,
        categoria: this.categoria
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.carregarSimulacoes();
      }
    });
  }

  limparHistorico(): void {
    this.flightService.limparSimulacoes();
    this.carregarSimulacoes();
  }
}

