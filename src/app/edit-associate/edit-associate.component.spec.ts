import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

describe('EditAssociateComponent', () => {
  let component: EditAssociateComponent;
  let fixture: ComponentFixture<EditAssociateComponent>;
  let searchSkill: SearchSkillPipe;
  let spyAddSkillService: jasmine.SpyObj<AddSkillService>;
  let spyAddAssociateService: jasmine.SpyObj<AddAssociateService>;
  let spySharedService: jasmine.SpyObj<SharedService>;

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
    const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['fetchAssociateData','getReadOnly','saveAssociateData']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule,RouterTestingModule.withRoutes([{ path: 'editAssociate', component: EditAssociateComponent }])],
      declarations: [ EditAssociateComponent,SearchSkillPipe],
      providers: [ { provide: AddSkillService, useValue: addSkillServiceSpy },{ provide: AddAssociateService, useValue: addAssociateServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },{ provide: ActivatedRoute}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();     
    spyAddSkillService = TestBed.get(AddSkillService);
    spyAddAssociateService = TestBed.get(AddAssociateService);
    spySharedService = TestBed.get(SharedService); 
    component.associateData = associateDetails;
    spyAddSkillService.viewAllSkills.and.returnValue(Observable.of(skillsList));
    //spySharedService.fetchAssociateData.and.returnValue(associateDetails);
    //spySharedService.getReadOnly.and.returnValue(Observable.of(true));
    //spyOn(spySharedService, "fetchAssociateData").and.returnValue(associateDetails);
    component.addedSkills = <IAddSkills[]>skillsList;
    spySharedService.saveAssociateData(associateDetails);    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should set the user', () => {
    spySharedService.saveAssociateData(associateDetails);  
    component.ngOnInit();
    
  });

  it('should add skill details', () => {  
   // expect(spySharedService.associateData).toBe(associateDetails);
   // spySharedService.saveAssociateData(associateDetails);  
    spySharedService.fetchAssociateData.and.returnValue(associateDetails);  
    component.ngOnInit();
    spyAddAssociateService.addAssociate.and.returnValue(Observable.of('Success'));
    component.editAssociate(associateList);
    expect(spyAddSkillService.addSkill.calls.count()).toBe(0);
  });

});
