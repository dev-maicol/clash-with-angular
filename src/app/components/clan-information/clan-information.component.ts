import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import {MatButtonModule} from '@angular/material/button';

import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-clan-information',
  imports: [MatInputModule, CommonModule, FormsModule, MatButtonModule, MatCardModule],
  templateUrl: './clan-information.component.html',
  styleUrl: './clan-information.component.css'
})
export class ClanInformationComponent {
  data: JSON | any

  textCopy: string = ''

  title: string = ''

  constructor(private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.data = history.state.data || JSON.parse(sessionStorage.getItem('clanData') || '{}');
    // this.textCopy = JSON.stringify(this.data)
    this.title = sessionStorage.getItem('title') || ''

    if(this.data){
      if(this.title == 'Cwl'){
        if(this.data.message){
          this.textCopy = this.data.message
        }
        // else{
        //   this.getInformationCWL()
        // }
      }
    }else{
      this.textCopy = 'Error, please contact administrator :('
    }

    // const state = this.data['state']
    // this.textCopy += state
  }

  back() {
    this.router.navigate(['/'])
  }

  copy() {
    navigator.clipboard.writeText(this.textCopy).then(() => {
      // console.log('texto copiado');
      this.openSnackBar(`Copied information`, 'Close')
    }).catch(err => {
      // console.error('Error al copiar:', err);
      this.openSnackBar(`Error: ${err}`, 'Close')
    })
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  getCardClass(title: string): string {
    if (title == 'War') {
      return 'war';
    } else if (title == 'Cwl') {
      return 'cwl';
    } else {
      if(title == 'Capital'){
        return 'capital'
      }else{
        return 'capital';
      }
    }
  }

  getInformationCWL(){
    const state = this.data['state'] // inWar, preparation, warEnded
    const teamSize = this.data['teamSize']

    const preparation = new Date(this.parseCustomDate(this.data['preparationStartTime']))
    // console.log(this.parseCustomDate(this.data['preparationStartTime']));
    // console.log(this.data['preparationStartTime']);
    const start = new Date(this.parseCustomDate(this.data['startTime']))
    const end = new Date(this.parseCustomDate(this.data['endTime']))

    const now = new Date()
    let timeRes = 0
    if(state == 'inWar'){
      timeRes = end.getTime() - now.getTime()
    }else{
      if(state == 'preparation'){
        timeRes = start.getTime() - now.getTime()
      }
    }

    const hours = Math.floor(timeRes / (1000 * 60 * 60)); // Extrae las horas completas
    const minutes = Math.floor((timeRes % (1000 * 60 * 60)) / (1000 * 60)); // Obtiene los minutos restantes

    let clan: []
    // if(this.data['clan']['tag'] == tag){

    // }

    this.textCopy += state + '\n' + teamSize + '\n' + preparation + '\n' + start + '\n' + end + '\n' + hours + 'Hr. ' + minutes + 'Min.'
  }

  parseCustomDate(dateStr: string): Date {
    // Reformatear de 'YYYYMMDDTHHmmss.sssZ' a 'YYYY-MM-DDTHH:mm:ss.sssZ'
    const formattedDate = dateStr.replace(
      /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.(\d{3})Z$/,
      "$1-$2-$3T$4:$5:$6.$7Z"
    );
    return new Date(formattedDate);
  }

}
