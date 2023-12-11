import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CompositiondialogService } from './compositiondialog.service'
import { ordersDeliveryComponent } from '../ordersDelivery.component'

@Component({
  selector: 'app-composition-dialog',
  template: `
  <h2>Composition</h2>

  <div class="composition-dialog">
  
  </div>

  <button mat-icon-button (click)="closeDialog()">
      close
  </button>`,
  styleUrls: ['./compositionDialog.component.css'],
})
export class CompositionDialogComponent {

  constructor(private dialogRef: MatDialogRef<CompositionDialogComponent>, 
    private readonly compositiondialogService: CompositiondialogService,
    private readonly ordersDeliveryComponent: ordersDeliveryComponent ) {}

  ngOnInit(): void {
    this.calculateForEachBoxesQuantity();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  calculateForEachBoxesQuantity(): any {
    this.ordersDeliveryComponent.calculateForEachBoxesQuantity();
  }

}