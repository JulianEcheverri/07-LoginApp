import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  //es un servicio ncomun que implementa el CanActivate
  //El CanActivate es la instrucción que debe cumplirse para activar una ruta o no, proviene de @angular/router

  // canActivate(
  //   next: ActivatedRouteSnapshot, // next: Nombre de la ruta // state
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //     // puede retornar un observable que resuelva un Boolean, una promesa, etc,
  //   return true;
  // }

  // se debe especificar en el app-routing-module la ruta que tendra este guard
  constructor(private auth: AuthService, private route: Router) {}

  canActivate(): boolean {
    if (this.auth.estaAutenticado()) {
      return this.auth.estaAutenticado();
    } else {
      console.log('guard');
      this.route.navigateByUrl('/login');
      return false;
    }
  }
}
