import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LogoService } from 'src/app/services/logo.service';
import { FontFamilyService } from 'src/app/services/font-family.service';
import { map } from 'rxjs/operators';
import { ShapeService } from 'src/app/services/shape.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-logo',
  templateUrl: './create-logo.component.html',
  styleUrls: ['./create-logo.component.scss']
})
export class CreateLogoComponent implements OnInit, AfterViewChecked {
  @ViewChild('idCanvas') idCanvas: ElementRef;
  convas;
  context;
  form: FormGroup;
  textLogo;
  imageLogo;
  shapeLogo;
  fontFamilyList;
  arrayFontFamily = [];
  shapes;
  fontFamilyLogo;

  constructor(
    private logoService: LogoService,
    private fontFamilyService: FontFamilyService,
    private shapeService: ShapeService,
    private router: Router
  ) {}

  ngAfterViewChecked() {
    this.onChangeText();
    this.onChangeShape();
    this.onChangeFontFamily();
  }

  ngOnInit() {
    this.convas = this.idCanvas.nativeElement;
    this.context = <HTMLCanvasElement>this.convas.getContext('2d');
    this.context.fillStyle = '#000000';
    this.context.font = `30px Lato`;

    this.form = new FormGroup({
      text: new FormControl(''),
      shape: new FormControl(),
      fontFamily: new FormControl()
    });

    this.textLogo = this.form.get('text');
    this.shapeLogo = this.form.get('shape');
    this.fontFamilyLogo = this.form.get('fontFamily');


    this.shapeService
      .getShaps()
      .snapshotChanges()
      .pipe(
        map(shapes => {
          return shapes.map(s => {
            return {
              ...s.payload.val()
            };
          });
        })
      )
      .subscribe(res => {
        this.shapes = res;
      });

    this.fontFamilyService
      .getFontFamilyList()
      .snapshotChanges()
      .pipe(
        map(fontFamily => {
          return fontFamily.map(f => {
            return {
              ...f.payload.val()
            };
          });
        })
      )
      .subscribe(res => {
        this.fontFamilyList = res;
        this.getGenerateFontFamilyList();
      });
  }

  onChangeShape() {
    switch (this.shapeLogo.value) {
      case 'triagle':
        this.context.clearRect(0, 0, 300, 120);
        this.context.beginPath();
        this.context.moveTo(150, 30);
        this.context.lineTo(40, 115);
        this.context.lineTo(260, 115);
        break;
      case 'square':
        this.context.clearRect(0, 0, 300, 120);
        this.context.beginPath();
        this.context.rect(40, 40, 220, 75);
        break;
      case 'circle':
        this.context.clearRect(0, 0, 300, 120);
        this.context.beginPath();
        this.context.arc(150, 65, 50, 0, 2 * Math.PI);
        break;
      default:
        this.context.clearRect(0, 0, 300, 120);
        this.context.beginPath();
    }
    this.context.fill();
  }

  onChangeText() {
    this.context.clearRect(0, 120, 300, 80);
    this.context.beginPath();
    if (this.textLogo.value) {
      this.context.fillText(this.textLogo.value, 30, 170);
    }
  }

  onChangeFontFamily() {
    this.context.clearRect(0, 120, 300, 80);
    this.context.beginPath();
    if (this.textLogo.value) {
      this.context.font = `30px ${this.fontFamilyLogo.value}`;
      this.context.fillText(this.textLogo.value, 30, 170);
    }
  }

  saveLogo() {
    this.logoService.createLogo({ image: this.imageLogo, ...this.form.value });
  }
  submit() {
    this.imageLogo = this.convas.toDataURL('image/jpg');
    this.saveLogo();
    this.router.navigate(['/logo']);
  }

  cancel() {
    this.router.navigate(['/logo']);
  }

  getGenerateFontFamilyList() {
    if (this.fontFamilyList.length !== 0) {
      for (let i = 0; i < this.fontFamilyList.length; i++) {
        this.arrayFontFamily.push(this.fontFamilyList[i].name);
      }
      this.fontFamilyService.generateFontFamilyList(this.arrayFontFamily);
    }
  }
}
