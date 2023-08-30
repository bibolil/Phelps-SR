import { Injectable } from '@angular/core';
import { Service } from 'src/app/app.services';
import { HttpClient } from '@angular/common/http';
import { Img } from 'src/app/img.model';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackEndService {
    constructor(private http: HttpClient, private Service: Service) {}
fetchData() {
        this.http
          .get<Img[]>('http://localhost:5000/ImageKIT')
          .pipe(
            tap((listOfImgs: Img[]) => {
              console.log(listOfImgs)
              this.Service.setImages(listOfImgs);
            })
          )
          .subscribe();
      }



}
