import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpscalerComponent } from './upscaler.component';

describe('UpscalerComponent', () => {
  let component: UpscalerComponent;
  let fixture: ComponentFixture<UpscalerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpscalerComponent]
    });
    fixture = TestBed.createComponent(UpscalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
