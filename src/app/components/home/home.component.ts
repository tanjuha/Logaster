import { Component, OnInit } from '@angular/core';
import { LogosService, Logo } from 'src/app/services/app-logos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  logos: any; // Logo[] = [];
  showSpinner = true;

  constructor(private logosService: LogosService) {}

  ngOnInit() {
    this.logosService.getLogos().subscribe(res => {
      this.logos = res;
      this.showSpinner = false;
    });
  }
}
