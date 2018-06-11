import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule , Routes} from '@angular/router';
import { AddAssociateComponent } from './add-associate.component';

describe('AddAssociateComponent', () => {
  let component: AddAssociateComponent;
  let fixture: ComponentFixture<AddAssociateComponent>;
  const routes: Routes = [
    { path: 'addAssociate', component: AddAssociateComponent }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule,RouterTestingModule.withRoutes([{ path: 'addAssociate', component: AddAssociateComponent }])],
      declarations: [ AddAssociateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
