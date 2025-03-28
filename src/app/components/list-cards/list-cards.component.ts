import { Component, inject } from '@angular/core';
import { CardClansContentComponent } from '../card-clans-content/card-clans-content.component';

import { Router, RouterOutlet } from '@angular/router';
import { ClanSUPA } from '../../models/clan-SUPA.model';
import { ServiceSupabaseService } from '../../services/service-supabase.service';
import { catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ServiceCocService } from '../../services/service-coc.service';

import { MatSnackBar } from '@angular/material/snack-bar';

import { InformationConsultsComponent } from '../information-consults/information-consults.component';

@Component({
  selector: 'app-list-cards',
  imports: [CardClansContentComponent, InformationConsultsComponent],
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
      clan_name: 'Loading information...',
      clan_state: true,
      created_at: new Date()
    }
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
    const day: number = dataClan[2] ? Number(dataClan[2]) : 0
    const clanSelect = dataClan[dataClan.length - 1]
    // console.log({title, tag, day})
    // CAPITAL
    if (title == 'Capital') {
      this.openSnackBar(`Searching information -> ${title}`, 'Close')

      this.serviceCOC.getInformationCapital(tag, clanSelect).subscribe({

        next: (data) => {
          if(data){
            // console.log('Enviando data:::', data);
            sessionStorage.setItem('clanData', JSON.stringify(data))
            sessionStorage.setItem('title', title)

            this.router.navigate(['/information'])
          }else{
            console.log('Error en la data o vacio');
            sessionStorage.setItem('clanData', '');
            sessionStorage.setItem('title', '')
          }
        },
        error: (err) => {
          console.error('Error en la consulta:', err);
          // alert('Error en la consulta:' + err)
          sessionStorage.setItem('clanData', '');
          sessionStorage.setItem('title', '')
        },
        complete: () => {
          // Habilitar el formulario cuando la consulta finalice

        }
      })
    }else{
      if (title == 'War') {
        this.openSnackBar(`Searching information -> ${title}`, 'Close')

        this.serviceCOC.getInformationWar(tag).subscribe({
          next: (data) => {
            if(data){
              // console.log('Enviando data:::', data);
              sessionStorage.setItem('clanData', JSON.stringify(data));
              sessionStorage.setItem('title', title)
              this.router.navigate(['/information'])
            }else{
              console.log('Error en la data o vacio');
              this.openSnackBar(`Error or data empty -> ${title}`, 'Close')
              sessionStorage.setItem('clanData', '');
              sessionStorage.setItem('title', '')
            }
          },
          error: (err) => {
            console.error('Error en la consulta:', err);
            this.openSnackBar(`Query error -> ${JSON.stringify(err)}`, 'Close')
            // alert('Error en la consulta:' + err)
            sessionStorage.setItem('clanData', '');
            sessionStorage.setItem('title', '')
          },
          complete: () => {
            // Habilitar el formulario cuando la consulta finalice

          }
        })
      }else{
        if(title == 'Cwl'){
          this.openSnackBar(`Searching information -> ${title}`, 'Close')
          this.serviceCOC.getInformationCWL(tag, day).subscribe({
            next: (data) => {
              if(data){
                // console.log('Enviando data:::', data);
                sessionStorage.setItem('clanData', JSON.stringify(data));
                sessionStorage.setItem('title', title)
                this.router.navigate(['/information'])
              }else{
                console.log('Error en la data o vacio');
                this.openSnackBar(`Error or data empty -> ${title}`, 'Close')
                sessionStorage.setItem('clanData', '');
                sessionStorage.setItem('title', '')
              }
            },
            error: (err) => {
              console.error('Error en la consulta:', err);
              this.openSnackBar(`Query error -> ${JSON.stringify(err)}`, 'Close')
              // alert('Error en la consulta:' + err)
              sessionStorage.setItem('clanData', '');
              sessionStorage.setItem('title', '')
            },
            complete: () => {
              // Habilitar el formulario cuando la consulta finalice

            }
          })
        }
      }
    }

  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

}
