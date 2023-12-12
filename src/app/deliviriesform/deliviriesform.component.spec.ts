import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliviriesformComponent } from './deliviriesform.component';

describe('DeliviriesformComponent', () => {
  let component: DeliviriesformComponent;
  let fixture: ComponentFixture<DeliviriesformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliviriesformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliviriesformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
