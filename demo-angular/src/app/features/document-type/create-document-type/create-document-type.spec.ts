import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentType } from './create-document-type';

describe('CreateDocumentType', () => {
  let component: CreateDocumentType;
  let fixture: ComponentFixture<CreateDocumentType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDocumentType],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDocumentType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
