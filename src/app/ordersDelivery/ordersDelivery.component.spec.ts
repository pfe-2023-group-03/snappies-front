import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ordersDeliveryComponent } from './ordersDelivery.component';

describe('ordersDeliveryComponent', () => {
  let component: ordersDeliveryComponent;
  let fixture: ComponentFixture<ordersDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ordersDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ordersDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
