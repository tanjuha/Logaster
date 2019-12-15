import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Logo, LogosService } from 'src/app/services/app-logos.service';
import { Font, FontsService } from 'src/app/services/app.fonts.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logo-convas',
  templateUrl: './logo-convas.component.html',
  styleUrls: ['./logo-convas.component.scss']
})
export class LogoConvasComponent implements OnInit {
  @ViewChild('idLogo') idLogo: ElementRef;
  @ViewChild('idimg') idimg: ElementRef;
  @ViewChild('idFontSelect') idFontSelect: ElementRef;

  idImgSelect: string;
  fonts: Font[] = [];
  fontTitle = '';
  fontsList = 'Roboto';
  fontUri: string;
  tom: any;
  sub: Subscription;
  arrayFonts = [];

  convas;
  context;
  isDrawing = false;
  img;
  image = new Image();
  text = '@tom';
  idLogoText: string;
  logos: Logo[] = [];
  logo: any;

  constructor(
    private logoService: LogosService,
    private fontsService: FontsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.sub = this.fontsService.getFontsList().subscribe(response => {
      this.fonts = response;
    });

    // create tags <link> with fonts
    setTimeout(() => {
      if (this.fonts.length !== 0) {
        for (let i = 0; i < this.fonts.length; i++) {
          this.arrayFonts.push(this.fonts[i].title);
        }
        this.fontsService.generateFonts(this.arrayFonts);
        this.sub.unsubscribe();
      }
    }, 1000);

    // canvas
    this.image.src = '././assets/images/hamster-nasil-egitilir-820x510.jpg';
    this.convas = this.idLogo.nativeElement;
    this.context = <HTMLCanvasElement>this.convas.getContext('2d');
    this.context.strokeStyle = '#3742fa';

    this.image.onload = () => {
      setTimeout(() => {
        this.context.drawImage(this.image, 150, 0);
      }, 1000);
    };
    this.context.fillStyle = 'red';
    this.context.font = '30px Arial';
    this.context.fillText(this.text, 50, 100);


    // route get param for id
    this.route.params.subscribe(param => {
       this.logoService.getById(param.id).subscribe(res => {
          this.logo = res;
          console.log(this.logo)
       });
    });

  }
  getFontsList() {
    this.fontsService.getFontsList().subscribe(response => {
      this.fonts = response;
      console.log(this.fonts);
      console.log(response);
      return response;
    });
  }

  addTitle() {
    if (!this.fontTitle.trim()) {
      return;
    }

    this.fontsService
      .addTitle({
        title: this.fontTitle
      })
      .subscribe(font => {
        console.log(font);
      });
  }

  // canvas
  wtiteText() {
    this.context.clearRect(0, 0, 150, 150);
    this.context.beginPath();
    if (this.idLogoText === undefined) {
      this.idLogoText = '';
    }
    this.context.font = `30px ${this.idFontSelect}`;
    this.context.fillText(this.idLogoText, 50, 100);

    // console.log('own text = ', this.text, 'input text =', this.idLogoText);
    // console.log('idFontSelect', this.idFontSelect);
  }

  changeImg() {
    switch (this.idImgSelect) {
      case 'triangle':
        this.context.moveTo(100, 20);
        this.context.lineTo(150, 75);
        this.context.lineTo(50, 75);
        console.log('triangle');
        break;
      case 'squre':
        this.context.rect(20, 20, 70, 70);
        this.context.stroke();
        console.log('squre');
        break;
      case 'circle':
        this.context.clearRect(151, 0, 150, 150);
        this.context.arc(95, 50, 40, 0, 2 * Math.PI);
        this.context.stroke();
        console.log('circle');
        break;
      default:
        console.log('default');
    }
    this.context.fill();
    console.log('idImgSelect', this.idImgSelect);
  }

  onMouseUp(e) {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
    }
  }

  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(0, 0, this.convas.width, this.convas.height);
    this.context.beginPath();
  }

  addLogo() {
    this.img = this.convas.toDataURL('image/jpg');
    this.logoService
      .addLogo({
        imgLogo: this.img,
        text: this.idLogoText
      })
      .subscribe();
  }

  showLogos() {
    this.logoService.showLogos().subscribe(logo => {
      this.logos = logo;
      console.log('logo', logo);
      return logo;
    });
  }

  saveAndGoHome() {
    this.router.navigate(['/']);
    console.log('go home');
  }


}
