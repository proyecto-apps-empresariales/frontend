import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrayButton } from './gray-button';

describe('GrayButton', () => {
  let component: GrayButton;
  let fixture: ComponentFixture<GrayButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrayButton],
    }).compileComponents();

    fixture = TestBed.createComponent(GrayButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
