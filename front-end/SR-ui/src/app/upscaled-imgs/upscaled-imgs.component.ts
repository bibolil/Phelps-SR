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
  test?: any;
  _albums: any = [];

  constructor(private _lightbox: Lightbox, private Service: Service, private BackEndService: BackEndService) { }

  onFetch()
  {
    this.BackEndService.fetchData();
  }

  ngOnInit() {
    this.onFetch()
    //"es2el omar for best practice to fetch msh kol mara i request server"
    this.Service.listChangedEvent.subscribe(
      (listOfImgs: Img[]) => {
        this.listOfImgs = this.Service.getImages();
        for(let i of this.listOfImgs)
        {
          const album= {
            src: i.imagePath,
            caption: '',
            thumb: i.thumbnail
          }
          this._albums.push(album);
        }
      });
   
    
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
