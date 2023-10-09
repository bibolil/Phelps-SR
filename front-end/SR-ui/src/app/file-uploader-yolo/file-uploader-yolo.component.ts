import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/app.services';
import { CroppedImgs } from "src/app/img.model";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-file-uploader-yolo',
  templateUrl: './file-uploader-yolo.component.html',
  styleUrls: ['./file-uploader-yolo.component.css']
})
export class FileUploaderYoloComponent {
  form!: FormGroup;
  selectedFile = null;
  url='';
  CropedImgs: CroppedImgs[] = [];
  loading = false;
  selectedCrops: any[] = [];

  constructor(private http:HttpClient, private service:Service, private sanitizer: DomSanitizer) {}


  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, [Validators.required]),
    }); 
    this.loading = false;
  
  }

  onFileChange(event:any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event:any) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
    

  }
  

  // to add when clicking outside the img boundries precisely in the label
  onImageClick(event: any){
    const imageUrl = event.target.src;
    //imageALT to divide later by labels
    const imageAlt = event.target.alt;
    const index = this.selectedCrops.indexOf(imageUrl);
      if (index !== -1) {
        this.selectedCrops.splice(index, 1);
        
      }    
    else
    {
     this.selectedCrops.push(imageUrl);
    }
    console.log(this.selectedCrops);
  }


  uploadFile() {
    const formData = new FormData();
    formData.append('image',(this.selectedFile as any));
    this.http.post('http://localhost:5000/YOLO',formData).subscribe((res:any)=>{
    for (const key in res) {
      const urls = [];
      const header= 'data:image/png;base64,';
      for (const img in res[key]) {
        urls.push((header+res[key][img]));
      }
      const crop = new CroppedImgs(key,res[key],urls);
      this.CropedImgs.push(crop);
    }
    this.service.setCropedImgs(this.CropedImgs);
    this.loading = true;
    //to-do add another component to display the cropped images and allow select option to choose which one to upscale.
    //eventchangedemitter to send the cropped images to the new component.
    //already declared in app.services.ts
  });
  }

  upscale_selected_items(){
    const formData = new FormData();
    const dictionary = this.selectedCrops.reduce((acc, element, index) => {
      acc[index] = element;
      return acc;
    }, {});
    const keys = Object.keys(dictionary);
    for (const key of keys) {
      formData.append(key,(dictionary[key] as string));
    }
    this.http.post('http://localhost:5000/SwinIR_multi_images',formData).subscribe((res:any)=>{console.log(res);});
  }

}
