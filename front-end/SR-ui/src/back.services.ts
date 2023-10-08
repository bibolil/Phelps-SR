import { Injectable } from '@angular/core';
import { Service } from 'src/app/app.services';
import { HttpClient } from '@angular/common/http';
import { Img } from 'src/app/img.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackEndService {
  _albums = [] as any;
  constructor(private http: HttpClient, private Service: Service) {
  }
    
fetchData() {
        this.http
          .get<Img[]>('http://localhost:5000/ImageKIT').subscribe(
            listOfImgs => {
            this.Service.setImages(listOfImgs);
            for(let i of listOfImgs)
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
}
