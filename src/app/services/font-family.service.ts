import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import * as WebFont from 'webfontloader';

export interface FontFamily {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class FontFamilyService {
  private dbFontFamily = '/font-family-list';

  fontfamilyRef: AngularFireList<FontFamily> = null;

  constructor(private db: AngularFireDatabase) {
    this.fontfamilyRef = db.list(this.dbFontFamily);
   }

   getFontFamilyList(): AngularFireList<FontFamily> {
     return this.fontfamilyRef;
   }

   createFontFamily(fontFamily: FontFamily): void {
     this.fontfamilyRef.push(fontFamily);
   }

   generateFontFamilyList(array: Array<string>) {
    WebFont.load({
      google: {
        families: array
      },
      active: () => console.log('active families'),
      inactive: () => console.log('inactive families')
    });
  }

}
