import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownField } from './dropdown-field';

describe('DropdownField', () => {
  let component: DropdownField;
  let fixture: ComponentFixture<DropdownField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownField],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
