import { Component, OnInit } from '@angular/core';
import { Personaje } from '../../interfaces/pj.interface';
import { Usuario } from '../../interfaces/usuario.interface';

import { pjServices } from '../../services/pj.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking-page',
  templateUrl: './ranking-page.component.html',
  styleUrls: ['./ranking-page.component.css']
})
export class RankingPageComponent {

  loading: boolean = true;

  public ranking: Personaje[] = [];
  public Usuarios: Usuario[] = [];
  
  constructor( private pjServices : pjServices,
    private router: Router,

  ) { }


  ngOnInit(): void {

    this.pjServices.getEsVip().subscribe( usuario => { 
      
      console.log('Usuario: ', usuario);
      
      if ( usuario.length ===  0) { // !usuario => significa que es undefined o null

        this.loading = false;
        // mandar a página de formulario pago
        this.router.navigate(['/personajes/pago'])

      } else {
  
        this.loading = false;
        
        this.pjServices.getRanking().subscribe( personaje => this.ranking = personaje);
  
      }

      
    });

    
    



    

  }

}
