import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as WebFont from 'webfontloader';

export interface FontFamily {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class FontFamilyService {
  constructor(private http: HttpClient) {}

  getFontFamilyList(): Observable<FontFamily[]> {
    return this.http.get<FontFamily[]>(`${environment.url}/font-family-list`);
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
