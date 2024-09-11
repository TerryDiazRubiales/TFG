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

  id: string = '';
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
    imagen: new FormControl(''),

  });

  // CONSTRUCTOR
  constructor(private PJService: pjServices,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ) { }


  get currentCharacter(): Personaje {
    const character = this.characterForm.value as any;
  
    return character;
  }

  // ngOnInit()
  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    if (this.id === '') {
      // Mostrar formulario agregar
      this.isEditar = false;

    } else {
      // Mostrar Editar
      this.isEditar = true;
      this.PJService.getPersonajeById(this.id).subscribe( ({detailList, likes}) => {

        this.characterForm.get('nombre')?.setValue(detailList.nombre);
        this.characterForm.get('apellidos')?.setValue(detailList.apellidos);
        this.characterForm.get('fechaCumple')?.setValue(detailList.fechaCumple);
        this.characterForm.get('historia')?.setValue(detailList.historia);
        this.characterForm.get('genero')?.setValue(detailList.genero._id);
        this.characterForm.get('orientacionSexual')?.setValue(detailList.orientacionSexual._id);
        this.characterForm.get('sexo')?.setValue(detailList.sexo._id);
        this.characterForm.get('signoZodiacal')?.setValue(detailList.signoZodiacal._id);
        this.characterForm.get('romanticismo')?.setValue(detailList.romanticismo._id);
        this.characterForm.get('imagen')?.setValue(detailList.imagen);
        
        // this.personaje = {
        //   ...personaje,
        //   ace: personaje.romanticismo
        // }
      })

    }

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
  }

  // ONSUBMIT
  onSubmit(): void {

    if (this.characterForm.invalid) return;

    if (this.isEditar) {

      //EDITAR PERSONAJE
      this.PJService.updateCharacter(this.currentCharacter, this.id)
        .subscribe(character => {
          // TODO: mostrar snackbar

          this.showSnackbar(`${character.nombre} editado correctamente!`);

        });

      //CREAR PERSONAJE
    } else {
console.log(this.currentCharacter);

      this.characterForm.valid ?
        this.PJService.createPersonaje(this.currentCharacter)
          .subscribe(character => {
            // mostrar snackbar, y navegar a /personajes/edit/personaje.id

            // Resetear formulario
            this.characterForm.reset();

            // this.router.navigate(['/personajes/edit', character.nombre]);
            this.showSnackbar(`${character.nombre} creado correctamente!`);

          })
        : this.showSnackbar(`Formulario erronéo!`);

    }

  }

  onDeleteCharacter() {
    if (!this.id) throw Error('Character id is required');

    this.dialog.open(ConfirmDialogComponent, {
      data: this.characterForm.value,
    }).afterClosed()
      .pipe(
        filter((result: boolean) => result), // lo dejo pasar si el resultado es positivo
        switchMap(() => this.PJService.deleteCharacterById(this.id)), // si es positivo mandamos a eliminar 
        filter((wasDeleted: boolean) => wasDeleted) // se elimina y lo dejamos pasar 
      )
      .subscribe(() => {

        this.showSnackbar(`Personaje eliminado correctamente!`);
        this.router.navigate(['/personajes'])

      })


  }

  showSnackbar(message: string): void {

    this.snackbar.open(message, 'done', {
      duration: 4000,
    })


  }

  

}
