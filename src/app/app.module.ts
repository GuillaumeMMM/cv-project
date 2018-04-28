import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {NgsRevealModule} from 'ng-scrollreveal';

import { AppComponent } from './app.component';
import { CvComponent } from "./components/cv/cv.component";
import { ProjetsComponent } from "./components/projets/projets.component";

import { DataService } from "./services/data.service";
import { InitComponent } from './components/init/init.component';
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ExperiencesComponent } from './components/cv/experiences/experiences.component';
import { ProfileComponent } from './components/cv/profile/profile.component';
import { FormationComponent } from './components/cv/formation/formation.component';
import { FooterComponent } from './components/footer/footer.component';
import { FoodComponent } from './components/projets/food/food.component';
import { SimpleExperienceComponent } from './components/cv/simple-experience/simple-experience.component';

const appRoutes: Routes = [
  { path: '', component: InitComponent },
  { path: 'cv', component: CvComponent },
  { path: 'projets', component: ProjetsComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    CvComponent,
    ProjetsComponent,
    PageNotFoundComponent,
    NavbarComponent,
    ExperiencesComponent,
    ProfileComponent,
    FormationComponent,
    FooterComponent,
    FoodComponent,
    SimpleExperienceComponent
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot(appRoutes),NgsRevealModule.forRoot()
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
