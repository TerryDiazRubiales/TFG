import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { pjServices } from '../../services/pj.service';
import { Personaje } from '../../interfaces/pj.interface';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { Genero } from '../../interfaces/genero.interface';
import { Sexo } from '../../interfaces/sexo.interface';
import Swal from 'sweetalert2';
import { SignoZodiacal } from '../../interfaces/signoZodiacal.interface';
import { OrientacionSexual } from '../../interfaces/orientacionSexual.interface';
import { Romanticismo } from '../../interfaces/romanticismo.interface';




@Component({
  selector: 'app-newpj-page',
  templateUrl: './newpj-page.component.html',
  styles: [
  ]
})
export class NewpjPageComponent implements OnInit {

  isEditar: boolean = false;
  generos: Genero[] = [];
  sexo: Sexo[] = [];
  signoZodiacal: SignoZodiacal[] = [];
  orientacionSexual: OrientacionSexual[] = [];
  romanticismo: Romanticismo[] = [];

  // PARA EL FORMULARIO
  public characterForm = new FormGroup({

    romanticismo: new FormControl(''),
    apellidos: new FormControl('', Validators.required),
    fechaCumple: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    historia: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    orientacionSexual: new FormControl('', Validators.required),
    sexo: new FormControl('', Validators.required),
    signoZodiacal: new FormControl('', Validators.required),

  });

  // CONSTRUCTOR
  constructor(private PJService: pjServices,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }


  get currentCharacter(): Personaje {
    const character = this.characterForm.value as Personaje;

    return character;
  }

  // ngOnInit()
  ngOnInit(): void {

    // OBTENCIÓN DE GÉNEROS
    this.PJService.getGeneros().subscribe(
      {
        next: (response) => {
          this.generos = response;
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },

      })
    // FIN

    // OBTENCIÓN DE SEXO
    this.PJService.getSexos().subscribe(
      {
        next: (response) => {
          this.sexo = response;
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },

      })
    // FIN

    // OBTENCIÓN DE SIGNO ZODIACAL
    this.PJService.getSignoZodiacales().subscribe(
      {
        next: (response) => {
          this.signoZodiacal = response;
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },

      })
    // FIN

    // OBTENCIÓN DE SIGNO ZODIACAL
    this.PJService.getOrientacionSexual().subscribe(
      {
        next: (response) => {
          this.orientacionSexual = response;
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },

      })
    // FIN

    // OBTENCIÓN DE ROMANTICISMO
    this.PJService.getRomanticismo().subscribe(
      {
        next: (response) => {
          this.romanticismo = response;
        },
        error: (message) => {
          Swal.fire('Error', message, 'error');
        },

      })
    // FIN


    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.PJService.getPersonajeById(id)),
      ).subscribe(character => {

        if (!character) return this.router.navigateByUrl('/');

        this.characterForm.reset(character);
        return;

      });

  }

  onSubmit(): void {

    if (this.characterForm.invalid) return;

    if (this.isEditar) {

      //EDITAR PERSONAJE
      this.PJService.updateCharacter(this.currentCharacter)
        .subscribe(character => {
          // TODO: mostrar snackbar

          this.showSnackbar(`${character.nombre} actualizado correctamente!`);

        });

      //CREAR PERSONAJE
    } else {

      this.characterForm.valid ?
        this.PJService.createPersonaje(this.currentCharacter)
          .subscribe(character => {
            // TODO: mostrar snackbar, y navegar a /personajes/edit/personaje.id

            // this.router.navigate(['/personajes/edit', character.nombre]);
            this.showSnackbar(`${character.nombre} Personaje creado correctamente!`);

          })
        : this.showSnackbar(`Formulario erronéo!`);

    }

  }

  onDeleteCharacter() {
    if (!this.currentCharacter.nombre) throw Error('Character id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.characterForm.value,
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result: boolean) => result), // lo dejo pasar si el resultado es positivo
        switchMap(() => this.PJService.deleteCharacterById(this.currentCharacter.nombre)), // si es positivo mandamos a eliminar 
        filter((wasDeleted: boolean) => wasDeleted) // se elimina y lo dejamos pasar 
      )
      .subscribe(() => {

        this.router.navigate(['/personajes'])

      })

    /* dialogRef.afterClosed().subscribe(result => {

      if ( !result ) return;

      this.PJService.deleteCharacterById( this.currentCharacter.Nombre )
      .subscribe( wasDeleted => {

          if ( wasDeleted ) {
            this.router.navigate(['/personajes'])
          }
          
      } )
      

    }); */

  }

  showSnackbar(message: string): void {

    this.snackbar.open(message, 'done', {
      duration: 4000,
    })


  }

}
