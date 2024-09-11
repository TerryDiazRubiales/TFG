import { Genero } from "./genero.interface";
import { OrientacionSexual } from "./orientacionSexual.interface";
import { Romanticismo } from "./romanticismo.interface";
import { Sexo } from "./sexo.interface";
import { SignoZodiacal } from "./signoZodiacal.interface";

export interface PersonajeResponse {
    
   detailList: {
    _id:                string;
    romanticismo:      Romanticismo;
    apellidos:         string;
    fechaCumple:        string;
    genero:            Genero;
    historia:          string;
    nombre:            string;
    orientacionSexual: OrientacionSexual;
    sexo:              Sexo;
    signoZodiacal:     SignoZodiacal;
    usuario:           string;
    imagen:            string;
   },
   likes:               string;
   userLike?:           string;

}