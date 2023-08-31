import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/app.services';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import 'hammerjs';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  form!: FormGroup;

  selectedFile="";
  url='';
  request={};
  httpClient: any;
  imageDataUrl!: string;
  imgChangedEvent: any = "";
  cropImagePreview: any="";
  imgWidth: number = 0;
  imgHeight: number = 0;
  img: any="";
  imageblob: any="";



  constructor(private service: Service, private http: HttpClient) {}

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, [Validators.required]),
    }); 
  
  }


  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile=event.target.files[0];
      this.service.setRecievedImage(false);
      this.imgChangedEvent = event;
      this.img=event.target.files[0];
      var img = new Image();
        img.src=URL.createObjectURL(event.target.files[0])
        img.onload = () => {
            this.imgWidth = img.width;
            this.imgHeight = img.height;
           };
    }

  }

  imageCropped(event: ImageCroppedEvent) {}


    loadImageFailed() {
      alert("Image failed to load");
    }

    initCropper() {

    }
    imgLoad() {

    }
    cropImg(e: ImageCroppedEvent) {
      this.cropImagePreview = e.objectUrl;
      this.imageblob=e.blob;
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

  uploadFile() {
    const formData = new FormData();
    
      formData.append('task', 'real_sr');
      formData.append('scale', '4');
      formData.append('noise', '15');
      formData.append('jpeg', '40');
      formData.append('training_path_size', '128');
      formData.append('model_large', 'True');
      formData.append('tile', 'None');
      formData.append('tile_overlap', '32');
      formData.append('image', this.blobToFile(this.imageblob,'cropped.jpg'));

    this.http.post('http://localhost:5000/SwinIR',formData).subscribe((res: any)=>{console.log(res)
    this.service.setRecievedImage(true);
    this.service.setRecievedImageDataUrl(res.url);
  });
}


}
