import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { AddSkillService } from './add-skill.service';

let spyHttp: jasmine.SpyObj<Http>;
let service: AddSkillService;

const skillList: any = NgForm; 
const skill = {"skillId":2,"skillName":"CSS3","skillRating":15,"isEdit":false};


describe('AddSkillService', () => {
  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('Http', ['get', 'post']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule],
      providers: [AddSkillService,{ provide: Http, useValue: httpSpy }]
    }).compileComponents();
    service = TestBed.get(AddSkillService);
    spyHttp = TestBed.get(Http);
  });

  it('should be created', inject([AddSkillService], (service: AddSkillService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to add skill', () => {
    spyHttp.post.and.returnValue(Observable.of(String));
    service.addSkill(skillList);
    expect(spyHttp.post.calls.count()).toBeGreaterThan(0);
  });

  it('should be able to view all skill', () => {
    spyHttp.get.and.returnValue(Observable.of(skillList));
    service.viewAllSkills();
    expect(spyHttp.get.calls.count()).toBeGreaterThan(0);
  });

  it('should be able to delete skill', () => {
    spyHttp.post.and.returnValue(Observable.of(String));
    service.deleteSkill(skill);
    expect(spyHttp.post.calls.count()).toBeGreaterThan(0);
  });

  it('should be able to edit skill', () => {
    spyHttp.post.and.returnValue(Observable.of(String));
    service.editSkill(skill);
    expect(spyHttp.post.calls.count()).toBeGreaterThan(0);
  });


});
