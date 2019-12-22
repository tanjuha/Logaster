import { Component, OnInit } from '@angular/core';
import { LogosService, Logo } from 'src/app/services/app-logos.service';
import * as WebFont from 'webfontloader';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Logos: Logo[] = [];
  showSpinner = true;
  tests: any;

  constructor(private logos: LogosService) {}

  ngOnInit() {
    WebFont.load({
      google: {
        families: ['Droid Sans', 'Droid Serif', 'Lato', 'Ma Shan Zheng' ],
      },
      active: () => console.log('active'),
      inactive: () => console.log('inactive')
    });


    this.logos.getTest().subscribe(res => {
      console.log(res);
    });

    setTimeout(() => {
      this.logos.showLogos().subscribe(res => {
        this.Logos = res;
        this.showSpinner = false;
      });
    }, 1000);
  }
}
