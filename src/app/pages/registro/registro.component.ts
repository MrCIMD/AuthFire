import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public usuario: UsuarioModel;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  public onSubmit(form: NgForm) {
    if (form.invalid) { return; }
    this.authService.newUser(this.usuario).subscribe(response => {
      console.log(response);
    }, log => {
      console.error(log.error.error.message);
    });
  }
}
