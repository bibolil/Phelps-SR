import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class Service{

    RecievedImage= new BehaviorSubject<boolean>(false);
    ImageDataUrl  =  new BehaviorSubject<string>('');

    constructor(){}

    setRecievedImage(value: boolean){
        this.RecievedImage.next(value);
    }

    setRecievedImageDataUrl(value: string){
        this.ImageDataUrl.next(value);
    }

    getRecievedImage(){
        return this.RecievedImage;
    }

    getRecievedImageDataUrl(){
        return this.ImageDataUrl;
    }

}