import { Component,Input } from '@angular/core';
import { Img } from '../img.model';

@Component({
  selector: 'app-upscaled-img',
  templateUrl: './upscaled-img.component.html',
  styleUrls: ['./upscaled-img.component.css']
})
export class UpscaledImgComponent {
  @Input() img?: Img;

}
