import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private serviceTema: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){

    if(environment.token == ''){
      this.router.navigate(['/login'])
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number){
    this.serviceTema.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  apagar(){
    this.serviceTema.deleteTema(this.idTema).subscribe(() => {
      alert('Tema apagado com sucesso')
      this.router.navigate(['/tema'])
    })
  }
}
