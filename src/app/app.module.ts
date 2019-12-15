import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { LogoConvasComponent } from './components/logo-convas/logo-convas.component';
import { HomeComponent } from './components/home/home.component';
import { FontsFamilyComponent } from './components/font-family/font-family.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TextComponent } from './components/text/text.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoConvasComponent,
    HomeComponent,
    FontsFamilyComponent,
    TextComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
