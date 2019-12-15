import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html'
})
export class TextComponent implements OnInit {
  @Input() text: string;
  @Output() addText: EventEmitter<string> = new EventEmitter<string>();
  idLogoText: string;

  ngOnInit() {
    this.idLogoText = this.text;
  }

  wtiteText() {
    this.addText.emit(`${this.idLogoText}`);
  }
}
