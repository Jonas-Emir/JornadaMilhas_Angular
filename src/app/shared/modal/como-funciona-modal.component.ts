import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-como-funciona-modal',
  templateUrl: './como-funciona-modal.component.html',
  styleUrls: ['./como-funciona-modal.component.scss']
})
export class ComoFuncionaModalComponent {
  constructor(public dialogRef: MatDialogRef<ComoFuncionaModalComponent>) {}
}
