import { Component, OnInit } from '@angular/core';
import { pjServices } from '../../services/pj.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Personaje } from '../../interfaces/pj.interface';

@Component({
  selector: 'app-personaje-page',
  templateUrl: './personaje-page.component.html',
  styleUrls: [ './personaje-page.component.css' ]
  
})
export class PersonajePageComponent implements OnInit {

  public personaje?: Personaje;
 
  constructor( private pjServices : pjServices,
              private activatedRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id') ?? '';
    this.pjServices.getPersonajeById(id).subscribe( personaje => {
      console.log('back: ', personaje)
      this.personaje = {
        ...personaje,
        ace: personaje.romanticismo
      }
    })

  }

  goBack(): void {
    this.router.navigateByUrl('personajes/list')
  }
  

}
