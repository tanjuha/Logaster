import { Component, OnInit } from '@angular/core';
import { FontFamilyService } from 'src/app/services/font-family.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-font-family',
  templateUrl: './font-family.component.html'
})

export class FontsFamilyComponent implements OnInit {
  fontFamilyList;
  arrayFontFamily = [];

  constructor(private fontFamilyService: FontFamilyService) {}

  ngOnInit() {
    this.fontFamilyService.getFontFamilyList()
    .snapshotChanges()
    .pipe(
      map(fontFamily => {
        return fontFamily.map(f => {
          return {
              name: f.payload.val()
          };
        });
      })
    )
    .subscribe(res => {
      this.fontFamilyList = res;
      this.getGenerateFontFamilyList();
    });

  }

  getGenerateFontFamilyList() {
    console.log('getGenerateFontFamilyList');
    if (this.fontFamilyList.length !== 0) {
      for (let i = 0; i < this.fontFamilyList.length; i++) {
        this.arrayFontFamily.push(this.fontFamilyList[i].name);
      }
      this.fontFamilyService.generateFontFamilyList(this.arrayFontFamily);
    }
  }

}
