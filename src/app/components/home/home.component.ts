import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LogoService } from 'src/app/services/logo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  logos: any;
  showSpinner = true;
  // update
  editState = false;
  editItem: any;



  constructor(private logoService: LogoService) {}

  ngOnInit() {
    this.logoService
      .getLogoList()
      .snapshotChanges()
      .pipe(
        map(logos =>
          logos.map(logo => ({ id: logo.payload.key, ...logo.payload.val() }))
        )
      )
      .subscribe(res => {
        this.logos = res;
        this.showSpinner = false;
      });
  }

  editLogo(event, logo) {
    this.editState = true;
    this.editItem = logo;
    console.log('editItem', this.editItem );
  }
}
