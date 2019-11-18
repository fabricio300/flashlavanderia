import { TestBed } from '@angular/core/testing';

import { NotificaService } from './notifica.service';

describe('NotificaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificaService = TestBed.get(NotificaService);
    expect(service).toBeTruthy();
  });
});
