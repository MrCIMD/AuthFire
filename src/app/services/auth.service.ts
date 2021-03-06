import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private key = 'AIzaSyCzATluNUQrD-c8Hn8tVxZTtqH-Qh6JJ8I';
  public token: string = '';

  constructor(private http: HttpClient) { }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    return this.http.post(`${this.url}signInWithPassword?key=${this.key}`, {...usuario, returnSecureToken: true})
    .pipe(map(resp => {
      // tslint:disable-next-line: no-string-literal
      this.saveToken( resp['idToken']);
      return resp;
    }));
  }

  newUser(usuario: UsuarioModel) {
    return this.http.post(`${this.url}signUp?key=${this.key}`, {...usuario, returnSecureToken: true})
      .pipe(map(resp => {
        // tslint:disable-next-line: no-string-literal
        this.saveToken( resp['idToken']);
        return resp;
      }));
  }

  private saveToken(idToken: string) {
    this.token = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expired', hoy.getTime().toString());
  }

  public readToken() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return this.token;
  }

  public userAuth(): boolean {
    if (this.token.length < 2) {
      return false;
    }
    const expired = Number(localStorage.getItem('expired'));
    const expiredDate = new Date();
    expiredDate.setSeconds(expired);

    if (expiredDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

}
