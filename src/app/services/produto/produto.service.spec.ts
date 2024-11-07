import { TestBed } from '@angular/core/testing';

import { ProdutoService } from './produto.service';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
