import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface VendaMilhas {
  id: string;
  programa: string;
  quantidade: number;
  valorTotal: number;
  nome: string;
  dataVenda: Date;
}

@Component({
  selector: 'app-vender-milhas',
  templateUrl: './vender-milhas.component.html',
  styleUrls: ['./vender-milhas.component.scss']
})
export class VenderMilhasComponent implements OnInit {
  vendaForm!: FormGroup;
  vendasRecentes: VendaMilhas[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vendaForm = this.fb.group({
      programa: ['smiles', Validators.required],
      quantidade: [10000, [Validators.required, Validators.min(1000)]],
      nome: ['', Validators.required]
    });

    this.carregarVendas();
  }

  get valorTotal(): number {
    const prog = this.vendaForm.get('programa')?.value;
    const qtd = this.vendaForm.get('quantidade')?.value || 0;
    let rate = 18; // Smiles
    if (prog === 'latam') rate = 19;
    if (prog === 'azul') rate = 17;
    return (qtd / 1000) * rate;
  }

  obterNomePrograma(prog: string): string {
    if (prog === 'latam') return 'LATAM Pass';
    if (prog === 'azul') return 'TudoAzul';
    return 'Smiles';
  }

  carregarVendas(): void {
    try {
      const raw = sessionStorage.getItem('vendas_milhas');
      if (raw) {
        this.vendasRecentes = JSON.parse(raw);
      } else {
        this.vendasRecentes = [];
      }
    } catch (e) {
      console.error(e);
    }
  }

  salvarVenda(): void {
    if (this.vendaForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos corretamente.', 'Fechar', { duration: 3000 });
      return;
    }

    const formVal = this.vendaForm.value;
    const novaVenda: VendaMilhas = {
      id: Math.random().toString(36).substring(2, 9),
      programa: formVal.programa,
      quantidade: formVal.quantidade,
      valorTotal: this.valorTotal,
      nome: formVal.nome,
      dataVenda: new Date()
    };

    const vendas = [novaVenda, ...this.vendasRecentes];
    sessionStorage.setItem('vendas_milhas', JSON.stringify(vendas));
    
    this.snackBar.open('Simulação de venda de milhas realizada com sucesso!', 'Fechar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    this.carregarVendas();
    this.vendaForm.patchValue({
      nome: ''
    });
    this.vendaForm.markAsPristine();
    this.vendaForm.markAsUntouched();
  }

  limparHistorico(): void {
    sessionStorage.removeItem('vendas_milhas');
    this.carregarVendas();
  }
}
