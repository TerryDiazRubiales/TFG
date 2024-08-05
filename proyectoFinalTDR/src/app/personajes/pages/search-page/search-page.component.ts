import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Personaje } from '../../interfaces/pj.interface';
import { pjServices } from '../../services/pj.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public personajes: Personaje[] = [];
  public selectedPj?: Personaje;

  constructor( private PJService: pjServices ) {}

  searchPersonaje() {
    const value: string = this.searchInput.value || '';
    
    this.PJService.getSuggestions ( value )
    .subscribe( personajes => this.personajes = personajes);
  }

  OnSelectedOption( event: MatAutocompleteSelectedEvent ): void {

    if( !event.option.value ) {
      this.selectedPj = undefined;
      return;
    }

    const personaje: Personaje = event.option.value;
    this.searchInput.setValue( personaje.nombre );

    this.selectedPj = personaje;

  }

}
