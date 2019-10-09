import { TestBed } from '@angular/core/testing';

import { ApontamentosService } from './apontamentos.service';

describe('ApontamentosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApontamentosService = TestBed.get(ApontamentosService);
    expect(service).toBeTruthy();
  });
});
