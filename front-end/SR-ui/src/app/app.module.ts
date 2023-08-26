import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FilePreviewerComponent } from './file-previewer/file-previewer.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { ImgCropComponent } from './img-crop/img-crop.component';
import {ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FileUploaderComponent,
    FilePreviewerComponent,
    PhotoEditorComponent,
    ImgCropComponent

  ],
  imports: [
    BrowserModule,
    ImageCropperModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
