import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { Img,CroppedImgs } from "./img.model";

@Injectable({providedIn: 'root'})
export class Service{
    listChangedEvent: EventEmitter <Img[]>= new EventEmitter();
    listChangedEvent2: EventEmitter <CroppedImgs[]>= new EventEmitter();
    listOfImgs: Img[] = [];
    CropedImgs: CroppedImgs[] = [];
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

    setCropedImgs(imgs: CroppedImgs[]){
        this.CropedImgs = imgs;
        this.listChangedEvent2.emit(this.CropedImgs);
    }

    getCropedImgs(){
        return this.CropedImgs;
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

    blobToFile = (theBlob: Blob, fileName:string): File => {       
        return new File(
            [theBlob as any], // cast as any
            fileName, 
            {
                lastModified: new Date().getTime(),
                type: theBlob.type 
            }
        )
    }

}