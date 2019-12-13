import { Component, OnInit } from '@angular/core';
import { FontsService, Font } from './services/app.fonts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fonts: Font[] = [];
  fontTitle = '';
  fontsList = 'Roboto';
  fontUri: string;
  tom: any;
  sub: Subscription;
  arrayFonts = [];

  constructor(private fontsService: FontsService) {}

  ngOnInit() {
    this.sub = this.fontsService.getFontsList().subscribe(response => {
      this.fonts = response;
    });

    // create tag <link> with fonts
    setTimeout(() => {
      for (let i = 0; i < this.fonts.length; i++) {
        this.arrayFonts.push(this.fonts[i].title);
      }
      this.fontsService.generateFonts(this.arrayFonts);
      this.sub.unsubscribe();
    }, 1000);
  }

  getFontsList() {
    this.fontsService.getFontsList().subscribe(response => {
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

    this.fontsService
      .addTitle({
        title: this.fontTitle
      })
      .subscribe(font => {
        console.log(font);
      });
  }
}
