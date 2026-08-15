import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComoFuncionaModalComponent } from '../modal/como-funciona-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

  abrirSobre(): void {
    this.dialog.open(ComoFuncionaModalComponent, {
      width: '450px'
    });
  }
}

