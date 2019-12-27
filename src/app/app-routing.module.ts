import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateLogoComponent } from './components/create-logo/create-logo.component';
import { UpdateLogoComponent } from './components/update-logo/update-logo.component';
import { AboutAppComponent } from './components/about-app/about-app.component';

const routes: Routes = [
  {path: '', redirectTo: 'logo', pathMatch: 'full'},
  {path: 'logo', component: HomeComponent},
  {path: 'create', component: CreateLogoComponent},
  {path: 'logo/:id', component: UpdateLogoComponent},
  {path: 'about-app', component: AboutAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
