import { Component, OnInit } from '@angular/core';
import { pjServices } from '../../services/pj.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Personaje } from '../../interfaces/pj.interface';
import {Location} from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personaje-page',
  templateUrl: './personaje-page.component.html',
  styleUrls: [ './personaje-page.component.css' ]
  
})
export class PersonajePageComponent implements OnInit {

  public personaje?: Personaje;
 
  constructor( private pjServices : pjServices,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private location: Location,
              private snackbar: MatSnackBar,) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.paramMap.get('id') ?? '';

    this.pjServices.getPersonajeById(id).subscribe( ({detailList, likes, userLike}) => {

      this.personaje = {
        ...detailList,
        ace: detailList.romanticismo,
        likes: likes,
        userLike: userLike ? true : false
      }
    })

  }

  goBack(): void {
    // this.router.navigateByUrl('personajes/list')
    this.location.back();
  }

  like (personaje_id: string, personaje_usuario: string) {
    this.pjServices.like(personaje_id, personaje_usuario).subscribe(() => {
     
      this.personaje ? this.personaje.userLike = true : undefined;
      Swal.fire('Mensaje', '¡Me gusta!');
      
    })
  }

  unlike (personaje_id: string, personaje_usuario: string) {
    this.pjServices.unlike(personaje_id, personaje_usuario).subscribe(() => {
     
      this.personaje ? this.personaje.userLike = false : undefined;
      Swal.fire('Mensaje', '¡No me gusta!');

    })
  }
  

}
