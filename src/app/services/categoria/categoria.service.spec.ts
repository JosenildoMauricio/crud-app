import { TestBed } from '@angular/core/testing';

import { CategoriaService } from './categoria.service';

describe('CategoriaService', () => {
  let service: CategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
