import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/app.services';

@Component({
  selector: 'app-file-uploader-yolo',
  templateUrl: './file-uploader-yolo.component.html',
  styleUrls: ['./file-uploader-yolo.component.css']
})
export class FileUploaderYoloComponent {
  form!: FormGroup;
  selectedFile = null;
  url='';
  

  constructor(private http:HttpClient, private service:Service) {}

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, [Validators.required]),
    }); 
  
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

  uploadFile() {
    const formData = new FormData();
    formData.append('image',(this.selectedFile as any));
    this.http.post('http://localhost:5000/YOLO',formData).subscribe((res: any)=>{console.log(res)
    
  });
  }

}
