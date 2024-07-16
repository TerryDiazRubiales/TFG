import { Component, OnInit } from '@angular/core';
import { pjServices } from '../../services/pj.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Personaje } from '../../interfaces/pj.interface';

@Component({
  selector: 'app-personaje-page',
  templateUrl: './personaje-page.component.html',
  styles: [
  ]
})
export class PersonajePageComponent implements OnInit {

  public personaje?: Personaje;
 
  constructor( private PJServices : pjServices,
              private activatedRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRouter.params
    .pipe(
      delay(2000), 
      switchMap( ({ id }) => this.PJServices.getPersonajeById( id) ),
    )
    .subscribe( personaje => {
      if (!personaje) return this.router.navigate([ 'personajes/list' ]);

      this.personaje = personaje;
      return;  
    })
  }

  goBack(): void {
    this.router.navigateByUrl('personajes/list')
  }

}
