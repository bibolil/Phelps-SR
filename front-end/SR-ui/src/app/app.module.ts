import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilePreviewerComponent } from './file-previewer/file-previewer.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { UpscaledImgsComponent } from './upscaled-imgs/upscaled-imgs.component';
import { UpscalerComponent } from './upscaler/upscaler.component';
import { UpscaledImgComponent } from './upscaled-img/upscaled-img.component';
import { LightboxModule } from 'ngx-lightbox';
import { FileUploaderYoloComponent } from './file-uploader-yolo/file-uploader-yolo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FileUploaderComponent,
    FilePreviewerComponent,
    UpscaledImgsComponent,
    UpscalerComponent,
    UpscaledImgComponent,
    FileUploaderYoloComponent,

  ],
  imports: [
    BrowserModule,
    ImageCropperModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LightboxModule,
    BrowserAnimationsModule,
    MatGridListModule,
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
