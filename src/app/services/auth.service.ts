import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  // importar dos servicios: autenticcion y creacion de usuarios
  // sing in and sing up

  // api para crear usuarios obtenidos de firebase
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // api para logear los usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  // suministrada por firebase en
  private apiKey = "AIzaSyARepBUQpEZS_OBWSUm5VWPkmITkc1GJtc";

  // aqui almaceno el token existente
  userToken: string;

  constructor(private http: HttpClient) {
    // ejecutamos leer toke justo cuandio se inicializa el servicio para sabetr si tenemos token
    this.obtenerToken();
  }

  logOut() {
    localStorage.removeItem("token");
  }

  logIn(usuario: UsuarioModel) {
    // hacemos lo mismo por que necesitamos obtener el usuario
    const authData = {
      ...usuario,
      returnSecureToken: true
    };
    // usamos la api de verificacion de usuario
    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
      .pipe(
        map(respuestaMap => {
          console.log("entro en el map login");
          this.guardarToken(respuestaMap["idToken"]);
          // debo devolver el map
          return respuestaMap;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {
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

    // el post regresa un observable
    // con el cual puedo hacer modificaciones antes de mostrar en las paginas de inicio y registro
    // ahi puedo cuardar el token
    // pasar toda la infomacion por un observable pipe para asi poder usar el map y transformar la informacion o simplemente servir de intermediario
    // la ventaja es que si el post regresa un error el map no se ejecuta, solo se dispara el map si la funcion tiene exito
    // para el error se usa cathError perteneciente a los rxjs operators
    // el map es un filtro de toda la informacion y solo pasar la buena
    return this.http
      .post(`${this.url}signUp?key=${this.apiKey}`, authData)
      .pipe(
        map(respuestaMap => {
          console.log("entro en el map");
          this.guardarToken(respuestaMap["idToken"]);
          // debo devolver el map
          return respuestaMap;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);
    //guardamos en el local storage cuando expira el token, sumando 3600 seg, una hora
    localStorage.setItem("expira", hoy.getTime().toString());
  }

  obtenerToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length > 2) return false;
    // obtenermos la hora de expiracion
    const expiracion = Number(localStorage.getItem("expira"));
    const fechaDeExpiracion = new Date();
    fechaDeExpiracion.setTime(expiracion);

    return fechaDeExpiracion > new Date();
  }
}
