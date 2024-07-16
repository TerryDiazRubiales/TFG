import { Component, Input, OnInit } from '@angular/core';
import { Personaje } from '../../interfaces/pj.interface';

@Component({
  selector: 'personajes-personaje-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {
  
  @Input()
  public personaje!: Personaje;

  ngOnInit(): void {
    if ( !this.personaje ) throw Error('Personaje property is required');
  }



}
