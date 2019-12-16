import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FontFamily,
  FontFamilyService
} from 'src/app/services/app-font-family.service';

@Component({
  selector: 'app-font-family',
  templateUrl: './font-family.component.html'
})
export class FontsFamilyComponent implements OnInit {
  @Input() fontFamily;

  @Output() addFontFamily: EventEmitter<string> = new EventEmitter<string>();

  fontFamilyList: FontFamily[] = [];
  arrayFontFamily = [];
  idFontFamily: string;

  constructor(private fontsService: FontFamilyService) {}

  ngOnInit() {
    this.idFontFamily = this.fontFamily;
    this.fontsService.getFontFamilyList().subscribe(response => {
      this.fontFamilyList = response;
    });

    setTimeout(() => {
      if (this.fontFamilyList.length !== 0) {
        for (let i = 0; i < this.fontFamilyList.length; i++) {
          this.arrayFontFamily.push(this.fontFamilyList[i].name);
        }
        this.fontsService.generateFontFamilyList(this.arrayFontFamily);
      }
    }, 1000);
  }

  changeFontFamily(idFontFamily) {
    this.addFontFamily.emit(`${idFontFamily}`);
  }
}
