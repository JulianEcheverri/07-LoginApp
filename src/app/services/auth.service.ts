import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // importar dos servicios: autenticcion y creacion de usuarios
  // sing in and sing up

  // api para crear usuarios obtenidos de firebase
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // api para logear los usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  // suministrada por firebase en
  private apiKey = 'AIzaSyARepBUQpEZS_OBWSUm5VWPkmITkc1GJtc';

  constructor(private http: HttpClient) { 

  }

  logOut(){

  }

  logIn(usuario: UsuarioModel){

  }

  nuevoUsuario(usuario: UsuarioModel){

  }
}
