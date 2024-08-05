import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Personaje } from '../interfaces/pj.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class pjServices {

private baseUrl: string = environments.baseUrl;

constructor(private http: HttpClient) { }

getPersonajes(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(`${ this.baseUrl }/personajes`); 
}

getPersonajeById( id: string ): Observable <Personaje | undefined > {

    return this.http.get<Personaje>(`${ this.baseUrl }/personajes/${ id }`)
    .pipe(
        catchError( error => of(undefined) )
    );

} 

getSuggestions( query: string ): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(`${ this.baseUrl }/personajes?q=${ query }`);

}

createPersonaje( personaje: Personaje ): Observable<Personaje> {
    console.log("entra");
    return this.http.post<Personaje>( `${ this.baseUrl }/api/personaje/create`, personaje );
}

updateCharacter( personaje: Personaje ): Observable<Personaje> {
    if ( !personaje.nombre ) throw Error('Character id is required');
    return this.http.patch<Personaje>( `${ this.baseUrl }/personajes/${ personaje.nombre }`, personaje );
}

deleteCharacterById( id: string ): Observable<boolean> {
    return this.http.delete( `${ this.baseUrl }/personajes/${ id }`)
    .pipe(
        map ( resp => true ),
        catchError( err => of(false) ),
    );
}

}