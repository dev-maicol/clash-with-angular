import { ChangeDetectorRef, Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

import {MatBadgeModule} from '@angular/material/badge';
import { ServiceCocService } from '../../services/service-coc.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-information-consults',
  imports: [MatIconModule, MatBadgeModule, MatTooltipModule],
  templateUrl: './information-consults.component.html',
  styleUrl: './information-consults.component.css'
})
export class InformationConsultsComponent {
  totalRegisters: string = '?'
  constructor(private serviceCOC: ServiceCocService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    // this.getTotal()
    this.getTotal()
  }

  getTotal(){
    // console.log('Iniciando getTotal...');

    this.serviceCOC.getTotalRegisters().subscribe({
      next: (data) => {
        // console.log(data.message);
        this.totalRegisters = data.message + '/20'
        this.cdr.detectChanges();
      },
      error: (err) => {
        // console.error('Error en la consulta:', err);
        this.totalRegisters = '???'
        this.cdr.detectChanges();
      },
    })
    // return '7/20'
  }

}
