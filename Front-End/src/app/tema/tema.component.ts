import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private router: Router,
    private serviceTema: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    
    if(environment.token == ''){
      this.alertas.showAlertInfo('Sua sessão expirou, faça login novamente.')
      this.router.navigate(['/login'])
    }

    if(environment.tipo != 'adm'){
      this.alertas.showAlertInfo('Voce precisa ter permissão para acessar essa rota.')
      this.router.navigate(['/inicio'])
    }

    this.findAllTema()
  }

  findAllTema(){
    this.serviceTema.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.serviceTema.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
      this.findAllTema()
      this.tema = new Tema()
    })
  }

}