import { Component, OnInit } from '@angular/core';
import { Personaje } from '../../interfaces/pj.interface';
import { pjServices } from '../../services/pj.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent implements OnInit {

  public personajes: Personaje[] = [];

  constructor( private PJServices : pjServices) { }
  
  ngOnInit(): void {
    this.PJServices.getPersonajes()
    .subscribe( personaje => this.personajes = personaje);
    
  }



}
