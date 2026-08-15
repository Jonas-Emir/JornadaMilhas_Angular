import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ModalData {
  adultos: number;
  criancas: number;
  bebes: number;
  categoria: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  adultos: number = 1;
  criancas: number = 0;
  bebes: number = 0;
  categoria: string = 'Econômica';

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {
    if (data) {
      this.adultos = data.adultos ?? 1;
      this.criancas = data.criancas ?? 0;
      this.bebes = data.bebes ?? 0;
      this.categoria = data.categoria ?? 'Econômica';
    }
  }

  alterarAdultos(valor: number): void {
    const novo = this.adultos + valor;
    if (novo >= 1 && novo <= 9) {
      this.adultos = novo;
    }
  }

  alterarCriancas(valor: number): void {
    const novo = this.criancas + valor;
    if (novo >= 0 && novo <= 9) {
      this.criancas = novo;
    }
  }

  alterarBebes(valor: number): void {
    const novo = this.bebes + valor;
    if (novo >= 0 && novo <= 9) {
      this.bebes = novo;
    }
  }

  selecionarCategoria(categoria: string): void {
    this.categoria = categoria;
  }

  salvar(): void {
    this.dialogRef.close({
      adultos: this.adultos,
      criancas: this.criancas,
      bebes: this.bebes,
      categoria: this.categoria
    });
  }
}

