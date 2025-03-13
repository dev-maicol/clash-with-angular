import { ChangeDetectionStrategy, Component, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { ServiceCocService } from './services/service-coc.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatBadgeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  totalRegisters: string = 'xxxx'
  constructor(private serviceCOC: ServiceCocService, private cdr: ChangeDetectorRef){}

  ngAfterViewInit(): void {
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
