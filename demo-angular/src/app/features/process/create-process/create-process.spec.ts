import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcess } from './create-process';

describe('CreateProcess', () => {
  let component: CreateProcess;
  let fixture: ComponentFixture<CreateProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProcess],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
