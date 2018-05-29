import { TestBed, inject } from '@angular/core/testing';

import { AddAssociateService } from './add-associate.service';

describe('AddAssociateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAssociateService]
    });
  });

  it('should be created', inject([AddAssociateService], (service: AddAssociateService) => {
    expect(service).toBeTruthy();
  }));
});
