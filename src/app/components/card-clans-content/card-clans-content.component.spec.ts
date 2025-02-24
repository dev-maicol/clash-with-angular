import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardClansContentComponent } from './card-clans-content.component';

describe('CardClansContentComponent', () => {
  let component: CardClansContentComponent;
  let fixture: ComponentFixture<CardClansContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardClansContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardClansContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
