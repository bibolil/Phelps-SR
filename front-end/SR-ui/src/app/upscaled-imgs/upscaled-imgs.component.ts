import { Component } from '@angular/core';
import { Img } from '../img.model';
import { Service } from '../app.services';
import { BackEndService } from 'src/back.services';
@Component({
  selector: 'app-upscaled-imgs',
  templateUrl: './upscaled-imgs.component.html',
  styleUrls: ['./upscaled-imgs.component.css']
})
export class UpscaledImgsComponent {
  listOfImgs: Img[] = [];
  test?: any;
  
  constructor( private Service: Service, private BackEndService: BackEndService) { }

  onFetch()
  {
    this.BackEndService.fetchData();
  }

  ngOnInit() {
    this.onFetch()
    console.log("ngOnInit");
    this.Service.listChangedEvent.subscribe(
      (listOfImgs: Img[]) => {
        this.listOfImgs = this.Service.getImages();
        
      });

  }


}
