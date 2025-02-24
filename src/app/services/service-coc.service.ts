import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceCocService {
  private urlBaseCOC = environment.urlBaseCOC + 'clans/%23'

  private urlTest = environment.urlBaseBack

  constructor(private httpClient: HttpClient) { }

  getInformationWar(tag: string): Observable<any> {
    // console.log('Tag recibido en serviceCoc: ' + tag);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.apiKeyCOC}`, // Si usas un token de autorización
      'Content-Type': 'application/json' // Opcional, si la API lo requiere
    });

    return this.httpClient.get(this.urlBaseCOC + tag + '/currentwar', { headers })
  }

  testInformationWar(): Observable<any>{
    return this.httpClient.get(this.urlTest + 'clans/war/RUG0LC2Q')
  }
}
