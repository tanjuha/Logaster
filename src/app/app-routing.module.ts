import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateLogoComponent } from './components/create-logo/create-logo.component';
import { UpdateLogoComponent } from './components/update-logo/update-logo.component';

const routes: Routes = [
  {path: '', redirectTo: 'logo', pathMatch: 'full'},
  {path: 'logo', component: HomeComponent},
  {path: 'create', component: CreateLogoComponent},
  {path: 'logo/:id', component: UpdateLogoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
