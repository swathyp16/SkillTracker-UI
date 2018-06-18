import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, ResponseOptions } from '@angular/http';
import { FormsModule ,NgForm} from '@angular/forms';
import { AddSkillService } from './add-skill.service';
import { APP_BASE_HREF } from '@angular/common';
import { AddSkillComponent } from './add-skill.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { IAddSkills } from '../model/add-skill';

describe('AddSkillComponent', () => {
  let component: AddSkillComponent;
  let fixture: ComponentFixture<AddSkillComponent>;
  let spyAddSkillService: jasmine.SpyObj<AddSkillService>;
  let mockEvent:Event;
  let response : Response;
  let addSkillList : IAddSkills[];

  const skill =  {"skillId":2,"skillName":"CSS3","skillRating":15,"isEdit":false};
  const skillList =  [{"skillId":2,"skillName":"CSS3","skillRating":15,"isEdit":false},
  {"skillId":3,"skillName":"Bootstrap","skillRating":4,"isEdit":false}];  
  const index = 0;
  const skillId = 2;
  const skillName = "CSS3";
  const skillData = {"skillId":2,"skillName":"CSS3"};
  const skillForm = <NgForm>{ 
    value : [{
      skillId:2,
      skillName:"CSS3",
      skillRating:15,
      isEdit:false
    },
    {
      skillId:3,
      skillName:"Bootstrap",
      skillRating:4,
      isEdit:false
    }]
   };

  beforeEach(async(() => {
    const addSkillServiceSpy = jasmine.createSpyObj('AddSkillService', ['addSkill','deleteSkill', 'viewAllSkills','editSkill']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule],
      declarations: [ AddSkillComponent ],
      providers: [ AddSkillComponent, { provide: AddSkillService, useValue: addSkillServiceSpy },
	  { provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //fixture = TestBed.createComponent(AddSkillComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();  
	component = TestBed.get(AddSkillComponent);
    response = new Response(
      new ResponseOptions({
          body: [
            {
              status: 200
            }]
        }));
    spyAddSkillService = TestBed.get(AddSkillService);
    spyAddSkillService.viewAllSkills.and.returnValue(Observable.of(skillList));
    // spyAddSkillService.viewAllSkills().subscribe(skillList => { 
    //   expect(skillList.length).toEqual(2);
    // });
    component.ngOnInit();
    component.addedSkills = skillList;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add skill details', () => {
    component.ngOnInit();
    spyAddSkillService.addSkill.and.returnValue(Observable.of('Success'));
    component.addSkills(skillForm);
    expect(spyAddSkillService.addSkill.calls.count()).toBe(1);
  });

  it('should delete associate details', () => {
    component.ngOnInit();
    spyAddSkillService.deleteSkill.and.returnValue(Observable.of('Success'));
    component.deleteSkill(skill,index);
    expect(spyAddSkillService.deleteSkill.calls.count()).toBe(1);
  });

  it('should edit associate details', () => {
    component.ngOnInit();    
    spyAddSkillService.editSkill.and.returnValue(Observable.of('Success'));
   // expect(component.addSkill).toBe(response);
    component.editSkill(skillId,skillName,{ target: { value: 'Edit' } },index);
    expect(spyAddSkillService.editSkill.calls.count()).toBe(0);
  });

  it('should save edited associate details', () => {
    component.ngOnInit();    
    spyAddSkillService.editSkill.and.returnValue(Observable.of('Success'));
    component.editSkill(skillId,skillName,{ target: { value: 'Save',form:[{id:'skill-0'},{id:'skill-1'}] } },index);
    expect(spyAddSkillService.editSkill.calls.count()).toBe(0);
  });

  //it('should save edited associate details', () => {
    //spyAddSkillService.editSkill.and.returnValue(Observable.of(response));
    // spyAddSkillService.editSkill(skillData).subscribe(
    // data => {new Response(
    //     new ResponseOptions({
    //         body: [
    //           {
    //             // id: 26,
    //             // contentRendered: '<p><b>Hi there</b></p>',
    //             // contentMarkdown: '*Hi there*'
    //             status: 200
    //           }]
    //       })
    //     )});
  //});

});
