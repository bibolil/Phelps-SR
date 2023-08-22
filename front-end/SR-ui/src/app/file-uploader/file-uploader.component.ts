import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent {
  form!: FormGroup;

  selectedFile = null;
  url='';
  request={};
  httpClient: any;
  imageDataUrl!: string;
  result: boolean = false;



  constructor(private http: HttpClient) {}

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
    
      formData.append('task', 'real_sr');
      formData.append('scale', '4');
      formData.append('noise', '15');
      formData.append('jpeg', '40');
      formData.append('training_path_size', '128');
      formData.append('model_large', 'True');
      formData.append('tile', 'None');
      formData.append('tile_overlap', '32');
      formData.append('image', this.selectedFile!);

    this.http.post('http://localhost:5000/SwinIR',formData).subscribe((res: any)=>{console.log(res)
    this.result=true
    this.imageDataUrl = res.url;
  });
}

downloadFile()
{

}



}
