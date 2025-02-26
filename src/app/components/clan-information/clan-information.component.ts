import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-clan-information',
  imports: [MatInputModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './clan-information.component.html',
  styleUrl: './clan-information.component.css'
})
export class ClanInformationComponent {
  data: any

  textCopy: string = ''

  constructor(private router: Router, private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    // this.data = history.state.data;
    this.data = history.state.data || JSON.parse(sessionStorage.getItem('clanData') || '{}');
    // console.log('Data del storage o recibida:::', this.data);
    this.textCopy = JSON.stringify(this.data)
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
}
