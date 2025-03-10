import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillToComponent } from './bill-to.component';

describe('BillToComponent', () => {
  let component: BillToComponent;
  let fixture: ComponentFixture<BillToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillToComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
