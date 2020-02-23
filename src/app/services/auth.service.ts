import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private key = 'AIzaSyCzATluNUQrD-c8Hn8tVxZTtqH-Qh6JJ8I';
  // Crear usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { }

  logout() { }

  login(usuario: UsuarioModel) {
    return this.http.post(`${this.url}signInWithPassword?key=${this.key}`, {...usuario, returnSecureToken: true});
  }

  newUser(usuario: UsuarioModel) {
    return this.http.post(`${this.url}signUp?key=${this.key}`, {...usuario, returnSecureToken: true});
  }

}
