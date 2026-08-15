import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Voo } from '../../core/services/flight.service';

@Component({
  selector: 'app-card-busca',
  templateUrl: './card-busca.component.html',
  styleUrls: ['./card-busca.component.scss']
})
export class CardBuscaComponent {
  @Input() voo!: Voo;
  @Output() verDetalhes = new EventEmitter<Voo>();

  onVerDetalhes() {
    this.verDetalhes.emit(this.voo);
  }
}

