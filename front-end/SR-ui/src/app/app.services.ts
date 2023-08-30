import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Img } from "./img.model";

@Injectable({providedIn: 'root'})
export class Service{
    listChangedEvent: EventEmitter <Img[]>= new EventEmitter();
    listOfImgs: Img[] = [];

    RecievedImage= new BehaviorSubject<boolean>(false);
    ImageDataUrl  =  new BehaviorSubject<string>('');

    constructor(){}

    getImages(){
        return this.listOfImgs;
    }

    setImages(imgs: Img[]){
        this.listOfImgs = imgs;
        this.listChangedEvent.emit(this.listOfImgs);
    }



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