import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService, private route: Router) { }
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false; // para asociar al check de recordar usuario
  ngOnInit() {
    // cuando le de recordarme se guardara en el local storage el email asociado
    // cuando recargue debe hacerse en el ngOnInit
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm){
    if (form.invalid) return;

    // muestra un mensaje de alerta con la libreria sweetalert 2
    Swal.fire({
      text: 'Espere por favor...',
      icon: 'info',
      allowOutsideClick: false //previene clic afuera
    });

    // quita el boton de ok y pone un loading
    Swal.showLoading();

    this.auth.logIn(this.usuario).subscribe(
      respuesta => {
        // el subscribe obtiene la respuesta
        //console.log(respuesta);
        // para cerrar el alert
        Swal.close();

        // cuando le de recordarme se guardara en el local storage el email asociado
        // cuando recargue debe hacerse en el ngOnInit
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.route.navigateByUrl('/home');
      },
      // el despues de la funcion de respuesta del subscribe esta el error
      ex =>{
        //console.log(ex.error.error.message);
        Swal.fire({
          text: ex.error.error.message,
          title: 'Error al autenticar',
          icon: 'error',
        });
      }
    );
  }
}
