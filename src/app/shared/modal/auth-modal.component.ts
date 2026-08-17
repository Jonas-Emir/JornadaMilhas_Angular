import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AuthModalData {
  mode: 'login' | 'cadastro';
}

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  mode: 'login' | 'cadastro' = 'login';
  loginForm!: FormGroup;
  cadastroForm!: FormGroup;

  hideSenhaLogin: boolean = true;
  hideSenhaCadastro: boolean = true;
  hideConfirmarSenhaCadastro: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AuthModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthModalData,
    private snackBar: MatSnackBar
  ) {
    if (data && data.mode) {
      this.mode = data.mode;
    }
  }

  ngOnInit(): void {
    this.inicializarFormularios();
  }

  private inicializarFormularios(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      lembrarMe: [false]
    });

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      aceitarTermos: [false, [Validators.requiredTrue]]
    }, { validators: this.validarSenhasIguais });
  }

  private validarSenhasIguais(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');
    
    if (senha && confirmarSenha && senha.value !== confirmarSenha.value) {
      confirmarSenha.setErrors({ senhasDiferentes: true });
      return { senhasDiferentes: true };
    }
    return null;
  }

  setMode(mode: 'login' | 'cadastro'): void {
    this.mode = mode;
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      this.snackBar.open(`Login realizado com sucesso! Bem-vindo de volta, ${email}`, 'Fechar', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.dialogRef.close({ success: true, user: email, mode: 'login' });
    }
  }

  onCadastroSubmit(): void {
    if (this.cadastroForm.valid) {
      const nome = this.cadastroForm.value.nome;
      this.snackBar.open(`Cadastro realizado com sucesso! Bem-vindo(a), ${nome}`, 'Fechar', {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      this.dialogRef.close({ success: true, user: nome, mode: 'cadastro' });
    }
  }
}
