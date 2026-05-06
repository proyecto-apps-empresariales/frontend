import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadField } from './file-upload-field';

describe('FileUploadField', () => {
  let component: FileUploadField;
  let fixture: ComponentFixture<FileUploadField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadField],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
