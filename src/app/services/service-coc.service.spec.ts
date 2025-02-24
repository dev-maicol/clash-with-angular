import { TestBed } from '@angular/core/testing';

import { ServiceCocService } from './service-coc.service';

describe('ServiceCocService', () => {
  let service: ServiceCocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
