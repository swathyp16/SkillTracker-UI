import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AddAssociateComponent } from './add-associate/add-associate.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilterPipe } from './filter.pipe';
import { EditAssociateComponent } from './edit-associate/edit-associate.component';
import { SharedService } from './shared.service';
import { SearchSkillPipe } from './search-skill.pipe';

const appRoutes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : '', component: HomeComponent},//redirectTo: '/app',pathMatch: 'full'},
  {path : 'searchAssociate',  component: SearchComponent},
  {path : 'addSkill', component: AddSkillComponent},
  {path : 'addAssociate', component: AddAssociateComponent},
  {path : 'editAssociate', component: EditAssociateComponent},
  // {path : 'startWorkout/:id', component: StartEndWorkoutComponent},
  {path : '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    AddSkillComponent,
    AddAssociateComponent,
    PageNotFoundComponent,
    FilterPipe,
    EditAssociateComponent,
    SearchSkillPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule
  ],
  exports: [RouterModule],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
  //export routing = RouterModule.forRoot(appRoutes);
 }
