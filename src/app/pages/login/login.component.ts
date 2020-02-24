import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuario: UsuarioModel;
  public recordarme = false;

  constructor(private authService: AuthService,  private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  public login(form: NgForm) {
    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere, por favor...'
    });
    Swal.showLoading();
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);
      Swal.close();
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
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
