import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, FormGroup,FormControl,NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule , Routes,Router, ActivatedRoute} from '@angular/router';
import { AddAssociateComponent } from './add-associate.component';
import { SearchComponent } from '../search/search.component';
import { AddAssociateService } from './add-associate.service';
import { AddSkillService } from '../add-skill/add-skill.service';
import { Observable } from 'rxjs/Observable';
import { IAddSkills } from '../model/add-skill';
import { By } from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

describe('AddAssociateComponent', () => {
  let component: AddAssociateComponent;
  let fixture: ComponentFixture<AddAssociateComponent>;
  let spyAssociateService: jasmine.SpyObj<AddAssociateService>;
  let spySkillService: jasmine.SpyObj<AddSkillService>;
  // let component1: SearchComponent;
  // let fixture1: ComponentFixture<SearchComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  
  const routes: Routes = [
    { path: 'addAssociate', component: AddAssociateComponent }
  ];
  const skillsList = [{"skillId":1,"skillName":"HTML5","skillRating":12},
  {"skillId":10,"skillName":"Spring","skillRating":9,"isEdit":false},
  {"skillId":11,"skillName":"Spring MVC","skillRating":17},
  {"skillId":17,"skillName":"Hibernate","skillRating":20}];
  var oneBlob = new Blob([]);
  const file = new File([oneBlob], 'test-image.png', {
    lastModified: 1449505890000,
    type: "image/png"});
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

  beforeEach(async(() => {
	 const associateServiceSpy = jasmine.createSpyObj('AddAssociateService', ['addAssociate', 'deleteAssociate','addSkillFromEditPage']);
    const skillsServiceSpy = jasmine.createSpyObj('AddSkillService', ['deleteSkill','editSkill','viewAllSkills', 'addSkill']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule,RouterTestingModule.withRoutes([{ path: 'addAssociate', component: AddAssociateComponent }])],
      declarations: [ AddAssociateComponent ],
	    providers: [AddAssociateComponent,{ provide: Router, useValue: mockRouter},
        { provide: AddAssociateService, useValue: associateServiceSpy },
        { provide: AddSkillService, useValue: skillsServiceSpy },
        { provide: ActivatedRoute }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	  spyAssociateService = TestBed.get(AddAssociateService);
    spySkillService = TestBed.get(AddSkillService);
    spySkillService.viewAllSkills.and.returnValue(Observable.of(skillsList));
    component.addedSkills = <IAddSkills[]>skillsList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should add associate details', () => {
    component.ngOnInit();
    spyAssociateService.addAssociate.and.returnValue(Observable.of('Success'));
    component.addAssociate(associateList);
    expect(spyAssociateService.addAssociate.calls.count()).toBe(1);
  });

  it('should set value on status green button click', async(() => {
    let button = fixture.debugElement.query(By.css('.green'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.redStatusClicked).toBeTruthy();
    expect(component.blueStatusClicked).toBeTruthy();
    expect(component.greenStatusClicked).toBeUndefined();
  }));

  it('should set value on status blue button click', async(() => {
    let button = fixture.debugElement.query(By.css('.blue'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.redStatusClicked).toBeTruthy();
    expect(component.greenStatusClicked).toBeTruthy();
    expect(component.blueStatusClicked).toBeUndefined();
  }));

  it('should set value on status red button click', async(() => {
    let button = fixture.debugElement.query(By.css('.red'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.blueStatusClicked).toBeTruthy();
    expect(component.greenStatusClicked).toBeTruthy();
    expect(component.redStatusClicked).toBeUndefined();
  }));

  it('should set value on level 1 button click', async(() => {
    let button = fixture.debugElement.query(By.css('.level1'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.L2Clicked).toBeTruthy();
    expect(component.L3Clicked).toBeTruthy();
    expect(component.L1Clicked).toBeUndefined();
  }));

  it('should set value on level 2 button click', async(() => {
    let button = fixture.debugElement.query(By.css('.level2'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.L1Clicked).toBeTruthy();
    expect(component.L3Clicked).toBeTruthy();
    expect(component.L2Clicked).toBeUndefined();
  }));

  // it('should set value on level 3 button click', async(() => {
  //   let button = fixture.debugElement.query(By.css('.level3'));
  //   button.triggerEventHandler('click', null);
  //   fixture.detectChanges();
  //   expect(component.L1Clicked).toBeTruthy();
  //   expect(component.L2Clicked).toBeTruthy();
  //   expect(component.L3Clicked).toBeUndefined();
  // }));

  it('should route to search associate on cancel button click', async(() => {
    let button = fixture.debugElement.query(By.css('.cancel'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(mockRouter.navigate).toHaveBeenCalledWith (['/searchAssociate']);
   
  }));

});
