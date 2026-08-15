import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlightService, Voo, Simulacao } from '../../core/services/flight.service';
import { DetalhesModalComponent } from '../../shared/modal/detalhes-modal.component';
import { ComoFuncionaModalComponent } from '../../shared/modal/como-funciona-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  voos: Voo[] = [];
  simulacoes: Simulacao[] = [];
  
  depoimentos: any[] = [];

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
    this.carregarDepoimentos();
  }

  carregarVoos(): void {
    this.flightService.getVoos().subscribe(res => {
      this.voos = res;
    });
  }

  carregarSimulacoes(): void {
    this.simulacoes = this.flightService.getSimulacoes();
  }

  carregarDepoimentos(): void {
    this.flightService.getDepoimentos().subscribe({
      next: res => this.depoimentos = res,
      error: err => console.error('Erro ao carregar depoimentos', err)
    });
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

  abrirComoFunciona(): void {
    this.dialog.open(ComoFuncionaModalComponent, {
      width: '450px'
    });
  }

  limparHistorico(): void {
    this.flightService.limparSimulacoes();
    this.carregarSimulacoes();
  }
}


