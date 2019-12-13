import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Logo {
  text: string;
  imgLogo: string;
}

@Injectable({ providedIn: 'root' })
export class LogosService {
  constructor(private http: HttpClient) {}

  showLogos() {
    return this.http.get('https://logaster-df59c.firebaseio.com/logos.json')
    .pipe(map(res => {
      return Object.keys(res).map(key => {
        console.log('key - ', key);
        const imgLogo = `${res[key].imgLogo}`;
        const  text = `${res[key].text}`;
        return { ...res[key], imgLogo, text};
      });
        }));
  }

  addLogo(logo: Logo): Observable<Logo> {
    return this.http.post<Logo>(
      'https://logaster-df59c.firebaseio.com/logos.json',
      logo
    );
  }
}
