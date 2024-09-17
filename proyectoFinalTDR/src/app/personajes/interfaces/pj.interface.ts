import { Genero } from "./genero.interface";
import { OrientacionSexual } from "./orientacionSexual.interface";
import { Romanticismo } from "./romanticismo.interface";
import { Sexo } from "./sexo.interface";
import { SignoZodiacal } from "./signoZodiacal.interface";
import { Usuario } from "./usuario.interface";

export interface Personaje {
    _id:                string;
    ace:               Romanticismo;
    apellidos:         string;
    fechaCumple:        string;
    genero:            Genero;
    historia:          string;
    nombre:            string;
    orientacionSexual: OrientacionSexual;
    sexo:              Sexo;
    signoZodiacal:     SignoZodiacal;
    usuario:           Usuario;
    imagen?:            string;
    likes?:             string;
    userLike?:          boolean
}