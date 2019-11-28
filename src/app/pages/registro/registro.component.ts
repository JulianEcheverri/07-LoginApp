import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { UsuarioModel } from "../../models/usuario.model";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  // hacer importacion de FormsModule para uso de ngModel en el formulario
  // e importarlo en app.module.ts

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {
    // inicializamos el model usuario
    // this.usuario = new UsuarioModel();
    //this.usuario.email = 'julianecheverri@outlook.com';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    // muestra un mensaje de alerta con la libreria sweetalert 2
    Swal.fire({
      text: "Espere por favor...",
      icon: "info",
      allowOutsideClick: false
    });

    // quita el boton de ok y pone un loading
    Swal.showLoading();

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
        //console.log(respuesta);
        // para cerrar el alert
        Swal.close();

        //cuando le de recordarme se guardara en el local storage el email asociado
        // cuando recargue debe hacerse en el ngOnInit
        if (this.recordarme) {
          localStorage.setItem("email", this.usuario.email);
        }

        this.route.navigateByUrl("/home");
      },
      // el despues de la funcion de respuesta del subscribe esta el error
      ex => {
        //console.log(ex.error.error.message);
        Swal.fire({
          text: ex.error.error.message,
          title: "Error al autenticar",
          icon: "error"
        });
      }
    );
  }
}
