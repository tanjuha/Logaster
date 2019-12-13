import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Font  {
  title: string;
}
@Injectable({providedIn: 'root'})
export class FontsService {

  constructor(private http: HttpClient) {}

  getFontsList():  Observable<Font[]> {
   return  this.http.get<Font[]>('https://logaster-df59c.firebaseio.com/fonts.json').pipe(map(res => {
      return Object.keys(res).map(key => {
        const urlFont = `${res[key].title}|`;
        return  {...res[key], id: key, title: urlFont };
      } );
    }));
  }

  addTitle(font: Font): Observable<Font[]> {
   return this.http.post<Font[]>('https://logaster-df59c.firebaseio.com/fonts.json', font); }
}