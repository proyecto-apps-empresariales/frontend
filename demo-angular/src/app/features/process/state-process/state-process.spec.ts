import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateProcess } from './state-process';

describe('StateProcess', () => {
  let component: StateProcess;
  let fixture: ComponentFixture<StateProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StateProcess],
    }).compileComponents();

    fixture = TestBed.createComponent(StateProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
