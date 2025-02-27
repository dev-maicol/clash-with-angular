import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClanSUPA } from '../../models/clan-SUPA.model';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceCocService } from '../../services/service-coc.service';

@Component({
  selector: 'app-card-clans-content',
  imports: [MatCardModule, MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './card-clans-content.component.html',
  styleUrl: './card-clans-content.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardClansContentComponent {
  @Input() clans: ClanSUPA[] | undefined
  @Input() titleCard: string = ''
  @Input() cwl: Boolean = false

  clanForm!: FormGroup

  @Output() formData: EventEmitter<Array<string>> = new EventEmitter<Array<string>>

  constructor(private router: Router, private cocService: ServiceCocService) {
   
  }

  ngOnInit() {
    this.titleCard = this.titleCard.charAt(0) + this.titleCard.toLowerCase().slice(1, this.titleCard.length)
    if (this.cwl) {
      this.clanForm = new FormGroup({
        clanSelect: new FormControl('', [Validators.required]),
        dayCWL: new FormControl('', [Validators.required])
      });
    } else {
      this.clanForm = new FormGroup({
        clanSelect: new FormControl('', [Validators.required])
      });
    }
  }

  onSubmit() {

    if (this.clanForm.valid) {

      // this.openSnackBar('Searching information', 'Close')

      // this.clanForm.disable()

      // Enviar la el formulario a su padre, falta
      this.formData.emit([this.titleCard, this.clanForm.get('clanSelect')?.value, this.clanForm.get('dayCWL')?.value])

      // this.cocService.getInformationWar(this.clanForm.get('clanSelect')?.value).subscribe({
      //   next: (data) => {
      //     console.log('Datos recibidos:', data);
      //   },
      //   error: (err) => {
      //     console.error('Error en la consulta:', err);
      //     this.clanForm.enable();
      //   },
      //   complete: () => {
      //     this.clanForm.enable();
      //   }
      // })
    }
  }

  // private _snackBar = inject(MatSnackBar);

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action, {
  //     duration: 2000,
  //     horizontalPosition: 'center',
  //     verticalPosition: 'bottom',
  //   });
  // }
}
