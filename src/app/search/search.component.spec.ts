import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { RouterModule , Routes} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchComponent } from './search.component';
import { FilterPipe } from '../filter.pipe';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let filter: FilterPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,HttpModule,FormsModule,RouterModule,RouterTestingModule],
      declarations: [ SearchComponent,BaseChartDirective,FilterPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
