import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm  } from "@angular/forms";
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();

  // hacer importacion de FormsModule para uso de ngModel en el formulario
  // e importarlo en app.module.ts

  constructor() { }

  ngOnInit() {
    // inicializamos el model usuario
    // this.usuario = new UsuarioModel();
    //this.usuario.email = 'julianecheverri@outlook.com';
   }

   onSubmit(form: NgForm){
     if (form.invalid) return;
    console.log('formulario enviado');
    console.log(this.usuario);
    console.log(form);
   }

}
