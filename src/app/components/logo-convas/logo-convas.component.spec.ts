import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoConvasComponent } from './logo-convas.component';

describe('LogoConvasComponent', () => {
  let component: LogoConvasComponent;
  let fixture: ComponentFixture<LogoConvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoConvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoConvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
