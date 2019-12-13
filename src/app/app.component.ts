import { Component} from '@angular/core';
import {FontsService, Font} from './services/app.fonts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  fonts: Font[] = [];
  fontTitle = '';
  fontsList = 'Roboto';
  fontUri: string;
  tom: any;

  constructor(private fontsService: FontsService ) {}

getFontsList() {
  this.fontsService.getFontsList()
  .subscribe(response => {
    this.fonts = response;
    console.log(this.fonts);
    console.log(response);
    return response;
});
}

  addTitle() {
    if (!this.fontTitle.trim()) {
      return;
    }

    this.fontsService.addTitle({
      title: this.fontTitle
    }).subscribe(font => {
        console.log(font);
      });
  }
}
