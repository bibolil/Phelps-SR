import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpscaledImgsComponent } from './upscaled-imgs/upscaled-imgs.component';
import { UpscalerComponent } from './upscaler/upscaler.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'upscaler',
    pathMatch: 'full'
  },
  {
    path:'upscaled-imgs',
    component:UpscaledImgsComponent
   
  },
  {
    path:'upscaler',
    component:UpscalerComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
