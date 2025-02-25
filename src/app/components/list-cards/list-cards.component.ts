import { Component } from '@angular/core';
import { CardClansContentComponent } from '../card-clans-content/card-clans-content.component';

import { Router, RouterOutlet } from '@angular/router';
import { ClanSUPA } from '../../models/clan-SUPA.model';
import { ServiceSupabaseService } from '../../services/service-supabase.service';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceCocService } from '../../services/service-coc.service';

@Component({
  selector: 'app-list-cards',
  imports: [CardClansContentComponent],
  templateUrl: './list-cards.component.html',
  styleUrl: './list-cards.component.css'
})
export class ListCardsComponent {
  titleWar = 'WAR'
  titleCWL = 'CWL'
  titleCapital = 'CAPITAL'
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

  jsonData: any;

  constructor(private router: Router, private clanService: ServiceSupabaseService, private httClient: HttpClient, private serviceCOC: ServiceCocService) { }
  errorMessage: string = ''

  ngOnInit() {
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

  findInformationTest() {
    // this.serviceTest.testInformationWar().subscribe({
    //   next: (data) => {
    //     alert(JSON.stringify(data))
    //     // console.log(data);

    //   },
    //   error: (err) => {
    //     console.error('Error en la consulta:', err);
    //     alert('Error en la consulta:' + err)
    //   },
    //   complete: () => {
    //     // Habilitar el formulario cuando la consulta finalice
    //   }
    // })
  }

  findInformationClan(dataClan: Array<string>) {

    const title = dataClan[0]
    const tag = dataClan[1]
    const day = dataClan[2] ? dataClan[2] : null
    // console.log({title, tag, day})
    // CAPITAL
    if (title == 'CAPITAL') {
      this.serviceCOC.getInformationCapital(tag).subscribe({
        next: (data) => {
          if(data){
            // console.log('Enviando data:::', data);
            sessionStorage.setItem('clanData', JSON.stringify(data));
            this.router.navigate(['/information'])
          }else{
            console.log('Error en la data o vacio');
            sessionStorage.setItem('clanData', '');
          }
        },
        error: (err) => {
          console.error('Error en la consulta:', err);
          // alert('Error en la consulta:' + err)
          sessionStorage.setItem('clanData', '');
        },
        complete: () => {
          // Habilitar el formulario cuando la consulta finalice
          
        }
      })
    }

  }
}
