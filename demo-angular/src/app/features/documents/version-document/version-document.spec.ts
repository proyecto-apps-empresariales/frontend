import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionDocument } from './version-document';

describe('VersionDocument', () => {
  let component: VersionDocument;
  let fixture: ComponentFixture<VersionDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionDocument],
    }).compileComponents();

    fixture = TestBed.createComponent(VersionDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
