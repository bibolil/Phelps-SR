import { Component } from '@angular/core';
import { Img } from '../img.model';
import { Service } from '../app.services';
import { BackEndService } from 'src/back.services';
import { Lightbox } from 'ngx-lightbox';
@Component({
  selector: 'app-upscaled-imgs',
  templateUrl: './upscaled-imgs.component.html',
  styleUrls: ['./upscaled-imgs.component.css']
})
export class UpscaledImgsComponent {
  listOfImgs: Img[] = [];
  _albums: any = [];
  constructor(private _lightbox: Lightbox, private Service: Service, public backEndService: BackEndService) {
   }

  onFetch()
  { if(this.Service.listOfImgs.length==0)
    this.backEndService.fetchData();
    this._albums = this.backEndService._albums;
  }

  async ngOnInit() {
    this.onFetch()
        //this.listOfImgs = this.Service.getImages();    
 }
 
 open(index: number): void {
  // open lightbox
  this._lightbox.open(this._albums, index);
}

close(): void {
  // close lightbox programmatically
  this._lightbox.close();
}


}
