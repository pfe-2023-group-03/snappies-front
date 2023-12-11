import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionDialogComponent } from './compositiondialog.component';

describe('CompositiondialogComponent', () => {
  let component: CompositionDialogComponent;
  let fixture: ComponentFixture<CompositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompositionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
