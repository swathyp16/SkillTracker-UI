import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AddAssociateComponent } from './add-associate/add-associate.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FilterPipe } from './filter.pipe';
const appRoutes: Routes = [
  {path : 'home', component: HomeComponent},
  {path : '', component: HomeComponent},//redirectTo: '/app',pathMatch: 'full'},
  {path : 'searchAssociate',  component: SearchComponent},
  {path : 'addSkill', component: AddSkillComponent},
  {path : 'addAssociate', component: AddAssociateComponent},
  // {path : 'editWorkout/:id', component: EditWorkoutComponent},
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
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
