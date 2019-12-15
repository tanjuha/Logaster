import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { FontFamily, FontFamilyService } from 'src/app/services/app-font-family.service';

@Component({
  selector: 'app-font-family',
  templateUrl: './font-family.component.html',
  styleUrls: ['./font-family.component.scss']
})
export class FontsFamilyComponent implements OnInit {

   @ViewChild('idFontFamily' ) idFontFamily: ElementRef;

  @Output() addFontFamily: EventEmitter<string> = new EventEmitter<string>();

  fontFamilyList: FontFamily[] = [];
  arrayFontFamily = [];
 
  constructor(private fontsService: FontFamilyService) {}

  ngOnInit() {

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

  getFontFamilyList() {
    this.fontsService.getFontFamilyList().subscribe(response => {
      this.fontFamilyList = response;
      return response;
    });
  }

  changeFontFamily() {
    this.addFontFamily.emit(`${this.idFontFamily}`);
  }

}
