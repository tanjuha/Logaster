import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export interface Logo {
  id?: string;
  text: string;
  image?: string;
  fontFamily?: string;
  fillStyle?: string;
  fontSize?: string;
  shape?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogoService {
  private dbPathLogo = '/logos';

  logoRef: AngularFireList<Logo> = null;

  constructor(private db: AngularFireDatabase) {
    this.logoRef = db.list(this.dbPathLogo);
   }

   getLogoList(): AngularFireList<Logo> {
    return this.logoRef;
   }

   getLogoById(id) {
     return this.db.list(`${this.dbPathLogo}/${id}`);
   }

   updateLogo(id: string, value: any): Promise<void> {
    return this.logoRef.update(id, value);
  }

  createLogo(logo: Logo): void {
    this.logoRef.push(logo);
  }

  deleteLogo(id: string): Promise<void> {
    return this.logoRef.remove(id);
  }
}
