import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProcess } from './detail-process';

describe('DetailProcess', () => {
  let component: DetailProcess;
  let fixture: ComponentFixture<DetailProcess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProcess],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
