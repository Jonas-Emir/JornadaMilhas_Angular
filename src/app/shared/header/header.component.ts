import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComoFuncionaModalComponent } from '../modal/como-funciona-modal.component';
import { AuthModalComponent } from '../modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private dialog: MatDialog) {}

  abrirSobre(): void {
    this.dialog.open(ComoFuncionaModalComponent, {
      width: '450px'
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  abrirAuth(mode: 'login' | 'cadastro'): void {
    this.isMenuOpen = false;
    this.dialog.open(AuthModalComponent, {
      width: '480px',
      data: { mode },
      panelClass: 'auth-dialog-panel'
    });
  }
}

