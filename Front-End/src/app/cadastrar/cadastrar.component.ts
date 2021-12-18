import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmeSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmarSenha(event: any){
    this.confirmeSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  cadastrar(){

    this.usuario.tipo = this.tipoUser

    if(this.usuario.senha != this.confirmeSenha){
      this.alertas.showAlertInfo('As senhas não são compatíveis.')
    }
    else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!')
      }, erro => {
        if(erro.status == 500){
          alert('Usuário já cadastrado!')
        }
      })
    }
  }
}
