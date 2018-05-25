import { TestBed, inject } from '@angular/core/testing';

import { AddSkillService } from './add-skill.service';

describe('AddSkillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddSkillService]
    });
  });

  it('should be created', inject([AddSkillService], (service: AddSkillService) => {
    expect(service).toBeTruthy();
  }));
});
