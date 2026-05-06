import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileField } from './file-field';

describe('FileField', () => {
  let component: FileField;
  let fixture: ComponentFixture<FileField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileField],
    }).compileComponents();

    fixture = TestBed.createComponent(FileField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
