import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {environment } from '../../environments/environment';

export interface Logo {
  id?: string;
  text: string;
  image: string;
  fontFamily: string;
  fillStyle?: string;
  fontSize?: string;
}

export interface ImgTemplate {
  title: string;
}

@Injectable({ providedIn: 'root' })
export class LogosService {
  constructor(private http: HttpClient) {}

  addLogo(logo: Logo): Observable<Logo> {
    return this.http.post<Logo>(
      'https://logaster-df59c.firebaseio.com/logos.json',
      logo
    );
  }

 
  editLogo(id: string, imgLogo: string, text: string, fillStyle: string, fontFamily: string ) {
    return this.http.put(`https://logaster-df59c.firebaseio.com/logos/${id}.json`, {
      imgLogo,
      text,
      fillStyle,
      fontFamily
    });
  }

  getLogos(): Observable<Logo>  {
    return this.http.get<Logo>(`${environment.url}/logos`);
  }

  getLogoById(id: string) {
    return this.http.get(`${environment.url}/logos/${id}`);
  }

  getShapes() {
    return this.http.get<Logo>(`${environment.url}/shapes`);
  }


}
