import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: UsuarioModel;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere, por favor...'
    });
    Swal.showLoading();
    this.authService.newUser(this.usuario).subscribe(response => {
      console.log(response);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, log => {
      console.error(log.error.error.message);
      Swal.fire({
        title: 'Error al autenticar',
        icon: 'error',
        text: log.error.error.message
      });
    });
  }
}
