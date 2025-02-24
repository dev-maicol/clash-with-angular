import { TestBed } from '@angular/core/testing';

import { ServiceSupabaseService } from './service-supabase.service';

describe('ServiceSupabaseService', () => {
  let service: ServiceSupabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
