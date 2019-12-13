import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Logo, LogosService } from 'src/app/services/app-logos.service';

@Component({
  selector: 'app-logo-convas',
  templateUrl: './logo-convas.component.html',
  styleUrls: ['./logo-convas.component.scss']
})
export class LogoConvasComponent implements OnInit {
  @ViewChild('idLogo') idLogo: ElementRef;
  @ViewChild('idimg') idimg: ElementRef;

  convas;
  context;
  isDrawing = false;
  img;
  image = new Image();
  text = '@tom';
  idLogoText: string;
  logos: Logo[] = [];

  constructor(private logoService: LogosService) {}

  ngOnInit() {
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
  }
  wtiteText() {
    this.context.clearRect(0, 0, 150, 150);
    this.context.beginPath();
    if (this.idLogoText === undefined) {
      this.idLogoText = '';
    }
    this.context.fillText(this.idLogoText, 50, 100);

    console.log('own text = ', this.text, 'input text =', this.idLogoText);
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
    this.logoService.showLogos()
    .subscribe(logo => {
      this.logos = logo;
      console.log('logo', logo);
      return logo;
    })
  }
}