import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogoConvasComponent } from './components/logo-convas/logo-convas.component';

const routes: Routes = [
  {path: '', redirectTo: 'logo', pathMatch: 'full'},
  {path: 'logo', component: HomeComponent},
  {path: 'logo/:id', component: LogoConvasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
