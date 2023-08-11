import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ParametersComponent } from './parameters/parameters.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FileUploaderComponent,
    ParametersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
