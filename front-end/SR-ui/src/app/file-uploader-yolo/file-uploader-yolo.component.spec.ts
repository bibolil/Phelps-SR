import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderYoloComponent } from './file-uploader-yolo.component';

describe('FileUploaderYoloComponent', () => {
  let component: FileUploaderYoloComponent;
  let fixture: ComponentFixture<FileUploaderYoloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderYoloComponent]
    });
    fixture = TestBed.createComponent(FileUploaderYoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
