import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Personaje } from '../interfaces/pj.interface';
import { environments } from '../../../environments/environments';
import { Genero } from '../interfaces/genero.interface';
import { Sexo } from '../interfaces/sexo.interface';
import { SignoZodiacal } from '../interfaces/signoZodiacal.interface';
import { OrientacionSexual } from '../interfaces/orientacionSexual.interface';
import { Romanticismo } from '../interfaces/romanticismo.interface';
import { PersonajeResponse } from '../interfaces/personajeResponse.interface';


@Injectable({ providedIn: 'root' })
export class pjServices {
  private baseUrl: string = environments.baseUrl;
   

  constructor(private http: HttpClient) {}

  getPersonajes(): Observable<Personaje[]> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<Personaje[]>(`${this.baseUrl}/api/personaje/list`, {headers: headers});
  }

  getSuggestions(query: string): Observable<Personaje[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    
    return this.http.get<Personaje[]>(`${this.baseUrl}/api/personaje/buscar?q=${query}`, {headers: headers});
  }


  // OBTENCIÓN DE GENEROS
  getGeneros(): Observable<Genero[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<Genero[]>(`${this.baseUrl}/api/personaje/generos`, {headers: headers});
  }

  // OBTENCIÓN DE SEXO
  getSexos(): Observable<Sexo[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<Sexo[]>(`${this.baseUrl}/api/personaje/sexo`, {headers: headers});
  }

  // OBTENCIÓN DE SIGNOS ZODIACALES
  getSignoZodiacales(): Observable<SignoZodiacal[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<SignoZodiacal[]>(
      `${this.baseUrl}/api/personaje/signoZodiacal`, {headers: headers}
    );
  }

  // OBTENCIÓN DE ORIENTACION SEXUAL
  getOrientacionSexual(): Observable<OrientacionSexual[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<OrientacionSexual[]>(
      `${this.baseUrl}/api/personaje/orientacionSexual`, {headers: headers}
    );
  }

  // OBTENCIÓN DE ROMANTICISMO
  getRomanticismo(): Observable<Romanticismo[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<Romanticismo[]>(
      `${this.baseUrl}/api/personaje/romanticismo`, {headers: headers}
    );
  }

  getPersonajeById(id: string): Observable<PersonajeResponse > {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http
      .get<PersonajeResponse>(`${this.baseUrl}/api/personaje/${id}`, {headers: headers});
  }

  createPersonaje(personaje: Personaje): Observable<Personaje> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    console.log(headers);
    
    return this.http.post<Personaje>(
      `${this.baseUrl}/api/personaje/create`,
      personaje,
      { headers: headers }
    );
  }

  updateCharacter(personaje: Personaje, id: string): Observable<Personaje> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
 
    if (!personaje.nombre) throw Error('Character id is required');
    return this.http.patch<Personaje>(
      `${this.baseUrl}/api/personaje/${id}`,
      personaje, {headers: headers}
    );
  }

  deleteCharacterById(id: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.delete(`${this.baseUrl}/api/personaje/${id}`, {headers: headers}).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }

  like (personaje: string, id: string): Observable<Personaje> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    console.log("headers:", headers);

    return this.http.post<Personaje>
    (`${this.baseUrl}/api/personaje/like`,
      { 
        personaje: personaje, 
        usuario: id 
      },
      { headers: headers });
  }

  unlike (personaje: string, id: string): Observable<Personaje> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
  
    return this.http.post<Personaje>
    (`${this.baseUrl}/api/personaje/unlike`, 
      { 
        personaje: personaje, 
        usuario: id 
      },
      { headers: headers });
  }
  
  getRanking (): Observable< any>  {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
  
    return this.http.get<any>(
      `${this.baseUrl}/api/personaje/ranking`, {headers: headers}
    );
  
  }

  // FINAL
}




