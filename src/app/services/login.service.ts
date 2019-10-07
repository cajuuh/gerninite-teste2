import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../@core/utils/login.response';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiRef: string = environment.API_URL;

  public setStorge(key: string, value: string) {
    return sessionStorage.setItem(key, value);
  }

  public getStorage(key: string) {
    return sessionStorage.getItem(key);
  }

  public getTokenHeaders(): any {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('authorization', 'Bearer ' + sessionStorage.getItem('access_token'));
    return headers;
  }

  public getTokenHeadersFromHttpClient(): any {
    const headers = new Headers();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')
      })
    };
    return httpOptions;
  }

  constructor(private httpCliente: HttpClient) { }

  public login(data: ResponseLogin): Observable<ResponseLogin> {
    return this.httpCliente.post<ResponseLogin>(`${this.apiRef}/login`, data);
  }

  public logout() {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('usuario', null);
  }

}
