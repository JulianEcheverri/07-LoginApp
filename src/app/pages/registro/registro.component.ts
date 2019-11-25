import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm  } from "@angular/forms";
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();

  // hacer importacion de FormsModule para uso de ngModel en el formulario
  // e importarlo en app.module.ts

  constructor(private auth : AuthService) { }

  ngOnInit() {
    // inicializamos el model usuario
    // this.usuario = new UsuarioModel();
    //this.usuario.email = 'julianecheverri@outlook.com';
   }

   onSubmit(form: NgForm){
     if (form.invalid) return;
    // console.log('formulario enviado');
    // console.log(this.usuario);
    // console.log(form);
    
    // importamos el servicio para tener acceso a la funcion que crea el usuario en firebase
    // firebase da una respuesta y por ello se usa el subscribe
    
    // da uan respuesta similar a esta
    // {
    //   "idToken": "[ID_TOKEN]",
    //   "email": "[user@example.com]",
    //   "refreshToken": "[REFRESH_TOKEN]",
    //   "expiresIn": "3600",
    //   "localId": "tRcfmLH7..."
    // }

    // el idtoken nos sirve para validar todas las peticiones contra el backend
    // el logOut es la destruccion de ese idToken

    this.auth.nuevoUsuario(this.usuario).subscribe(
      respuesta => {
        // el subscribe obtiene la respuesta
        console.log(respuesta);
      },
      // el despues de la funcion de respuesta del subscribe esta el error
      ex =>{
        console.log(ex.error.error.message);
      }
    );
   }
}
