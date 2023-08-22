import { Component } from '@angular/core';
import { Service } from 'src/app.services';
@Component({
  selector: 'app-file-previewer',
  templateUrl: './file-previewer.component.html',
  styleUrls: ['./file-previewer.component.css']
})
export class FilePreviewerComponent {

  result: boolean = false;
  imageDataUrl?: string;


  constructor(private service: Service) { }

  ngOnInit(): void {
    this.service.getRecievedImage().subscribe((value: any) => {
      this.result = value;
    });
    this.service.getRecievedImageDataUrl().subscribe((value: any) => {
      this.imageDataUrl = value;
    });
  }
  

}
