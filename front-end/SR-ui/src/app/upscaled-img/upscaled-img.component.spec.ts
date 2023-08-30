import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpscaledImgComponent } from './upscaled-img.component';

describe('UpscaledImgComponent', () => {
  let component: UpscaledImgComponent;
  let fixture: ComponentFixture<UpscaledImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpscaledImgComponent]
    });
    fixture = TestBed.createComponent(UpscaledImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
