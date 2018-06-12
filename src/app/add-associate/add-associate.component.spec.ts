import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, FormGroup,FormControl,NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule , Routes,Router, ActivatedRoute} from '@angular/router';
import { AddAssociateComponent } from './add-associate.component';
import { AddAssociateService } from './add-associate.service';
import { AddSkillService } from '../add-skill/add-skill.service';
import { Observable } from 'rxjs/Observable';
import { IAddSkills } from '../model/add-skill';

describe('AddAssociateComponent', () => {
  let component: AddAssociateComponent;
  let fixture: ComponentFixture<AddAssociateComponent>;
  let spyAssociateService: jasmine.SpyObj<AddAssociateService>;
  let spySkillService: jasmine.SpyObj<AddSkillService>;
  
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
	    providers: [AddAssociateComponent,
        { provide: AddAssociateService, useValue: associateServiceSpy },
        { provide: AddSkillService, useValue: skillsServiceSpy },
        { provide: ActivatedRoute
         /* useValue: {
            snapshot: {
              paramMap: {
                get(name: string): string {
                  if (name === 'mode') {
                    return 'edit';
                  } else if (name === 'data') {
                    return JSON.stringify(associateObj);
                  }
                }
              }
            }
          }*/
        }]
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

  

});
