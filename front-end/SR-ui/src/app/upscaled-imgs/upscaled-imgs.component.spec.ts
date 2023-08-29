import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpscaledImgsComponent } from './upscaled-imgs.component';

describe('UpscaledImgsComponent', () => {
  let component: UpscaledImgsComponent;
  let fixture: ComponentFixture<UpscaledImgsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpscaledImgsComponent]
    });
    fixture = TestBed.createComponent(UpscaledImgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
