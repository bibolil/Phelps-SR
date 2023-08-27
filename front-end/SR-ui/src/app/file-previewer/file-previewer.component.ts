import { Component,Renderer2 } from '@angular/core';
import { Service } from 'src/app.services';
@Component({
  selector: 'app-file-previewer',
  templateUrl: './file-previewer.component.html',
  styleUrls: ['./file-previewer.component.css']
})
export class FilePreviewerComponent {

  result: boolean = false;
  imageDataUrl: string= '';


  constructor(private service: Service,private renderer: Renderer2) { }

  ngOnInit(): void {
    this.service.getRecievedImage().subscribe((value: any) => {
      this.result = value;
    });
    this.service.getRecievedImageDataUrl().subscribe((value: any) => {
      this.imageDataUrl = value;
    });
  }

  downloadFile()
  { 
    const link = this.renderer.createElement('a');
    link.setAttribute('target', '_blank');  
    link.setAttribute('href', this.imageDataUrl);
    link.setAttribute('download', 'upscale.jpg');
    link.click();
    link.remove();
  }
  
  

}
