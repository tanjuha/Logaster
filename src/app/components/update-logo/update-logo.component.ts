import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogoService } from 'src/app/services/logo.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-logo',
  templateUrl: './update-logo.component.html',
  styleUrls: ['./update-logo.component.scss']
})
export class UpdateLogoComponent implements OnInit, AfterViewChecked {
  @ViewChild('idCanvas') idCanvas: ElementRef;
  canvas;
  context;
  form: FormGroup;
  logoInfo = {
    image: '',
    text: ''
  };
  logoId: string;
  textLogo;
  imageLogo;
  shapeLogo;
  image = new Image();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private logoService: LogoService
  ) {}

  ngAfterViewChecked() {
    this.onChangeText();
    this.onChangeShape();
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.logoService
        .getLogoById(param.id)
        .snapshotChanges()
        .pipe(
          map(logos => {
            return logos.map(logo => {
              const key = logo.payload.key;
              const value = logo.payload.val();
              return this.getProperty(key, value);
            });
          })
        )
        .subscribe();
      this.logoId = param.id;
    });

    this.canvas = this.idCanvas.nativeElement;
    this.context = <HTMLCanvasElement>this.canvas.getContext('2d');

    this.form = new FormGroup({
      text: new FormControl(''),
      shape: new FormControl(''),
      fontFamily: new FormControl('')
    });

    this.textLogo = this.form.get('text');
    this.shapeLogo = this.form.get('shape');
  }

  getProperty(key, value) {
    return (this.logoInfo[key] = value);
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

  updateLogo() {
    this.logoService.updateLogo(this.logoId, {
      image: this.imageLogo,
      ...this.form.value
    });
    this.router.navigate(['/logo']);
  }

  submit() {
    this.imageLogo = this.canvas.toDataURL('image/jpg');
    this.updateLogo();
  }
}
