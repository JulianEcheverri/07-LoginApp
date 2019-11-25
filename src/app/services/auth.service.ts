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
    // hacemos lo mismo por que necesitamos obtener el usuario
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    // usamos la api de verificacion de usuario
    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData);
  }

  nuevoUsuario(usuario: UsuarioModel){
    // informacion para mandar a firebase
    // const authData = {
    //   email: usuario.email,
    //   password: usuario.password,
    //   returnSecureToken: true
    // };

    // usando operador spread syntax/ copia todo el objeto
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    // luego realizar una peticion post a la api de creacion de usuario
    // las peticiones post necesita en payload, lo que se envia al servidor
    //console.log(`${this.url}signUp?key=${this.apiKey}`);
    return this.http.post(`${this.url}signUp?key=${this.apiKey}`, authData);
  }
}
