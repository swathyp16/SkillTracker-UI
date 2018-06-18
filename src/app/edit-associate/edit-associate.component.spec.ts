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
import { APP_BASE_HREF } from '@angular/common';

describe('EditAssociateComponent', () => {
  let component: EditAssociateComponent;
  let fixture: ComponentFixture<EditAssociateComponent>;
  let searchSkill: SearchSkillPipe;
  let spyAddSkillService: jasmine.SpyObj<AddSkillService>;
  let spyAddAssociateService: jasmine.SpyObj<AddAssociateService>;
  let sharedService: SharedService;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const associateId = 12345;
  const searchText ="Java";
  const skillName = "Java";
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
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule,RouterTestingModule.withRoutes([{ path: 'editAssociate', component: EditAssociateComponent }])],
      declarations: [ EditAssociateComponent,SearchSkillPipe],
      providers: [ EditAssociateComponent, { provide: AddSkillService, useValue: addSkillServiceSpy },{ provide: AddAssociateService, useValue: addAssociateServiceSpy },
        { provide: ActivatedRoute},SharedService,{ provide: APP_BASE_HREF, useValue: '/' },
        { provide: Router, useValue: mockRouter}]
    }).compileComponents();
    searchSkill = new SearchSkillPipe();
  }));

  beforeEach(() => {     
    component = TestBed.get(EditAssociateComponent);
    spyAddSkillService = TestBed.get(AddSkillService);
    spyAddAssociateService = TestBed.get(AddAssociateService);
    sharedService = TestBed.get(SharedService);
    component.associateData = associateDetails;
    spyAddSkillService.viewAllSkills.and.returnValue(Observable.of(skillsList));
    component.addedSkills = <IAddSkills[]>skillsList;
    sharedService.saveAssociateData({
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
    });
  });

  
  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should add skill for status blue and level 2', () => {
    sharedService.saveAssociateData({
      associateId:14526,
      name:"Arun",
      email:"arun.naik@gmail.com",
      mobileNum:8745999854,
      gender:"male",
      statusGreen:false,
      statusBlue:true,
      statusRed:false,
      level1:false,
      level2:true,
      level3:false,
      remark:"Good",
      strength:"UI",
      weakness:"java",
      associateSkills:[
        {skillId:1,skillName:"HTML5",skillRating:16,isEdit:false},
        {skillId:2,skillName:"CSS3",skillRating:15,isEdit:false}
      ],
      otherSkill:"jquery"
    });
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should add skill for status red and level 3', () => {
    sharedService.saveAssociateData({
      associateId:14526,
      name:"Arun",
      email:"arun.naik@gmail.com",
      mobileNum:8745999854,
      gender:"male",
      statusGreen:false,
      statusBlue:false,
      statusRed:true,
      level1:false,
      level2:false,
      level3:true,
      remark:"Good",
      strength:"UI",
      weakness:"java",
      associateSkills:[
        {skillId:1,skillName:"HTML5",skillRating:16,isEdit:false},
        {skillId:2,skillName:"CSS3",skillRating:15,isEdit:false}
      ],
      otherSkill:"jquery"
    });
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should add skill details', () => { 
    spyAddAssociateService.addAssociate.and.returnValue(Observable.of('Success'));
    component.editAssociate(associateList);
    expect(spyAddAssociateService.addAssociate.calls.count()).toBe(1);
  });

 
  it('should set value on status green button click', async(() => {
    component.statusGreenOnClick();
    expect(component.redStatusClicked).toBeTruthy();
    expect(component.blueStatusClicked).toBeTruthy();
    expect(component.greenStatusClicked).toBeUndefined();
  }));

  it('should set value on status blue button click', async(() => {
    component.statusBlueOnClick();
    expect(component.redStatusClicked).toBeTruthy();
    expect(component.greenStatusClicked).toBeTruthy();
    expect(component.blueStatusClicked).toBeUndefined();
  }));

  it('should set value on status red button click', async(() => {
    component.statusRedOnClick();
    expect(component.blueStatusClicked).toBeTruthy();
    expect(component.greenStatusClicked).toBeTruthy();
    expect(component.redStatusClicked).toBeUndefined();
  }));

  it('should set value on level 1 button click', async(() => {
    component.level1OnClick();
    expect(component.L2Clicked).toBeTruthy();
    expect(component.L3Clicked).toBeTruthy();
    expect(component.L1Clicked).toBeUndefined();
  }));

  it('should set value on level 2 button click', async(() => {
    component.level2OnClick();
    expect(component.L1Clicked).toBeTruthy();
    expect(component.L3Clicked).toBeTruthy();
    expect(component.L2Clicked).toBeUndefined();
  }));

  it('should set value on level 3 button click', async(() => {
    component.level3OnClick();
    expect(component.L1Clicked).toBeTruthy();
    expect(component.L2Clicked).toBeTruthy();
    expect(component.L3Clicked).toBeUndefined();
  }));

  it('should route to search associate on cancel button click', async(() => {
    component.onCancelBtnClick();
    expect(mockRouter.navigate).toHaveBeenCalledWith (['/searchAssociate']);
   
  }));

  it('should delete associate details', () => { 
    spyAddAssociateService.deleteAssociate.and.returnValue(Observable.of('Success'));
    component.onDeleteBtnClick(associateId);
    expect(spyAddAssociateService.deleteAssociate.calls.count()).toBe(1);
  });

  it('should add skill from associate details page', () => { 
    spyAddAssociateService.addSkillFromEditPage.and.returnValue(Observable.of('Success'));
    component.onAddSkillClick(skillName);
    expect(spyAddAssociateService.addSkillFromEditPage.calls.count()).toBe(1);
  });

});
