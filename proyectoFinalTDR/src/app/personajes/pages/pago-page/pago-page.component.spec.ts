import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoPageComponent } from './pago-page.component';

describe('PagoPageComponent', () => {
  let component: PagoPageComponent;
  let fixture: ComponentFixture<PagoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagoPageComponent]
    });
    fixture = TestBed.createComponent(PagoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
