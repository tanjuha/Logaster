import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Logo {
  id?: string;
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
        const imgLogo = `${res[key].imgLogo}`;
        const  text = `${res[key].text}`;
        return { ...res[key], imgLogo, text, id: key};
      });
        }));
  }

  addLogo(logo: Logo): Observable<Logo> {
    return this.http.post<Logo>(
      'https://logaster-df59c.firebaseio.com/logos.json',
      logo
    );
  }

  getById(id: string) {
    return this.http.get(`https://logaster-df59c.firebaseio.com/logos/${id}.json`).pipe(map(res => {
      return [res];
        }));
  }

  editLogo(id: string, imgLogo: string, text: string) {
    console.log('id = ', id, 'imgLogo  = ', imgLogo, 'text', text);
    return this.http.put(`https://logaster-df59c.firebaseio.com/logos/${id}.json`, {
      imgLogo,
      text
    });
  }

}
