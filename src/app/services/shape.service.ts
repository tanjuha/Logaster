import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

export interface Shape {
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  private dbShape = '/shapes';

  shapeRef: AngularFireList<Shape> = null;

  constructor(private db: AngularFireDatabase) {
    this.shapeRef = db.list(this.dbShape);
   }

   getShaps(): AngularFireList<Shape> {
     return this.shapeRef;
   }
}
