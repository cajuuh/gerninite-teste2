import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApontamentosService {

  apiRef: string = environment.API_URL;

  constructor(private httpCliente: HttpClient) { }

  public getApontamentos(id: number): Observable<any[]> {

    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': JSON.parse(localStorage.getItem('token'))
    });

    return this.httpCliente.get<any[]>(`${this.apiRef}/pessoa/${id}`, { headers: reqHeader });
  }
}
