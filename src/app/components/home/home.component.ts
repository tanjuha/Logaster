import { Component, OnInit } from '@angular/core';
import { LogosService, Logo } from 'src/app/services/app-logos.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  listLogos: Logo[] = [];

  constructor(private logos: LogosService) { }

  ngOnInit() {
    this.logos.showLogos().subscribe(res => {
      this.listLogos = res;
    });
   }

}
