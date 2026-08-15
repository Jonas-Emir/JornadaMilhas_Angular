import { Component, Input } from '@angular/core';

export interface Depoimento {
  depoimento: string;
  autoria: string;
  avatar: string;
}

@Component({
  selector: 'app-card-depoimento',
  templateUrl: './card-depoimento.component.html',
  styleUrls: ['./card-depoimento.component.scss']
})
export class CardDepoimentoComponent {
  @Input() depoimentoItem!: Depoimento;
}

