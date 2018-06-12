import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SearchSkillPipe } from '../search-skill.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule , Routes} from '@angular/router';

import { EditAssociateComponent } from './edit-associate.component';

describe('EditAssociateComponent', () => {
  let component: EditAssociateComponent;
  let fixture: ComponentFixture<EditAssociateComponent>;
  let searchSkill: SearchSkillPipe;

  beforeEach(async(() => {
    const addAssociateServiceSpy = jasmine.createSpyObj('AddAssociateService', ['addAssociate','deleteAssociate', 'addSkillFromEditPage']);
    const addSkillServiceSpy = jasmine.createSpyObj('AddSkillService', ['viewAllSkills']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule,RouterTestingModule.withRoutes([{ path: 'editAssociate', component: EditAssociateComponent }])],
      declarations: [ EditAssociateComponent,SearchSkillPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});
