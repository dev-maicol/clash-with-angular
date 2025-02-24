import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CardClansContentComponent } from './components/card-clans-content/card-clans-content.component';
import { ClanSUPA } from './models/clan-SUPA.model';
import { ServiceSupabaseService } from './services/service-supabase.service';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceCocService } from './services/service-coc.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CardClansContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  titleWar = 'War Information';
  titleCWL = 'CWL Information'
  clans: ClanSUPA[] = [
    {
      id: 1,
      clan_tag: '#AGDHBC123',
      clan_name: 'Resistencia ABC',
      clan_state: true,
      created_at: new Date()
    },
    {
      id: 2,
      clan_tag: '#XYZahgd',
      clan_name: 'Otro clan dedasdsd',
      clan_state: true,
      created_at: new Date()
    },
  ]

  constructor(private router: Router, private clanService: ServiceSupabaseService, private httClient: HttpClient, private serviceTest: ServiceCocService){}
  errorMessage: string = ''

  ngOnInit(){
    this.clanService.getClansSupabase().pipe(
      catchError((error) => {
        this.errorMessage = 'Error Supabase'
        console.error('Error al obtener clans:', error)
        return of()
      })
    ).subscribe((clans) => {
      this.clans = clans
    })
  }

  findInformationTest(){
    this.serviceTest.testInformationWar().subscribe({
      next: (data) => {
        alert(JSON.stringify(data))
        // console.log(data);
        
      },
      error: (err) => {
        console.error('Error en la consulta:', err);
        alert('Error en la consulta:' + err)
      },
      complete: () => {
        // Habilitar el formulario cuando la consulta finalice
      }
    })
  }
}
