import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanInformationComponent } from './clan-information.component';

describe('ClanInformationComponent', () => {
  let component: ClanInformationComponent;
  let fixture: ComponentFixture<ClanInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClanInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
