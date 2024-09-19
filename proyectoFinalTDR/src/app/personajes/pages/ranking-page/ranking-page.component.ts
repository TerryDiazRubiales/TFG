import { Component, OnInit } from '@angular/core';
import { pjServices } from '../../services/pj.service';
import { Personaje } from '../../interfaces/pj.interface';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent {

  public ranking: Personaje[] = [];
  public Usuarios: Usuario[] = [];
  
  constructor( private pjServices : pjServices,

  ) { }


  ngOnInit(): void {


    this.pjServices.getRanking().subscribe( personaje => this.ranking = personaje);
    // this.pjServices.getVip().subscribe( personaje => this.ranking = personaje);
    

  }

}
