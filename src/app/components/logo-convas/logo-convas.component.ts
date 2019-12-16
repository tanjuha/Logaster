import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  Output
} from '@angular/core';
import { LogosService, ImgTemplate } from 'src/app/services/app-logos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logo-convas',
  templateUrl: './logo-convas.component.html',
  styleUrls: ['./logo-convas.component.scss']
})
export class LogoConvasComponent implements OnInit {
  @ViewChild('idLogo') idLogo: ElementRef;
  @ViewChild('idimg') idimg: ElementRef;

  @Output() text: string;

  convas;
  context;
  idImgSelect: string;
  arrayFonts = [];
  imgTenplate: ImgTemplate[] = [];
  fillStyle: string;
  fontFamily: string;
  img: string;
  image = new Image();
  textLogo: string;
  logos = [];
  paramId: string;

  constructor(
    private logoService: LogosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.logoService.getImgTemplate().subscribe(res => {
      this.imgTenplate = res;
    });
    setTimeout(() => {
      this.image.src = `${this.logos[0].imgLogo}`;
      this.fontFamily = `${this.logos[0].fontFamily}`;
      this.textLogo = `${this.logos[0].text}`;
      this.fillStyle = `${this.logos[0].fillStyle}`;
      this.convas = this.idLogo.nativeElement;
      this.context = <HTMLCanvasElement>this.convas.getContext('2d');

      this.image.onload = () => {
        setTimeout(() => {
          this.context.drawImage(this.image, 0, 0);
        }, 1000);
      };
      this.context.fillStyle = `${this.fillStyle}`;
      this.context.font = `30px ${this.fontFamily}`;
    }, 1000);

    this.route.params.subscribe(param => {
      this.logoService.getById(param.id).subscribe(res => {
        this.logos = res;
        this.paramId = param.id;
      });
    });
  }

  changeImg(idImgSelect) {
    switch (idImgSelect) {
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
        this.context.arc(150, 65, 50, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle, anticlockwise
        break;
      default:
        this.context.clearRect(0, 0, 300, 120);
        this.context.beginPath();
        this.context.arc(150, 65, 50, 0, 2 * Math.PI);
    }
    this.context.fill();
  }

  clear() {
    this.context.clearRect(0, 0, this.convas.width, this.convas.height);
    this.context.beginPath();
  }

  demo() {
    this.img = this.convas.toDataURL('image/jpg');
  }

  saveAndGoHome() {
    this.img = this.convas.toDataURL('image/jpg');
    this.logoService
      .editLogo(
        this.paramId,
        this.img,
        this.textLogo,
        this.fillStyle,
        this.fontFamily
      )
      .subscribe();
    this.router.navigate(['/logo']);
  }
  addText(text) {
    this.context.clearRect(0, 120, 300, 80); // x, y, width, height
    this.context.beginPath();
    if (text === undefined) {
      text = 'Defolt text';
    }
    this.context.font = `30px ${this.fontFamily} `;
    this.context.fillText(text, 30, 170); // text, x, y [, maxWidth]
    this.textLogo = text;
  }

  addFontFamily(fontFamily) {
    this.fontFamily = fontFamily;
    this.context.clearRect(0, 120, 300, 80);
    this.context.beginPath();
    if (this.textLogo === undefined) {
      this.textLogo = this.fontFamily;
    }
    this.context.font = `30px ${this.fontFamily} `;
    this.context.fillText(this.textLogo, 30, 170);
  }
}
