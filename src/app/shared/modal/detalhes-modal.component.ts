import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightService, Voo } from '../../core/services/flight.service';

interface DetalhesData {
  voo: Voo;
  adultos: number;
  criancas: number;
  bebes: number;
  categoria: string;
}

@Component({
  selector: 'app-detalhes-modal',
  templateUrl: './detalhes-modal.component.html',
  styleUrls: ['./detalhes-modal.component.scss']
})
export class DetalhesModalComponent {
  totalPassageiros: number;
  precoTotal: number;

  constructor(
    public dialogRef: MatDialogRef<DetalhesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalhesData,
    private flightService: FlightService,
    private snackBar: MatSnackBar
  ) {
    this.totalPassageiros = data.adultos + data.criancas + data.bebes;
    // Calculate total: full price for adults and children, 10% for babies
    this.precoTotal = (data.adultos + data.criancas) * data.voo.preco + data.bebes * (data.voo.preco * 0.1);
  }

  simularReserva(): void {
    this.flightService.salvarSimulacao({
      voo: this.data.voo,
      adultos: this.data.adultos,
      criancas: this.data.criancas,
      bebes: this.data.bebes,
      categoria: this.data.categoria,
      precoTotal: this.precoTotal
    });

    this.snackBar.open('Simulação de reserva salva com sucesso!', 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    this.dialogRef.close(true);
  }
}
