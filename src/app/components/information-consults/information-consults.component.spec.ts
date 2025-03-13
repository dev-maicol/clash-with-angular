import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationConsultsComponent } from './information-consults.component';

describe('InformationConsultsComponent', () => {
  let component: InformationConsultsComponent;
  let fixture: ComponentFixture<InformationConsultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationConsultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationConsultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
