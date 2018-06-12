import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SearchService } from './search.service';

let spyHttp: jasmine.SpyObj<Http>;
let service: SearchService;

const associateList = [{
  "associateId":14526,"name":"Arun",
  "email":"arun.naik@gmail.com","mobile":"8745999854","gender":"male",
  "statusGreen":true,"statusBlue":false,"statusRed":false,"level1":true,"level2":false,
  "level3":false,"remark":"Good","strength":"UI","weakness":"java",
  "associateSkills":[{"skillId":1,"skillName":"HTML5","skillRating":16,"isEdit":false},
  {"skillId":2,"skillName":"CSS3","skillRating":15,"isEdit":false}],
  "otherSkill":"jquery"},{"associateId":87451,"name":"Tom","email":"tom.george@gmail.com",
"mobile":"7412589630","gender":"male","statusGreen":false,"statusBlue":true,"statusRed":false,
"level1":false,"level2":false,"level3":true,"remark":"Satisfactory","strength":"React",
"weakness":"node", "associateSkills":[{"skillId":1,"skillName":"HTML5","skillRating":12},
{"skillId":10,"skillName":"Spring","skillRating":9,"isEdit":false},
{"skillId":11,"skillName":"Spring MVC","skillRating":17},
{"skillId":17,"skillName":"Hidernate","skillRate":20}],"otherSkill":"Other"}];

describe('SearchService', () => {
  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('Http', ['get', 'post']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule],
      providers: [SearchService,{ provide: Http, useValue: httpSpy }]
    }).compileComponents();
    service = TestBed.get(SearchService);
    spyHttp = TestBed.get(Http);
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to view all associate', () => {
    spyHttp.get.and.returnValue(Observable.of(associateList));
    service.viewAllAssociates();
    expect(spyHttp.get.calls.count()).toBeGreaterThan(0);
  });

});
