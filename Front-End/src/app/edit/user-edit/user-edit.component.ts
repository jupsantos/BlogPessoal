import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  confirmeSenha: string
  tipoUser: string
  idUsuario: number


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua sessão expirou, faça login novamente.')
      this.router.navigate(['/login'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmarSenha(event: any){
    this.confirmeSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUser = event.target.value
  }

  atualizar(){

    this.usuario.tipo = this.tipoUser

    if(this.usuario.senha != this.confirmeSenha){
      alert('As senhas não são compatíveis.')
    }
    else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/inicio'])
        alert('Usuário atualizado com sucesso! Faça o login novamente.')
        environment.nome = ''
        environment.foto = ''
        environment.token = ''
        environment.id = 0
        this.router.navigate(['/login'])
      })
    }
  }

  findByIdUsuario(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}
