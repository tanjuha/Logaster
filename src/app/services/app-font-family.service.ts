import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface FontFamily {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class FontFamilyService {
  constructor(private http: HttpClient) {}

  getFontFamilyList(): Observable<FontFamily[]> {
    return this.http
      .get<FontFamily[]>(`https://logaster-df59c.firebaseio.com/fonts.json`)
      .pipe(
        map(res => {
          return Object.keys(res).map(key => {
            const fontFamily = `${res[key].name}`;
            return { ...res[key], name: fontFamily };
          });
        })
      );
  }

  generateFontFamilyList(array: Array<string>) {
    const newArr: string = array.join('|');
    const fontFamilyUrl = `https://fonts.googleapis.com/css?family=${newArr}&display=swap`;
    let link = document.getElementById('fontFamily');
    if (!link) {
      link = document.createElement('link');
      link.id = 'fontFamily';
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', fontFamilyUrl);
      document.head.appendChild(link);
    }
  }
}
