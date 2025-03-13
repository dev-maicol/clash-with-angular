import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClanSUPA } from '../models/clan-SUPA.model';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ServiceSupabaseService {
  private urlAPISUPA = environment.urlBaseSUPA + 'clans'

  constructor(private httpClient: HttpClient) { }

  clans: ClanSUPA[] = []

  getClansSupabase(): Observable<ClanSUPA[]>{

    const headers = new HttpHeaders({
      'apikey': environment.apiKeySUPA,  // Reemplaza con tu clave real
      'Authorization': `Bearer ${environment.apiKeySUPA}`, // Si usas un token de autorización
      'Content-Type': 'application/json' // Opcional, si la API lo requiere
    });

    return this.httpClient.get<ClanSUPA[]>(this.urlAPISUPA, { headers })
  }

  getTotalBack(): Observable<any>{
    return this.httpClient.get(environment.urlBaseBack + 'total')
  }
}
