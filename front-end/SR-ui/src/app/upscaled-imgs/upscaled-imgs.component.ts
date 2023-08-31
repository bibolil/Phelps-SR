import { Component } from '@angular/core';
import { Img } from '../img.model';
import { Service } from '../app.services';

@Component({
  selector: 'app-upscaled-imgs',
  templateUrl: './upscaled-imgs.component.html',
  styleUrls: ['./upscaled-imgs.component.css']
})
export class UpscaledImgsComponent {
  listOfImgs: Img[] = [];
  test?: any;
  constructor( private Service: Service) { }
  ngOnInit() {
    console.log("ngOnInit");
    this.Service.listChangedEvent.subscribe(
      (listOfImgs: Img[]) => {
        this.listOfImgs = this.Service.getImages();
        
      });

  }


}
