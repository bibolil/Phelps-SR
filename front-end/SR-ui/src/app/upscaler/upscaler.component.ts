import { Component } from '@angular/core';

@Component({
  selector: 'app-upscaler',
  templateUrl: './upscaler.component.html',
  styleUrls: ['./upscaler.component.css']
})
export class UpscalerComponent {
  manual: boolean = true;

  constructor() { }

  switchToAuto() {
    this.manual= false;
  }
  switchToManual() {
    this.manual= true;
  }

}
