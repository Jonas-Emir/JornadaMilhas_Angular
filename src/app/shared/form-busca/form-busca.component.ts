import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  @Output() pesquisar = new EventEmitter<any>();

  buscaForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.buscaForm = this.fb.group({
      tipo: ['ida-volta'],
      origem: [''],
      destino: [''],
      dataIda: [null],
      dataVolta: [null],
      adultos: [1],
      criancas: [0],
      bebes: [0],
      categoria: ['Econômica']
    });
  }

  get totalPassageiros(): number {
    const f = this.buscaForm.value;
    return (f.adultos || 0) + (f.criancas || 0) + (f.bebes || 0);
  }

  obterResumoPassageiros(): string {
    const count = this.totalPassageiros;
    return count === 1 ? '1 passageiro' : `${count} passageiros`;
  }

  obterCategoria(): string {
    return this.buscaForm.get('categoria')?.value || 'Econômica';
  }

  alterarTipoPassagem(tipo: string) {
    this.buscaForm.patchValue({ tipo });
    if (tipo === 'somente-ida') {
      this.buscaForm.get('dataVolta')?.disable();
      this.buscaForm.get('dataVolta')?.setValue(null);
    } else {
      this.buscaForm.get('dataVolta')?.enable();
    }
  }

  inverterOrigemDestino() {
    const origem = this.buscaForm.get('origem')?.value;
    const destino = this.buscaForm.get('destino')?.value;
    this.buscaForm.patchValue({
      origem: destino,
      destino: origem
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '350px',
      data: {
        adultos: this.buscaForm.get('adultos')?.value,
        criancas: this.buscaForm.get('criancas')?.value,
        bebes: this.buscaForm.get('bebes')?.value,
        categoria: this.buscaForm.get('categoria')?.value
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buscaForm.patchValue({
          adultos: result.adultos,
          criancas: result.criancas,
          bebes: result.bebes,
          categoria: result.categoria
        });
      }
    });
  }

  onBuscar() {
    this.pesquisar.emit(this.buscaForm.value);
  }
}

