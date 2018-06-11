import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AddSkillService } from './add-skill.service';

describe('AddSkillService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule],
      providers: [AddSkillService]
    });
  });

  it('should be created', inject([AddSkillService], (service: AddSkillService) => {
    expect(service).toBeTruthy();
  }));
});
