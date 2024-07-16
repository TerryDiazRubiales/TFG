import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { pjServices } from '../../services/pj.service';
import { Personaje } from '../../interfaces/pj.interface';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-newpj-page',
  templateUrl: './newpj-page.component.html',
  styles: [
]
})
export class NewpjPageComponent implements OnInit {

  // PARA EL FORMULARIO
  public characterForm = new FormGroup({

    Ace:               new FormControl(''),
    Apellidos:         new FormControl(''),
    Cumpleanos:        new FormControl(''),
    Genero:            new FormControl(''),
    Historia:          new FormControl(''),
    Nombre:            new FormControl(''),
    OrientacionSexual: new FormControl(''),
    Sexo:              new FormControl(''),
    SignoZodiacal:     new FormControl(''),

  });

  // LOS SELECT DEL FORMULARIO
  public Signo =  [
    { id: 'Acuario', desc:'Acuario' },
    { id: 'Aries', desc:'Aries' },
    { id: 'Tauro', desc:'Tauro' },
    { id: 'Geminis', desc:'Geminis' },
    { id: 'Cancer', desc:'Cancer' },
    { id: 'Leo', desc:'Leo' },
    { id: 'Virgo', desc:'Virgo' },
    { id: 'Escorpio', desc:'Escorpio' },
    { id: 'Libra', desc:'Libra' },
    { id: 'Sagitario', desc:'Sagitario' },
    { id: 'Piscis', desc:'Piscis' },
    { id: 'Capriconio', desc:'Capricornio' },
  ]

  public Sexo =  [
    { id: 'Masculino', desc:'Masculino' },
    { id: 'Femenino', desc:'Feminino' },
    { id: 'Intersexual', desc:'Intersexual' },
    { id: 'Trans', desc:'Trans' },
  ]

  public Genero =  [
    { id: 'Mujer', desc:'Mujer' },
    { id: 'Hombre', desc:'Hombre' },
    { id: 'No binario', desc:'No binario' },
    { id: 'Agenero', desc:'Agenero' },
    { id: 'Bigenero', desc:'Bigenero' },
    { id: 'Trigenero', desc:'Trigenero' },
    { id: 'Fluido', desc:'Fludio' },
    { id: 'Demigirl', desc:'Demigirl' },
    { id: 'Demiboy', desc:'Demiboy' },
    { id: 'Demigender', desc:'Demigender' },
  ]

  public Orientacion =  [
    { id: 'Heterosexual', desc:'Hetero' },
    { id: 'Gay', desc:'Gay' },
    { id: 'Lesbiana', desc:'Lesbiana' },
    { id: 'Bisexual', desc:'Bisexual' },
    { id: 'Pansexual', desc:'Pansexual' },
    { id: 'Asexual', desc:'Asexual' },
    { id: 'Polisexual', desc:'Polisexual' },
    { id: 'Omnisexual', desc:'Omnisexual' },
    { id: 'Antrosexual', desc:'Antrosexual' },
  ]

  public Ace =  [
    { id: 'No soy Asexual', desc:' ' },
    { id: 'Arromantico', desc:'Arromantico' },
    { id: 'Homorromantico', desc:'Homorromantico' },
    { id: 'Panrromantico', desc:'Panromantico' },
    { id: 'Birromantico', desc:'Birromantico' },
    { id: 'Polirromantico', desc:'Polirromantico' },
    { id: 'Omnirromantico', desc:'Omnirromantico' },
    { id: 'Poliamoroso', desc:'Poliamoroso' },
    { id: 'Heterorromantico', desc:'Heterorromantic' },
  ]

  // CONSTRUCTOR
  constructor ( private PJService: pjServices, 
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private snackbar: MatSnackBar,
                private dialog: MatDialog,
              ) {}
  

  get currentCharacter(): Personaje {
    const character = this.characterForm.value as Personaje;

    return character;
  }

  // ngOnInit()
  ngOnInit(): void {
    
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.PJService.getPersonajeById( id ) ),
    ).subscribe( character => {

      if ( !character ) return this.router.navigateByUrl('/');

      this.characterForm.reset( character );
      return;

    });

  }

  onSubmit(): void {

    if ( this.characterForm.invalid ) return;

    if ( this.currentCharacter.Nombre ) {
      this.PJService.updateCharacter( this.currentCharacter )
      .subscribe( character => {
        // TODO: mostrar snackbar

        this.showSnackbar(`${ character.Nombre } actualizado correctamente!`);

      } );

      return;

    }

    this.PJService.addCharacter( this.currentCharacter ) 
    .subscribe( character => {
      // TODO: mostrar snackbar, y navegar a /personajes/edit/personaje.id

      this.router.navigate(['/personajes/edit', character.Nombre]);
      this.showSnackbar(`${ character.Nombre } creado correctamente!`);

    } );

  }

  onDeleteCharacter () {
    if ( !this.currentCharacter.Nombre ) throw Error('Character id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.characterForm.value,
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ), // lo dejo pasar si el resultado es positivo
      switchMap ( () => this.PJService.deleteCharacterById( this.currentCharacter.Nombre ) ), // si es positivo mandamos a eliminar 
      filter( (wasDeleted: boolean) => wasDeleted ) // se elimina y lo dejamos pasar 
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
  
  showSnackbar ( message: string ):void {

    this.snackbar.open( message, 'done', {
      duration: 4000,
    } )


  }
  
}
