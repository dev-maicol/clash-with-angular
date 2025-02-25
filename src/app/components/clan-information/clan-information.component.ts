import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-clan-information',
  imports: [MatInputModule, CommonModule],
  templateUrl: './clan-information.component.html',
  styleUrl: './clan-information.component.css'
})
export class ClanInformationComponent {
  data: any

  constructor(private router: Router, private activeRouter: ActivatedRoute){}

  ngOnInit() {
    // this.data = history.state.data;
    this.data = history.state.data || JSON.parse(sessionStorage.getItem('clanData') || '{}');
    // console.log('Data del storage o recibida:::', this.data);
    
  }

  back(){
    this.router.navigate(['/'])
  }
}
