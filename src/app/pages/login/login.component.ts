import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService) { }
  usuario: UsuarioModel = new UsuarioModel();
  ngOnInit() {
  }

  login(form: NgForm){
    if (form.invalid) return;
    // console.log(form);

    this.auth.logIn(this.usuario).subscribe(
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
