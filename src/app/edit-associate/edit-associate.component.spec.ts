import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule,NgForm } from '@angular/forms';
import { SearchSkillPipe } from '../search-skill.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule , Routes,Router, ActivatedRoute} from '@angular/router';
import { AddSkillService } from '../add-skill/add-skill.service';
import { AddAssociateService } from '../add-associate/add-associate.service';
import { EditAssociateComponent } from './edit-associate.component';
import { Observable } from 'rxjs/Observable';
import { IAddSkills } from '../model/add-skill';
import { SharedService } from '../shared.service';
import { IAddAssociate } from '../model/add-associate';
import { By } from '@angular/platform-browser';

describe('EditAssociateComponent', () => {
  let component: EditAssociateComponent;
  let fixture: ComponentFixture<EditAssociateComponent>;
  let searchSkill: SearchSkillPipe;
  let spyAddSkillService: jasmine.SpyObj<AddSkillService>;
  let spyAddAssociateService: jasmine.SpyObj<AddAssociateService>;
  //let spySharedService;// jasmine.SpyObj<SharedService>;

  const skillsList = [{"skillId":1,"skillName":"HTML5","skillRating":12},
  {"skillId":10,"skillName":"Spring","skillRating":9,"isEdit":false},
  {"skillId":11,"skillName":"Spring MVC","skillRating":17},
  {"skillId":17,"skillName":"Hibernate","skillRating":20}];

  const associateList = <NgForm>{ 
    value : {
          associateId:14526,
          name:"Arun",
          email:"arun.naik@gmail.com",
          mobile:"8745999854",
          gender:"male",
          statusGreen:true,
          statusBlue:false,
          statusRed:false,
          level1:true,
          level2:false,
          level3:false,
          remark:"Good",
          strength:"UI",
          weakness:"java",
          associateSkills:[
            {skillId:1,skillName:"HTML5",skillRating:16,isEdit:false},
            {skillId:2,skillName:"CSS3",skillRating:15,isEdit:false}
          ],
          otherSkill:"jquery",
          submitted: true
        }
      };

      const associateDetails = {
              associateId:14526,
              name:"Arun",
              email:"arun.naik@gmail.com",
              mobileNum:8745999854,
              gender:"male",
              statusGreen:true,
              statusBlue:false,
              statusRed:false,
              level1:true,
              level2:false,
              level3:false,
              remark:"Good",
              strength:"UI",
              weakness:"java",
              associateSkills:[
                {skillId:1,skillName:"HTML5",skillRating:16,isEdit:false},
                {skillId:2,skillName:"CSS3",skillRating:15,isEdit:false}
              ],
              otherSkill:"jquery"
          };

  beforeEach(async(() => {
    const addAssociateServiceSpy = jasmine.createSpyObj('AddAssociateService', ['addAssociate','deleteAssociate', 'addSkillFromEditPage']);
    const addSkillServiceSpy = jasmine.createSpyObj('AddSkillService', ['viewAllSkills']);
    //const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['fetchAssociateData','getReadOnly','saveAssociateData']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule,RouterTestingModule.withRoutes([{ path: 'editAssociate', component: EditAssociateComponent }])],
      declarations: [ EditAssociateComponent,SearchSkillPipe],
      providers: [ { provide: AddSkillService, useValue: addSkillServiceSpy },{ provide: AddAssociateService, useValue: addAssociateServiceSpy },
        { provide: ActivatedRoute},SharedService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();     
    spyAddSkillService = TestBed.get(AddSkillService);
    spyAddAssociateService = TestBed.get(AddAssociateService);
    component.associateData = associateDetails;
    spyAddSkillService.viewAllSkills.and.returnValue(Observable.of(skillsList));
    component.addedSkills = <IAddSkills[]>skillsList;
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should add skill details', () => { 
  //   spyAddAssociateService.addAssociate.and.returnValue(Observable.of('Success'));
  //   component.editAssociate(associateList);
  //   expect(spyAddSkillService.addSkill.calls.count()).toBe(0);
  // });

  // it('should set value on status green button click on edit', async(() => {
  //  // component.readOnlyFlag = true;
  //   let button = fixture.debugElement.query(By.css('.green'));
  //   button.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(component.redStatusClicked).toBeTruthy();
  //   expect(component.blueStatusClicked).toBeTruthy();
  //   expect(component.greenStatusClicked).toBeUndefined();
  // }));

  // it('should set value on status blue button click on edit', async(() => {
  //   let button = fixture.debugElement.query(By.css('.blue'));
  //   button.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(component.redStatusClicked).toBeTruthy();
  //   expect(component.greenStatusClicked).toBeTruthy();
  //   expect(component.blueStatusClicked).toBeUndefined();
  // }));

  // it('should set value on status red button click on edit', async(() => {
  //   let button = fixture.debugElement.query(By.css('.red'));
  //   button.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(component.blueStatusClicked).toBeTruthy();
  //   expect(component.greenStatusClicked).toBeTruthy();
  //   expect(component.redStatusClicked).toBeUndefined();
  // }));

});
