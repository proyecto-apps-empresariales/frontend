import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProcess } from './type-process';

describe('TypeProcess', () => {
  let component: TypeProcess;
  let fixture: ComponentFixture<TypeProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeProcess],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
