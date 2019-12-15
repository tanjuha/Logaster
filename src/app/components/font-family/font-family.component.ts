import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import {
  FontFamily,
  FontFamilyService
} from 'src/app/services/app-font-family.service';

@Component({
  selector: 'app-font-family',
  templateUrl: './font-family.component.html',
  styleUrls: ['./font-family.component.scss']
})
export class FontsFamilyComponent implements OnInit {
  // @ViewChild('idFontFamily' ) idFontFamily: ElementRef;

  @Input() idLogo;

  @Output() addFontFamily: EventEmitter<string> = new EventEmitter<string>();

  fontFamilyList: FontFamily[] = [];
  arrayFontFamily = [];
  idFontFamily: string;

  constructor(private fontsService: FontFamilyService) {}

  ngOnInit() {
    this.idFontFamily = this.idLogo;
    console.log('idLogo', this.idLogo);
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
    console.log('this.idFontFamily', this.idFontFamily);
  }
}
