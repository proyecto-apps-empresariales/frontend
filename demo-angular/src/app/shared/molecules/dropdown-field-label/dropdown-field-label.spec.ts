import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFieldLabel } from './dropdown-field-label';

describe('DropdownFieldLabel', () => {
  let component: DropdownFieldLabel;
  let fixture: ComponentFixture<DropdownFieldLabel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownFieldLabel],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownFieldLabel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
